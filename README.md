meetup-questionnaires
=====================

Creating, printing, scanning, uploading questionnaires to Alfresco and selecting a random winner. 

This project contains 4 parts:

1. *create-questionnaires* folder contains bash-scripts and html template of the questionnaire. Use it to generate individual questionnaires for the meetup participants with qr-codes, that contains name, last name, company name and email of the person.

2. *android-app* folder is an ADT project that can be installed to your phone to scan QR-codes on the filled questionnaires and to send the data to Alfresco.
*If you are a good Android developer, please, do not be angry at me, it's my first Android app, so the quality is not very good.*

3.  *upload-questionnaires* is an Alfresco extension that can be built using *ant*. It gets the data from the android app and adds participants data to the data list "Questionnaire" on the site.

4. ???

This code is rather ugly. And you cannot use bash-scripts if you are using Windows.
I know that using a box with filled questionnaires (papers) from which you can pull the random questionnaire is easier to implement. We implemented this project to show to the Alfresco Moscow Meetup participants how easy they can pass data to Alfresco and extend Share UI. Do not hesitate to fork this project and to send me pull requests with your fixes or improvements.

#Required software
Linux or MacOS. For different versions of Shell changes in scripts may be needed. I use fedora 19 and it works fine for me.
While generating questionnaires we use **sed**, **curl**, **wkhtmltopdf** and **lp** tools.

To generate individual questionnaires for all meetup participants you also need a list of participants (name, last name, company and email). We use a list in *.CSV* format. You can find a sample in *create-questionnaires* folder of the project. Specify all bash-scripts for your case.

To build Alfresco extensions we use **ant**. To use QR-code scanner install *Barcode Scanner*. Also we used **Alfresco 4.2.1** to upload questionnaires and select a winner and **Android 4.1, 4.2** to scan questionnaires.

#How it works

**Creating questionnaires**

1. Generate QR-codes using *create-questionnaires/1-generate-qr-code.sh*
2. Complete template, do not touch a string with *<h2>Participant: </h2>* and image tag, you need them to insert the participant name and a QR-code. If you midify this strings, update the particular script to match new template
3. Execute *create-questionnaires/2-create-questionnaires.sh* to create a PDF
4. Print pdf-s using *create-questionnaires/3-print.sh* (we printed them on A5 format)

**Processing**
1. Compile and install *upload-questionnaires* jar-file to Alfresco Repo
2. Compile and install android app
3. Create a site in Alfresco for the meetup and create a datalist called "questionnaires"
4. Start android app, enter following settings: Alfresco server URL, username, password, site name
5. Scan qr-codes on the questionnaires that are filled
6. Check the datalist

**Select a winner**
1. Install a jar-file to Alfresco
2. See the buton "Select the winner" in the toolbar on the datalist page
3. Click a button

**ToDo:**
1. Make a photo of the full questionnaire after qr-code scanning, upload the photo (or two) to Alfresco and attach these file to the datalist item.
2. Refactor android app code.
3. Use Alfresco to create questionnaires

