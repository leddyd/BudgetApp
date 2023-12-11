import React from "react"

function RenderHome() {
    const cards = [
        {"header": "Header", "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Blandit massa enim nec dui nunc mattis enim. Odio euismod lacinia at quis risus sed. Augue mauris augue neque gravida in fermentum et. Faucibus vitae aliquet nec ullamcorper sit amet risus. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet purus gravida quis blandit turpis cursus. Lacinia at quis risus sed vulputate odio. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Arcu cursus euismod quis viverra nibh. Integer eget aliquet nibh praesent. Volutpat odio facilisis mauris sit amet massa vitae. Sit amet aliquam id diam maecenas ultricies mi. Vitae justo eget magna fermentum iaculis eu non diam. Lacus sed turpis tincidunt id aliquet risus feugiat. Lectus sit amet est placerat in egestas erat."},
        {"header": "Header", "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Blandit massa enim nec dui nunc mattis enim. Odio euismod lacinia at quis risus sed. Augue mauris augue neque gravida in fermentum et. Faucibus vitae aliquet nec ullamcorper sit amet risus. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet purus gravida quis blandit turpis cursus. Lacinia at quis risus sed vulputate odio. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Arcu cursus euismod quis viverra nibh. Integer eget aliquet nibh praesent. Volutpat odio facilisis mauris sit amet massa vitae. Sit amet aliquam id diam maecenas ultricies mi. Vitae justo eget magna fermentum iaculis eu non diam. Lacus sed turpis tincidunt id aliquet risus feugiat. Lectus sit amet est placerat in egestas erat."},
        {"header": "Header", "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Blandit massa enim nec dui nunc mattis enim. Odio euismod lacinia at quis risus sed. Augue mauris augue neque gravida in fermentum et. Faucibus vitae aliquet nec ullamcorper sit amet risus. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet purus gravida quis blandit turpis cursus. Lacinia at quis risus sed vulputate odio. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Arcu cursus euismod quis viverra nibh. Integer eget aliquet nibh praesent. Volutpat odio facilisis mauris sit amet massa vitae. Sit amet aliquam id diam maecenas ultricies mi. Vitae justo eget magna fermentum iaculis eu non diam. Lacus sed turpis tincidunt id aliquet risus feugiat. Lectus sit amet est placerat in egestas erat."},
    ]

    return (
        <div id="home">
            <div id="home-header-container">
                <div>
                    <p>SUB HEADER</p>
                    <h1>THIS IS THE HEADER</h1>
                </div>
            </div>
            <div id="home-content-container">
                <div id="home-text-container">
                    {cards.map((card) => (
                        <div className="home-card">
                            <p className="home-card-title">{card.header}</p>
                            <p className="home-card-content">{card.body}</p>
                        </div>
                    ))}
                </div>
                <div id="signup-container" className="sticky-top">
                    <h2>Sign up</h2>
                    <form id="signup-form">
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Confirm Password" required /><br></br>
                        <input type="submit" value="Submit"/>
                    </form>
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