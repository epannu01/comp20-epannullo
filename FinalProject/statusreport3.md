Status Report 3
1) This week we were able to finally get the YouTube API working with Ming's example as a template. We are now able to load in 10 videos and populate iframes. 
2) We struggled a lot to get the YouTube API to work and figuring out what is possible now that our group is only 3 people.
3) Our goals for next week is to improve on the style of the website- maybe center the videos and have it resize nicely when the size of the browser window is changed. We still would like to implement the voting feature now that we can use the API, but we understand this may be too much considering there are only a little over a week left. 

# Comments by Ming
* What comes to mind to do voting: use video ID.  Create two buttons for each video: yay and nay with each video with <videoid>-yay, <videoid>-nay.  Click on video => triggers some HTTP post, store the video-yay or video-nay that was clicked into database.  With many clicks, you can get a good list of votes stored.
