# ⚡ faster than solana?

solana blocks now land every ~200ms. the average human reaction is around 250ms.
can you beat a block?

**try it: [speed.owlchainlabs.xyz](https://speed.owlchainlabs.xyz)**

![speed-test demo](./demo.gif)

## what it does

1. shows the live solana slot time from public mainnet rpc (`getRecentPerformanceSamples`)
2. races solana against base, ethereum and bitcoin block by block
3. a 3 round reaction test: wait for green, tap
4. tells you how many times slower you are than a solana block
5. tag a friend and post your result on x, or save a share card

## how the numbers work

- solana: average slot time of the last ~10 performance samples. if the rpc is not reachable it falls back to the 200ms target
- base 2s, ethereum 12s, bitcoin ~10min: their target block times
- your score is the average of 3 rounds. tapping before green resets the round

## run it yourself

it's one html file. no build, no keys, no backend.

```bash
git clone https://github.com/OwlChainLabs/speed-test
open speed-test/index.html
```

deploys as is on cloudflare pages, github pages or any static host.

## license

MIT · built by [@OwlChainLabs](https://x.com/OwlChainLabs)
