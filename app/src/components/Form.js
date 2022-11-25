import React, { useState } from 'react';

const Form = (props) => {

    const [name, setName] = useState('');

    const handleChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);

    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            //do nothing!  
        }
        else if (name) {
            console.log(name);
            //postMatch(name);
            props.addTask(name);
        }
        setName('');
    }
    return (
        <form onSubmit={HandleSubmit}>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="label__ls nav-link active" href="#">What needs to be done?</a>
                </li>
            </ul>

            <div className="input-group mb-3">
                <input type="text" className="form-control" id="new-todo-input" name="text" autoComplete="off" value={name} onChange={handleChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Add</button>
                    </div>
            </div>


        </form>
    )
};

export default Form;