function main()
{
   var dashletResizer = {
      id : "DashletResizer",
      name : "Alfresco.widget.DashletResizer",
      initArgs : ["\"" + args.htmlid + "\"", "\"" + instance.object.id + "\""],
      useMessages: false
   };

   var meetupQuestionnaires = {
      id : "MeetupQuestionnaires",
      name : "Meetup.Questionnaires"
   };
   model.widgets = [meetupQuestionnaires, dashletResizer];
}

main();
