interface PerformanceData {
    userId: string;
    presupuesto: number;
    presupuestoAnterior: number;
    venta: number;
    ventaAnterior: number;
    utilidad: number;
    porcentajeCumplimiento: number;
    porcentajeCumplimientoAnterior: number;
  }
  
  interface DailyPerformance {
    status: 'mejor' | 'igual' | 'peor';
    diferenciaPorcentual: number;
    ventaDiariaActual: number;
    ventaDiariaAnterior: number;
    proyeccionMensual: number;
    proyeccionUtilidad: number;
    mensaje: string;
    porcentajeCumplimientoDiario: number;
    porcentajeCumplimientoDiarioAnterior: number;
    eficienciaUtilidad: number;
    eficienciaUtilidadAnterior: number;
  }
  
export function calcularDesempenoDiario(data: PerformanceData | undefined | null): DailyPerformance {
    if(!data) {
        return {
            status: 'peor',
            diferenciaPorcentual: 0,
            ventaDiariaActual: 0,
            ventaDiariaAnterior: 0,
            proyeccionMensual: 0,
            mensaje: 'Hubo un error al cacular',
            porcentajeCumplimientoDiario: 0,
            porcentajeCumplimientoDiarioAnterior: 0,
            eficienciaUtilidad: 0,
            eficienciaUtilidadAnterior: 0,
            proyeccionUtilidad: 0
          }; 
    }
    // Obtener el día del mes actual (1-31)
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const totalDiasMes = new Date(
      fechaActual.getFullYear(), 
      fechaActual.getMonth() + 1, 
      0
    ).getDate();
    
    // Validación básica
    if (diaActual < 1 || diaActual > 31) {
      throw new Error('Día del mes inválido');
    }
  
    // Calcular valores diarios
    const ventaDiariaActual = data.venta / diaActual;
    const ventaDiariaAnterior = data.ventaAnterior / totalDiasMes;
    
    const presupuestoDiarioActual = data.presupuesto / totalDiasMes;
    const presupuestoDiarioAnterior = data.presupuestoAnterior / totalDiasMes;
    
    // Calcular porcentajes de cumplimiento diario
    const porcentajeCumplimientoDiario = (ventaDiariaActual / presupuestoDiarioActual) * 100;
    const porcentajeCumplimientoDiarioAnterior = (ventaDiariaAnterior / presupuestoDiarioAnterior) * 100;
    
    // Calcular eficiencia de utilidad (utilidad por peso vendido)
    const eficienciaUtilidad = (data.utilidad / data.venta) * 100;
    const eficienciaUtilidadAnterior = (data.utilidad / data.ventaAnterior) * 100 || 0;
    
    // Proyecciones
    const proyeccionMensual = ventaDiariaActual * totalDiasMes;
    const proyeccionUtilidad = (data.utilidad / diaActual) * totalDiasMes;
    
    // Comparación con mes anterior
    const diferenciaPorcentual = porcentajeCumplimientoDiario - porcentajeCumplimientoDiarioAnterior;
    
    // Determinar status con umbral más sensible (1% dado los montos grandes)
    let status: 'mejor' | 'igual' | 'peor' = 'igual';
    let mensaje = '';
    
    if (diferenciaPorcentual > 1) {
      status = 'mejor';
      mensaje = `Rendimiento superior: +${diferenciaPorcentual.toFixed(1)}% vs mes anterior`;
    } else if (diferenciaPorcentual < -1) {
      status = 'peor';
      mensaje = `Rendimiento inferior: ${diferenciaPorcentual.toFixed(1)}% vs mes anterior`;
    } else {
      mensaje = 'Rendimiento similar al mes anterior';
    }
    
    // Formatear números grandes
    const formatCurrency = (value: number) => 
      new Intl.NumberFormat('es-CO', { 
        style: 'currency', 
        currency: 'COP', 
        maximumFractionDigits: 0 
      }).format(value);
    
    // Mensaje detallado
    mensaje += `\n• Ventas diarias: ${formatCurrency(ventaDiariaActual)} (${formatCurrency(ventaDiariaAnterior)} mes ant.)`;
    mensaje += `\n• Proyección mensual: ${formatCurrency(proyeccionMensual)}`;
    mensaje += `\n• Eficiencia utilidad: ${eficienciaUtilidad.toFixed(1)}% (${eficienciaUtilidadAnterior.toFixed(1)}% mes ant.)`;
    
    return {
      status,
      diferenciaPorcentual,
      ventaDiariaActual,
      ventaDiariaAnterior,
      proyeccionMensual,
      proyeccionUtilidad,
      mensaje,
      porcentajeCumplimientoDiario,
      porcentajeCumplimientoDiarioAnterior,
      eficienciaUtilidad,
      eficienciaUtilidadAnterior
    };
  }