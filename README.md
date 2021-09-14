<h1 align='center'>Pizza Store</h1>
</br>
<p>A simple online pizza shop that has a database where all the products of the shop are stored as well as the shopping cart.</p>
</br>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p>
  This project (my first full stack project) was built to practice building web applications from scratch and get familiarized with the use of databases.
  It contains the functionality to add/remove pizzas to the cart.
  In the path '/admin' it is possible to create new pizzas through a simple form as well as edit/delete the already uploaded ones.
</p>

![Pizza Store Screen Shot][main page]


### Built With

<a href="https://reactjs.org" target="_blank">
  <img style="margin: auto;" src="https://raw.githubusercontent.com/sachinverma53121/sachinverma53121/master/icons/react.png" alt=react width="50" height="50"/>
</a>
<a href="https://react-bootstrap.github.io/">
  <img style="margin: auto;" src="https://raw.githubusercontent.com/sachinverma53121/sachinverma53121/master/icons/bootstrap.png" alt=bootstrap width="50" height="50"/>
</a>
<a href="https://www.mongodb.com/">
  <img style="margin: auto;" src="https://raw.githubusercontent.com/sachinverma53121/sachinverma53121/master/icons/mongo.png" alt=mongoDB width="50" height="50"/>
</a>
<a href="https://expressjs.com/">
  <img style="margin: auto;" src="https://raw.githubusercontent.com/sachinverma53121/sachinverma53121/master/icons/express.png" alt=express width="50" height="50"/>
</a>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```


### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:Lnferrari/pizza-store-fullstack.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
<!-- 3. Enter your API in `.env` file
   ```JS
   const REACT_APP_API_KEY = 'ENTER YOUR API';
   ```
-->



<!-- USAGE EXAMPLES -->
## Usage

  Clicking on **ADD TO CART** button of the desired pizza it will be added to your cart. To add more pizzas of the same type either press **ADD TO CART** again or the **+** button shown in the cart (as many times as you wish). By clicking the **-** will reduce the number of items of that type by 1 and when there is only 1 left, instead of the **-** button a trash icon will be displayed, which has the functionality to remove the item from the cart.
  
  The __NavBar__ has a search field -only available on screens larger than 768px- which allows you to filter pizzas by name. For devices with a smaller width a shopping cart icon is displayed.
  
  In the path '/admin' it is possible to create new pizzas through a simple form as well as edit/delete the already uploaded ones.
</br>

![Pizza Store][screenshot 1]
![Pizza store][screenshot 2]



<!-- ROADMAP -->
## Roadmap

See the [open issues][issues] for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [React Router DOM](https://reactrouter.com/)
* [axios](https://axios-http.com/)
* [Vercel](https://vercel.com/)
* [React Icons](https://react-icons.github.io/react-icons/)
* [mongoose](https://mongoosejs.com/)
* [faker](https://marak.github.io/faker.js/)



<!-- CONTACT -->
## Contact

Lucas Ferrari - [Linkedin][linkedin] - ln.ferrari@hotmail.com

Project Link: [Pizza store full-stack](https://pizza-store-olive.vercel.app/)



<!-- LICENSE -->
## License

Distributed under the MIT License.



<!-- MARKDOWN LINKS & IMAGES -->
[main page]: ./assets/main-pizzeria.png
[screenshot 1]: ./assets/pizzeria-1.png
[screenshot 2]: ./assets/pizzeria-2.png
[issues]: https://github.com/Lnferrari/pizza-store-fullstack/issues
[linkedin]: https://www.linkedin.com/in/lucasferrari1/
