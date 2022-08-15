import React, { useEffect, useState } from "react";
import "./AvailableMeals.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    //Fetch returns a promise ,The function you passed inside the useeffect it should not return a promise,it may return a cleanup function.  cleanup function should run synchronous

    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-676d5-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const responseData = await response.json();
      //transform object into array
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setmeals(loadedMeals);
      setIsLoading(false);
    };
    //fetctMeals is async function,it always return a promise,either promise can be accepted and rejected  here we can not use try and catch

    // try{
    //   fetchMeals();
    // }catch(error){
    //   setIsLoading(false);
    //   setHttpError(error.message)
    // }
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  console.log("httpError", httpError);

  if (httpError) {
    return <h3 className="mealsError">{httpError}</h3>;
  }
  if (isLoading) {
    return (
      <section className="mealsloading">
        <p>Loading.....</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className="meals">
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
