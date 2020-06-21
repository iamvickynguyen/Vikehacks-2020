import React, { useState } from 'react';

const Form = () => {
    const [catState, setCatState] = useState([
        { name: '', age: '' },
    ]);

    return (
        <form>
            <label htmlFor="owner">Owner</label>
            <input type="text" name="owner" id="owner" />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
            />
            <input type="button" value="Add New Cat" />
            {
                catState.map((val, idx) => {
                    const catId = `name-${idx}`;
                    const ageId = `age-${idx}`;
                    return (
                        <div key={`cat-${idx}`}>
                            <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
                            <input
                                type="text"
                                name={catId}
                                data-idx={idx}
                                id={catId}
                                className="name"
                            />
                            <label htmlFor={ageId}>Age</label>
                            <input
                                type="text"
                                name={ageId}
                                data-idx={idx}
                                id={ageId}
                                className="age"
                            />
                        </div>
                    );
                })
            }
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;