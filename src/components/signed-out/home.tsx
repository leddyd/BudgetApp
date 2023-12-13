import React, { useEffect, useRef, useState } from "react"
import { Warning } from "../../utils/formEvents";

function RenderHome() {
    const cards = [
        {"header": "TRACK EXPENSES", "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Blandit massa enim nec dui nunc mattis enim. Odio euismod lacinia at quis risus sed. Augue mauris augue neque gravida in fermentum et. Faucibus vitae aliquet nec ullamcorper sit amet risus. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet purus gravida quis blandit turpis cursus. Lacinia at quis risus sed vulputate odio. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Arcu cursus euismod quis viverra nibh. Integer eget aliquet nibh praesent. Volutpat odio facilisis mauris sit amet massa vitae. Sit amet aliquam id diam maecenas ultricies mi. Vitae justo eget magna fermentum iaculis eu non diam. Lacus sed turpis tincidunt id aliquet risus feugiat. Lectus sit amet est placerat in egestas erat."},
        {"header": "CREATE A PLAN", "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Blandit massa enim nec dui nunc mattis enim. Odio euismod lacinia at quis risus sed. Augue mauris augue neque gravida in fermentum et. Faucibus vitae aliquet nec ullamcorper sit amet risus. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet purus gravida quis blandit turpis cursus. Lacinia at quis risus sed vulputate odio. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Arcu cursus euismod quis viverra nibh. Integer eget aliquet nibh praesent. Volutpat odio facilisis mauris sit amet massa vitae. Sit amet aliquam id diam maecenas ultricies mi. Vitae justo eget magna fermentum iaculis eu non diam. Lacus sed turpis tincidunt id aliquet risus feugiat. Lectus sit amet est placerat in egestas erat."},
        {"header": "PAY LESS", "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Blandit massa enim nec dui nunc mattis enim. Odio euismod lacinia at quis risus sed. Augue mauris augue neque gravida in fermentum et. Faucibus vitae aliquet nec ullamcorper sit amet risus. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet purus gravida quis blandit turpis cursus. Lacinia at quis risus sed vulputate odio. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Arcu cursus euismod quis viverra nibh. Integer eget aliquet nibh praesent. Volutpat odio facilisis mauris sit amet massa vitae. Sit amet aliquam id diam maecenas ultricies mi. Vitae justo eget magna fermentum iaculis eu non diam. Lacus sed turpis tincidunt id aliquet risus feugiat. Lectus sit amet est placerat in egestas erat."},
    ]
    
    const cardRefs = cards.map(() => useRef<HTMLDivElement>(null))

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && cardRefs[index].current) {
                entry.target.classList.add('fade-in')
                observer.unobserve(entry.target)
            }
        });
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: .25
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions)

        cardRefs.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current)
            }
        });

        return () => {
            observer.disconnect()
        };
    }, [cardRefs]);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [warningMsg, SetWarningMsg] = React.useState<string | null>(null);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log({firstName, lastName, email, password, confirmPassword});

        if (password !== confirmPassword) {
            SetWarningMsg('Passwords do not match');
        }
    };

    return (
        <div id="home">
            <div id="home-header-container">
                <div>
                    <p>PERSONAL FINANCE WITH WEGONBUDGET</p>
                    <h1>MAKE A CHANGE</h1>
                </div>
            </div>
            <div id="home-content-container">
                <div id="home-text-container">
                    {cards.map((card, index) => (
                        <div className="home-card" key={index} ref={cardRefs[index]}>
                            <p className="home-card-title">{card.header}</p>
                            <p className="home-card-content">{card.body}</p>
                        </div>
                    ))}
                </div>
                <div id="signup-container" className="sticky-top">
                    <h3>Create an account</h3>
                    <p>Start managing your finances by filling out the form below.</p>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="First Name" 
                                id="floatingFirstName" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} 
                                required 
                            />
                            <label htmlFor="floatingFirstName">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                className="form-control" 
                                id="floatingLastName"
                                type="text" 
                                placeholder="Last Name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                            />
                            <label htmlFor="floatingLastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                className="form-control"
                                id="floatingEmail"
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required 
                            />
                            <label htmlFor="floatingEmail">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                className="form-control"
                                id="floatingPassword"
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                className="form-control"
                                id="floatingConfirmPassword"
                                type="password" 
                                placeholder="Confirm Password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        </div>
                        <input 
                            type="submit"
                            value="Submit"
                        />
                    </form>
                    {warningMsg && <Warning msg={warningMsg} />}
                </div>
            </div>
            <div>
                pppp
            </div>
            <div>
                pppp
            </div>
            <div>
                pppp
            </div>
        </div>
    )
}

export default RenderHome