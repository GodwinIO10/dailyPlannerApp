import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { createPlan } from "../features/plans/planSlice"


function PlanForm() {
    const [text, setText] = useState("")

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createPlan({text}))
        setText("")
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                 <label htmlFor="text">Enter New Plan</label>
                    <input 
                        type="text" 
                        name="text" 
                        id="text" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button className="btn btn-block"
                        type="submit">
                            Add Plan
                    </button>
                </div>
            </form>
        </section>
    )
}

export default PlanForm
