import { useState } from "react";
const books = [
  {
    id: 0,
    name: "Atomic Habits",
    src: "https://m.media-amazon.com/images/I/41Qw7f4Bk8L._AC_UL50_.jpg",
    price: 15,
  },
  {
    id: 1,
    name: "Rich dad Poor Dad",
    src: "https://m.media-amazon.com/images/I/81BE7eeKzAL._AC_UL50_.jpg",
    price: 20,
  },
  {
    id: 2,
    name: "Do it Today",
    src: "https://m.media-amazon.com/images/I/61ePdebDa7L._AC_UL50_.jpg",
    price: 30,
  },
];

function Bookshelf() {
  const [items, setItems] = useState(books);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleSearch(e) {
    const newArr = items.filter((item, e) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );

    setItems(newArr);
    setName("");
  }
  function handleCart(id) {
    // 1. Adding to cart
    const bookToAdd = items.find((item) => item.id === id);

    // Updating the car.
    setCart([...cart, bookToAdd]);

    // 2. filter so that we can remove
    const newArr = items.filter((item) => item.id !== id);
    setItems(newArr);
  }

  function Sum() {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price;
    }

    return sum;
  }

  function handleRemove(id) {
    const newArr = cart.filter((item) => item.id !== id);
    setCart(newArr);
    const newBookShelf = cart.find((item) => item.id === id);
    setItems([...items, newBookShelf]);
  }

  return (
    <div>
      <h2>My Book Store</h2>
      {items.length === 0 && <h3>No books left!</h3>}
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="type a book"
          value={name}
          onChange={handleName}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {items.length === 0 && <span>No result found</span>}

      <ul>
        {items.map((book) => (
          <li key={book.id}>
            <img src={book.src} alt={book.name} />
            <div>
              {book.name} - {book.price} AUD
              <div>
                <button onClick={() => handleCart(book.id)}>Add to Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <h2>
        Cart : {cart.length} Total Price: {Sum()}
      </h2>
      {cart.length === 0 && <h3>Your cart is empty. Add items.</h3>}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={item.src} alt="" />
            <div>
              {item.name} - {item.price} AUD
              <div>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Bookshelf;
