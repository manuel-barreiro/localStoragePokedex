import { Text, Image, Button } from "@chakra-ui/react"

function CatchAndFreeButton({ purpose }: { purpose?: string }) {
  return (
    <Button rounded='2xl' display="flex" gap={2} alignItems="center" w="auto" px={8}>
      {purpose === 'catch' ?  
        <>
          <Image src={'/newPokeball.png'} maxW={6} />
          <Text>Catch</Text>
        </>
      : purpose === 'free' ?
      <>
        <Image src={'/newPokeballOpen.png'} maxW={6} />
        <Text>Free</Text>
      </> :
        <>
        <Image src={'/newPokeball.png'} maxW={6} />
      </>
      }
    </Button>
  )
}

export default CatchAndFreeButton