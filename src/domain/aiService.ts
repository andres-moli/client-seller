import axios from "axios";

interface ItemCotizacionProcesado {
  referencia: string;
  descripcion: string;
  costo: number;
  utilidad: number;
  cantidad: number;
  venta: number;
  subtotal: number;
  subtotalConIva: number;
  iva: number;
  stock: number;
  entrega: string;
  unidad: string;
}

interface ItemProcesado {
  producto: string;
  referencia?: string;
  cantidad: number;
  utilidad: number;
}

/**
 * Procesa una solicitud de cotización usando ChatGPT
 * Hace 2 consultas transparentes al usuario:
 * 1. Llama a ChatGPT para interpretar el prompt
 * 2. Busca los productos en la BD automáticamente
 */
export const procesarCotizacionConIA = async (
  instrucciones: string,
  apiKey: string
): Promise<ItemCotizacionProcesado[]> => {
  try {
    // Paso 1: Procesar con ChatGPT para obtener los productos solicitados
    const itemsIA = await procesarConChatGPT(instrucciones, apiKey);

    if (itemsIA.length === 0) {
      throw new Error("No se pudieron procesar los productos");
    }

    // Paso 2: Buscar cada producto en la BD y construir los items completos
    const itemsProcesados: ItemCotizacionProcesado[] = [];

    for (const itemIA of itemsIA) {
      try {
        const producto = await buscarProducto(itemIA.producto);

        if (producto) {
          const utilidad = itemIA.utilidad || 20;
          const ivaPorcentaje = producto.Iva || 19;
          const venta =
            producto.Costo + producto.Costo * (utilidad / 100);
          const cantidad = itemIA.cantidad || 1;
          const subtotal = venta * cantidad;
          const iva = subtotal * (ivaPorcentaje / 100);
          const subtotalConIva = subtotal + iva;

          itemsProcesados.push({
            referencia: producto.referencia,
            descripcion: producto.Descripcion,
            costo: producto.Costo,
            utilidad,
            cantidad,
            venta,
            subtotal,
            subtotalConIva,
            iva,
            stock: producto.Stock,
            entrega: producto.Stock > 0 ? "Inmediata" : "",
            unidad: producto.Medida || "UN",
          });
        }
      } catch (error) {
        console.error(`Error buscando producto ${itemIA.producto}:`, error);
        // Continuar con el siguiente producto
      }
    }

    if (itemsProcesados.length === 0) {
      throw new Error("No se encontraron productos disponibles");
    }

    return itemsProcesados;
  } catch (error) {
    console.error("Error en procesarCotizacionConIA:", error);
    throw error;
  }
};

/**
 * Llama a ChatGPT para interpretar el prompt del usuario
 */
const procesarConChatGPT = async (
  instrucciones: string,
  apiKey: string
): Promise<ItemProcesado[]> => {
  const prompt = `
Eres un asistente experto en gestión de cotizaciones. Analiza la siguiente solicitud del usuario y extrae los productos que desea agregar a una cotización, incluyendo cantidad y utilidad (margen de ganancia en porcentaje).

Solicitud del usuario: "${instrucciones}"

Responde SOLO con un JSON válido en este formato exacto, sin explicaciones adicionales:
{
  "items": [
    {
      "producto": "nombre del producto",
      "cantidad": número,
      "utilidad": número (en porcentaje, por defecto 20 si no se especifica)
    }
  ]
}

Notas importantes:
- Si el usuario no especifica cantidad, usa 1
- Si no especifica utilidad/margen, usa 20%
- Si no se puede extraer información clara, devuelve un array vacío
- Los precios no son necesarios, usaremos los de base de datos
- Sé flexible con los nombres de los productos
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.items || [];
    }

    return [];
  } catch (error) {
    console.error("Error calling ChatGPT:", error);
    throw new Error("Error al procesar con ChatGPT");
  }
};

/**
 * Busca un producto en la BD usando el mismo servicio de búsqueda
 */
const buscarProducto = async (nombreProducto: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://intranet.cytech.net.co:3003/ventas/buscar/tienda/${encodeURIComponent(
        nombreProducto
      )}`
    );

    if (response.data && response.data.length > 0) {
      return response.data[0]; // Retorna el primer resultado
    }

    return null;
  } catch (error) {
    console.error(`Error buscando producto ${nombreProducto}:`, error);
    return null;
  }
};

