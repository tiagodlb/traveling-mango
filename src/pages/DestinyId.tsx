import { Component } from 'react'
import Header from '@/components/Header'
import withRouter from '@/utils/withRouter'
import { useLocation, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon

interface RouteParams {
  id?: string | undefined
}

interface Props {
  location: ReturnType<typeof useLocation>
  navigate: ReturnType<typeof useNavigate>
  params: RouteParams
}

interface State {
  data: DestinyData | null
  loading: boolean
  error: string | null
}

interface Attraction {
  title: string
  content: string
  imgURL: string | null
}

interface DestinyData {
  lat: number
  long: number
  imgURL: string | undefined
  id: string
  title: string
  content: string
  Attraction: Attraction[]
}

class DestinyId extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: null,
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { id } = this.props.params as RouteParams

    fetch('https://traveling-mango-api.onrender.com/destinies')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const destiny = data.find((item: DestinyData) => String(item.id) === id)
        this.setState({ data: destiny, loading: false })
      })
      .catch(error => {
        console.error('Error fetching destinies:', error)
        this.setState({ error: 'Error fetching data', loading: false })
      })
  }

  render() {
    const { data, loading, error } = this.state

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>{error}</div>
    }

    if (!data) {
      return <div>Não encontramos nenhum destino com esse identificador</div>
    }

    return (
      <div>
        <Header />
        <article className="flex flex-col w-full justify-center items-center gap-8 p-10 load">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <div className="grid grid-rows-1 grid-cols-2 gap-4 w-full text-[#0f172a] bg-white p-5 rounded border-[#DDE1E6] shadow-md">
            <div className="flex w-full">
              <AspectRatio ratio={16 / 9} className="w-full h-full mt-6">
                <img src={data.imgURL} className="w-full h-full object-cover" />
              </AspectRatio>
            </div>
            <div className="col-span-1 row-span-3 w-full border-l-2 border-r-2 border-[#d3d3d3] p-2">
              <div className="flex flex-col items-center justify-center p-2 gap-5">
                <h2 className="text-3xl">Sobre</h2>
                <p>{data.content}</p>
              </div>
              <div className="bg-[#DDE1E6] rounded-md overflow-hidden">
                <MapContainer
                  style={{ width: '47.5rem', height: '10rem' }}
                  center={[data.lat, data.long]}
                  zoom={14}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  <Marker position={[data.lat, data.long]}>
                    <Popup>{data.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full bg-white rounded text-black p-6">
            <h2 className="text-2xl mb-4">Lista de Atrativos que recomendamos</h2>
            {data.Attraction.length > 0 ? (
              <ul className="list-disc list-inside">
                {data.Attraction.map((attraction, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex flex-col items-start">
                      <h3 className="text-2xl font-bold">{attraction.title}</h3>
                      <p>{attraction.content}</p>
                      {attraction.imgURL && (
                        <img
                          src={attraction.imgURL}
                          alt={attraction.title}
                          className="w-full h-auto mt-2"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há atrativos disponíveis para este destino.</p>
            )}
          </div>
        </article>
      </div>
    )
  }
}

// @ts-ignore
export default withRouter(DestinyId)
