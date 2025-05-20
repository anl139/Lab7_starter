Andrew Lam
1) Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.
   1) I would run the end‑to‑end tests within a GitHub Action that triggers whenever code is pushed. the reason being is that with it being run everytime the code is pushed the test created would run everytime so any errors are caught before it fully merges, ensures that it works on all devices and is fully automatic ensuring max productivity on other task
2) Would you use an end to end test to check if a function is returning the correct output? (yes/no)
   1) No as the main point of using end to end test is to test whole user flow in which it would test a series of task a user would go through on your website/app. In which to test a single functions output we would do unit test since those are supposed to test small parts of the websites in which testing if a button does a certain thing is in its field
3) What is the difference between navigation and snapshot mode?
   1) The difference between the two is that snapshot provides a brief summary of performance and typically only gets an instance of the website,grading it based on it. While navigation will reload the page and will audit the entire page after the load.In which the navigation provides a percentage score to performance, accessibility, best practice and SEO and a large summary of diagonistics and improvements to be made, while snapshot provides a scale of ten and only provides a small diagonistics
4)  Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.
    1)  Based on the results some things to improve are
        1)  Properly sizing the images to save resources being used
        2)  to add a  <meta name="viewport"> tag with width or initial-scale to ensure optimizations on mobile devices and prevents 300 ms delay on user inputs
        3)  Create the images in formats like WebP and AVIF instead of jpeg and png since they have better compressions allowing for faster downloads and less data consumption




