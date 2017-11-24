# Object Oriented Programming Projects Web

Object Oriented Programming project gallery

## Open a pull request to contribute your work

Note that you will need a ```github``` user account ([sign-up here](https://github.com/join?source=header-home) if you haven't do so), and to install [git](https://git-scm.com/) and [Hugo](https://gohugo.io/getting-started/installing/) for the below procedure to work:
 
1. [Fork](https://help.github.com/articles/fork-a-repo/) me and you will end up with a ```https://github.com/<username>/projects``` repository

2. Clone your forked repository:

	 ```sh
	 $ git clone https://github.com/<username>/projects
	 ```
 
3. Create a topic branch where to add your project

	 ```sh
	 $ git checkout -b <project-branch>
	 ```

4. Add your project info:

	1. Create a copy of the ```template``` file found at ```content/project/``` and rename it to ```YOUR-PROJECT-NAME.md```.

	2. Fill out the file in capital letters according to your project information.

        > Add the needed libraries to ```static/js/```.

        > Edit the _type_ field as ```processing``` for a Processing implementation, ```p5.js``` for p5.js, or ```image``` in any other case.

        > Add the tags that better describe your project. Note that tags should be present at the ```data/tags.toml``` array. If they are not, just add them there.
	
	3. Add a ```YOUR-PROJECT-NAME.png``` image to ```static/images/```.
	
	4. Create the folder ```static/src/YOUR-PROJECT-NAME/``` and add the source files as: ```YOUR-PROJECT-NAME.EXTENSION``` (for ```processing``` use EXTENSION=pde, for ```p5.js``` use EXTENSION=js, and for ```image``` use EXTENSION=png).
	
		> If you have multiple source files merge into a single one.
	
	5. Move assets to a new folder with the name of your project (sounds should be placed at ```static/sounds/```, images in ```static/images```) and configure them in your source code.

5. Generate the website locally

	 ```sh
	 $ hugo
	 ```
 
6. Test your changes locally

 	```sh
 	$ hugo server
 	```

	the local site will be rendered by default at [http://localhost:1313](http://localhost:1313). Check that your project is found there

7. Commit your changes 

	 ```sh
	 $ git commit -am'<project-name> by <authors-list> added'
	 ```

8. Open a [pull request](https://help.github.com/articles/creating-a-pull-request/). Once it's approved your project will be available at the course project webpage.

