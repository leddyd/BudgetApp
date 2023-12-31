import { useEffect, useRef } from "react"
import { SignUp } from '../components/auth/signup';

function RenderFrontPage() {
    const cards = [
        {"header": "TRACK EXPENSES", "body": "Effortlessly track your expenses with our intuitive platform, gaining valuable insights into your spending habits. Distant Dollar allows you to breakdown your expenditures into their respective categories, making it easy to identify where your money is going. Monitor your account balance and stay on top of your monthly budget with real-time updates, ensuring you never overspend. Additionally, our platform helps you catch and manage unwanted subscriptions, providing a clear overview of recurring charges and empowering you to make informed decisions about your financial commitments. With user-friendly interfaces and personalized financial tips, Distant Dollar goes beyond tracking – it actively guides you towards achieving your financial goals, whether it's building savings, reducing debt, or planning for future investments."},
        {"header": "CREATE A PLAN", "body": "Craft a roadmap to financial success with our strategic planning tools. Our platform provides you with the process of creating a personalized plan, taking into account your income, expenses, and long-term aspirations. Whether you're aiming to build an emergency fund, save for a dream vacation, or invest for the future, Distant Dollar empowers you with the tools to outline, track, and achieve your financial milestones. Moreover, stay in control of your goals by regularly reviewing and adjusting your plan as life evolves. If you experience a shift in income, unexpected financial burdens, or create new goals, our platform ensures that your financial roadmap remains flexible and aligned with your current situation. "},
        {"header": "PAY LESS", "body": "Save more by paying less in the present. Say goodbye to unnecessary expenses as Distant Dollar empowers you with insights to cut costs without sacrificing your priorities. Whether it's optimizing subscriptions or implementing budget-friendly lifestyle changes, our platform guides you towards a path of spending less. Distant Dollar not only identifies areas for potential savings but also offers actionable tips to maximize your financial efficiency. By allowing you to make informed choices on everyday purchases, our platform transforms the concept of saving into a tangible and achievable goal. Start your journey to financial efficiency today, and let Distant Dollar pave the way for a future where you not only spend wisely but also watch your savings grow. Your financial well-being is our priority, and we're here to help you achieve your goals, one distant dollar at a time."},
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
                    <p>PERSONAL FINANCE WITH DISTANT DOLLAR</p>
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
                    <p>Distant Dollar was designed and implemented from scratch by Dylan Leddy and Blake Prall. As seniors studying computer science at Boston College, we sought to leverage our technical skills to provide our friends a platform to effortlessly manage their finances. While Distant Dollar is technically functional, we are not experts and it's ill advised to view this platform as more than a portfolio website.</p>
                </div>
            </div>
            <div id="about">
                <div className="about-card" onClick={() => directToPage("https://www.linkedin.com/in/dylan-leddy-298a71223")}>
                    <div className="hover-bar"></div>
                    <img src="https://media.licdn.com/dms/image/C4E03AQFmMnB8gkDt6Q/profile-displayphoto-shrink_400_400/0/1634930548034?e=1708560000&v=beta&t=EKGiqfDBto5m2In56lN0sXRI0C89vH8q-Xjog1jWcFk"/>
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Dylan Leddy<i className="bi bi-chevron-right"></i></p>
                    <p>Dylan Leddy studies computer science and finance. He is interested in software development, investments, and machine learning. Dylan was responsible for designing Distant Dollar's front end components and implementing D3 visualizations.</p>
                </div>
                <div className="about-card" onClick={() => directToPage("https://www.linkedin.com/in/bprall/")}>
                    <div className="hover-bar"></div>
                    <img src="https://media.licdn.com/dms/image/D4E03AQFbGrNlhV3vOQ/profile-displayphoto-shrink_100_100/0/1701894420208?e=1708560000&v=beta&t=cqzMonxSXKY2KGL_ASbSb62XIhoMLf91ee-lOQpaRas"/>
                    <p className="mb-0 fs-5 text-body-emphasis fw-medium text-muted">Blake Prall<i className="bi bi-chevron-right"></i></p>
                    <p>A description</p>
                </div>
            </div>
            <div className="footer">This is a global notification bar</div>
        </div>
    )
}

export default RenderFrontPage