#TouchPaper#
TouchPaper is a software which detects drawn buttons and touches at them using phone camera.
It was developed during hackathon [WTH.BY](wht.by).

##How does it work##

![Project scheme](/media/scheme.png "Project scheme")

1. Put the glass on the two stacks of books.
2. Put the list of white paper on the glass.
3. Put the phone under the glass. Camera of the phone must capture the paper.
4. Checkout the code.
5. Run `npm install`
6. Run the server `node index.js`
7. Open the page [http://yourhost:8080/detector](http://yourhost:8080/detector) on the phone. Use your IP-address instead of yourhost if you're using it in the local network.
8. Draw the 4 rectangle buttons on the piece of paper using marker.
9. Open the demo page [http://yourhost:8080/demo/demo_piano.html](http://yourhost:8080/demo/demo_piano.html) on your laptop.
10. Wait 5 seconds and touch buttons to play music.

Here are more details (in Russian):
[http://habrahabr.ru/post/242301/](http://habrahabr.ru/post/242301/)