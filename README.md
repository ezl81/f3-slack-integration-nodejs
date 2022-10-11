<h1>NodeJS Backblast to Slack Integration</h1>
<p>SlackBlast JS is a form based way to fill out backblasts.  It integrates with <a href="https://github.com/F3Nation-Community/PAXminer">PaxMiner</a> to allow for pulling in AO’s that are used and formats the backblast in Slack to make it compatible with <a href="https://github.com/F3Nation-Community/PAXminer">PaxMiner</a>.  The user just has to type /backblast into a message window in Slack and the form pops up to allow them to get started.</p>

<img src="https://raw.githubusercontent.com/ezl81/f3-slack-integration-nodejs/main/Screenshots/Screenshot_Form.png" height="75%" width="75%"/>

<h1>**Technical** Setup and Installation</h1>

<p>This is a NodeJS application that runs code against the Slack platform.  Here are some starting resources if you're not familiar with these technologies:
  <ul>
    <li><a href="https://api.slack.com/start/overview#creating">Slack Platform Development</a> - Posts messages and shows the popup in Slack</li>
    <li><a href="https://nodejs.org/en/about/">NodeJS</a> - Used to run events against Slack</li>
    <li><a href="https://heroku.com">Heroku</a> - Hosts the NodeJS code (Free)</li>
  </ul>
</p>

<p>
  The basic process is to create a Slack application and attach the NodeJS code to it.  Once they are talking to each other everything will work. There are a few steps to get to this point.  If you have any questions through this process feel free to reach out <a href="mailto:EzellBrian@gmail.com">to contact me.</a>
</p>
<h1>Walk through steps</h1>
<h3>
  1) Setup Heroku Platform - to host NodeJS code
</h3>
<ol type="A">
  <li>
    Open <a href="https://heroku.com">Heroku</a>.  Some people choose Azure to host their apps but I've had better luck with Heroku.  Mainly, it has been easier to configure and less moving parts to go wrong.  You may need to create an account on here, but everything is free.
  </li>
  <li>
    Once you're signed up and signed in you'll need to go to the dashboard.  From here click the "New" button and choose "Create new app". <br/><img src="" />
  </li>
  <li>
    On the next screen enter a name for the app and click "Add to pipeline..." <br/><img src="" />
  </li>
  <li>
    A dropdown list will appear for pipelines.  Think of these like at the bank when you get the money dispenser at the drive through.  You would put your code into the dispenser and it would get put out on the web.  
  </li>
  <li>
    Under the dropdown click "Create new pipeline" <br/><img src="" />
  </li>
  <li>
    It will give the choice for either staging or production.  Normally you would setup a staging environment before pushing to production, but for this tutorial its quicker to use production.  (This is not the recommended way to do good development so please don't send me hate emails!) <br/><img src="" />
  </li>
  <li>
    Once you click "Create App" it will 
  </li>
</ol>


<h3>2) Setup Slack Application</h3>
<ol type="A">
  <li>
    Open the <a href="https://api.slack.com/">Slack API</a> page and click on "Your Apps".  <img src="https://raw.githubusercontent.com/ezl81/f3-slack-integration-nodejs/main/Screenshots/Screenshot_OpenApps.png" />
  </li>
  <li>
    Click on the button "Create New App" <br/><img src="https://raw.githubusercontent.com/ezl81/f3-slack-integration-nodejs/main/Screenshots/Screenshot_CreateNewApp_Button.png" />
  </li>
  <li>
    A message box comes up.  Select "From an app manifest"<br/> <img src="https://raw.githubusercontent.com/ezl81/f3-slack-integration-nodejs/main/Screenshots/Screenshot_CreateNewApp_FromManifest.png" />
  </li>
</ol>
