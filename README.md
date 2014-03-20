BackboneBirthday
================

Hello, Ameritrade team. Thank you for your time and consideration. I hope you enjoy my app. It is based on the description you provided.

This application has two models: Month and Year.
Month contains a few basic attributes: name (the name of the month), number (the number of the month), and selected (boolean which tells if this is the current birthday month). 
Year is a Collection which holds Month modules. 

Based on your specifications I also included a BirthdayMonth API.

There are two buttons on the screen which fulfill the desired sorting patterns.

If you click the name of the month, it will become the new Birthday month. It will turn red and the BirthdayMonth will send a message via the console of the new selection. 

There is one bug that I know of. When the App starts, you will be able to select the top most month, January. If you select another month, that month will turn red. If you then click January, it will become the BirthdayMonth but it won't turn red. Similarly, if you sort the values and select the top most value, it will not turn red.

Please let me know if you have any questions.

I look forward to speaking with you and, hopefully, working with you.

Thanks again.


-Update 03/17/14
Requirements:
1)	Create a new app (new repo… we want to still be able to see your old code) that shows a blue button for each of the 12 months. Format the view for those 12 months so that they take up a small section of the screen, but are still visible/ useable.
2)	Have a label above each set of buttons that represents the year.
3)	Display a set of buttons for each of the last 1000 years.
4)	Refactor as little as possible in order to make it work.
5)	Remember the point is to see what headaches you run into in expanding on top of your previous design… let the process hurt a bit and keep a list of things you had to change.
6)	When you are both done, we will sit down and you can explain a bit about what you found / learned / what problems and solutions you think you had to use.
7)	Feel free to ask questions any time!

Assumptions:
1) 1000 seperate instances of a months collection (instead of displaying the same collection 1000 times)