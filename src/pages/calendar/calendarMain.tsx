import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { useModal } from "../../hooks/useModal";
import { StatusVisitEnum, useVisitsQuery, Visit } from "../../domain/graphql";
import dayjs from "dayjs";
import { useUser } from "../../context/UserContext";
import { ViewVisitModal } from "./ViewVisitModal";
import { CreateVisitModal } from "./CreateVisitModal";
import PageMeta from "../../components/common/PageMeta";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    visitData: Visit;
  };
}

const statusToColor = {
  [StatusVisitEnum.Canceled]: "danger",
  [StatusVisitEnum.Confirmed]: "success",
  [StatusVisitEnum.Programmed]: "warning",
  [StatusVisitEnum.Realized]: "primary",
  [StatusVisitEnum.Reprogrammed]: "info",
};

export const CalendarMainPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Visit | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { user } = useUser();
  
  // Estados para el rango de fechas
  const [dateRange, setDateRange] = useState({
    start: dayjs().startOf("month").format("YYYY-MM-DD 00:00:00"),
    end: dayjs().endOf("month").format("YYYY-MM-DD 23:59:59"),
  });

  // Estado para la fecha seleccionada al crear evento
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Modales
  const viewModal = useModal();
  const createModal = useModal();

  // Consulta de visitas
  const { data, loading, refetch } = useVisitsQuery({
    variables: {
      where: {
        dateVisit: { _between: [dateRange.start, dateRange.end] },
        user: { _eq: user?.id }
      },
      pagination: { skip: 0, take: 9999999 },
    },
    fetchPolicy: "network-only" // Asegura que siempre se haga nueva solicitud
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
          calendar: statusToColor[visit.status],
          visitData: visit
        },
      }));
      //@ts-ignore
      setEvents(transformedEvents);
    }
  }, [data]);

  const handleViewChange = (view: string, date: Date) => {
    let start, end;
    
    if (view === "dayGridMonth") {
      start = dayjs(date).add(1, 'month').startOf("month").format("YYYY-MM-DD 00:00:00");
      end = dayjs(date).add(1, 'month').endOf("month").format("YYYY-MM-DD 23:59:59");
    } else if (view === "timeGridWeek") {
      start = dayjs(date).startOf("week").format("YYYY-MM-DD 00:00:00");
      end = dayjs(date).endOf("week").format("YYYY-MM-DD 23:59:59");
    } else {
      start = dayjs(date).format("YYYY-MM-DD 00:00:00");
      end = dayjs(date).format("YYYY-MM-DD 23:59:59");
    }

    setDateRange({ start, end });
    // Forzar recarga de datos para el nuevo rango
    refetch({
      where: {
        dateVisit: { _between: [start, end] },
        user: { _eq: user?.id }
      },
      pagination: { skip: 0, take: 9999999 },
    });
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const selectedDateTime = dayjs(selectInfo.start).format("YYYY-MM-DDTHH:mm:ss");
    setSelectedDate(selectedDateTime);
    createModal.openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event.extendedProps.visitData);
    viewModal.openModal();
  };

  return (
    <>
      <PageMeta
        title="Calendario"
        description="Calendario de visitas y eventos"
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            datesSet={(arg) => handleViewChange(arg.view.type, arg.start)}
            locale="es"
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día"
            }}
          />
        </div>

        {/* Modales */}
        <ViewVisitModal 
          isOpen={viewModal.isOpen} 
          onClose={viewModal.closeModal}
          visit={selectedEvent || undefined}
          key={selectedEvent?.id}
        />

        <CreateVisitModal
          key={selectedDate}
          onOpen={createModal.openModal}
          isOpen={createModal.isOpen}
          onClose={createModal.closeModal}
          initialDay={selectedDate}
        />
      </div>
    </>
  );
};

const renderEventContent = (eventInfo: any) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText}</div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
    </div>
  );
};