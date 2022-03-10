import React, { useEffect, useState } from 'react'
import classes from './BooksList.module.css'
import Book from './Book';
import Card from '../Commons/Card';

const BOOKS = [
  {
    id: "book1",
    name: "THE OLD MAN AND THE SEA",
    description:
      "A story of Santiago, an aging Cuban fisherman who struggles with a giant marlin far out in the Gulf Stream off the coast of Cuba",
    author: "Ernest Hemingway",
    price: 10.57,
  },
  {
    id: "book2",
    name: "THE GREAT GATSBY",
    description:
      "Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    author: "F.Scott Fitzgerald",
    price: 12.97,
  },
  {
    id: "book3",
    name: "THE LITTLE PRINCE",
    description:
      "A young prince who visits various planets in space, including Earth, and addresses themes of loneliness, friendship, love, and loss.",
    author: "Antoine de Saint-Exupery",
    price: 15.55,
  },
  {
    id: "book4",
    name: "THE MYTH OF SISYPHUS",
    description:
      'Camus introduces his philosophy of the absurd. The absurd lies in the juxtaposition between the fundamental human need to attribute meaning to life and the "unreasonable silence" of the universe in response.',
    author: "Alber Camus",
    price: 16.92,
  },
];

const BooksList = () => {
    const [books, setBooks] = useState([]);
    // console.log(books);

    // 1. DUMMY BOOKS 확인용
    // const booksList = books.map(book => 
    //     <li key={book.id}>
    //         <h3>{book.name}</h3>
    //         <div>{book.description}</div>
    //         <div>{book.author}</div>
    //     </li>
    // );
    // console.log(booksList);

    // 2. 별도의 <li> 컴포넌트로 분리
    const booksList = books.map(book => 
        <Book 
            key={book.id}
            id={book.id}
            name={book.name}
            description={book.description}
            price={book.price}
            author={book.author}
        />
    )
    // console.log(booksList);

    // 3. firebase를 활용하여 DUMMY Data GET.
    useEffect(() => {
      const fetchBooks = async () => {
        const response = await fetch('https://react-book-order-c2438-default-rtdb.firebaseio.com/books.json');

        console.log(response.ok);

        const responseData = await response.json();
        console.log(responseData);

        // const booksData = [];
        // for (const key in responseData) {
        //   booksData.push({
        //     id: key,
        //     name: responseData[key].name,
        //     description: responseData[key].description,
        //     author: responseData[key].author,
        //     price: responseData[key].price,
        //   });
        // }
        // // console.log(booksData);
        // setBooks(booksData);
      };

      fetchBooks().catch(error => console.log(error));
    }, []);

  return (
    <section className={classes.books}>
      <Card>
        <ul>
            {booksList}
        </ul>
      </Card>
    </section>
  )
}

export default BooksList