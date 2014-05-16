function main()
{
   
	if ((json.isNull("name")) || (json.get("name").length() == 0)) {
		status.setCode(status.STATUS_BAD_REQUEST, "Name missing");
		return;
	}
   
	if ((json.isNull("surname")) || (json.get("surname").length() == 0)) {
		status.setCode(status.STATUS_BAD_REQUEST, "Surname missing");
		return;
	}

	if ((json.isNull("company")) || (json.get("company").length() == 0)) {
		status.setCode(status.STATUS_BAD_REQUEST, "Companyname missing");
		return;
	}
   
	if ((json.isNull("email")) || (json.get("email").length() == 0)) {
		status.setCode(status.STATUS_BAD_REQUEST, "Email missing");
		return;
	}

	if ((json.isNull("sitename")) || (json.get("sitename").length() == 0)) {
		status.setCode(status.STATUS_BAD_REQUEST, "Site name missing");
		return;
	}


	var name = json.get("name");
	var surname = json.get("surname");
	var email = json.get("email");
	var company = json.get("company");
	var sitename = json.get("sitename");

	if (name != null && surname != null) {
		var site = siteService.getSite(sitename);
		var cont = site.getContainer('dataLists'); 
/* update to search for the right dataList */
		var List = cont.children[0];
 
		var node = List.createNode(null, "dl:contact");

		node.properties["dl:contactFirstName"] = name;
		node.properties["dl:contactLastName"] = surname;
		node.properties["dl:contactEmail"] = email;
		node.properties["dl:contactCompany"] = company 
		node.save();

		logger.log("Created new contact: " + node.nodeRef);
		logger.log("Property: " + node.properties["dl:contactFirstName"]);
	}

	if ( name==null || surname==null ) {
		status.redirect=true;
		status.code=400;
		status.message="Error"
	}
}

main();

