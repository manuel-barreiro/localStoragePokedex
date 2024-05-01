import PokeGrid from "@/components/PokeGrid";
import { Flex } from "@chakra-ui/react";

export default async function Home() {

  return (
    <Flex direction="column" alignItems="center" gap={10} py={32} >
      <PokeGrid />
    </Flex>
  );
}
