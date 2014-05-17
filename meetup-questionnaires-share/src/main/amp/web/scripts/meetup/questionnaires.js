if (typeof Meetup == "undefined" || !Meetup)
{
   var Meetup = {};
}

(function()
{
   var Dom = YAHOO.util.Dom;

   Meetup.Questionnaires = function(htmlId)
   {
      Meetup.Questionnaires.superclass.constructor.call(this, "Meetup.Questionnaires", htmlId, ["button", "container"]);
      return this;
   };

   YAHOO.extend(Meetup.Questionnaires, Alfresco.component.Base,
   {
      onReady: function()
      {
         this.widgets.newRowButton = Alfresco.util.createYUIButton(this, "chooseWinnerButton", this.onChooseWinner);
         Alfresco.util.Ajax.jsonGet(
         {
            url: Alfresco.constants.PROXY_URI + "api/meetup/winner?sitename=" + Alfresco.constants.SITE,
            successCallback:
            {
               fn: function (resp, obj)
               {
                  Dom.get(this.id + "-totalNum").innerHTML = resp.json.total;
               },
               scope: this
            }
         });
      },

      onChooseWinner: function(e, p_obj)
      {
         Alfresco.util.Ajax.jsonGet(
         {
            url: Alfresco.constants.PROXY_URI + "api/meetup/winner?sitename=" + Alfresco.constants.SITE,
            successCallback:
            {
               fn: function (resp, obj)
               {
                  Alfresco.util.PopupManager.displayPrompt(
                  {
                     title: this.msg("meetup.questionnaires.winnerIs"),
                     text: resp.json.name + " (" + resp.json.company + ")",
                     buttons:
                     [ {
                        text: this.msg("button.ok"),
                        handler: function()
                        {
                           this.destroy();
                        }
                     }]
                  });
               },
               scope: this
            }
         });
      }
   });
})();


