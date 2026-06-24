// Per-suburb local copy for the Docklands 1998 chauffeur service.
// Hand-drafted, truthful, references real Melbourne landmarks and corridors.

export const localCopy: Record<string, string> = {
  "docklands": "Docklands is our home base, so most jobs originate from or end at addresses in NewQuay, Yarra's Edge or Victoria Harbour. Marvel Stadium event pickups, Crown precinct dropoffs, and the loop between Docklands and Melbourne Airport are part of our daily work. We can usually accommodate same-day requests for Docklands residents because we are already in the area.",

  "melbourne-cbd": "CBD pickups cover Collins Street boardrooms, Bourke Street hotels, Spring Street venues and the laneway restaurant scene. Our chauffeurs know which CBD corners work for executive pickups without blocking trams, and which side streets handle suitcase loading without traffic warden trouble.",

  "southbank": "Southbank means Crown precinct, Arts Centre, Hamer Hall, and the riverside restaurants. We handle event nights at Crown, gallery openings at NGV, and the steady stream of business hotel transfers along Southbank Boulevard. The chauffeurs know the bypass routes around event traffic on busy weekend nights.",

  "south-yarra": "South Yarra is Toorak Road and Chapel Street, with the apartment density that comes with both. We work with regular South Yarra clients on Friday-night Crown transfers, Saturday wedding pickups along Domain Road, and weekday airport runs from the high-rises north of Toorak Road.",

  "toorak": "Toorak homes have the driveway space and the schedule expectations to suit a regular chauffeur arrangement. We handle airport runs, family transfers to Geelong Grammar weekends, and event nights at Crown. Many Toorak clients use us for school runs during the term and switch to airport and tour work during holidays.",

  "brighton": "Brighton is a 25-minute run to the CBD and a 50-minute run to Melbourne Airport, so we plan pickup times generously. Our work in Brighton covers Church Street executive pickups, family transfers from the beach side, and the regular run to Brighton Grammar and Firbank for school events.",

  "st-kilda": "St Kilda work is heavy on event-night pickups (Palais, Esplanade) and Crown precinct transfers. The Acland Street and Fitzroy Street corridors have the restaurant density that brings late-night pickups, and we are set up for the 11pm to 1am window that defines a lot of St Kilda chauffeur work.",

  "hawthorn": "Hawthorn covers Glenferrie Road, Hawthorn East and the Camberwell border. The work is a mix of corporate transfers to the CBD, school runs in term time, and the regular Melbourne Airport runs for families that travel for sport or work. Hawthorn clients tend to prefer the same chauffeur on repeat bookings, which we can usually accommodate.",

  "richmond": "Richmond means MCG event nights, Bridge Road restaurant transfers, and the steady flow of Cremorne tech-office corporate work. Game-day MCG pickups are a specialist part of what we do — we know where to stage the vehicle so you are not walking five blocks after the final siren.",

  "carlton": "Carlton work centres on Lygon Street, the University of Melbourne, and the Royal Exhibition Building event calendar. Italian restaurant pickups, parent weekends at the university, and the regular medical transfers to Royal Melbourne Hospital are part of the mix. We can usually get into Carlton during peak hours by routing around Princes Street.",

  "melbourne-airport": "Melbourne Airport (Tullamarine) is our highest-volume destination. We track every flight by number, hold the curb-side pickup with a discrete sign, and route via Tullamarine Freeway or CityLink depending on the time of day. Long-stay parking is avoided through real-time arrival tracking. We handle T1 (Qantas), T2 (International), T3 (Virgin), and T4 (budget) consistently.",

  "avalon-airport": "Avalon Airport is the secondary Melbourne option, with the Jetstar daytime schedule and the Geelong proximity. We track Avalon arrivals and run direct via Princes Freeway. For Avalon, the airport-to-Melbourne run is around 60 minutes off-peak, and we factor that into the quote upfront.",
};

export function getLocalCopy(citySlug: string): string | null {
  return localCopy[citySlug] ?? null;
}
