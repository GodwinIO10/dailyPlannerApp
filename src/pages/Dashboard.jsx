import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import PlanForm from "../components/PlanForm"
import PlanItem from "../components/PlanItem"
import Spinner from "../components/Spinner"
import { getPlans, reset } from "../features/plans/planSlice"

/*
<section className="content"></section>  // originally placed between <PlanForm /> & </section>
*/

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth) // user is destructured from the auth part of the state (from authSlice)
    const { plans, isLoading, isError, message } = useSelector((state) => state.plans) // plans is name specified in the store

    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        if(!user) {
            navigate("/login")
        } 

        dispatch(getPlans()) // plans fetched from backend and put inside the destructured plans of state.plans above.

        return () => { // to reset state on unmount ie, clear the plans when exiting dashboard
            dispatch(reset())
        }

    }, [user, isError, message, navigate, dispatch])

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>My Plans Dashboard</p><br />

                {plans.length > 0 ? (
                    
                    <div className="plans">
                        {plans.map((plan) => (
                            <PlanItem key={plan._id} plan={plan} />
                            
                        ))}
                        <br /><h5>You have set {plans.length} plan(s)</h5>
                
                    </div>
                ) : (  <h5>You haven't set any plan</h5>)
                }<br />
                <PlanForm />
            </section>
        </>
    )
}

export default Dashboard

