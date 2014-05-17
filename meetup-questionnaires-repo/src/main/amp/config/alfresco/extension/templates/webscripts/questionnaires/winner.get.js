function main()
{
	if ((!args["sitename"]) || (args["sitename"] == "")) {
		status.setCode(status.STATUS_BAD_REQUEST, "Site name missing");
		return;
	}

	var siteName = args["sitename"];
	var site = siteService.getSite(siteName);

	// TODO: We expect here that (a) container exists, (b) it has only one child, (c) the child is really contact data list
	var cont = site.getContainer("dataLists");
	var dl = cont.children[0];

	model.total = dl.children.length;
	if( model.total == 0 ) {
		status.setCode(status.STATUS_BAD_REQUEST, "No questionnaires found");
		return;
	}

	model.winner = Math.floor( Math.random() * model.total );
	var item = dl.children[model.winner];
	model.person = item.properties["dl:contactFirstName"] + " " + item.properties["dl:contactLastName"];
	model.company = item.properties["dl:contactCompany"]
};

main();
