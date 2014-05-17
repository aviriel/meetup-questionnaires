<@markup id="js">
   <#-- JavaScript Dependencies -->
   <@script type="text/javascript" src="${url.context}/res/scripts/meetup/questionnaires.js" group="dashlets"/>
</@>

<@markup id="widgets">
   <@createWidgets group="dashlets"/>
</@>

<@markup id="html">
   <@uniqueIdDiv>
      <#assign id = args.htmlid?html>
      <#assign id=args.htmlid>
      <#assign site=page.url.templateArgs.site>

      <div class="dashlet site-data-lists">
         <div class="title">${msg("meetup.questionnaires.header")}</div>
         <div class="body" <#if args.height??>style="height: ${args.height}px;"<#else>style="height: 50px;"</#if>>
            <div class="meetup-questionnaires">
               <div style="padding:5px;">${msg("meetup.questionnaires.total")}: <span id="${id}-totalNum"></span></div>
               <span id="${id}-chooseWinnerButton" class="yui-button yui-push-button">
                  <span class="first-child">
                     <button type="button">${msg("meetup.questionnaires.chooseWinner")}</button>
                  </span>
               </span>
            </div>
         </div>
      </div>
   </@>
</@>
