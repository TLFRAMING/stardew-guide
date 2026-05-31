# Stardew Data Sources

Last checked: 2026-05-30

This folder contains structured data for Stardew Guide. The current production JSON files have been normalized with the local Stardew reference database first, then kept conservative where a future schema is needed for conditional schedules, exchange costs, or processing assumptions.

## Primary Sources

- Stardew Valley Wiki villager pages:
  - https://stardewvalleywiki.com/Abigail
  - https://stardewvalleywiki.com/Sebastian
  - https://stardewvalleywiki.com/Leah
  - https://stardewvalleywiki.com/Penny
  - https://stardewvalleywiki.com/Haley
  - https://stardewvalleywiki.com/Sam
  - https://stardewvalleywiki.com/Emily
  - https://stardewvalleywiki.com/Shane
  - https://stardewvalleywiki.com/Harvey
  - https://stardewvalleywiki.com/Maru
- Stardew Valley Wiki crop and seed pages:
  - https://stardewvalleywiki.com/Parsnip
  - https://stardewvalleywiki.com/Parsnip_Seeds
  - https://stardewvalleywiki.com/Potato
  - https://stardewvalleywiki.com/Potato_Seeds
  - https://stardewvalleywiki.com/Cauliflower
  - https://stardewvalleywiki.com/Cauliflower_Seeds
  - https://stardewvalleywiki.com/Green_Bean
  - https://stardewvalleywiki.com/Bean_Starter
  - https://stardewvalleywiki.com/Strawberry
  - https://stardewvalleywiki.com/Strawberry_Seeds
  - https://stardewvalleywiki.com/Tomato
  - https://stardewvalleywiki.com/Tomato_Seeds
  - https://stardewvalleywiki.com/Hot_Pepper
  - https://stardewvalleywiki.com/Pepper_Seeds
  - https://stardewvalleywiki.com/Blueberry
  - https://stardewvalleywiki.com/Blueberry_Seeds
  - https://stardewvalleywiki.com/Melon
  - https://stardewvalleywiki.com/Melon_Seeds
  - https://stardewvalleywiki.com/Corn
  - https://stardewvalleywiki.com/Corn_Seeds
  - https://stardewvalleywiki.com/Starfruit
  - https://stardewvalleywiki.com/Starfruit_Seeds
  - https://stardewvalleywiki.com/Cranberries
  - https://stardewvalleywiki.com/Cranberry_Seeds
  - https://stardewvalleywiki.com/Pumpkin
  - https://stardewvalleywiki.com/Pumpkin_Seeds
  - https://stardewvalleywiki.com/Yam
  - https://stardewvalleywiki.com/Yam_Seeds
  - https://stardewvalleywiki.com/Eggplant
  - https://stardewvalleywiki.com/Eggplant_Seeds
  - https://stardewvalleywiki.com/Ancient_Fruit
  - https://stardewvalleywiki.com/Ancient_Seeds
  - https://stardewvalleywiki.com/Coffee_Bean
  - https://stardewvalleywiki.com/Red_Cabbage
  - https://stardewvalleywiki.com/Red_Cabbage_Seeds
  - https://stardewvalleywiki.com/Wheat
  - https://stardewvalleywiki.com/Wheat_Seeds
  - https://stardewvalleywiki.com/Amaranth
  - https://stardewvalleywiki.com/Amaranth_Seeds
- Stardew Valley Wiki fish pages:
  - https://stardewvalleywiki.com/Sunfish
  - https://stardewvalleywiki.com/Catfish
  - https://stardewvalleywiki.com/Herring
  - https://stardewvalleywiki.com/Eel
  - https://stardewvalleywiki.com/Sardine
  - https://stardewvalleywiki.com/Shad
  - https://stardewvalleywiki.com/Tiger_Trout
  - https://stardewvalleywiki.com/Tuna
  - https://stardewvalleywiki.com/Red_Snapper
  - https://stardewvalleywiki.com/Tilapia
  - https://stardewvalleywiki.com/Largemouth_Bass
  - https://stardewvalleywiki.com/Carp
  - https://stardewvalleywiki.com/Bullhead
  - https://stardewvalleywiki.com/Sturgeon
  - https://stardewvalleywiki.com/Walleye
  - https://stardewvalleywiki.com/Bream
  - https://stardewvalleywiki.com/Smallmouth_Bass
  - https://stardewvalleywiki.com/Anchovy
  - https://stardewvalleywiki.com/Flounder
  - https://stardewvalleywiki.com/Halibut
  - https://stardewvalleywiki.com/Salmon
  - https://stardewvalleywiki.com/Pike
  - https://stardewvalleywiki.com/Perch
  - https://stardewvalleywiki.com/Rainbow_Trout
  - https://stardewvalleywiki.com/Octopus
- Stardew Valley Wiki bundle page:
  - https://stardewvalleywiki.com/Bundles

## Data Notes

- Gift lists use explicit item rows only. Category rules such as universal likes or exceptions are not stored as direct gift arrays.
- Villager `scheduleNotes` are intentionally high-level because full schedules are conditional and should be modeled separately.
- Crop `profitNotes` avoid exact min-max claims until quality, fertilizer, profession, seed source, multi-harvest yield, and processing assumptions are modeled.
- Fish `sellPrice` values are base prices only; quality, profession, and smoker effects are not modeled.
- Bundle data uses standard Community Center bundles, not remixed bundles.
