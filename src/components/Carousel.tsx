import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Component } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import img1 from './../assets/iara-lWjyqw3hSyU-unsplash.jpg'
import img2 from './../assets/iara-euqRht1dkm4-unsplash.jpg'
import img3 from './../assets/iara-eixj4Awxlso-unsplash.jpg'
import img4 from './../assets/marcus-dall-col--5qLhS3e7D8-unsplash.jpg'
import img5 from './../assets/junior-reis-fH5KKfcV-ZM-unsplash.jpg'
import { AspectRatio } from './ui/aspect-ratio'

class CarouselBanner extends Component {
  render() {
    const array = [img1, img2, img3, img4, img5]
    return (
      <Carousel
        className="w-screen shadow-xl"
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}
      >
        <CarouselContent className="p-0">
          {array.map((img, index) => (
            <CarouselItem key={index} className="basis-full p-0">
              <div className="h-[20rem]">
                <Card className="w-full h-full rounded-none shadow-xl border-[#DDE1E6] overflow-hidden">
                  <CardContent className="flex w-full h-full items-center justify-center p-0">
                    {index === 4 ? (
                      <AspectRatio ratio={16 / 22} className="w-full h-full  shadow-inner">
                        {' '}
                        <img className="w-full h-full" src={`${img}`} />
                      </AspectRatio>
                    ) : (
                      <AspectRatio ratio={16 / 10} className="w-full h-full  shadow-inner">
                        <img className="w-full h-full" src={`${img}`} />
                      </AspectRatio>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  }
}

export default CarouselBanner
