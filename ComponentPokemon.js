import React, { useState, useEffect } from "react";

const ComponentPokemon = () => {
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokemanData, setPokemanData] = useState([]);
    const [heroPokeman, setHeropPokeman] = useState();

    const fetchpokemon = () => {
        fetch(url).then((response) => response.json()).then((res) => {
            setNextUrl(res.data.next);
            setPrevUrl(res.data.previous);
            getPokemon(res.data.results)
        });
    }

    const getPokemon = (res) => {
        res.map((item) => {
            fetch(item.url).then((response) => response.json()).then((result) => {
                setPokemanData(state => {
                    state = [...state, result.data]
                    state.sort((a, b) => a.id > b.id ? 1 : -1)
                    return state;
                });

            })
        })
    }

    const handleHeroPokemon = (item) => {
        setHeropPokeman(item);
    }

    useEffect(() => {
        fetchpokemon();
        console.log(pokemanData);
    }, [url])


    return (
        <>
            <div className="wrapper">
                <div className="list">
                    <div className="head">
                        <div>
                            <input type="text" value="" placeholder="search" />
                        </div>
                        <div>
                            <input type="text" value="" placeholder="Type" />
                        </div>
                    </div>
                    <div className="content">
                    {pokemanData.map((item) => {
                        return (
                            <>
                                <div className="card" key={item.id} onClick={() => handleHeroPokemon(item)}>
                                    <h2>{item.id}</h2>
                                    <img src={item.sprites.front_default} alt="" />
                                    <h2>{item.name}</h2>
                                </div>
                            </>
                        )
                    })
                    }
                    </div>

                    <div className="btn">
                        <button id="left-btn" onClick={() => {
                            setPokemanData([])
                            setUrl(prevUrl)
                        }}>Previous</button>

                        <button id="right-btn"onClick={() => {
                            setPokemanData([])
                            setUrl(nextUrl)
                        }}>Next</button>

                    </div>
                </div>
                <div className="hero"></div>

                < h1 > {heroPokeman.name}</h1>
                <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${heroPokeman.id}.svg`} alt="" />

                <div className="abilities">
                    {
                        heroPokeman.abilities.map((poke) => {
                            return (
                                <>
                                    <div className="group">
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="base-stat">
                    {
                        heroPokeman.stats.map((poke) => {
                            return (
                                <>
                                    <h3>{poke.stat.name}:{poke.base_stat}</h3>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default ComponentPokemon;
