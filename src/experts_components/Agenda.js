import React from 'react';

const Agenda = () => {
  const agendaItems = [
    {
      date: "17 NOV, FRI",
      time: "6:15pm - 6:45pm",
      interview: "Interview with Anna Bailey",
      job: "Head of Finance"
    },
    {
      date: "25 NOV, SAT",
      time: "3:02am - 3:32am",
      interview: "Interview with Ilayda Finke",
      job: "HR Generalist"
    },
    {
      date: "28 NOV, TUE",
      time: "1:02am - 1:32am",
      interview: "Interview with Alayna Jakubowski",
      job: "Web Developer"
    },
    {
      date: "29 NOV, WED",
      time: "1:32am - 2:02am",
      interview: "Interview with Charlie Franecki",
      job: "Machine Learning Engineer"
    },
    {
      date: "29 NOV, WED",
      time: "9:02pm - 9:32pm",
      interview: "Interview with Zackery Dibbert",
      job: "Web Developer"
    },
    {
      date: "29 NOV, WED",
      time: "10:02pm - 10:32pm",
      interview: "Interview with Aric Price",
      job: "Senior Java Engineer"
    }
  ];

  return (
    <div className="w-full p-4">
      <div className="border-b pb-2 mb-4">
        <button className="mr-4 border-b-2 border-blue-500 font-semibold">My Agenda</button>
        
      </div>

      {agendaItems.map((item, index) => (
        <div key={index} className="flex items-center mb-6">
          <div className="w-1/5 text-center">
            <div className="text-lg font-semibold">{item.date.split(',')[0]}</div>
            <div className="text-sm">{item.date.split(',')[1]}</div>
          </div>
          <div className="w-3/5">
            <div className="text-blue-600">{item.interview}</div>
            <div className="text-gray-500">for the {item.job} job</div>
          </div>
          <div className="w-1/5 text-right">
            {item.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Agenda;
