import { useEffect, useRef } from "react"
import { SignUp } from '../components/auth/signup';

function RenderFrontPage() {
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

    const directToPage = (link:string) => {
        window.location.href = link
    }

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

    return (
        <div id="home">
            <div className="home-header-container" id="features-header">
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
                    <SignUp />
                </div>
            </div>
            <div className="home-header-container" id="about-header">
                <div>
                    <h3>Meet the creators</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Blandit massa enim nec dui nunc mattis enim. Odio euismod lacinia at quis risus sed. Augue mauris augue neque gravida in fermentum et. Faucibus vitae aliquet nec ullamcorper sit amet risus.</p>
                </div>
            </div>
            <div id="about">
                <div className="about-card" onClick={() => directToPage("https://www.linkedin.com/in/dylan-leddy-298a71223")}>
                    <div className="hover-bar"></div>
                    <img src="https://media.licdn.com/dms/image/C4E03AQFmMnB8gkDt6Q/profile-displayphoto-shrink_400_400/0/1634930548034?e=1708560000&v=beta&t=EKGiqfDBto5m2In56lN0sXRI0C89vH8q-Xjog1jWcFk"/>
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Dylan Leddy<i className="bi bi-chevron-right"></i></p>
                    <p>A description</p>
                </div>
                <div className="about-card" onClick={() => directToPage("https://www.linkedin.com/in/bprall/")}>
                    <div className="hover-bar"></div>
                    <img src="https://media.licdn.com/dms/image/D4E03AQFbGrNlhV3vOQ/profile-displayphoto-shrink_100_100/0/1701894420208?e=1708560000&v=beta&t=cqzMonxSXKY2KGL_ASbSb62XIhoMLf91ee-lOQpaRas"/>
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Blake Prall<i className="bi bi-chevron-right"></i></p>
                    <p>A description</p>
                </div>
            </div>
        </div>
    )
}

export default RenderFrontPage