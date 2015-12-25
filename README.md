# Millbrae-Powell BART RTD

Simple and customizable chrome extension that allows you to see real time
departures for BART trains that go from Millbrae to Powell Street or vice versa
while browsing on Google Chrome.

![Demo](https://s3.amazonaws.com/f.cl.ly/items/3P2a2I1U1E0y0R0z0S19/Screen%20Recording%202015-01-09%20at%2011.52%20AM.gif)

## Step by Step Customization

1. Go to [BART API Registration](http://api.bart.gov/api/register.aspx) and obtain an API key.
2. Fork and Clone this repo or download zip file.
3. Open app.js in the file. In the url section of ajax, change the following:
  * Specify the station by changing 'orig=mlbr'. You can see full list of
  station abbreviations [here](http://api.bart.gov/docs/overview/abbrev.aspx).
  * Insert your API key in 'key=insert-key-here'.
4. In the getEtd function, change the first if statement to specify
destinations of your choice. Abbreviations for stations can be found in
the link above.
5. Open Google Chrome and enter chrome://extensions on the address bar.
6. Check the Developer mode on the top-right, and click Load unpacked extension.
7. Select the folder that you cloned or downloaded on the pop-up screen.
8. Use the extension!






# NEW FEATURES 
1. determine which bart station is closes to you. 	
	a. walk time to the closest bart station

2. lets you choose a new location to get off bart. 


