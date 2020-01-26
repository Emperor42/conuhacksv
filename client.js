  
  //implements a very basic post that we an work with
  //post('/contact/', {name: 'Johnny Bravo'});
  function post(path, params, method='post') {
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
    }

    function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


  function checkh(){
    alert('check')
  };

  function clearh(){
    alert('clear')
  };

  function splith(){
    alert('split')
  };

  document.addEventListener('DOMContentLoaded', function() {
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable

    /* initialize the external events
    -----------------------------------------------------------------*/

    var containerEl = document.getElementById('external-events-list');
    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText.trim()
        }
      }
    });

    //// the individual way to do it
    // var containerEl = document.getElementById('external-events-list');
    // var eventEls = Array.prototype.slice.call(
    //   containerEl.querySelectorAll('.fc-event')
    // );
    // eventEls.forEach(function(eventEl) {
    //   new Draggable(eventEl, {
    //     eventData: {
    //       title: eventEl.innerText.trim(),
    //     }
    //   });
    // });

    /* initialize the calendar
    -----------------------------------------------------------------*/

    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, {

      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      clickble: true,
      drop: function(arg) {
        // is the "remove after drop" checkbox checked?
        if (document.getElementById('drop-remove').checked) {
          // if so, remove the element from the "Draggable Events" list
          arg.draggedEl.parentNode.removeChild(arg.draggedEl);
          post('/test/drop', '{code:info.event().id}');
        }
      },
      eventClick: function(info) {
        //alert('Event: ' + info.event.title);
        //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        //alert('View: ' + info.view.type);
        if(info.view.type!='listWeek'){
        if (confirm("Delete Event?")) {
          info.event.remove();
          if (document.getElementById('drop-remove').checked) {
          // if so, remove the element from the "Draggable Events" list
          document.getElementById('external-events-list').appendChild(arg.draggedEl);
          console.log(info.eventData);
          post('/event/remove', '{code:info.event().id}');
        }
        } else {
          txt = "You pressed Cancel!";
          info.el.style.borderColor = 'red';
        } 
        // change the border color just for fun
        }
      },

    });

    calendar.render();

  });
