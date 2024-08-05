import { Component } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import CarouselBanner from '@/components/Carousel'
import CardDestiny from '@/components/CardDestiny'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

interface Attraction {
  destinyId: number
  title: string
  content: string
  imgURL: string | null
}

interface Destino {
  id: number
  created_at: string
  title: string
  content: string
  imgURL: string | null
  favoritedBy: number
  Attraction: Attraction[]
}

interface State {
  destinos: Destino[]
}

export class Dashboard extends Component<{}, State> {
  state: State = {
    destinos: []
  }

  componentDidMount() {
    this.fetchDestinos()
  }

  fetchDestinos = async () => {
    try {
      const response = await axios.get('https://traveling-mango-api.onrender.com/destinies')
      this.setState({ destinos: response.data })
    } catch (error) {
      console.error('Error fetching destinos:', error)
    }
  }

  render() {
    const { destinos } = this.state

    if (destinos.length === 0) {
      return <div>Loading...</div>
    }

    const recommendedDestiny = [destinos[0], destinos[1], destinos[2]]
    const recommendedAttraction = destinos[2]
    const { Attraction } = recommendedAttraction

    return (
      <>
        <Header />
        <main className="flex flex-col w-full h-screen load">
          <div className="flex w-full h-full">
            <CarouselBanner />
          </div>
          <article className="flex flex-col w-full h-full justify-center items-center gap-5 p-5">
            <h1 className="text-2xl mt-10">Destinos Recomendados</h1>
            <div className="grid justify-evenly grid-rows-1 grid-flow-col gap-4 w-full h-full">
              {recommendedDestiny.map(destino => (
                <CardDestiny
                  key={destino.id}
                  id={destino.id}
                  type="destino"
                  titulo={destino.title}
                  desc={destino.content}
                  imgUrl={destino.imgURL as string}
                />
              ))}
            </div>
            <h1 className="text-2xl">Atrativos Recomendados</h1>
            <div className="grid justify-evenly grid-rows-1 grid-flow-col gap-4 w-full h-full">
              {Attraction.slice(0, 3).map(atrativo => (
                <CardDestiny
                  key={atrativo.title}
                  id={20}
                  type="destino"
                  titulo={atrativo.title}
                  desc={atrativo.content}
                  imgUrl={atrativo.imgURL as string}
                />
              ))}
            </div>
          </article>
          <div className="flex flex-col w-full h-full justify-center items-center gap-5 p-5 mt-10 ">
            <h1 className="text-2xl">Todos os nossos Destinos</h1>
            <div className="w-full h-full border-2 rounded-md">
              <div className="bg-[#DDE1E6] rounded-lg ">
                <MapContainer
                  style={{ width: '96.2vw', height: '39.7rem' }}
                  center={[-5.0307, -44.5962]}
                  zoom={7}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  <Marker position={[-2.4901, -43.2401]}>
                    <Popup>Santo Amaro</Popup>
                  </Marker>
                  <Marker position={[-2.7151, -42.5258]}>
                    <Popup>Paulino Neves</Popup>
                  </Marker>
                  <Marker position={[-2.5297, -44.3028]}>
                    <Popup>São Luís</Popup>
                  </Marker>
                  <Marker position={[-2.4083, -44.4063]}>
                    <Popup>Alcântara</Popup>
                  </Marker>
                  <Marker position={[-2.75, -42.8256]}>
                    <Popup>Barreirinhas</Popup>
                  </Marker>
                  <Marker position={[-2.4254, -44.0977]}>
                    <Popup>Raposa</Popup>
                  </Marker>
                  <Marker position={[-7.0801, -47.35]}>
                    <Popup>Chapada das Mesas</Popup>
                  </Marker>
                  <Marker position={[-7.335, -47.47]}>
                    <Popup>Carolina</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
          <div className="w-full h-[50rem] mt-5">
            <footer className="flex h-12 items-center justify-end gap-4 border-b px-4 md:px-6 bg-[#FAFAFA] border-t-4 shadow-sm"></footer>
          </div>
        </main>
      </>
    )
  }
}

export default Dashboard
