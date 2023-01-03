import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
import "./CreditCards.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const handleAddCard = async (e, user) => {
      e.preventDefault();
      console.log("handle on add submit");
      try {
        const userRef = projectFirestore.collection("users").doc(user.uid);
        const doc = await userRef.get();
        console.log(user.uid, doc.data());
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data().cards);
        }
        const cards = doc.data().cards;
        if (!cards) {
          await projectFirestore
            .collection("users")
            .doc(user.uid)
            .update({
              cards: [this.state],
            });
        } else {
          await projectFirestore
            .collection("users")
            .doc(user.uid)
            .update({
              cards: [...cards, this.state],
            });
        }
      } catch (err) {
        console.log("Add Card Error: ", err.message);
      }
    };
    return (
      <HookWrapper
        // process Hook return value
        render={(user) => (
          <div id="PaymentForm">
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
            <form onSubmit={(e) => handleAddCard(e, user)}>
              <input
                type="tel"
                name="number"
                maxLength={16}
                minLength={16}
                placeholder="Card Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                type="expiry"
                name="expiry"
                maxLength={4}
                minLength={4}
                placeholder="Expiry Date"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                type="cvc"
                name="cvc"
                placeholder="CVC"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <button className="btnwide">Add</button>
            </form>
          </div>
        )}
      />
    );
  }
}
function HookWrapper({ render }) {
  const { user } = useAuthContext();
  console.log("USER: ", user.uid);
  return render(user);
}
export default function CreditCards() {
  const [cards, setCards] = useState([]);

  const [pageState, setPageState] = useState(0);
  console.log("CardsCard");
  const { user } = useAuthContext();

  /**
   * This function gets the cards object of the user from the database.
   */
  const getCards = async () => {
    const userRef = projectFirestore.collection("users").doc(user.uid);
    //console.log(userRef);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data().cards);
    }
    setCards(doc.data().cards);
  };

  /**
   * Every time the page loads, this function gets called.
   * The getCards function is inside for getting the current
   * cards each time.
   */
  useEffect(() => {
    getCards();
  }, []);

  /**
   * This function deletes the e th card from the cards array
   * then updates the cards array for the user in the database
   * @param {number} e the index of the deleted card object
   */
  const handleButtonDelete = async (e) => {
    //e.preventDefault();
    console.log("handle delete button");
    try {
      cards.splice(e, 1);
      await projectFirestore.collection("users").doc(user.uid).update({
        cards: cards,
      });
      console.log("handle on delete end");
      setPageState(0);
      getCards();
    } catch (err) {
      console.log("Delete Card Error: ", err.message);
    }
  };

  return (
    <>
      {pageState === 0 && (
        <div>
          <h1 align="center">Cards</h1>
          <ul>
            {cards &&
              cards.map((card, i) => (
                <div key={i} className="wrapper-card">
                  <div className="first">
                    <h4>{card.name}</h4>
                    <h3>{card.number}</h3>
                  </div>
                  <div className="second">
                    <button
                      onClick={(e) => {
                        handleButtonDelete(i);
                      }}
                      className="deletebutton"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </ul>
          <button
            onClick={(e) => {
              setPageState(1);
            }}
            className="btnwide"
          >
            Add Card
          </button>
        </div>
      )}
      {pageState === 1 && (
        <div className="formwrap">
          <h4 align="center">Add Card</h4>
          <PaymentForm></PaymentForm>
        </div>
      )}
    </>
  );
}
