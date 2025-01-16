document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2024-12-12",
    headerToolbar: {
      start: "",
      center: "title",
      end: "",
    },
    resources: [
      { id: "a", title: "Auditorium A" },
      { id: "b", title: "Auditorium B" },
    ],
    events: [
      {
        id: "1",
        title: "Meeting",
        start: "2024-12-07T10:00:00",
        end: "2024-12-07T12:00:00",
        resourceId: "a",
      },
    ],
    locale: "id",
    timeZone: "Asia/Jakarta",
    slotMinTime: "08:00:00",
    slotMaxTime: "17:00:00",
    height: "auto",
    allDaySlot: false,
  });

  calendar.render();
});
