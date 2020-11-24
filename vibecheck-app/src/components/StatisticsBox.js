import React from 'react';
import { Box, Button, Heading, Tabs, Image, Section, Container } from 'react-bulma-components';
import { getUserTopTracks, getUserTopArtists, getUserRecentlyPlayedTracks } from '../API/spotifyAPI';
import { Link } from 'react-router-dom'
import './StatisticsBox.css'

export default class StatisticsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            display: [],
            isTracksActive: false,
            isTopArtistsActive: false,
        }

        this.handleTopTracks = this.handleTopTracks.bind(this);
        this.handleTopArtists = this.handleTopArtists.bind(this);
        this.handleRecentlyPlayedTracks = this.handleRecentlyPlayedTracks.bind(this);

        this.fetchTopTracks = this.fetchTopTracks.bind(this);
        this.fetchTopArtists = this.fetchTopArtists.bind(this);
        this.fetchRecentlyPlayedTracks = this.fetchRecentlyPlayedTracks.bind(this);
    }

    componentDidMount(props) {
        this.setState({title: `${this.props.userData[0].display_name}\`s Top Tracks`});
        this.setState({isTopTracksActive: true});
        this.fetchTopTracks();
    }

    handleTopTracks(e) {
        this.setState({title: `${this.props.userData[0].display_name}\`s Top Tracks`});
        this.setState({isTopTracksActive: true});
        this.setState({isTopArtistsActive: false});
        this.fetchTopTracks(); // function sets the state
    }

    handleTopArtists(e) {
        this.setState({title: `${this.props.userData[0].display_name}\`s Top Artists`});
        this.setState({isTopTracksActive: false});
        this.setState({isTopArtistsActive: true});
        this.fetchTopArtists(); // function sets the state
    }

    handleRecentlyPlayedTracks(e) {
        this.setState({title: "Recently Played Tracks"});
        this.fetchRecentlyPlayedTracks();
    }

    fetchTopTracks() {
        getUserTopTracks(100, 0).then( (r) => {
            console.log(r);
            let items = [];
            r.items.forEach( (elt, i) => {
                items.push({
                    index: i,
                    name: `${elt.artists[0].name} - ${elt.name}`,
                    image: elt.album.images[1].url,
                    url: elt.external_urls.spotify,
                })
            });
            this.setState({display: items});
        }).catch( (error) => {
            console.log(error);
        })
    }

    fetchTopArtists() {
        getUserTopArtists(100, 0).then( (r) => {
            console.log(r);
            let items = [];
            r.items.forEach( (elt, i) => {
                items.push({
                    index: i,
                    name: elt.name,
                    image: elt.images[1].url,
                    url: elt.external_urls.spotify
                })
            });
            this.setState({display: items});
        }).catch( (error) => {
            console.log(error);
        })
    }

    fetchRecentlyPlayedTracks() {
        getUserRecentlyPlayedTracks().then( (r) => {
            console.log(r);
        })
    }

    render() {
        return (
            <React.Fragment>
                <Section>
                    <Container>
                        <a href={this.props.userData[0].external_urls.spotify} target="_blank">
                            <Image className="is-rounded is-128x128" id="user-image" src={this.props.userData[0].images[0].url} />
                        </a>
                        <Heading>
                            {this.state.title}
                        </Heading>
                        <br/>
                        <Tabs
                            type={ 'boxed'}
                            fullwidth={true}
                            align={'centered'}
                        >
                            <Tabs.Tab className={this.state.isTopArtistsActive ? "is-active" : ""} onClick={this.handleTopArtists}>
                                Top Artists
                            </Tabs.Tab>
                            <Tabs.Tab className={this.state.isTopTracksActive ? "is-active" : ""} onClick={this.handleTopTracks}>
                                Top Tracks
                            </Tabs.Tab>
                        </Tabs>
                        <hr />
                        {/* <Button onClick={this.handleTopArtists}>Top Artists</Button>
                        <Button onClick={this.handleTopTracks}>Top Tracks</Button> */}
                        {/* <Button onClick={this.handleRecentlyPlayedTracks}>Recently Played Tracks</Button> */}
                    </Container>
                    <Container>
                        <div className="columns">
                            <div className="column vcenter">
                                <h1 className="subtitle">
                                    <strong>Ranking</strong>
                                </h1>
                            </div>
                            <div className="column vcenter">
                                <h1 className="subtitle">
                                    <strong>Title</strong>
                                </h1>
                            </div>
                            <div className="column">
                                <h1 className="subtitle">
                                <strong>Cover</strong>
                                </h1>
                            </div>
                        </div>
                        {this.state.display.map( (s, i) => {
                            return (
                                    <div className="columns">
                                        <div className="column vcenter">
                                            <h1 className="subtitle">
                                                <strong>{i+1}</strong>
                                            </h1>
                                        </div>
                                        <div className="column vcenter">
                                            <h1 className="subtitle">
                                            {s.name}
                                            </h1>
                                        </div>
                                        <div className="column">
                                            <a href={s.url} target="_blank">
                                                <img src={s.image} className="is-128x128"/>
                                            </a>
                                        </div>
                                    </div>
                            )
                        })}
                                                    
                    </Container>
                </Section>
            </React.Fragment>
        )
    }
}

/** */