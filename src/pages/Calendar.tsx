import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";
import { StatusVisitEnum, useVisitsQuery } from "../domain/graphql";
import dayjs from "dayjs"; // Importar dayjs
import TextArea from "../components/form/input/TextArea";
import { useUser } from "../context/UserContext";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}
// Mapeo de estados a colores
const statusToColor = {
  [StatusVisitEnum.Canceled]: "danger", // Rojo
  [StatusVisitEnum.Confirmed]: "success", // Verde
  [StatusVisitEnum.Programmed]: "warning", // Azul
  [StatusVisitEnum.Realized]: "primary", // Amarillo
  [StatusVisitEnum.Reprogrammed]: "info", // Celeste
};
const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [typeVisit, setTypeVisit] = useState("");
  const [cliente, setCliente] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useUser(); // Obtener los datos del usuario
  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  // Obtener el inicio y fin del mes actual con dayjs
  const getStartAndEndOfMonth = () => {
    const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD 00:00:00");
    const endOfMonth = dayjs().endOf("month").format("YYYY-MM-DD 23:59:59");
    return { startOfMonth, endOfMonth };
  };

  // Obtener el inicio y fin de la semana actual con dayjs
  const getStartAndEndOfWeek = (date: Date) => {
    const startOfWeek = dayjs(date).startOf("week").format("YYYY-MM-DD 00:00:00");
    const endOfWeek = dayjs(date).endOf("week").format("YYYY-MM-DD 23:59:59");
    return { startOfWeek, endOfWeek };
  };

  // Obtener el inicio y fin del día actual con dayjs
  const getStartAndEndOfDay = (date: Date) => {
    const startOfDay = dayjs(date).format("YYYY-MM-DD 00:00:00");
    const endOfDay = dayjs(date).format("YYYY-MM-DD 23:59:59");
    return { startOfDay, endOfDay };
  };

  // Estado para almacenar el rango de fechas
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: getStartAndEndOfMonth().startOfMonth,
    end: getStartAndEndOfMonth().endOfMonth,
  });

  // Actualizar el rango de fechas cuando cambia la vista
  const handleViewChange = (view: string, date: Date) => {
    let start: string, end: string;

    switch (view) {
      case "dayGridMonth":
        const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();
        start = startOfMonth;
        end = endOfMonth;
        break;
      case "timeGridWeek":
        const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(date);
        start = startOfWeek;
        end = endOfWeek;
        break;
      case "timeGridDay":
        const { startOfDay, endOfDay } = getStartAndEndOfDay(date);
        start = startOfDay;
        end = endOfDay;
        break;
      default:
        start = dayjs().format("YYYY-MM-DD 00:00:00");
        end = dayjs().format("YYYY-MM-DD 23:59:59");
    }

    setDateRange({ start, end });
  };

  // Consulta de visitas con el rango de fechas
  const { data, loading } = useVisitsQuery({
    variables: {
      where: {
        dateVisit: {
          _between: [dateRange.start, dateRange.end],
        },
        user: {
          _eq: user?.id
        }
      },
      pagination: {
        skip: 0,
        take: 9999999,
      },
    },
  });

  useEffect(() => {
    if (data?.visits) {
      const transformedEvents = data.visits.map((visit) => ({
        id: visit.id,
        title: visit.description.length > 10
        ? `${visit.description.slice(0, 10)}...`
        : visit.description,
        start: visit.dateVisit,
        extendedProps: {
          calendar: statusToColor[visit.status], // Asignar color según el estado
        },
      }));
      setEvents(transformedEvents);
    }
  }, [data]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    const startDate = dayjs(selectInfo.start).format("YYYY-MM-DD 00:00:00");
    const endDate = dayjs(selectInfo.end).format("YYYY-MM-DD 23:59:59");

    setEventStartDate(startDate);
    setEventEndDate(endDate);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const visit = data?.visits.find((data) => data.id == event.id)
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(visit?.description || '');
    setEventStartDate(dayjs(event.start).format("YYYY-MM-DD HH:mm:ss"));
    setEventEndDate(dayjs(event.end).format("YYYY-MM-DD HH:mm:ss"));
    setEventLevel(visit?.status || '');
    setTypeVisit(visit?.type.name || '')
    setCliente(visit?.client.name || '')
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: data?.visits.find((data) => data.id === selectedEvent.id)?.description,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { calendar: eventLevel },
              }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: false, // Ahora los eventos no son de todo el día
        extendedProps: { calendar: eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };

  return (
    <>
      <PageMeta
        title="Calendario"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next addEventButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            datesSet={(arg) => handleViewChange(arg.view.type, arg.start)} // Actualizar el rango de fechas
            customButtons={{
              addEventButton: {
                text: "Add Event +",
                click: openModal,
              },
            }}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                {selectedEvent ? "Ver visita" : "Add Event"}
              </h5>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                Plan your next big moment: schedule or edit an event to stay on
                track
              </p> */}
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Descripción del visita
                  </label>
                  <TextArea
                    value={eventTitle}
                    disabled
                    rows={4} // Aumentar el número de filas
                    className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Estado de la visita
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {Object.entries(StatusVisitEnum).map(([key, value]) => (
                    <div key={key} className="n-chk">
                      <div
                        className={`form-check form-check-${value} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`modal${key}`}
                        >
                          <span className="relative">
                            <input
                              className="sr-only form-check-input"
                              type="radio"
                              name="event-level"
                              value={key}
                              id={`modal${key}`}
                              checked={eventLevel == value}
                              disabled
                              // onChange={() => setEventLevel(key)}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  eventLevel === value ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {key}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Cliente
                </label>
                <div className="relative">
                  <input
                    disabled
                    id="event-type"
                    type="text" 
                    value={cliente} // Formato YYYY-MM-DDTHH:MM
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha de inicio
                </label>
                <div className="relative">
                  <input
                    disabled
                    id="event-start-date"
                    type="datetime-local"
                    value={dayjs(eventStartDate).format("YYYY-MM-DDTHH:mm")} // Formato YYYY-MM-DDTHH:MM
                    onChange={(e) =>
                      setEventStartDate(
                        dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                      )
                    }
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Tipo de visita
                </label>
                <div className="relative">
                  <input
                    disabled
                    id="event-type"
                    type="text" 
                    value={typeVisit} // Formato YYYY-MM-DDTHH:MM
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              {/* <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter End Date and Time
                </label>
                <div className="relative">
                  <input
                    id="event-end-date"
                    type="datetime-local"
                    value={dayjs(eventEndDate).format("YYYY-MM-DDTHH:mm")} // Formato YYYY-MM-DDTHH:MM
                    onChange={(e) =>
                      setEventEndDate(
                        dayjs(e.target.value).format("YYYY-MM-DD HH:mm:ss")
                      )
                    }
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div> */}
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Cerrar
              </button>
              {
                !selectedEvent
                &&
                (<button
                  onClick={handleAddOrUpdateEvent}
                  type="button"
                  className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                >
                  {"Add Event"}
                </button>)
              }
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const renderEventContent = (eventInfo: any) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;