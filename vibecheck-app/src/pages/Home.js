import React from 'react'
import { Heading, Hero, Container, Section } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import ConnectSpotify from '../components/ConnectSpotify'
import PlaylistCarousel from '../components/PlaylistCarousel';
import PlaylistReel from '../components/PlaylistReel';


export class Home extends React.Component {
    render() {
        return (
            <div>
                <Hero gradient size="large" className="home-hero">
                        <Hero.Body align="center">
                            <div class="wrapper"><h1>Vibecheck</h1></div>
                            <p>
                            Vibe  <i>(Noun)</i> A distinctive emotional atmosphere; sensed intuitively. 
                            </p>
                            <ConnectSpotify></ConnectSpotify>
                        </Hero.Body>
                </Hero>
                <br />
                <Container>
                    <Heading size={3}>
                        A custom playlist fit to the vibe.
                    </Heading>
                    <Heading subtitle>
                        If a picture is worth a 1000 words, a song is worth a 1,000,000 more. 
                        Take the quiz to gauge your vibe and let our algorithm produce the perfect playlist to match using you and your friends' music taste. 
                        Sign in with your spotify to get started.
                    </Heading>
                    {/* <PlaylistCarousel/> */}
                </Container>
                <br></br>
                <Container>
                    <div class="playlist-reel-home">
                    <PlaylistReel />
                    </div>
                </Container>
                <br/>
            </div>);
    }
}

export default Home
