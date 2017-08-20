# Object Oriented Programming Projects Web

Object Oriented Programming project gallery

## Open a pull request to contribute your work

Requisites: [Hugo](https://gohugo.io/getting-started/installing/), [git]() and a github user account ([Sign-up here](https://github.com/join?source=header-home) if you have't do so)

Procedure:

1. [Fork](https://help.github.com/articles/fork-a-repo/) me and you will end up with a ```https://github.com/<username>/projects``` repository
1. Clone your forked repository:
 ```sh
 $ git clone https://github.com/<username>/projects
 ```
1. Create a topic branch where to add your project
 ```sh
 $ git checkout -b <project-branch>
 ```
1. Add your project info

1. Generate the website locally

 ```sh
 $ hugo
 ```
 
1. Test your changes locally

 ```sh
 $ hugo server
 ```

the local site will be rendered by default at [http://localhost:1313](http://localhost:1313). Check that your project is found there

1. Commit your changes 

 ```sh
 $ git commit -am'<project-name> by <authors-list> added'
 ```

1. Open a [pull request](https://help.github.com/articles/creating-a-pull-request/)
