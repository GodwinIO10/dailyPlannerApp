import React, { useEffect } from 'react'
import { useDispatch } from "react-redux" 
import { useNavigate } from "react-router-dom"
import { deletePlan } from "../features/plans/planSlice"


function PlanItem({plan}) {
    const dispatch = useDispatch()


    return (
        <div className="plan">
            <h4>
                {plan.text} <button onClick={() => dispatch(deletePlan(plan._id))} className="close">X</button>
            </h4>
            <h5>{new Date(plan.createdAt).toLocaleString('en-US')}</h5>
        </div>
    )
}


export default PlanItem
