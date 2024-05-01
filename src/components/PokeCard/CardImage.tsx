import { Box, Image } from "@chakra-ui/react"

function CardImage({img, mainType}: {img: string, mainType: string}) {
  return (
    <Box w="full" h="full" flexBasis={"40%"} p={3} display="flex" justifyContent="center" alignItems="start" bg={`${mainType}.badge`} borderRadius="xl">
        <Image src={img} />
    </Box>
  )
}

export default CardImage