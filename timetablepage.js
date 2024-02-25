import './timetablepage.scss';
import { v4 as uuidv4 } from 'uuid';

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    events: JSON.parse(localStorage.getItem("calendarEvents")) || [],
    dateClick: function (info) {
      if (window.activePopup) {
        window.closePopup();
      } else {
        calendar.addEvent({
          id: uuidv4(),
          title: "My event",
          start: info.dateStr,
          extendedProps: { content: "" }
        });
      }
    },
    eventClick: function (info) { //When event is clicked, open popup with relevant event data
      if (window.activePopup) {
        window.closePopup();
      } else {
        var offsets = info.jsEvent.target.getBoundingClientRect();
        var right = offsets.right;
        var top = offsets.top;

        var popup = document.getElementById("event-popup-view");
        document.getElementById("event-popup-view").style.display = "flex";
        popup.style.position = 'absolute'; // Ensure the element is positioned
        popup.style.top = top + 'px';
        popup.style.left = right + 'px';

        popup.querySelector("#titleInput").value = info.event.title;
        popup.querySelector("#contentInput").value = info.event.extendedProps.content;

        popup.querySelector("#startDate").value = info.event.start.toISOString().split('T')[0];
        popup.querySelector("#startTime").value = info.event.start.toISOString().split('T')[1].split(':')[0] + ':' + info.event.start.toISOString().split('T')[1].split(':')[1];
        try {
          popup.querySelector("#endDate").value = info.event.end.toISOString().split('T')[0];
          popup.querySelector("#endTime").value = info.event.end.toISOString().split('T')[1].split(':')[0] + ':' + info.event.end.toISOString().split('T')[1].split(':')[1];
        } catch (error) { console.log("no end date specified") }

        window.activePopup = info;
      }
    }
  });
  calendar.render();

  window.deleteEvent = () => { //Deletes the event then closes window
    calendar.getEventById(window.activePopup.event.id).remove();
    window.closePopup();
    localStorage.setItem("calendarEvents", JSON.stringify(calendar.getEvents()))
  };

  window.closePopup = () => { //Hides popup
    document.getElementById("event-popup-view").style.display = "none";
    window.activePopup = null;
  };

  window.validate = () => {
    var title = document.getElementById("titleInput").value; //Read Values of fields here
    var content = document.getElementById("contentInput").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
    var color = document.getElementById("color").value;

    var startDateTime = startDate + ' ' + startTime
    var endDateTime = endDate + ' ' + endTime

    calendar.getEventById(window.activePopup.event.id).setProp("title", title); //Apply values to event here, all event data is recorded automatically, look at calendar js docs for reference
    calendar.getEventById(window.activePopup.event.id).setExtendedProp("content", content);

    calendar.getEventById(window.activePopup.event.id).setStart(startDateTime);
    calendar.getEventById(window.activePopup.event.id).setEnd(endDateTime);

    calendar.getEventById(window.activePopup.event.id).setProp("backgroundColor", color);

    localStorage.setItem("calendarEvents", JSON.stringify(calendar.getEvents()))

    window.closePopup();
  };
});

window.onresize = function () {
  window.closePopup();
};
window.onscroll = function () {
  window.closePopup();
};
document.getElementsByClassName("fc-scroller fc-scroller-liquid-absolute")[0].onscroll = function () {
  window.closePopup();
}; 

const closeSidebar = () => {
  const s = document.querySelector(':root');
  s.style.setProperty("--width", "0vw");
  s.style.setProperty("--margin", "25vw");
  s.style.setProperty("--display", "none");
  s.style.setProperty("--moveX", "-2.5vw");
  s.style.setProperty("--opacity", "0");
  s.style.setProperty("--moveXTwo", "-2.25vw");
  s.style.setProperty("--rotate", "0deg");
}

const openSidebar = () => {
  const s = document.querySelector(':root');
  s.style.setProperty("--width", "20vw");
  s.style.setProperty("--margin", "35vw");
  s.style.setProperty("--display", "flex");
  s.style.setProperty("--moveX", "0");
  s.style.setProperty("--opacity", "1");
  s.style.setProperty("--moveXTwo", "0vw");
  s.style.setProperty("--rotate", "180deg");
}

var timesClicked = 0;
const sidebar = () => {
  timesClicked++;
  if (timesClicked % 2 == 0) {
    openSidebar()
  }
  else {
    closeSidebar()
  }
}

const printDiv = () => {
  var divContents = quill.root.innerHTML;
  var a = window.open('', '', 'height=500, width=500');
  a.document.write(divContents);
  a.document.close();
  a.print();
}