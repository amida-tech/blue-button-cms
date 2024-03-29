"use stricts";

//each entry is in the format city: [zip, two-letter state code]

//interesting fact: the maximum number for of words for a city name is 5!

// based on free csv data from https://www.census.gov/econ/cbp/download/
var cities = {
  "HOLTSVILLE": [
    "11742",
    "NY"
  ],
  "AGAWAM": [
    "01001",
    "MA"
  ],
  "AMHERST": [
    "80721",
    "CO"
  ],
  "BARRE": [
    "05641",
    "VT"
  ],
  "BELCHERTOWN": [
    "01007",
    "MA"
  ],
  "BLANDFORD": [
    "01008",
    "MA"
  ],
  "BONDSVILLE": [
    "01009",
    "MA"
  ],
  "BRIMFIELD": [
    "61517",
    "IL"
  ],
  "CHESTER": [
    "96020",
    "CA"
  ],
  "CHESTERFIELD": [
    "63017",
    "MO"
  ],
  "CHICOPEE": [
    "01022",
    "MA"
  ],
  "CUMMINGTON": [
    "01026",
    "MA"
  ],
  "EASTHAMPTON": [
    "01027",
    "MA"
  ],
  "EAST LONGMEADOW": [
    "01028",
    "MA"
  ],
  "EAST OTIS": [
    "01029",
    "MA"
  ],
  "FEEDING HILLS": [
    "01030",
    "MA"
  ],
  "GILBERTVILLE": [
    "50634",
    "IA"
  ],
  "GOSHEN": [
    "93227",
    "CA"
  ],
  "GRANBY": [
    "80446",
    "CO"
  ],
  "GRANVILLE": [
    "61326",
    "IL"
  ],
  "HADLEY": [
    "48440",
    "MI"
  ],
  "HAMPDEN": [
    "58338",
    "ND"
  ],
  "HARDWICK": [
    "56134",
    "MN"
  ],
  "HATFIELD": [
    "71945",
    "AR"
  ],
  "HAYDENVILLE": [
    "43127",
    "OH"
  ],
  "HOLYOKE": [
    "80734",
    "CO"
  ],
  "HUNTINGTON": [
    "97907",
    "OR"
  ],
  "LEEDS": [
    "84746",
    "UT"
  ],
  "LEVERETT": [
    "01054",
    "MA"
  ],
  "LUDLOW": [
    "92338",
    "CA"
  ],
  "MONSON": [
    "04464",
    "ME"
  ],
  "NORTH AMHERST": [
    "01059",
    "MA"
  ],
  "NORTHAMPTON": [
    "18067",
    "PA"
  ],
  "FLORENCE": [
    "97439",
    "OR"
  ],
  "NORTH HATFIELD": [
    "01066",
    "MA"
  ],
  "OAKHAM": [
    "01068",
    "MA"
  ],
  "PALMER": [
    "99645",
    "AK"
  ],
  "PLAINFIELD": [
    "60586",
    "IL"
  ],
  "RUSSELL": [
    "72139",
    "AR"
  ],
  "SHUTESBURY": [
    "01072",
    "MA"
  ],
  "SOUTHAMPTON": [
    "18966",
    "PA"
  ],
  "SOUTH BARRE": [
    "05670",
    "VT"
  ],
  "SOUTH HADLEY": [
    "01075",
    "MA"
  ],
  "SOUTHWICK": [
    "01077",
    "MA"
  ],
  "THORNDIKE": [
    "04986",
    "ME"
  ],
  "THREE RIVERS": [
    "93271",
    "CA"
  ],
  "WALES": [
    "99783",
    "AK"
  ],
  "WARE": [
    "01082",
    "MA"
  ],
  "WARREN": [
    "97053",
    "OR"
  ],
  "WEST CHESTERFIELD": [
    "03466",
    "NH"
  ],
  "WESTFIELD": [
    "62474",
    "IL"
  ],
  "WEST HATFIELD": [
    "01088",
    "MA"
  ],
  "WEST SPRINGFIELD": [
    "16443",
    "PA"
  ],
  "WEST WARREN": [
    "01092",
    "MA"
  ],
  "WHATELY": [
    "01093",
    "MA"
  ],
  "WHEELWRIGHT": [
    "41669",
    "KY"
  ],
  "WILBRAHAM": [
    "01095",
    "MA"
  ],
  "WILLIAMSBURG": [
    "87942",
    "NM"
  ],
  "WORTHINGTON": [
    "63567",
    "MO"
  ],
  "SPRINGFIELD": [
    "97478",
    "OR"
  ],
  "LONGMEADOW": [
    "01116",
    "MA"
  ],
  "INDIAN ORCHARD": [
    "01151",
    "MA"
  ],
  "PITTSFIELD": [
    "62363",
    "IL"
  ],
  "ADAMS": [
    "97810",
    "OR"
  ],
  "ASHLEY FALLS": [
    "01222",
    "MA"
  ],
  "BECKET": [
    "01223",
    "MA"
  ],
  "BERKSHIRE": [
    "13736",
    "NY"
  ],
  "CHESHIRE": [
    "97419",
    "OR"
  ],
  "DALTON": [
    "69131",
    "NE"
  ],
  "GLENDALE": [
    "97442",
    "OR"
  ],
  "GREAT BARRINGTON": [
    "01230",
    "MA"
  ],
  "HINSDALE": [
    "60522",
    "IL"
  ],
  "HOUSATONIC": [
    "01236",
    "MA"
  ],
  "LANESBORO": [
    "55949",
    "MN"
  ],
  "LEE": [
    "60530",
    "IL"
  ],
  "LENOX": [
    "50851",
    "IA"
  ],
  "LENOX DALE": [
    "01242",
    "MA"
  ],
  "MIDDLEFIELD": [
    "44062",
    "OH"
  ],
  "MILL RIVER": [
    "01244",
    "MA"
  ],
  "MONTEREY": [
    "93944",
    "CA"
  ],
  "NORTH ADAMS": [
    "49262",
    "MI"
  ],
  "NORTH EGREMONT": [
    "01252",
    "MA"
  ],
  "OTIS": [
    "97368",
    "OR"
  ],
  "RICHMOND": [
    "94808",
    "CA"
  ],
  "SANDISFIELD": [
    "01255",
    "MA"
  ],
  "SAVOY": [
    "75479",
    "TX"
  ],
  "SHEFFIELD": [
    "79781",
    "TX"
  ],
  "SOUTH EGREMONT": [
    "01258",
    "MA"
  ],
  "SOUTHFIELD": [
    "48086",
    "MI"
  ],
  "SOUTH LEE": [
    "01260",
    "MA"
  ],
  "STOCKBRIDGE": [
    "53088",
    "WI"
  ],
  "TYRINGHAM": [
    "01264",
    "MA"
  ],
  "WEST STOCKBRIDGE": [
    "01266",
    "MA"
  ],
  "WILLIAMSTOWN": [
    "63473",
    "MO"
  ],
  "WINDSOR": [
    "95492",
    "CA"
  ],
  "GREENFIELD": [
    "93927",
    "CA"
  ],
  "ASHFIELD": [
    "18212",
    "PA"
  ],
  "ATHOL": [
    "83801",
    "ID"
  ],
  "BERNARDSTON": [
    "01337",
    "MA"
  ],
  "BUCKLAND": [
    "99727",
    "AK"
  ],
  "CHARLEMONT": [
    "01339",
    "MA"
  ],
  "COLRAIN": [
    "01340",
    "MA"
  ],
  "CONWAY": [
    "98238",
    "WA"
  ],
  "DEERFIELD": [
    "67838",
    "KS"
  ],
  "DRURY": [
    "65638",
    "MO"
  ],
  "ERVING": [
    "01344",
    "MA"
  ],
  "HEATH": [
    "43056",
    "OH"
  ],
  "LAKE PLEASANT": [
    "12108",
    "NY"
  ],
  "MILLERS FALLS": [
    "01349",
    "MA"
  ],
  "MONROE BRIDGE": [
    "01350",
    "MA"
  ],
  "MONTAGUE": [
    "96064",
    "CA"
  ],
  "GILL": [
    "80624",
    "CO"
  ],
  "NEW SALEM": [
    "58563",
    "ND"
  ],
  "NORTHFIELD": [
    "55057",
    "MN"
  ],
  "ORANGE": [
    "92869",
    "CA"
  ],
  "PETERSHAM": [
    "01366",
    "MA"
  ],
  "ROWE": [
    "87562",
    "NM"
  ],
  "ROYALSTON": [
    "01368",
    "MA"
  ],
  "SHELBURNE FALLS": [
    "01370",
    "MA"
  ],
  "SOUTH DEERFIELD": [
    "01373",
    "MA"
  ],
  "SUNDERLAND": [
    "20689",
    "MD"
  ],
  "TURNERS FALLS": [
    "01376",
    "MA"
  ],
  "WARWICK": [
    "58381",
    "ND"
  ],
  "WENDELL": [
    "83355",
    "ID"
  ],
  "WENDELL DEPOT": [
    "01380",
    "MA"
  ],
  "FITCHBURG": [
    "01420",
    "MA"
  ],
  "ASHBURNHAM": [
    "01430",
    "MA"
  ],
  "ASHBY": [
    "69333",
    "NE"
  ],
  "AYER": [
    "01432",
    "MA"
  ],
  "DEVENS": [
    "01434",
    "MA"
  ],
  "BALDWINVILLE": [
    "01436",
    "MA"
  ],
  "EAST TEMPLETON": [
    "01438",
    "MA"
  ],
  "GARDNER": [
    "81040",
    "CO"
  ],
  "WESTMINSTER": [
    "92685",
    "CA"
  ],
  "GROTON": [
    "57445",
    "SD"
  ],
  "HARVARD": [
    "83834",
    "ID"
  ],
  "HUBBARDSTON": [
    "48845",
    "MI"
  ],
  "LEOMINSTER": [
    "01453",
    "MA"
  ],
  "LITTLETON": [
    "80163",
    "CO"
  ],
  "LUNENBURG": [
    "23952",
    "VA"
  ],
  "PEPPERELL": [
    "01463",
    "MA"
  ],
  "SHIRLEY": [
    "72153",
    "AR"
  ],
  "STILL RIVER": [
    "01467",
    "MA"
  ],
  "TEMPLETON": [
    "93465",
    "CA"
  ],
  "TOWNSEND": [
    "59644",
    "MT"
  ],
  "WEST GROTON": [
    "01472",
    "MA"
  ],
  "WEST TOWNSEND": [
    "01474",
    "MA"
  ],
  "WINCHENDON": [
    "01475",
    "MA"
  ],
  "WINCHENDON SPRINGS": [
    "01477",
    "MA"
  ],
  "AUBURN": [
    "98092",
    "WA"
  ],
  "BERLIN": [
    "58415",
    "ND"
  ],
  "BLACKSTONE": [
    "61313",
    "IL"
  ],
  "BOYLSTON": [
    "01505",
    "MA"
  ],
  "BROOKFIELD": [
    "64628",
    "MO"
  ],
  "CHARLTON": [
    "01507",
    "MA"
  ],
  "CHARLTON CITY": [
    "01508",
    "MA"
  ],
  "CHARLTON DEPOT": [
    "01509",
    "MA"
  ],
  "CLINTON": [
    "98236",
    "WA"
  ],
  "EAST BROOKFIELD": [
    "01515",
    "MA"
  ],
  "DOUGLAS": [
    "99824",
    "AK"
  ],
  "FISKDALE": [
    "01518",
    "MA"
  ],
  "GRAFTON": [
    "68365",
    "NE"
  ],
  "HOLDEN": [
    "84636",
    "UT"
  ],
  "HOLLAND": [
    "76534",
    "TX"
  ],
  "JEFFERSON": [
    "97352",
    "OR"
  ],
  "LANCASTER": [
    "93586",
    "CA"
  ],
  "LEICESTER": [
    "28748",
    "NC"
  ],
  "LINWOOD": [
    "68036",
    "NE"
  ],
  "MANCHAUG": [
    "01526",
    "MA"
  ],
  "MILLBURY": [
    "43447",
    "OH"
  ],
  "MILLVILLE": [
    "96062",
    "CA"
  ],
  "NEW BRAINTREE": [
    "01531",
    "MA"
  ],
  "NORTHBOROUGH": [
    "01532",
    "MA"
  ],
  "NORTHBRIDGE": [
    "01534",
    "MA"
  ],
  "NORTH BROOKFIELD": [
    "13418",
    "NY"
  ],
  "NORTH GRAFTON": [
    "01536",
    "MA"
  ],
  "NORTH OXFORD": [
    "01537",
    "MA"
  ],
  "NORTH UXBRIDGE": [
    "01538",
    "MA"
  ],
  "OXFORD": [
    "72565",
    "AR"
  ],
  "PRINCETON": [
    "97721",
    "OR"
  ],
  "ROCHDALE": [
    "01542",
    "MA"
  ],
  "RUTLAND": [
    "61358",
    "IL"
  ],
  "SHREWSBURY": [
    "17361",
    "PA"
  ],
  "SOUTHBRIDGE": [
    "01550",
    "MA"
  ],
  "SOUTH GRAFTON": [
    "01560",
    "MA"
  ],
  "SOUTH LANCASTER": [
    "01561",
    "MA"
  ],
  "SPENCER": [
    "83446",
    "ID"
  ],
  "STERLING": [
    "99672",
    "AK"
  ],
  "STURBRIDGE": [
    "01566",
    "MA"
  ],
  "UPTON": [
    "82730",
    "WY"
  ],
  "UXBRIDGE": [
    "01569",
    "MA"
  ],
  "WEBSTER": [
    "77598",
    "TX"
  ],
  "DUDLEY": [
    "63936",
    "MO"
  ],
  "WESTBOROUGH": [
    "01581",
    "MA"
  ],
  "WEST BOYLSTON": [
    "01583",
    "MA"
  ],
  "WEST BROOKFIELD": [
    "01585",
    "MA"
  ],
  "WHITINSVILLE": [
    "01588",
    "MA"
  ],
  "SUTTON": [
    "99674",
    "AK"
  ],
  "WORCESTER": [
    "19490",
    "PA"
  ],
  "CHERRY VALLEY": [
    "72324",
    "AR"
  ],
  "PAXTON": [
    "69155",
    "NE"
  ],
  "FRAMINGHAM": [
    "01704",
    "MA"
  ],
  "VILLAGE OF NAGOG WOODS": [
    "01718",
    "MA"
  ],
  "BOXBOROUGH": [
    "01719",
    "MA"
  ],
  "ACTON": [
    "93510",
    "CA"
  ],
  "ASHLAND": [
    "97520",
    "OR"
  ],
  "BEDFORD": [
    "83112",
    "WY"
  ],
  "HANSCOM AFB": [
    "01731",
    "MA"
  ],
  "BOLTON": [
    "39041",
    "MS"
  ],
  "CARLISLE": [
    "72024",
    "AR"
  ],
  "CONCORD": [
    "94529",
    "CA"
  ],
  "FAYVILLE": [
    "01745",
    "MA"
  ],
  "HOLLISTON": [
    "01746",
    "MA"
  ],
  "HOPEDALE": [
    "61747",
    "IL"
  ],
  "HOPKINTON": [
    "52237",
    "IA"
  ],
  "HUDSON": [
    "82515",
    "WY"
  ],
  "MARLBOROUGH": [
    "06447",
    "CT"
  ],
  "MAYNARD": [
    "72444",
    "AR"
  ],
  "MENDON": [
    "84325",
    "UT"
  ],
  "MILFORD": [
    "96121",
    "CA"
  ],
  "NATICK": [
    "01760",
    "MA"
  ],
  "SHERBORN": [
    "01770",
    "MA"
  ],
  "SOUTHBOROUGH": [
    "01772",
    "MA"
  ],
  "LINCOLN": [
    "99147",
    "WA"
  ],
  "STOW": [
    "44224",
    "OH"
  ],
  "SUDBURY": [
    "01776",
    "MA"
  ],
  "WAYLAND": [
    "63472",
    "MO"
  ],
  "WOODVILLE": [
    "75979",
    "TX"
  ],
  "WOBURN": [
    "01888",
    "MA"
  ],
  "BURLINGTON": [
    "98233",
    "WA"
  ],
  "ANDOVER": [
    "67002",
    "KS"
  ],
  "BILLERICA": [
    "01822",
    "MA"
  ],
  "CHELMSFORD": [
    "01824",
    "MA"
  ],
  "DRACUT": [
    "01826",
    "MA"
  ],
  "DUNSTABLE": [
    "01827",
    "MA"
  ],
  "HAVERHILL": [
    "50120",
    "IA"
  ],
  "GEORGETOWN": [
    "95634",
    "CA"
  ],
  "GROVELAND": [
    "95321",
    "CA"
  ],
  "LAWRENCE": [
    "68957",
    "NE"
  ],
  "METHUEN": [
    "01844",
    "MA"
  ],
  "NORTH ANDOVER": [
    "01845",
    "MA"
  ],
  "LOWELL": [
    "97452",
    "OR"
  ],
  "MERRIMAC": [
    "53561",
    "WI"
  ],
  "NORTH BILLERICA": [
    "01862",
    "MA"
  ],
  "NORTH CHELMSFORD": [
    "01863",
    "MA"
  ],
  "NORTH READING": [
    "01889",
    "MA"
  ],
  "NUTTING LAKE": [
    "01865",
    "MA"
  ],
  "PINEHURST": [
    "83850",
    "ID"
  ],
  "READING": [
    "66868",
    "KS"
  ],
  "TEWKSBURY": [
    "01876",
    "MA"
  ],
  "TYNGSBORO": [
    "01879",
    "MA"
  ],
  "WAKEFIELD": [
    "70784",
    "LA"
  ],
  "WEST BOXFORD": [
    "01885",
    "MA"
  ],
  "WESTFORD": [
    "13488",
    "NY"
  ],
  "WILMINGTON": [
    "90748",
    "CA"
  ],
  "WINCHESTER": [
    "97495",
    "OR"
  ],
  "LYNN": [
    "72440",
    "AR"
  ],
  "SAUGUS": [
    "01906",
    "MA"
  ],
  "SWAMPSCOTT": [
    "01907",
    "MA"
  ],
  "NAHANT": [
    "01908",
    "MA"
  ],
  "AMESBURY": [
    "01913",
    "MA"
  ],
  "BEVERLY": [
    "99321",
    "WA"
  ],
  "BOXFORD": [
    "01921",
    "MA"
  ],
  "BYFIELD": [
    "01922",
    "MA"
  ],
  "DANVERS": [
    "61732",
    "IL"
  ],
  "ESSEX": [
    "92332",
    "CA"
  ],
  "GLOUCESTER": [
    "28528",
    "NC"
  ],
  "HAMILTON": [
    "98255",
    "WA"
  ],
  "HATHORNE": [
    "01937",
    "MA"
  ],
  "IPSWICH": [
    "57451",
    "SD"
  ],
  "LYNNFIELD": [
    "01940",
    "MA"
  ],
  "MANCHESTER": [
    "98353",
    "WA"
  ],
  "MARBLEHEAD": [
    "01945",
    "MA"
  ],
  "MIDDLETON": [
    "83644",
    "ID"
  ],
  "NEWBURYPORT": [
    "01950",
    "MA"
  ],
  "NEWBURY": [
    "44065",
    "OH"
  ],
  "SALISBURY": [
    "65281",
    "MO"
  ],
  "PEABODY": [
    "66866",
    "KS"
  ],
  "PRIDES CROSSING": [
    "01965",
    "MA"
  ],
  "ROCKPORT": [
    "98283",
    "WA"
  ],
  "ROWLEY": [
    "52329",
    "IA"
  ],
  "SALEM": [
    "97317",
    "OR"
  ],
  "SOUTH HAMILTON": [
    "01982",
    "MA"
  ],
  "TOPSFIELD": [
    "04490",
    "ME"
  ],
  "WENHAM": [
    "01984",
    "MA"
  ],
  "WEST NEWBURY": [
    "05085",
    "VT"
  ],
  "ACCORD": [
    "12404",
    "NY"
  ],
  "BELLINGHAM": [
    "98229",
    "WA"
  ],
  "BRANT ROCK": [
    "02020",
    "MA"
  ],
  "CANTON": [
    "75103",
    "TX"
  ],
  "COHASSET": [
    "55721",
    "MN"
  ],
  "DEDHAM": [
    "51440",
    "IA"
  ],
  "DOVER": [
    "83825",
    "ID"
  ],
  "EAST WALPOLE": [
    "02032",
    "MA"
  ],
  "FOXBORO": [
    "54836",
    "WI"
  ],
  "FRANKLIN": [
    "83237",
    "ID"
  ],
  "GREENBUSH": [
    "56726",
    "MN"
  ],
  "GREEN HARBOR": [
    "02041",
    "MA"
  ],
  "HINGHAM": [
    "59528",
    "MT"
  ],
  "HULL": [
    "77564",
    "TX"
  ],
  "HUMAROCK": [
    "02047",
    "MA"
  ],
  "MANSFIELD": [
    "98830",
    "WA"
  ],
  "MARSHFIELD": [
    "65706",
    "MO"
  ],
  "MARSHFIELD HILLS": [
    "02051",
    "MA"
  ],
  "MEDFIELD": [
    "02052",
    "MA"
  ],
  "MEDWAY": [
    "45341",
    "OH"
  ],
  "MILLIS": [
    "02054",
    "MA"
  ],
  "NORFOLK": [
    "68702",
    "NE"
  ],
  "NORTH MARSHFIELD": [
    "02059",
    "MA"
  ],
  "NORTH SCITUATE": [
    "02857",
    "RI"
  ],
  "NORWELL": [
    "02061",
    "MA"
  ],
  "NORWOOD": [
    "81423",
    "CO"
  ],
  "OCEAN BLUFF": [
    "02065",
    "MA"
  ],
  "SCITUATE": [
    "02066",
    "MA"
  ],
  "SHARON": [
    "73857",
    "OK"
  ],
  "SHELDONVILLE": [
    "02070",
    "MA"
  ],
  "SOUTH WALPOLE": [
    "02071",
    "MA"
  ],
  "STOUGHTON": [
    "53589",
    "WI"
  ],
  "WALPOLE": [
    "04573",
    "ME"
  ],
  "WESTWOOD": [
    "96137",
    "CA"
  ],
  "WRENTHAM": [
    "02093",
    "MA"
  ],
  "BOSTON": [
    "47324",
    "IN"
  ],
  "ROXBURY": [
    "67476",
    "KS"
  ],
  "ROXBURY CROSSING": [
    "02120",
    "MA"
  ],
  "DORCHESTER": [
    "68343",
    "NE"
  ],
  "DORCHESTER CENTER": [
    "02124",
    "MA"
  ],
  "MATTAPAN": [
    "02126",
    "MA"
  ],
  "CHARLESTOWN": [
    "47111",
    "IN"
  ],
  "JAMAICA PLAIN": [
    "02130",
    "MA"
  ],
  "ROSLINDALE": [
    "02131",
    "MA"
  ],
  "WEST ROXBURY": [
    "02132",
    "MA"
  ],
  "ALLSTON": [
    "02134",
    "MA"
  ],
  "BRIGHTON": [
    "80603",
    "CO"
  ],
  "HYDE PARK": [
    "84318",
    "UT"
  ],
  "READVILLE": [
    "02137",
    "MA"
  ],
  "CAMBRIDGE": [
    "83610",
    "ID"
  ],
  "SOMERVILLE": [
    "77879",
    "TX"
  ],
  "MALDEN": [
    "63863",
    "MO"
  ],
  "EVERETT": [
    "98213",
    "WA"
  ],
  "CHELSEA": [
    "74016",
    "OK"
  ],
  "REVERE": [
    "63465",
    "MO"
  ],
  "WINTHROP": [
    "98862",
    "WA"
  ],
  "MEDFORD": [
    "97504",
    "OR"
  ],
  "WEST MEDFORD": [
    "02156",
    "MA"
  ],
  "QUINCY": [
    "98848",
    "WA"
  ],
  "MELROSE": [
    "88124",
    "NM"
  ],
  "STONEHAM": [
    "80754",
    "CO"
  ],
  "BRAINTREE": [
    "02185",
    "MA"
  ],
  "MILTON": [
    "98354",
    "WA"
  ],
  "MILTON VILLAGE": [
    "02187",
    "MA"
  ],
  "WEYMOUTH": [
    "02188",
    "MA"
  ],
  "EAST WEYMOUTH": [
    "02189",
    "MA"
  ],
  "SOUTH WEYMOUTH": [
    "02190",
    "MA"
  ],
  "NORTH WEYMOUTH": [
    "02191",
    "MA"
  ],
  "EAST BOSTON": [
    "02228",
    "MA"
  ],
  "BROCKTON": [
    "59213",
    "MT"
  ],
  "AVON": [
    "81620",
    "CO"
  ],
  "BRIDGEWATER": [
    "57319",
    "SD"
  ],
  "BRYANTVILLE": [
    "02327",
    "MA"
  ],
  "CARVER": [
    "55315",
    "MN"
  ],
  "DUXBURY": [
    "02332",
    "MA"
  ],
  "EAST BRIDGEWATER": [
    "02333",
    "MA"
  ],
  "EASTON": [
    "98925",
    "WA"
  ],
  "ELMWOOD": [
    "68349",
    "NE"
  ],
  "HALIFAX": [
    "27839",
    "NC"
  ],
  "HANOVER": [
    "88041",
    "NM"
  ],
  "HANSON": [
    "42413",
    "KY"
  ],
  "HOLBROOK": [
    "86025",
    "AZ"
  ],
  "MIDDLEBORO": [
    "02349",
    "MA"
  ],
  "MANOMET": [
    "02345",
    "MA"
  ],
  "LAKEVILLE": [
    "55044",
    "MN"
  ],
  "MONPONSETT": [
    "02350",
    "MA"
  ],
  "ABINGTON": [
    "19001",
    "PA"
  ],
  "NORTH CARVER": [
    "02355",
    "MA"
  ],
  "NORTH EASTON": [
    "02357",
    "MA"
  ],
  "NORTH PEMBROKE": [
    "02358",
    "MA"
  ],
  "PEMBROKE": [
    "42266",
    "KY"
  ],
  "PLYMOUTH": [
    "99346",
    "WA"
  ],
  "KINGSTON": [
    "98346",
    "WA"
  ],
  "SOUTH CARVER": [
    "02366",
    "MA"
  ],
  "PLYMPTON": [
    "02367",
    "MA"
  ],
  "RANDOLPH": [
    "84064",
    "UT"
  ],
  "ROCKLAND": [
    "83271",
    "ID"
  ],
  "SOUTH EASTON": [
    "02375",
    "MA"
  ],
  "WEST BRIDGEWATER": [
    "02379",
    "MA"
  ],
  "WHITE HORSE BEACH": [
    "02381",
    "MA"
  ],
  "WHITMAN": [
    "69366",
    "NE"
  ],
  "LEXINGTON": [
    "97839",
    "OR"
  ],
  "BROOKLINE": [
    "65619",
    "MO"
  ],
  "BROOKLINE VILLAGE": [
    "02447",
    "MA"
  ],
  "WALTHAM": [
    "55982",
    "MN"
  ],
  "NORTH WALTHAM": [
    "02455",
    "MA"
  ],
  "NEW TOWN": [
    "58763",
    "ND"
  ],
  "BABSON PARK": [
    "33827",
    "FL"
  ],
  "NEWTON": [
    "84327",
    "UT"
  ],
  "NEWTON CENTER": [
    "02459",
    "MA"
  ],
  "NEWTONVILLE": [
    "12128",
    "NY"
  ],
  "NEWTON HIGHLANDS": [
    "02461",
    "MA"
  ],
  "NEWTON LOWER FALLS": [
    "02462",
    "MA"
  ],
  "NEWTON UPPER FALLS": [
    "02464",
    "MA"
  ],
  "WEST NEWTON": [
    "46183",
    "IN"
  ],
  "AUBURNDALE": [
    "54412",
    "WI"
  ],
  "CHESTNUT HILL": [
    "02467",
    "MA"
  ],
  "WABAN": [
    "02468",
    "MA"
  ],
  "WATERTOWN": [
    "57201",
    "SD"
  ],
  "ARLINGTON": [
    "98223",
    "WA"
  ],
  "ARLINGTON HEIGHTS": [
    "60006",
    "IL"
  ],
  "BELMONT": [
    "99104",
    "WA"
  ],
  "WAVERLEY": [
    "02479",
    "MA"
  ],
  "WELLESLEY HILLS": [
    "02481",
    "MA"
  ],
  "WELLESLEY": [
    "02482",
    "MA"
  ],
  "NEEDHAM": [
    "46162",
    "IN"
  ],
  "WESTON": [
    "97886",
    "OR"
  ],
  "NEEDHAM HEIGHTS": [
    "02494",
    "MA"
  ],
  "NONANTUM": [
    "02495",
    "MA"
  ],
  "BUZZARDS BAY": [
    "02542",
    "MA"
  ],
  "CATAUMET": [
    "02534",
    "MA"
  ],
  "CHILMARK": [
    "02535",
    "MA"
  ],
  "EAST FALMOUTH": [
    "02536",
    "MA"
  ],
  "EAST SANDWICH": [
    "02537",
    "MA"
  ],
  "EAST WAREHAM": [
    "02538",
    "MA"
  ],
  "EDGARTOWN": [
    "02539",
    "MA"
  ],
  "FALMOUTH": [
    "49632",
    "MI"
  ],
  "WOODS HOLE": [
    "02543",
    "MA"
  ],
  "MENEMSHA": [
    "02552",
    "MA"
  ],
  "MONUMENT BEACH": [
    "02553",
    "MA"
  ],
  "NANTUCKET": [
    "02584",
    "MA"
  ],
  "NORTH FALMOUTH": [
    "02556",
    "MA"
  ],
  "OAK BLUFFS": [
    "02557",
    "MA"
  ],
  "ONSET": [
    "02558",
    "MA"
  ],
  "POCASSET": [
    "73079",
    "OK"
  ],
  "SAGAMORE": [
    "16250",
    "PA"
  ],
  "SAGAMORE BEACH": [
    "02562",
    "MA"
  ],
  "SANDWICH": [
    "60548",
    "IL"
  ],
  "SIASCONSET": [
    "02564",
    "MA"
  ],
  "VINEYARD HAVEN": [
    "02568",
    "MA"
  ],
  "WAREHAM": [
    "02571",
    "MA"
  ],
  "WEST FALMOUTH": [
    "02574",
    "MA"
  ],
  "WEST TISBURY": [
    "02575",
    "MA"
  ],
  "WEST WAREHAM": [
    "02576",
    "MA"
  ],
  "HYANNIS": [
    "69350",
    "NE"
  ],
  "BARNSTABLE": [
    "02630",
    "MA"
  ],
  "BREWSTER": [
    "98812",
    "WA"
  ],
  "CENTERVILLE": [
    "98613",
    "WA"
  ],
  "CHATHAM": [
    "71226",
    "LA"
  ],
  "COTUIT": [
    "02635",
    "MA"
  ],
  "CUMMAQUID": [
    "02637",
    "MA"
  ],
  "DENNIS": [
    "76439",
    "TX"
  ],
  "DENNIS PORT": [
    "02639",
    "MA"
  ],
  "EAST DENNIS": [
    "02641",
    "MA"
  ],
  "EASTHAM": [
    "02642",
    "MA"
  ],
  "EAST ORLEANS": [
    "02643",
    "MA"
  ],
  "FORESTDALE": [
    "02824",
    "RI"
  ],
  "HARWICH": [
    "02645",
    "MA"
  ],
  "HARWICH PORT": [
    "02646",
    "MA"
  ],
  "HYANNIS PORT": [
    "02647",
    "MA"
  ],
  "MARSTONS MILLS": [
    "02648",
    "MA"
  ],
  "MASHPEE": [
    "02649",
    "MA"
  ],
  "NORTH CHATHAM": [
    "12132",
    "NY"
  ],
  "NORTH EASTHAM": [
    "02651",
    "MA"
  ],
  "NORTH TRURO": [
    "02652",
    "MA"
  ],
  "ORLEANS": [
    "95556",
    "CA"
  ],
  "OSTERVILLE": [
    "02655",
    "MA"
  ],
  "PROVINCETOWN": [
    "02657",
    "MA"
  ],
  "SOUTH CHATHAM": [
    "02659",
    "MA"
  ],
  "SOUTH DENNIS": [
    "08245",
    "NJ"
  ],
  "SOUTH HARWICH": [
    "02661",
    "MA"
  ],
  "SOUTH ORLEANS": [
    "02662",
    "MA"
  ],
  "SOUTH WELLFLEET": [
    "02663",
    "MA"
  ],
  "SOUTH YARMOUTH": [
    "02664",
    "MA"
  ],
  "TRURO": [
    "50257",
    "IA"
  ],
  "WELLFLEET": [
    "69170",
    "NE"
  ],
  "WEST BARNSTABLE": [
    "02668",
    "MA"
  ],
  "WEST CHATHAM": [
    "02669",
    "MA"
  ],
  "WEST DENNIS": [
    "02670",
    "MA"
  ],
  "WEST HARWICH": [
    "02671",
    "MA"
  ],
  "WEST HYANNISPORT": [
    "02672",
    "MA"
  ],
  "WEST YARMOUTH": [
    "02673",
    "MA"
  ],
  "YARMOUTH PORT": [
    "02675",
    "MA"
  ],
  "ASSONET": [
    "02702",
    "MA"
  ],
  "ATTLEBORO": [
    "02703",
    "MA"
  ],
  "CHARTLEY": [
    "02712",
    "MA"
  ],
  "CUTTYHUNK": [
    "02713",
    "MA"
  ],
  "DARTMOUTH": [
    "02714",
    "MA"
  ],
  "DIGHTON": [
    "67839",
    "KS"
  ],
  "EAST FREETOWN": [
    "02717",
    "MA"
  ],
  "EAST TAUNTON": [
    "02718",
    "MA"
  ],
  "FAIRHAVEN": [
    "02719",
    "MA"
  ],
  "FALL RIVER": [
    "67047",
    "KS"
  ],
  "SOMERSET": [
    "95684",
    "CA"
  ],
  "MARION": [
    "78124",
    "TX"
  ],
  "MATTAPOISETT": [
    "02739",
    "MA"
  ],
  "NEW BEDFORD": [
    "61346",
    "IL"
  ],
  "ACUSHNET": [
    "02743",
    "MA"
  ],
  "NORTH DARTMOUTH": [
    "02747",
    "MA"
  ],
  "SOUTH DARTMOUTH": [
    "02748",
    "MA"
  ],
  "NORTH ATTLEBORO": [
    "02761",
    "MA"
  ],
  "PLAINVILLE": [
    "67663",
    "KS"
  ],
  "ATTLEBORO FALLS": [
    "02763",
    "MA"
  ],
  "NORTH DIGHTON": [
    "02764",
    "MA"
  ],
  "NORTON": [
    "67654",
    "KS"
  ],
  "RAYNHAM": [
    "02767",
    "MA"
  ],
  "RAYNHAM CENTER": [
    "02768",
    "MA"
  ],
  "REHOBOTH": [
    "87322",
    "NM"
  ],
  "ROCHESTER": [
    "98579",
    "WA"
  ],
  "SEEKONK": [
    "02771",
    "MA"
  ],
  "SWANSEA": [
    "29160",
    "SC"
  ],
  "BERKLEY": [
    "48072",
    "MI"
  ],
  "TAUNTON": [
    "56291",
    "MN"
  ],
  "WESTPORT": [
    "98595",
    "WA"
  ],
  "WESTPORT POINT": [
    "02791",
    "MA"
  ],
  "ADAMSVILLE": [
    "43802",
    "OH"
  ],
  "ALBION": [
    "99102",
    "WA"
  ],
  "ASHAWAY": [
    "02804",
    "RI"
  ],
  "BARRINGTON": [
    "60011",
    "IL"
  ],
  "BLOCK ISLAND": [
    "02807",
    "RI"
  ],
  "BRADFORD": [
    "72020",
    "AR"
  ],
  "BRISTOL": [
    "60512",
    "IL"
  ],
  "CAROLINA": [
    "02812",
    "RI"
  ],
  "CHEPACHET": [
    "02814",
    "RI"
  ],
  "CLAYVILLE": [
    "13322",
    "NY"
  ],
  "COVENTRY": [
    "06238",
    "CT"
  ],
  "WEST GREENWICH": [
    "02817",
    "RI"
  ],
  "EAST GREENWICH": [
    "02818",
    "RI"
  ],
  "EXETER": [
    "93221",
    "CA"
  ],
  "FISKEVILLE": [
    "02823",
    "RI"
  ],
  "FOSTER": [
    "97345",
    "OR"
  ],
  "GREENE": [
    "50636",
    "IA"
  ],
  "GREENVILLE": [
    "95947",
    "CA"
  ],
  "HARMONY": [
    "93435",
    "CA"
  ],
  "HARRISVILLE": [
    "48740",
    "MI"
  ],
  "HOPE": [
    "99605",
    "AK"
  ],
  "HOPE VALLEY": [
    "02832",
    "RI"
  ],
  "JAMESTOWN": [
    "95327",
    "CA"
  ],
  "KENYON": [
    "55946",
    "MN"
  ],
  "LITTLE COMPTON": [
    "02837",
    "RI"
  ],
  "MANVILLE": [
    "82227",
    "WY"
  ],
  "MAPLEVILLE": [
    "02839",
    "RI"
  ],
  "NEWPORT": [
    "99156",
    "WA"
  ],
  "MIDDLETOWN": [
    "95461",
    "CA"
  ],
  "NORTH KINGSTOWN": [
    "02852",
    "RI"
  ],
  "OAKLAND": [
    "97462",
    "OR"
  ],
  "PASCOAG": [
    "02859",
    "RI"
  ],
  "PAWTUCKET": [
    "02862",
    "RI"
  ],
  "CENTRAL FALLS": [
    "02863",
    "RI"
  ],
  "CUMBERLAND": [
    "54829",
    "WI"
  ],
  "PORTSMOUTH": [
    "51565",
    "IA"
  ],
  "PRUDENCE ISLAND": [
    "02872",
    "RI"
  ],
  "ROCKVILLE": [
    "84763",
    "UT"
  ],
  "SAUNDERSTOWN": [
    "02874",
    "RI"
  ],
  "SHANNOCK": [
    "02875",
    "RI"
  ],
  "SLATERSVILLE": [
    "02876",
    "RI"
  ],
  "SLOCUM": [
    "02877",
    "RI"
  ],
  "TIVERTON": [
    "02878",
    "RI"
  ],
  "NARRAGANSETT": [
    "02882",
    "RI"
  ],
  "PEACE DALE": [
    "02883",
    "RI"
  ],
  "WESTERLY": [
    "02891",
    "RI"
  ],
  "WEST KINGSTON": [
    "02892",
    "RI"
  ],
  "WEST WARWICK": [
    "02893",
    "RI"
  ],
  "WOOD RIVER JUNCTION": [
    "02894",
    "RI"
  ],
  "WOONSOCKET": [
    "57385",
    "SD"
  ],
  "NORTH SMITHFIELD": [
    "02896",
    "RI"
  ],
  "WYOMING": [
    "61491",
    "IL"
  ],
  "PROVIDENCE": [
    "84332",
    "UT"
  ],
  "CRANSTON": [
    "02921",
    "RI"
  ],
  "NORTH PROVIDENCE": [
    "02911",
    "RI"
  ],
  "EAST PROVIDENCE": [
    "02914",
    "RI"
  ],
  "RIVERSIDE": [
    "98849",
    "WA"
  ],
  "RUMFORD": [
    "04276",
    "ME"
  ],
  "SMITHFIELD": [
    "84335",
    "UT"
  ],
  "JOHNSTON": [
    "50131",
    "IA"
  ],
  "CANDIA": [
    "03034",
    "NH"
  ],
  "DERRY": [
    "87933",
    "NM"
  ],
  "EAST DERRY": [
    "03041",
    "NH"
  ],
  "EPPING": [
    "58843",
    "ND"
  ],
  "FRANCESTOWN": [
    "03043",
    "NH"
  ],
  "FREMONT": [
    "94555",
    "CA"
  ],
  "GOFFSTOWN": [
    "03045",
    "NH"
  ],
  "DUNBARTON": [
    "03046",
    "NH"
  ],
  "HOLLIS": [
    "73550",
    "OK"
  ],
  "LITCHFIELD": [
    "96117",
    "CA"
  ],
  "LONDONDERRY": [
    "45647",
    "OH"
  ],
  "MERRIMACK": [
    "03054",
    "NH"
  ],
  "MONT VERNON": [
    "03057",
    "NH"
  ],
  "NASHUA": [
    "59248",
    "MT"
  ],
  "NEW BOSTON": [
    "75570",
    "TX"
  ],
  "NEW IPSWICH": [
    "03071",
    "NH"
  ],
  "NORTH SALEM": [
    "46165",
    "IN"
  ],
  "PELHAM": [
    "37366",
    "TN"
  ],
  "RAYMOND": [
    "98577",
    "WA"
  ],
  "LYNDEBOROUGH": [
    "03082",
    "NH"
  ],
  "TEMPLE": [
    "76508",
    "TX"
  ],
  "WILTON": [
    "95693",
    "CA"
  ],
  "WINDHAM": [
    "44288",
    "OH"
  ],
  "HOOKSETT": [
    "03106",
    "NH"
  ],
  "WATERVILLE VALLEY": [
    "03215",
    "NH"
  ],
  "BARNSTEAD": [
    "03218",
    "NH"
  ],
  "CAMPTON": [
    "41301",
    "KY"
  ],
  "CANTERBURY": [
    "06331",
    "CT"
  ],
  "CENTER BARNSTEAD": [
    "03225",
    "NH"
  ],
  "CENTER HARBOR": [
    "03226",
    "NH"
  ],
  "CENTER SANDWICH": [
    "03227",
    "NH"
  ],
  "CONTOOCOOK": [
    "03229",
    "NH"
  ],
  "DANBURY": [
    "77534",
    "TX"
  ],
  "EAST ANDOVER": [
    "04226",
    "ME"
  ],
  "ELKINS": [
    "72727",
    "AR"
  ],
  "EPSOM": [
    "03234",
    "NH"
  ],
  "GILMANTON": [
    "54743",
    "WI"
  ],
  "HEBRON": [
    "68370",
    "NE"
  ],
  "HENNIKER": [
    "03242",
    "NH"
  ],
  "HILL": [
    "03243",
    "NH"
  ],
  "HILLSBOROUGH": [
    "27278",
    "NC"
  ],
  "HOLDERNESS": [
    "03245",
    "NH"
  ],
  "LACONIA": [
    "47135",
    "IN"
  ],
  "GILFORD": [
    "03249",
    "NH"
  ],
  "LOCHMERE": [
    "03252",
    "NH"
  ],
  "MEREDITH": [
    "81642",
    "CO"
  ],
  "MOULTONBOROUGH": [
    "03254",
    "NH"
  ],
  "NEW HAMPTON": [
    "64471",
    "MO"
  ],
  "NEW LONDON": [
    "75682",
    "TX"
  ],
  "CHICHESTER": [
    "12416",
    "NY"
  ],
  "NORTH SANDWICH": [
    "03259",
    "NH"
  ],
  "NORTH SUTTON": [
    "03260",
    "NH"
  ],
  "NORTHWOOD": [
    "58267",
    "ND"
  ],
  "NORTH WOODSTOCK": [
    "03262",
    "NH"
  ],
  "RUMNEY": [
    "03266",
    "NH"
  ],
  "SANBORNTON": [
    "03269",
    "NH"
  ],
  "SOUTH NEWBURY": [
    "03272",
    "NH"
  ],
  "SOUTH SUTTON": [
    "03273",
    "NH"
  ],
  "SUNCOOK": [
    "03275",
    "NH"
  ],
  "TILTON": [
    "61833",
    "IL"
  ],
  "WARNER": [
    "74469",
    "OK"
  ],
  "WASHINGTON": [
    "95986",
    "CA"
  ],
  "WEARE": [
    "03281",
    "NH"
  ],
  "WENTWORTH": [
    "64873",
    "MO"
  ],
  "THORNTON": [
    "99176",
    "WA"
  ],
  "WILMOT": [
    "71676",
    "AR"
  ],
  "WINNISQUAM": [
    "03289",
    "NH"
  ],
  "NOTTINGHAM": [
    "21236",
    "MD"
  ],
  "WEST NOTTINGHAM": [
    "03291",
    "NH"
  ],
  "WOODSTOCK": [
    "60098",
    "IL"
  ],
  "BOW": [
    "98232",
    "WA"
  ],
  "LOUDON": [
    "37774",
    "TN"
  ],
  "KEENE": [
    "93531",
    "CA"
  ],
  "ANTRIM": [
    "03440",
    "NH"
  ],
  "ASHUELOT": [
    "03441",
    "NH"
  ],
  "BENNINGTON": [
    "74723",
    "OK"
  ],
  "DUBLIN": [
    "94568",
    "CA"
  ],
  "SULLIVAN": [
    "63080",
    "MO"
  ],
  "SWANZEY": [
    "03446",
    "NH"
  ],
  "FITZWILLIAM": [
    "03447",
    "NH"
  ],
  "GILSUM": [
    "03448",
    "NH"
  ],
  "HANCOCK": [
    "56244",
    "MN"
  ],
  "JAFFREY": [
    "03452",
    "NH"
  ],
  "MARLOW": [
    "73055",
    "OK"
  ],
  "NELSON": [
    "95958",
    "CA"
  ],
  "PETERBOROUGH": [
    "03458",
    "NH"
  ],
  "RINDGE": [
    "03461",
    "NH"
  ],
  "SPOFFORD": [
    "03462",
    "NH"
  ],
  "STODDARD": [
    "54658",
    "WI"
  ],
  "TROY": [
    "83871",
    "ID"
  ],
  "WESTMORELAND": [
    "66549",
    "KS"
  ],
  "WEST PETERBOROUGH": [
    "03468",
    "NH"
  ],
  "WEST SWANZEY": [
    "03469",
    "NH"
  ],
  "BETHLEHEM": [
    "40007",
    "KY"
  ],
  "BRETTON WOODS": [
    "03575",
    "NH"
  ],
  "COLEBROOK": [
    "06021",
    "CT"
  ],
  "ERROL": [
    "03579",
    "NH"
  ],
  "FRANCONIA": [
    "18924",
    "PA"
  ],
  "GORHAM": [
    "67640",
    "KS"
  ],
  "GROVETON": [
    "75845",
    "TX"
  ],
  "LISBON": [
    "71048",
    "LA"
  ],
  "SUGAR HILL": [
    "03586",
    "NH"
  ],
  "MILAN": [
    "87021",
    "NM"
  ],
  "MOUNT WASHINGTON": [
    "40047",
    "KY"
  ],
  "NORTH STRATFORD": [
    "03590",
    "NH"
  ],
  "PITTSBURG": [
    "94565",
    "CA"
  ],
  "TWIN MOUNTAIN": [
    "03595",
    "NH"
  ],
  "WEST STEWARTSTOWN": [
    "03597",
    "NH"
  ],
  "WHITEFIELD": [
    "74472",
    "OK"
  ],
  "ACWORTH": [
    "30102",
    "GA"
  ],
  "ALSTEAD": [
    "03602",
    "NH"
  ],
  "DREWSVILLE": [
    "03604",
    "NH"
  ],
  "LEMPSTER": [
    "03605",
    "NH"
  ],
  "SOUTH ACWORTH": [
    "03607",
    "NH"
  ],
  "NORTH WALPOLE": [
    "03609",
    "NH"
  ],
  "BATH": [
    "62617",
    "IL"
  ],
  "CANAAN": [
    "47224",
    "IN"
  ],
  "CLAREMONT": [
    "91711",
    "CA"
  ],
  "CORNISH": [
    "84308",
    "UT"
  ],
  "CORNISH FLAT": [
    "03746",
    "NH"
  ],
  "ENFIELD": [
    "62835",
    "IL"
  ],
  "ENFIELD CENTER": [
    "03749",
    "NH"
  ],
  "ETNA": [
    "96027",
    "CA"
  ],
  "GEORGES MILLS": [
    "03751",
    "NH"
  ],
  "GRANTHAM": [
    "17027",
    "PA"
  ],
  "GUILD": [
    "37340",
    "TN"
  ],
  "LEBANON": [
    "97355",
    "OR"
  ],
  "LYME": [
    "03768",
    "NH"
  ],
  "LYME CENTER": [
    "03769",
    "NH"
  ],
  "MERIDEN": [
    "66512",
    "KS"
  ],
  "MONROE": [
    "98272",
    "WA"
  ],
  "NORTH HAVERHILL": [
    "03774",
    "NH"
  ],
  "ORFORD": [
    "03777",
    "NH"
  ],
  "PIERMONT": [
    "10968",
    "NY"
  ],
  "PIKE": [
    "14130",
    "NY"
  ],
  "SUNAPEE": [
    "03782",
    "NH"
  ],
  "WEST LEBANON": [
    "47991",
    "IN"
  ],
  "WOODSVILLE": [
    "03785",
    "NH"
  ],
  "ALTON": [
    "84710",
    "UT"
  ],
  "ALTON BAY": [
    "03810",
    "NH"
  ],
  "ATKINSON": [
    "68713",
    "NE"
  ],
  "BARTLETT": [
    "76511",
    "TX"
  ],
  "CENTER CONWAY": [
    "03813",
    "NH"
  ],
  "CENTER OSSIPEE": [
    "03814",
    "NH"
  ],
  "CENTER STRAFFORD": [
    "03815",
    "NH"
  ],
  "CENTER TUFTONBORO": [
    "03816",
    "NH"
  ],
  "CHOCORUA": [
    "03817",
    "NH"
  ],
  "DANVILLE": [
    "99121",
    "WA"
  ],
  "MADBURY": [
    "03823",
    "NH"
  ],
  "DURHAM": [
    "95938",
    "CA"
  ],
  "EAST HAMPSTEAD": [
    "03826",
    "NH"
  ],
  "EAST KINGSTON": [
    "03827",
    "NH"
  ],
  "EAST WAKEFIELD": [
    "03830",
    "NH"
  ],
  "EATON CENTER": [
    "03832",
    "NH"
  ],
  "FARMINGTON": [
    "99128",
    "WA"
  ],
  "FREEDOM": [
    "95019",
    "CA"
  ],
  "GILMANTON IRON WORKS": [
    "03837",
    "NH"
  ],
  "GLEN": [
    "59732",
    "MT"
  ],
  "GREENLAND": [
    "72737",
    "AR"
  ],
  "HAMPSTEAD": [
    "28443",
    "NC"
  ],
  "HAMPTON": [
    "71744",
    "AR"
  ],
  "HAMPTON FALLS": [
    "03844",
    "NH"
  ],
  "INTERVALE": [
    "03845",
    "NH"
  ],
  "JACKSON": [
    "95642",
    "CA"
  ],
  "KEARSARGE": [
    "03847",
    "NH"
  ],
  "MADISON": [
    "95653",
    "CA"
  ],
  "MELVIN VILLAGE": [
    "03850",
    "NH"
  ],
  "MILTON MILLS": [
    "03852",
    "NH"
  ],
  "MIRROR LAKE": [
    "03853",
    "NH"
  ],
  "NEW CASTLE": [
    "81647",
    "CO"
  ],
  "NEW DURHAM": [
    "03855",
    "NH"
  ],
  "NEWFIELDS": [
    "03856",
    "NH"
  ],
  "NEWMARKET": [
    "03857",
    "NH"
  ],
  "NEWTON JUNCTION": [
    "03859",
    "NH"
  ],
  "NORTH CONWAY": [
    "03860",
    "NH"
  ],
  "NORTH HAMPTON": [
    "45349",
    "OH"
  ],
  "OSSIPEE": [
    "03864",
    "NH"
  ],
  "PLAISTOW": [
    "03865",
    "NH"
  ],
  "ROLLINSFORD": [
    "03869",
    "NH"
  ],
  "RYE": [
    "81069",
    "CO"
  ],
  "RYE BEACH": [
    "03871",
    "NH"
  ],
  "SANBORNVILLE": [
    "03872",
    "NH"
  ],
  "SANDOWN": [
    "03873",
    "NH"
  ],
  "SEABROOK": [
    "77586",
    "TX"
  ],
  "SILVER LAKE": [
    "97638",
    "OR"
  ],
  "SOMERSWORTH": [
    "03878",
    "NH"
  ],
  "EFFINGHAM": [
    "66023",
    "KS"
  ],
  "SOUTH TAMWORTH": [
    "03883",
    "NH"
  ],
  "STRAFFORD": [
    "65757",
    "MO"
  ],
  "STRATHAM": [
    "03885",
    "NH"
  ],
  "TAMWORTH": [
    "03886",
    "NH"
  ],
  "UNION": [
    "98592",
    "WA"
  ],
  "WEST OSSIPEE": [
    "03890",
    "NH"
  ],
  "WOLFEBORO": [
    "03894",
    "NH"
  ],
  "WOLFEBORO FALLS": [
    "03896",
    "NH"
  ],
  "WONALANCET": [
    "03897",
    "NH"
  ],
  "BERWICK": [
    "70342",
    "LA"
  ],
  "CAPE NEDDICK": [
    "03902",
    "ME"
  ],
  "ELIOT": [
    "03903",
    "ME"
  ],
  "KITTERY": [
    "03904",
    "ME"
  ],
  "KITTERY POINT": [
    "03905",
    "ME"
  ],
  "NORTH BERWICK": [
    "03906",
    "ME"
  ],
  "OGUNQUIT": [
    "03907",
    "ME"
  ],
  "SOUTH BERWICK": [
    "03908",
    "ME"
  ],
  "YORK": [
    "68467",
    "NE"
  ],
  "YORK BEACH": [
    "03910",
    "ME"
  ],
  "YORK HARBOR": [
    "03911",
    "ME"
  ],
  "ALFRED": [
    "14802",
    "NY"
  ],
  "BAILEY ISLAND": [
    "04003",
    "ME"
  ],
  "BAR MILLS": [
    "04004",
    "ME"
  ],
  "BIDDEFORD": [
    "04005",
    "ME"
  ],
  "BIDDEFORD POOL": [
    "04006",
    "ME"
  ],
  "BOWDOINHAM": [
    "04008",
    "ME"
  ],
  "BRIDGTON": [
    "04009",
    "ME"
  ],
  "BROWNFIELD": [
    "79316",
    "TX"
  ],
  "BRUNSWICK": [
    "68720",
    "NE"
  ],
  "BUSTINS ISLAND": [
    "04013",
    "ME"
  ],
  "CAPE PORPOISE": [
    "04014",
    "ME"
  ],
  "CASCO": [
    "54205",
    "WI"
  ],
  "CENTER LOVELL": [
    "04016",
    "ME"
  ],
  "CHEBEAGUE ISLAND": [
    "04017",
    "ME"
  ],
  "CUMBERLAND CENTER": [
    "04021",
    "ME"
  ],
  "DENMARK": [
    "54208",
    "WI"
  ],
  "EAST BALDWIN": [
    "04024",
    "ME"
  ],
  "EAST PARSONSFIELD": [
    "04028",
    "ME"
  ],
  "SEBAGO": [
    "04029",
    "ME"
  ],
  "EAST WATERBORO": [
    "04030",
    "ME"
  ],
  "FREEPORT": [
    "77542",
    "TX"
  ],
  "FRYEBURG": [
    "04037",
    "ME"
  ],
  "GRAY": [
    "70359",
    "LA"
  ],
  "HARRISON": [
    "83833",
    "ID"
  ],
  "HIRAM": [
    "44234",
    "OH"
  ],
  "HOLLIS CENTER": [
    "04042",
    "ME"
  ],
  "KENNEBUNK": [
    "04043",
    "ME"
  ],
  "KENNEBUNKPORT": [
    "04046",
    "ME"
  ],
  "PARSONSFIELD": [
    "04047",
    "ME"
  ],
  "LIMERICK": [
    "04048",
    "ME"
  ],
  "LIMINGTON": [
    "04049",
    "ME"
  ],
  "LONG ISLAND": [
    "67647",
    "KS"
  ],
  "LOVELL": [
    "82431",
    "WY"
  ],
  "MOODY": [
    "76557",
    "TX"
  ],
  "NAPLES": [
    "83847",
    "ID"
  ],
  "NEWFIELD": [
    "14867",
    "NY"
  ],
  "NORTH BRIDGTON": [
    "04057",
    "ME"
  ],
  "NORTH WATERBORO": [
    "04061",
    "ME"
  ],
  "OCEAN PARK": [
    "98640",
    "WA"
  ],
  "OLD ORCHARD BEACH": [
    "04064",
    "ME"
  ],
  "ORRS ISLAND": [
    "04066",
    "ME"
  ],
  "PORTER": [
    "77365",
    "TX"
  ],
  "POWNAL": [
    "05261",
    "VT"
  ],
  "SCARBOROUGH": [
    "04074",
    "ME"
  ],
  "SACO": [
    "59261",
    "MT"
  ],
  "SANFORD": [
    "81151",
    "CO"
  ],
  "SHAPLEIGH": [
    "04076",
    "ME"
  ],
  "SOUTH CASCO": [
    "04077",
    "ME"
  ],
  "SOUTH FREEPORT": [
    "04078",
    "ME"
  ],
  "HARPSWELL": [
    "04079",
    "ME"
  ],
  "SOUTH WINDHAM": [
    "06266",
    "CT"
  ],
  "SPRINGVALE": [
    "04083",
    "ME"
  ],
  "STANDISH": [
    "96128",
    "CA"
  ],
  "STEEP FALLS": [
    "04085",
    "ME"
  ],
  "TOPSHAM": [
    "05076",
    "VT"
  ],
  "WATERBORO": [
    "04087",
    "ME"
  ],
  "WATERFORD": [
    "95386",
    "CA"
  ],
  "WELLS": [
    "89835",
    "NV"
  ],
  "WEST BALDWIN": [
    "04091",
    "ME"
  ],
  "WESTBROOK": [
    "79565",
    "TX"
  ],
  "BUXTON": [
    "97109",
    "OR"
  ],
  "WEST KENNEBUNK": [
    "04094",
    "ME"
  ],
  "WEST NEWFIELD": [
    "04095",
    "ME"
  ],
  "YARMOUTH": [
    "52660",
    "IA"
  ],
  "NORTH YARMOUTH": [
    "04097",
    "ME"
  ],
  "PORTLAND": [
    "97298",
    "OR"
  ],
  "SOUTH PORTLAND": [
    "04116",
    "ME"
  ],
  "CAPE ELIZABETH": [
    "04107",
    "ME"
  ],
  "PEAKS ISLAND": [
    "04108",
    "ME"
  ],
  "CUMBERLAND FORESIDE": [
    "04110",
    "ME"
  ],
  "BETHEL": [
    "99559",
    "AK"
  ],
  "BRYANT POND": [
    "04219",
    "ME"
  ],
  "BUCKFIELD": [
    "04220",
    "ME"
  ],
  "DIXFIELD": [
    "04224",
    "ME"
  ],
  "DRYDEN": [
    "98821",
    "WA"
  ],
  "EAST DIXFIELD": [
    "04227",
    "ME"
  ],
  "EAST LIVERMORE": [
    "04228",
    "ME"
  ],
  "EAST POLAND": [
    "04230",
    "ME"
  ],
  "EAST WILTON": [
    "04234",
    "ME"
  ],
  "JAY": [
    "74346",
    "OK"
  ],
  "LEWISTON": [
    "96052",
    "CA"
  ],
  "LISBON FALLS": [
    "04252",
    "ME"
  ],
  "LIVERMORE": [
    "94551",
    "CA"
  ],
  "LIVERMORE FALLS": [
    "04254",
    "ME"
  ],
  "GREENWOOD": [
    "95635",
    "CA"
  ],
  "MECHANIC FALLS": [
    "04256",
    "ME"
  ],
  "MEXICO": [
    "65265",
    "MO"
  ],
  "MINOT": [
    "58707",
    "ND"
  ],
  "MONMOUTH": [
    "97361",
    "OR"
  ],
  "NEW GLOUCESTER": [
    "04260",
    "ME"
  ],
  "NEWRY": [
    "29665",
    "SC"
  ],
  "NORTH JAY": [
    "04262",
    "ME"
  ],
  "NORTH MONMOUTH": [
    "04265",
    "ME"
  ],
  "NORTH TURNER": [
    "04266",
    "ME"
  ],
  "NORTH WATERFORD": [
    "04267",
    "ME"
  ],
  "NORWAY": [
    "66961",
    "KS"
  ],
  "PARIS": [
    "83261",
    "ID"
  ],
  "POLAND": [
    "47868",
    "IN"
  ],
  "SABATTUS": [
    "04280",
    "ME"
  ],
  "SOUTH PARIS": [
    "04281",
    "ME"
  ],
  "TURNER": [
    "97392",
    "OR"
  ],
  "WAYNE": [
    "73095",
    "OK"
  ],
  "WELD": [
    "04285",
    "ME"
  ],
  "WEST BETHEL": [
    "04286",
    "ME"
  ],
  "BOWDOIN": [
    "04287",
    "ME"
  ],
  "WEST MINOT": [
    "04288",
    "ME"
  ],
  "WEST PARIS": [
    "04289",
    "ME"
  ],
  "PERU": [
    "68421",
    "NE"
  ],
  "WEST POLAND": [
    "04291",
    "ME"
  ],
  "SUMNER": [
    "98390",
    "WA"
  ],
  "AUGUSTA": [
    "72006",
    "AR"
  ],
  "COOPERS MILLS": [
    "04341",
    "ME"
  ],
  "DRESDEN": [
    "67635",
    "KS"
  ],
  "EAST WINTHROP": [
    "04343",
    "ME"
  ],
  "FARMINGDALE": [
    "11735",
    "NY"
  ],
  "GARDINER": [
    "97441",
    "OR"
  ],
  "HALLOWELL": [
    "04347",
    "ME"
  ],
  "KENTS HILL": [
    "04349",
    "ME"
  ],
  "MOUNT VERNON": [
    "98274",
    "WA"
  ],
  "PALERMO": [
    "95968",
    "CA"
  ],
  "READFIELD": [
    "54969",
    "WI"
  ],
  "SOUTH CHINA": [
    "04358",
    "ME"
  ],
  "SOUTH GARDINER": [
    "04359",
    "ME"
  ],
  "VIENNA": [
    "65582",
    "MO"
  ],
  "BANGOR": [
    "95914",
    "CA"
  ],
  "ABBOT": [
    "04406",
    "ME"
  ],
  "AURORA": [
    "97002",
    "OR"
  ],
  "BRADLEY": [
    "93426",
    "CA"
  ],
  "BREWER": [
    "04412",
    "ME"
  ],
  "BROOKTON": [
    "04413",
    "ME"
  ],
  "BROWNVILLE": [
    "68321",
    "NE"
  ],
  "BROWNVILLE JUNCTION": [
    "04415",
    "ME"
  ],
  "BUCKSPORT": [
    "04416",
    "ME"
  ],
  "CARMEL": [
    "93923",
    "CA"
  ],
  "CASTINE": [
    "04421",
    "ME"
  ],
  "CHARLESTON": [
    "72933",
    "AR"
  ],
  "DANFORTH": [
    "60930",
    "IL"
  ],
  "DOVER FOXCROFT": [
    "04426",
    "ME"
  ],
  "CORINTH": [
    "41010",
    "KY"
  ],
  "EDDINGTON": [
    "04428",
    "ME"
  ],
  "EAST MILLINOCKET": [
    "04430",
    "ME"
  ],
  "EAST ORLAND": [
    "04431",
    "ME"
  ],
  "FRANKFORT": [
    "66427",
    "KS"
  ],
  "GREENVILLE JUNCTION": [
    "04442",
    "ME"
  ],
  "GUILFORD": [
    "64457",
    "MO"
  ],
  "HOWLAND": [
    "04448",
    "ME"
  ],
  "KENDUSKEAG": [
    "04450",
    "ME"
  ],
  "KINGMAN": [
    "86409",
    "AZ"
  ],
  "LAGRANGE": [
    "82221",
    "WY"
  ],
  "LEVANT": [
    "67743",
    "KS"
  ],
  "MATTAWAMKEAG": [
    "04459",
    "ME"
  ],
  "MILLINOCKET": [
    "04462",
    "ME"
  ],
  "MILO": [
    "64767",
    "MO"
  ],
  "OLD TOWN": [
    "32680",
    "FL"
  ],
  "ORONO": [
    "04473",
    "ME"
  ],
  "ORIENT": [
    "99160",
    "WA"
  ],
  "ORLAND": [
    "95963",
    "CA"
  ],
  "ORRINGTON": [
    "04474",
    "ME"
  ],
  "PASSADUMKEAG": [
    "04475",
    "ME"
  ],
  "PENOBSCOT": [
    "04476",
    "ME"
  ],
  "ROCKWOOD": [
    "76873",
    "TX"
  ],
  "SANGERVILLE": [
    "04479",
    "ME"
  ],
  "SEBEC": [
    "04481",
    "ME"
  ],
  "SHIRLEY MILLS": [
    "04485",
    "ME"
  ],
  "STETSON": [
    "04488",
    "ME"
  ],
  "STILLWATER": [
    "74078",
    "OK"
  ],
  "VANCEBORO": [
    "28586",
    "NC"
  ],
  "WAITE": [
    "04492",
    "ME"
  ],
  "WEST ENFIELD": [
    "04493",
    "ME"
  ],
  "WINN": [
    "48896",
    "MI"
  ],
  "WINTERPORT": [
    "04496",
    "ME"
  ],
  "WYTOPITLOCK": [
    "04497",
    "ME"
  ],
  "ALNA": [
    "04535",
    "ME"
  ],
  "BOOTHBAY": [
    "04537",
    "ME"
  ],
  "BOOTHBAY HARBOR": [
    "04538",
    "ME"
  ],
  "CHAMBERLAIN": [
    "57326",
    "SD"
  ],
  "DAMARISCOTTA": [
    "04543",
    "ME"
  ],
  "EAST BOOTHBAY": [
    "04544",
    "ME"
  ],
  "FRIENDSHIP": [
    "53934",
    "WI"
  ],
  "ISLE OF SPRINGS": [
    "04549",
    "ME"
  ],
  "BREMEN": [
    "66412",
    "KS"
  ],
  "NEWCASTLE": [
    "95658",
    "CA"
  ],
  "NEW HARBOR": [
    "04554",
    "ME"
  ],
  "NOBLEBORO": [
    "04555",
    "ME"
  ],
  "EDGECOMB": [
    "04556",
    "ME"
  ],
  "PEMAQUID": [
    "04558",
    "ME"
  ],
  "PHIPPSBURG": [
    "80469",
    "CO"
  ],
  "CUSHING": [
    "75760",
    "TX"
  ],
  "ROUND POND": [
    "04564",
    "ME"
  ],
  "SEBASCO ESTATES": [
    "04565",
    "ME"
  ],
  "SOUTH BRISTOL": [
    "04568",
    "ME"
  ],
  "SQUIRREL ISLAND": [
    "04570",
    "ME"
  ],
  "TREVETT": [
    "04571",
    "ME"
  ],
  "WALDOBORO": [
    "04572",
    "ME"
  ],
  "WEST BOOTHBAY HARBOR": [
    "04575",
    "ME"
  ],
  "SOUTHPORT": [
    "28461",
    "NC"
  ],
  "WISCASSET": [
    "04578",
    "ME"
  ],
  "WOOLWICH": [
    "04579",
    "ME"
  ],
  "ELLSWORTH": [
    "69340",
    "NE"
  ],
  "ADDISON": [
    "75001",
    "TX"
  ],
  "GOULDSBORO": [
    "18424",
    "PA"
  ],
  "BAR HARBOR": [
    "04609",
    "ME"
  ],
  "BEALS": [
    "04611",
    "ME"
  ],
  "BERNARD": [
    "52032",
    "IA"
  ],
  "BIRCH HARBOR": [
    "04613",
    "ME"
  ],
  "BLUE HILL": [
    "68930",
    "NE"
  ],
  "BROOKLIN": [
    "04616",
    "ME"
  ],
  "BROOKSVILLE": [
    "41004",
    "KY"
  ],
  "CALAIS": [
    "05648",
    "VT"
  ],
  "CHERRYFIELD": [
    "04622",
    "ME"
  ],
  "COLUMBIA FALLS": [
    "59912",
    "MT"
  ],
  "COREA": [
    "04624",
    "ME"
  ],
  "CRANBERRY ISLES": [
    "04625",
    "ME"
  ],
  "CUTLER": [
    "93615",
    "CA"
  ],
  "DEER ISLE": [
    "04627",
    "ME"
  ],
  "DENNYSVILLE": [
    "04628",
    "ME"
  ],
  "EAST BLUE HILL": [
    "04629",
    "ME"
  ],
  "EAST MACHIAS": [
    "04630",
    "ME"
  ],
  "EASTPORT": [
    "83826",
    "ID"
  ],
  "FRENCHBORO": [
    "04635",
    "ME"
  ],
  "GRAND LAKE STREAM": [
    "04637",
    "ME"
  ],
  "HARBORSIDE": [
    "04642",
    "ME"
  ],
  "HARRINGTON": [
    "99134",
    "WA"
  ],
  "HULLS COVE": [
    "04644",
    "ME"
  ],
  "ISLE AU HAUT": [
    "04645",
    "ME"
  ],
  "ISLESFORD": [
    "04646",
    "ME"
  ],
  "JONESBORO": [
    "76538",
    "TX"
  ],
  "JONESPORT": [
    "04649",
    "ME"
  ],
  "LITTLE DEER ISLE": [
    "04650",
    "ME"
  ],
  "LUBEC": [
    "04652",
    "ME"
  ],
  "BASS HARBOR": [
    "04653",
    "ME"
  ],
  "MACHIAS": [
    "14101",
    "NY"
  ],
  "MACHIASPORT": [
    "04655",
    "ME"
  ],
  "MEDDYBEMPS": [
    "04657",
    "ME"
  ],
  "MILBRIDGE": [
    "04658",
    "ME"
  ],
  "MOUNT DESERT": [
    "04660",
    "ME"
  ],
  "NORTHEAST HARBOR": [
    "04662",
    "ME"
  ],
  "PERRY": [
    "73077",
    "OK"
  ],
  "PROSPECT HARBOR": [
    "04669",
    "ME"
  ],
  "ROBBINSTON": [
    "04671",
    "ME"
  ],
  "SALSBURY COVE": [
    "04672",
    "ME"
  ],
  "SARGENTVILLE": [
    "04673",
    "ME"
  ],
  "SEAL COVE": [
    "04674",
    "ME"
  ],
  "SEAL HARBOR": [
    "04675",
    "ME"
  ],
  "SEDGWICK": [
    "80749",
    "CO"
  ],
  "SORRENTO": [
    "70778",
    "LA"
  ],
  "SOUTHWEST HARBOR": [
    "04679",
    "ME"
  ],
  "STEUBEN": [
    "54657",
    "WI"
  ],
  "STONINGTON": [
    "62567",
    "IL"
  ],
  "SUNSET": [
    "76270",
    "TX"
  ],
  "SURRY": [
    "23883",
    "VA"
  ],
  "SWANS ISLAND": [
    "04685",
    "ME"
  ],
  "WESLEY": [
    "72773",
    "AR"
  ],
  "WHITING": [
    "66552",
    "KS"
  ],
  "WINTER HARBOR": [
    "04693",
    "ME"
  ],
  "BAILEYVILLE": [
    "66404",
    "KS"
  ],
  "HOULTON": [
    "54082",
    "WI"
  ],
  "BENEDICTA": [
    "04733",
    "ME"
  ],
  "BLAINE": [
    "98231",
    "WA"
  ],
  "CARIBOU": [
    "04736",
    "ME"
  ],
  "CLAYTON LAKE": [
    "04737",
    "ME"
  ],
  "CROUSEVILLE": [
    "04738",
    "ME"
  ],
  "EAGLE LAKE": [
    "77434",
    "TX"
  ],
  "FORT FAIRFIELD": [
    "04742",
    "ME"
  ],
  "FORT KENT": [
    "04743",
    "ME"
  ],
  "FORT KENT MILLS": [
    "04744",
    "ME"
  ],
  "FRENCHVILLE": [
    "16836",
    "PA"
  ],
  "GRAND ISLE": [
    "70358",
    "LA"
  ],
  "ISLAND FALLS": [
    "04747",
    "ME"
  ],
  "LIMESTONE": [
    "37681",
    "TN"
  ],
  "MADAWASKA": [
    "04756",
    "ME"
  ],
  "MAPLETON": [
    "97453",
    "OR"
  ],
  "MARS HILL": [
    "28754",
    "NC"
  ],
  "MONTICELLO": [
    "84535",
    "UT"
  ],
  "NEW LIMERICK": [
    "04761",
    "ME"
  ],
  "NEW SWEDEN": [
    "04762",
    "ME"
  ],
  "OAKFIELD": [
    "53065",
    "WI"
  ],
  "OXBOW": [
    "97840",
    "OR"
  ],
  "PATTEN": [
    "04765",
    "ME"
  ],
  "PERHAM": [
    "56573",
    "MN"
  ],
  "PORTAGE": [
    "84331",
    "UT"
  ],
  "PRESQUE ISLE": [
    "54557",
    "WI"
  ],
  "SAINT AGATHA": [
    "04772",
    "ME"
  ],
  "SAINT DAVID": [
    "85630",
    "AZ"
  ],
  "SAINT FRANCIS": [
    "72464",
    "AR"
  ],
  "SHERMAN": [
    "75092",
    "TX"
  ],
  "STACYVILLE": [
    "50476",
    "IA"
  ],
  "SINCLAIR": [
    "82334",
    "WY"
  ],
  "SMYRNA MILLS": [
    "04780",
    "ME"
  ],
  "WALLAGRASS": [
    "04781",
    "ME"
  ],
  "STOCKHOLM": [
    "57264",
    "SD"
  ],
  "VAN BUREN": [
    "72957",
    "AR"
  ],
  "WASHBURN": [
    "65772",
    "MO"
  ],
  "CAMDEN": [
    "75934",
    "TX"
  ],
  "ISLESBORO": [
    "04848",
    "ME"
  ],
  "LINCOLNVILLE": [
    "66858",
    "KS"
  ],
  "LINCOLNVILLE CENTER": [
    "04850",
    "ME"
  ],
  "MATINICUS": [
    "04851",
    "ME"
  ],
  "MONHEGAN": [
    "04852",
    "ME"
  ],
  "NORTH HAVEN": [
    "06473",
    "CT"
  ],
  "OWLS HEAD": [
    "12969",
    "NY"
  ],
  "PORT CLYDE": [
    "04855",
    "ME"
  ],
  "SOUTH THOMASTON": [
    "04858",
    "ME"
  ],
  "SPRUCE HEAD": [
    "04859",
    "ME"
  ],
  "TENANTS HARBOR": [
    "04860",
    "ME"
  ],
  "THOMASTON": [
    "77989",
    "TX"
  ],
  "VINALHAVEN": [
    "04863",
    "ME"
  ],
  "WEST ROCKPORT": [
    "04865",
    "ME"
  ],
  "WATERVILLE": [
    "98858",
    "WA"
  ],
  "ANSON": [
    "79501",
    "TX"
  ],
  "ATHENS": [
    "75752",
    "TX"
  ],
  "BELFAST": [
    "37019",
    "TN"
  ],
  "BELGRADE": [
    "68623",
    "NE"
  ],
  "BELGRADE LAKES": [
    "04918",
    "ME"
  ],
  "BINGHAM": [
    "62011",
    "IL"
  ],
  "BROOKS": [
    "95606",
    "CA"
  ],
  "BURNHAM": [
    "17009",
    "PA"
  ],
  "CARATUNK": [
    "04925",
    "ME"
  ],
  "CHINA VILLAGE": [
    "04926",
    "ME"
  ],
  "CORINNA": [
    "04928",
    "ME"
  ],
  "DETROIT": [
    "97342",
    "OR"
  ],
  "DEXTER": [
    "97431",
    "OR"
  ],
  "DIXMONT": [
    "04932",
    "ME"
  ],
  "EAST NEWPORT": [
    "04933",
    "ME"
  ],
  "EAST VASSALBORO": [
    "04935",
    "ME"
  ],
  "EUSTIS": [
    "69028",
    "NE"
  ],
  "FAIRFIELD": [
    "99012",
    "WA"
  ],
  "GARLAND": [
    "84312",
    "UT"
  ],
  "HARTLAND": [
    "56042",
    "MN"
  ],
  "HINCKLEY": [
    "84635",
    "UT"
  ],
  "JACKMAN": [
    "04945",
    "ME"
  ],
  "KINGFIELD": [
    "04947",
    "ME"
  ],
  "LIBERTY": [
    "77575",
    "TX"
  ],
  "MORRILL": [
    "69358",
    "NE"
  ],
  "NEW SHARON": [
    "50207",
    "IA"
  ],
  "NEW VINEYARD": [
    "04956",
    "ME"
  ],
  "NORRIDGEWOCK": [
    "04957",
    "ME"
  ],
  "NORTH ANSON": [
    "04958",
    "ME"
  ],
  "NEW PORTLAND": [
    "04961",
    "ME"
  ],
  "NORTH VASSALBORO": [
    "04962",
    "ME"
  ],
  "OQUOSSOC": [
    "04964",
    "ME"
  ],
  "PALMYRA": [
    "68418",
    "NE"
  ],
  "PHILLIPS": [
    "68865",
    "NE"
  ],
  "RANGELEY": [
    "04970",
    "ME"
  ],
  "SAINT ALBANS": [
    "63073",
    "MO"
  ],
  "SEARSMONT": [
    "04973",
    "ME"
  ],
  "SEARSPORT": [
    "04974",
    "ME"
  ],
  "SHAWMUT": [
    "59078",
    "MT"
  ],
  "SKOWHEGAN": [
    "04976",
    "ME"
  ],
  "SOLON": [
    "52333",
    "IA"
  ],
  "STOCKTON SPRINGS": [
    "04981",
    "ME"
  ],
  "STRATTON": [
    "80836",
    "CO"
  ],
  "STRONG": [
    "71765",
    "AR"
  ],
  "WEST FORKS": [
    "04985",
    "ME"
  ],
  "UNITY": [
    "97884",
    "OR"
  ],
  "VASSALBORO": [
    "04989",
    "ME"
  ],
  "WEST FARMINGTON": [
    "44491",
    "OH"
  ],
  "WHITE RIVER JUNCTION": [
    "05009",
    "VT"
  ],
  "ASCUTNEY": [
    "05030",
    "VT"
  ],
  "BARNARD": [
    "67418",
    "KS"
  ],
  "BRIDGEWATER CORNERS": [
    "05035",
    "VT"
  ],
  "BROWNSVILLE": [
    "97327",
    "OR"
  ],
  "EAST CORINTH": [
    "05040",
    "VT"
  ],
  "EAST RANDOLPH": [
    "14730",
    "NY"
  ],
  "EAST RYEGATE": [
    "05042",
    "VT"
  ],
  "EAST THETFORD": [
    "05043",
    "VT"
  ],
  "FAIRLEE": [
    "05045",
    "VT"
  ],
  "HARTFORD": [
    "72938",
    "AR"
  ],
  "HARTLAND FOUR CORNERS": [
    "05049",
    "VT"
  ],
  "MC INDOE FALLS": [
    "05050",
    "VT"
  ],
  "NORTH HARTLAND": [
    "05052",
    "VT"
  ],
  "NORTH POMFRET": [
    "05053",
    "VT"
  ],
  "NORTH THETFORD": [
    "05054",
    "VT"
  ],
  "NORWICH": [
    "67118",
    "KS"
  ],
  "POST MILLS": [
    "05058",
    "VT"
  ],
  "QUECHEE": [
    "05059",
    "VT"
  ],
  "RANDOLPH CENTER": [
    "05061",
    "VT"
  ],
  "SOUTH POMFRET": [
    "05067",
    "VT"
  ],
  "SOUTH ROYALTON": [
    "05068",
    "VT"
  ],
  "SOUTH RYEGATE": [
    "05069",
    "VT"
  ],
  "SOUTH STRAFFORD": [
    "05070",
    "VT"
  ],
  "SOUTH WOODSTOCK": [
    "06267",
    "CT"
  ],
  "TAFTSVILLE": [
    "05073",
    "VT"
  ],
  "THETFORD": [
    "05074",
    "VT"
  ],
  "THETFORD CENTER": [
    "05075",
    "VT"
  ],
  "TUNBRIDGE": [
    "05077",
    "VT"
  ],
  "VERSHIRE": [
    "05079",
    "VT"
  ],
  "WELLS RIVER": [
    "05081",
    "VT"
  ],
  "WEST FAIRLEE": [
    "05083",
    "VT"
  ],
  "WEST HARTFORD": [
    "06137",
    "CT"
  ],
  "WEST TOPSHAM": [
    "05086",
    "VT"
  ],
  "WILDER": [
    "83676",
    "ID"
  ],
  "BELLOWS FALLS": [
    "05101",
    "VT"
  ],
  "CAMBRIDGEPORT": [
    "05141",
    "VT"
  ],
  "CAVENDISH": [
    "05142",
    "VT"
  ],
  "NORTH SPRINGFIELD": [
    "16430",
    "PA"
  ],
  "PERKINSVILLE": [
    "14529",
    "NY"
  ],
  "PROCTORSVILLE": [
    "05153",
    "VT"
  ],
  "SAXTONS RIVER": [
    "05154",
    "VT"
  ],
  "SOUTH LONDONDERRY": [
    "05155",
    "VT"
  ],
  "WESTMINSTER STATION": [
    "05159",
    "VT"
  ],
  "DORSET": [
    "44032",
    "OH"
  ],
  "EAST ARLINGTON": [
    "05252",
    "VT"
  ],
  "EAST DORSET": [
    "05253",
    "VT"
  ],
  "MANCHESTER CENTER": [
    "05255",
    "VT"
  ],
  "NORTH BENNINGTON": [
    "05257",
    "VT"
  ],
  "NORTH POWNAL": [
    "05260",
    "VT"
  ],
  "SHAFTSBURY": [
    "05262",
    "VT"
  ],
  "BRATTLEBORO": [
    "05304",
    "VT"
  ],
  "BONDVILLE": [
    "61815",
    "IL"
  ],
  "EAST DOVER": [
    "05341",
    "VT"
  ],
  "JACKSONVILLE": [
    "97530",
    "OR"
  ],
  "JAMAICA": [
    "50128",
    "IA"
  ],
  "MARLBORO": [
    "12542",
    "NY"
  ],
  "NEWFANE": [
    "14108",
    "NY"
  ],
  "PUTNEY": [
    "40865",
    "KY"
  ],
  "READSBORO": [
    "05350",
    "VT"
  ],
  "SOUTH NEWFANE": [
    "05351",
    "VT"
  ],
  "STAMFORD": [
    "79553",
    "TX"
  ],
  "TOWNSHEND": [
    "05353",
    "VT"
  ],
  "VERNON": [
    "85940",
    "AZ"
  ],
  "WARDSBORO": [
    "05355",
    "VT"
  ],
  "WEST DOVER": [
    "05356",
    "VT"
  ],
  "WEST DUMMERSTON": [
    "05357",
    "VT"
  ],
  "WEST HALIFAX": [
    "05358",
    "VT"
  ],
  "WEST TOWNSHEND": [
    "05359",
    "VT"
  ],
  "WEST WARDSBORO": [
    "05360",
    "VT"
  ],
  "WHITINGHAM": [
    "05361",
    "VT"
  ],
  "WILLIAMSVILLE": [
    "63967",
    "MO"
  ],
  "SOUTH BURLINGTON": [
    "05407",
    "VT"
  ],
  "WINOOSKI": [
    "05404",
    "VT"
  ],
  "COLCHESTER": [
    "62326",
    "IL"
  ],
  "ALBURGH": [
    "05440",
    "VT"
  ],
  "BAKERSFIELD": [
    "93390",
    "CA"
  ],
  "BELVIDERE CENTER": [
    "05442",
    "VT"
  ],
  "CHARLOTTE": [
    "78011",
    "TX"
  ],
  "EAST BERKSHIRE": [
    "05447",
    "VT"
  ],
  "EAST FAIRFIELD": [
    "05448",
    "VT"
  ],
  "ENOSBURG FALLS": [
    "05450",
    "VT"
  ],
  "ESSEX JUNCTION": [
    "05453",
    "VT"
  ],
  "FAIRFAX": [
    "94978",
    "CA"
  ],
  "FERRISBURGH": [
    "05456",
    "VT"
  ],
  "HIGHGATE CENTER": [
    "05459",
    "VT"
  ],
  "HIGHGATE SPRINGS": [
    "05460",
    "VT"
  ],
  "HINESBURG": [
    "05461",
    "VT"
  ],
  "ISLE LA MOTTE": [
    "05463",
    "VT"
  ],
  "JEFFERSONVILLE": [
    "47131",
    "IN"
  ],
  "JERICHO": [
    "11853",
    "NY"
  ],
  "JONESVILLE": [
    "75659",
    "TX"
  ],
  "MONKTON": [
    "21111",
    "MD"
  ],
  "MONTGOMERY": [
    "77356",
    "TX"
  ],
  "MONTGOMERY CENTER": [
    "05471",
    "VT"
  ],
  "NEW HAVEN": [
    "63068",
    "MO"
  ],
  "NORTH FERRISBURGH": [
    "05473",
    "VT"
  ],
  "NORTH HERO": [
    "05474",
    "VT"
  ],
  "RICHFORD": [
    "13835",
    "NY"
  ],
  "SAINT ALBANS BAY": [
    "05481",
    "VT"
  ],
  "SHELBURNE": [
    "05482",
    "VT"
  ],
  "SHELDON": [
    "64784",
    "MO"
  ],
  "SHELDON SPRINGS": [
    "05485",
    "VT"
  ],
  "SOUTH HERO": [
    "05486",
    "VT"
  ],
  "STARKSBORO": [
    "05487",
    "VT"
  ],
  "SWANTON": [
    "68445",
    "NE"
  ],
  "UNDERHILL": [
    "05489",
    "VT"
  ],
  "UNDERHILL CENTER": [
    "05490",
    "VT"
  ],
  "VERGENNES": [
    "62994",
    "IL"
  ],
  "WILLISTON": [
    "58802",
    "ND"
  ],
  "MONTPELIER": [
    "83254",
    "ID"
  ],
  "ADAMANT": [
    "05640",
    "VT"
  ],
  "CABOT": [
    "72023",
    "AR"
  ],
  "EAST BARRE": [
    "05649",
    "VT"
  ],
  "EAST CALAIS": [
    "05650",
    "VT"
  ],
  "EAST MONTPELIER": [
    "05651",
    "VT"
  ],
  "EDEN": [
    "85535",
    "AZ"
  ],
  "EDEN MILLS": [
    "05653",
    "VT"
  ],
  "GRANITEVILLE": [
    "29829",
    "SC"
  ],
  "JOHNSON": [
    "72741",
    "AR"
  ],
  "LAKE ELMORE": [
    "05657",
    "VT"
  ],
  "MORETOWN": [
    "05660",
    "VT"
  ],
  "MORRISVILLE": [
    "65710",
    "MO"
  ],
  "MOSCOW": [
    "83844",
    "ID"
  ],
  "NORTHFIELD FALLS": [
    "05664",
    "VT"
  ],
  "NORTH HYDE PARK": [
    "05665",
    "VT"
  ],
  "NORTH MONTPELIER": [
    "05666",
    "VT"
  ],
  "WATERBURY": [
    "68785",
    "NE"
  ],
  "STOWE": [
    "05672",
    "VT"
  ],
  "WAITSFIELD": [
    "05673",
    "VT"
  ],
  "WATERBURY CENTER": [
    "05677",
    "VT"
  ],
  "WEBSTERVILLE": [
    "05678",
    "VT"
  ],
  "WOLCOTT": [
    "81655",
    "CO"
  ],
  "WOODBURY": [
    "37190",
    "TN"
  ],
  "BENSON": [
    "85602",
    "AZ"
  ],
  "BOMOSEEN": [
    "05732",
    "VT"
  ],
  "BRANDON": [
    "76628",
    "TX"
  ],
  "BRIDPORT": [
    "05734",
    "VT"
  ],
  "CASTLETON": [
    "22716",
    "VA"
  ],
  "CENTER RUTLAND": [
    "05736",
    "VT"
  ],
  "CHITTENDEN": [
    "05737",
    "VT"
  ],
  "CUTTINGSVILLE": [
    "05738",
    "VT"
  ],
  "DANBY": [
    "05739",
    "VT"
  ],
  "EAST MIDDLEBURY": [
    "05740",
    "VT"
  ],
  "EAST POULTNEY": [
    "05741",
    "VT"
  ],
  "EAST WALLINGFORD": [
    "05742",
    "VT"
  ],
  "FAIR HAVEN": [
    "48023",
    "MI"
  ],
  "FOREST DALE": [
    "05745",
    "VT"
  ],
  "GAYSVILLE": [
    "05746",
    "VT"
  ],
  "HYDEVILLE": [
    "05750",
    "VT"
  ],
  "KILLINGTON": [
    "05751",
    "VT"
  ],
  "MIDDLEBURY": [
    "46540",
    "IN"
  ],
  "MIDDLETOWN SPRINGS": [
    "05757",
    "VT"
  ],
  "MOUNT HOLLY": [
    "71758",
    "AR"
  ],
  "NORTH CLARENDON": [
    "05759",
    "VT"
  ],
  "ORWELL": [
    "44076",
    "OH"
  ],
  "PAWLET": [
    "05761",
    "VT"
  ],
  "PITTSFORD": [
    "49271",
    "MI"
  ],
  "POULTNEY": [
    "05764",
    "VT"
  ],
  "PROCTOR": [
    "76468",
    "TX"
  ],
  "RIPTON": [
    "05766",
    "VT"
  ],
  "RUPERT": [
    "83350",
    "ID"
  ],
  "SHOREHAM": [
    "11786",
    "NY"
  ],
  "WALLINGFORD": [
    "51365",
    "IA"
  ],
  "WEST PAWLET": [
    "05775",
    "VT"
  ],
  "WEST RUPERT": [
    "05776",
    "VT"
  ],
  "WEST RUTLAND": [
    "05777",
    "VT"
  ],
  "SAINT JOHNSBURY": [
    "05819",
    "VT"
  ],
  "ALBANY": [
    "97322",
    "OR"
  ],
  "BARNET": [
    "05821",
    "VT"
  ],
  "BARTON": [
    "72312",
    "AR"
  ],
  "CRAFTSBURY": [
    "05826",
    "VT"
  ],
  "CRAFTSBURY COMMON": [
    "05827",
    "VT"
  ],
  "DERBY": [
    "67037",
    "KS"
  ],
  "DERBY LINE": [
    "05830",
    "VT"
  ],
  "EAST BURKE": [
    "05832",
    "VT"
  ],
  "EAST CHARLESTON": [
    "05833",
    "VT"
  ],
  "EAST HARDWICK": [
    "05836",
    "VT"
  ],
  "EAST HAVEN": [
    "05837",
    "VT"
  ],
  "EAST SAINT JOHNSBURY": [
    "05838",
    "VT"
  ],
  "GLOVER": [
    "05839",
    "VT"
  ],
  "GREENSBORO": [
    "47344",
    "IN"
  ],
  "GREENSBORO BEND": [
    "05842",
    "VT"
  ],
  "IRASBURG": [
    "05845",
    "VT"
  ],
  "ISLAND POND": [
    "05846",
    "VT"
  ],
  "LOWER WATERFORD": [
    "05848",
    "VT"
  ],
  "LYNDON": [
    "66451",
    "KS"
  ],
  "LYNDON CENTER": [
    "05850",
    "VT"
  ],
  "LYNDONVILLE": [
    "14098",
    "NY"
  ],
  "MORGAN": [
    "84050",
    "UT"
  ],
  "NEWPORT CENTER": [
    "05857",
    "VT"
  ],
  "NORTH CONCORD": [
    "05858",
    "VT"
  ],
  "NORTH TROY": [
    "05859",
    "VT"
  ],
  "PASSUMPSIC": [
    "05861",
    "VT"
  ],
  "PEACHAM": [
    "05862",
    "VT"
  ],
  "SAINT JOHNSBURY CENTER": [
    "05863",
    "VT"
  ],
  "WEST BURKE": [
    "05871",
    "VT"
  ],
  "WEST CHARLESTON": [
    "05872",
    "VT"
  ],
  "WEST DANVILLE": [
    "05873",
    "VT"
  ],
  "AVERILL": [
    "05901",
    "VT"
  ],
  "BEECHER FALLS": [
    "05902",
    "VT"
  ],
  "GILMAN": [
    "60938",
    "IL"
  ],
  "GUILDHALL": [
    "05905",
    "VT"
  ],
  "BLOOMFIELD": [
    "87413",
    "NM"
  ],
  "BROAD BROOK": [
    "06016",
    "CT"
  ],
  "CANTON CENTER": [
    "06020",
    "CT"
  ],
  "COLLINSVILLE": [
    "76233",
    "TX"
  ],
  "EAST BERLIN": [
    "17316",
    "PA"
  ],
  "EAST CANAAN": [
    "06024",
    "CT"
  ],
  "EAST GLASTONBURY": [
    "06025",
    "CT"
  ],
  "EAST GRANBY": [
    "06026",
    "CT"
  ],
  "EAST HARTLAND": [
    "06027",
    "CT"
  ],
  "EAST WINDSOR HILL": [
    "06028",
    "CT"
  ],
  "ELLINGTON": [
    "63638",
    "MO"
  ],
  "FALLS VILLAGE": [
    "06031",
    "CT"
  ],
  "GLASTONBURY": [
    "06033",
    "CT"
  ],
  "NEW BRITAIN": [
    "06053",
    "CT"
  ],
  "NEW HARTFORD": [
    "50660",
    "IA"
  ],
  "NORTH CANTON": [
    "44720",
    "OH"
  ],
  "NORTH GRANBY": [
    "06060",
    "CT"
  ],
  "PINE MEADOW": [
    "06061",
    "CT"
  ],
  "BARKHAMSTED": [
    "06063",
    "CT"
  ],
  "POQUONOCK": [
    "06064",
    "CT"
  ],
  "RIVERTON": [
    "84065",
    "UT"
  ],
  "VERNON ROCKVILLE": [
    "06066",
    "CT"
  ],
  "ROCKY HILL": [
    "42163",
    "KY"
  ],
  "SIMSBURY": [
    "06070",
    "CT"
  ],
  "SOMERS": [
    "59932",
    "MT"
  ],
  "SOMERSVILLE": [
    "06072",
    "CT"
  ],
  "SOUTH GLASTONBURY": [
    "06073",
    "CT"
  ],
  "SOUTH WINDSOR": [
    "06074",
    "CT"
  ],
  "STAFFORD": [
    "77497",
    "TX"
  ],
  "STAFFORD SPRINGS": [
    "06076",
    "CT"
  ],
  "STAFFORDVILLE": [
    "06077",
    "CT"
  ],
  "SUFFIELD": [
    "06080",
    "CT"
  ],
  "TACONIC": [
    "06079",
    "CT"
  ],
  "TARIFFVILLE": [
    "06081",
    "CT"
  ],
  "TOLLAND": [
    "06084",
    "CT"
  ],
  "UNIONVILLE": [
    "63565",
    "MO"
  ],
  "EAST WINDSOR": [
    "06088",
    "CT"
  ],
  "WEATOGUE": [
    "06089",
    "CT"
  ],
  "WEST GRANBY": [
    "06090",
    "CT"
  ],
  "WEST HARTLAND": [
    "06091",
    "CT"
  ],
  "WEST SIMSBURY": [
    "06092",
    "CT"
  ],
  "WEST SUFFIELD": [
    "06093",
    "CT"
  ],
  "WINCHESTER CENTER": [
    "06094",
    "CT"
  ],
  "WINDSOR LOCKS": [
    "06096",
    "CT"
  ],
  "WINSTED": [
    "55395",
    "MN"
  ],
  "EAST HARTFORD": [
    "06138",
    "CT"
  ],
  "WETHERSFIELD": [
    "06129",
    "CT"
  ],
  "NEWINGTON": [
    "30446",
    "GA"
  ],
  "WILLIMANTIC": [
    "06226",
    "CT"
  ],
  "AMSTON": [
    "06231",
    "CT"
  ],
  "BROOKLYN": [
    "53521",
    "WI"
  ],
  "CHAPLIN": [
    "40012",
    "KY"
  ],
  "COLUMBIA": [
    "95310",
    "CA"
  ],
  "DANIELSON": [
    "06239",
    "CT"
  ],
  "DAYVILLE": [
    "97825",
    "OR"
  ],
  "EASTFORD": [
    "06242",
    "CT"
  ],
  "EAST KILLINGLY": [
    "06243",
    "CT"
  ],
  "EAST WOODSTOCK": [
    "06244",
    "CT"
  ],
  "GROSVENOR DALE": [
    "06246",
    "CT"
  ],
  "MANSFIELD CENTER": [
    "06250",
    "CT"
  ],
  "MANSFIELD DEPOT": [
    "06251",
    "CT"
  ],
  "NORTH FRANKLIN": [
    "06254",
    "CT"
  ],
  "NORTH GROSVENORDALE": [
    "06255",
    "CT"
  ],
  "NORTH WINDHAM": [
    "06256",
    "CT"
  ],
  "POMFRET": [
    "20675",
    "MD"
  ],
  "POMFRET CENTER": [
    "06259",
    "CT"
  ],
  "PUTNAM": [
    "76469",
    "TX"
  ],
  "QUINEBAUG": [
    "06262",
    "CT"
  ],
  "ROGERS": [
    "76569",
    "TX"
  ],
  "SCOTLAND": [
    "76379",
    "TX"
  ],
  "STORRS MANSFIELD": [
    "06269",
    "CT"
  ],
  "THOMPSON": [
    "84540",
    "UT"
  ],
  "ASHFORD": [
    "98304",
    "WA"
  ],
  "WILLINGTON": [
    "06279",
    "CT"
  ],
  "WOODSTOCK VALLEY": [
    "06282",
    "CT"
  ],
  "BALTIC": [
    "57003",
    "SD"
  ],
  "CENTRAL VILLAGE": [
    "06332",
    "CT"
  ],
  "EAST LYME": [
    "06333",
    "CT"
  ],
  "BOZRAH": [
    "06334",
    "CT"
  ],
  "GALES FERRY": [
    "06335",
    "CT"
  ],
  "MASHANTUCKET": [
    "06338",
    "CT"
  ],
  "LEDYARD": [
    "50556",
    "IA"
  ],
  "JEWETT CITY": [
    "06351",
    "CT"
  ],
  "MONTVILLE": [
    "44064",
    "OH"
  ],
  "MOOSUP": [
    "06354",
    "CT"
  ],
  "MYSTIC": [
    "52574",
    "IA"
  ],
  "NIANTIC": [
    "62551",
    "IL"
  ],
  "NORTH STONINGTON": [
    "06359",
    "CT"
  ],
  "PRESTON": [
    "98050",
    "WA"
  ],
  "OAKDALE": [
    "95361",
    "CA"
  ],
  "OLD LYME": [
    "06371",
    "CT"
  ],
  "OLD MYSTIC": [
    "06372",
    "CT"
  ],
  "ONECO": [
    "34264",
    "FL"
  ],
  "QUAKER HILL": [
    "06375",
    "CT"
  ],
  "SOUTH LYME": [
    "06376",
    "CT"
  ],
  "PAWCATUCK": [
    "06379",
    "CT"
  ],
  "TAFTVILLE": [
    "06380",
    "CT"
  ],
  "UNCASVILLE": [
    "06382",
    "CT"
  ],
  "VERSAILLES": [
    "65084",
    "MO"
  ],
  "VOLUNTOWN": [
    "06384",
    "CT"
  ],
  "WAUREGAN": [
    "06387",
    "CT"
  ],
  "WEST MYSTIC": [
    "06388",
    "CT"
  ],
  "YANTIC": [
    "06389",
    "CT"
  ],
  "FISHERS ISLAND": [
    "06390",
    "NY"
  ],
  "ANSONIA": [
    "45303",
    "OH"
  ],
  "BEACON FALLS": [
    "06403",
    "CT"
  ],
  "BOTSFORD": [
    "06404",
    "CT"
  ],
  "BRANFORD": [
    "32008",
    "FL"
  ],
  "CENTERBROOK": [
    "06409",
    "CT"
  ],
  "COBALT": [
    "06414",
    "CT"
  ],
  "CROMWELL": [
    "74837",
    "OK"
  ],
  "DEEP RIVER": [
    "52222",
    "IA"
  ],
  "KILLINGWORTH": [
    "06419",
    "CT"
  ],
  "EAST HADDAM": [
    "06423",
    "CT"
  ],
  "EAST HAMPTON": [
    "11937",
    "NY"
  ],
  "HADDAM": [
    "66944",
    "KS"
  ],
  "HADLYME": [
    "06439",
    "CT"
  ],
  "HAWLEYVILLE": [
    "06440",
    "CT"
  ],
  "HIGGANUM": [
    "06441",
    "CT"
  ],
  "IVORYTON": [
    "06442",
    "CT"
  ],
  "MIDDLE HADDAM": [
    "06456",
    "CT"
  ],
  "MILLDALE": [
    "06467",
    "CT"
  ],
  "MOODUS": [
    "06469",
    "CT"
  ],
  "NEWTOWN": [
    "64667",
    "MO"
  ],
  "NORTH BRANFORD": [
    "06471",
    "CT"
  ],
  "NORTHFORD": [
    "06472",
    "CT"
  ],
  "OLD SAYBROOK": [
    "06475",
    "CT"
  ],
  "PLANTSVILLE": [
    "06479",
    "CT"
  ],
  "ROCKFALL": [
    "06481",
    "CT"
  ],
  "SANDY HOOK": [
    "41171",
    "KY"
  ],
  "SEYMOUR": [
    "76380",
    "TX"
  ],
  "SHELTON": [
    "98584",
    "WA"
  ],
  "SOUTH BRITAIN": [
    "06487",
    "CT"
  ],
  "SOUTHBURY": [
    "06488",
    "CT"
  ],
  "SOUTHINGTON": [
    "44470",
    "OH"
  ],
  "STEVENSON": [
    "98648",
    "WA"
  ],
  "HAMDEN": [
    "45634",
    "OH"
  ],
  "WEST HAVEN": [
    "06516",
    "CT"
  ],
  "BETHANY": [
    "73008",
    "OK"
  ],
  "BRIDGEPORT": [
    "98813",
    "WA"
  ],
  "TRUMBULL": [
    "68980",
    "NE"
  ],
  "STRATFORD": [
    "98853",
    "WA"
  ],
  "PROSPECT": [
    "97536",
    "OR"
  ],
  "BANTAM": [
    "06750",
    "CT"
  ],
  "CORNWALL": [
    "17016",
    "PA"
  ],
  "CORNWALL BRIDGE": [
    "06754",
    "CT"
  ],
  "GAYLORDSVILLE": [
    "06755",
    "CT"
  ],
  "KENT": [
    "98089",
    "WA"
  ],
  "LAKESIDE": [
    "97449",
    "OR"
  ],
  "MORRIS": [
    "74445",
    "OK"
  ],
  "NAUGATUCK": [
    "25685",
    "WV"
  ],
  "NEW MILFORD": [
    "18834",
    "PA"
  ],
  "NEW PRESTON MARBLE DALE": [
    "06777",
    "CT"
  ],
  "OAKVILLE": [
    "98568",
    "WA"
  ],
  "PEQUABUCK": [
    "06781",
    "CT"
  ],
  "SOUTH KENT": [
    "06785",
    "CT"
  ],
  "TERRYVILLE": [
    "06786",
    "CT"
  ],
  "TORRINGTON": [
    "82240",
    "WY"
  ],
  "HARWINTON": [
    "06791",
    "CT"
  ],
  "WASHINGTON DEPOT": [
    "06794",
    "CT"
  ],
  "WEST CORNWALL": [
    "06796",
    "CT"
  ],
  "COS COB": [
    "06807",
    "CT"
  ],
  "NEW FAIRFIELD": [
    "06812",
    "CT"
  ],
  "DARIEN": [
    "60561",
    "IL"
  ],
  "GREENWICH": [
    "44837",
    "OH"
  ],
  "GREENS FARMS": [
    "06838",
    "CT"
  ],
  "NEW CANAAN": [
    "06840",
    "CT"
  ],
  "NORWALK": [
    "90652",
    "CA"
  ],
  "OLD GREENWICH": [
    "06870",
    "CT"
  ],
  "REDDING CENTER": [
    "06875",
    "CT"
  ],
  "REDDING RIDGE": [
    "06876",
    "CT"
  ],
  "RIDGEFIELD": [
    "98642",
    "WA"
  ],
  "REDDING": [
    "96099",
    "CA"
  ],
  "AVENEL": [
    "07001",
    "NJ"
  ],
  "BAYONNE": [
    "07002",
    "NJ"
  ],
  "BOONTON": [
    "07005",
    "NJ"
  ],
  "CALDWELL": [
    "83607",
    "ID"
  ],
  "CARTERET": [
    "07008",
    "NJ"
  ],
  "CEDAR GROVE": [
    "53013",
    "WI"
  ],
  "CLIFFSIDE PARK": [
    "07010",
    "NJ"
  ],
  "CLIFTON": [
    "85533",
    "AZ"
  ],
  "CRANFORD": [
    "07016",
    "NJ"
  ],
  "EAST ORANGE": [
    "07019",
    "NJ"
  ],
  "EDGEWATER": [
    "32141",
    "FL"
  ],
  "ESSEX FELLS": [
    "07021",
    "NJ"
  ],
  "FAIRVIEW": [
    "97024",
    "OR"
  ],
  "FANWOOD": [
    "07023",
    "NJ"
  ],
  "FORT LEE": [
    "23801",
    "VA"
  ],
  "GARFIELD": [
    "99130",
    "WA"
  ],
  "GARWOOD": [
    "77442",
    "TX"
  ],
  "GLEN RIDGE": [
    "07028",
    "NJ"
  ],
  "HOBOKEN": [
    "31542",
    "GA"
  ],
  "NORTH ARLINGTON": [
    "07031",
    "NJ"
  ],
  "KEARNY": [
    "85137",
    "AZ"
  ],
  "KENILWORTH": [
    "60043",
    "IL"
  ],
  "LAKE HIAWATHA": [
    "07034",
    "NJ"
  ],
  "LINCOLN PARK": [
    "48146",
    "MI"
  ],
  "LINDEN": [
    "95236",
    "CA"
  ],
  "LIVINGSTON": [
    "95334",
    "CA"
  ],
  "MAPLEWOOD": [
    "54226",
    "WI"
  ],
  "MILLBURN": [
    "07041",
    "NJ"
  ],
  "MONTCLAIR": [
    "91763",
    "CA"
  ],
  "VERONA": [
    "65769",
    "MO"
  ],
  "MOUNTAIN LAKES": [
    "07046",
    "NJ"
  ],
  "NORTH BERGEN": [
    "07047",
    "NJ"
  ],
  "WEST ORANGE": [
    "07052",
    "NJ"
  ],
  "PARSIPPANY": [
    "07054",
    "NJ"
  ],
  "PASSAIC": [
    "07055",
    "NJ"
  ],
  "WALLINGTON": [
    "07057",
    "NJ"
  ],
  "PINE BROOK": [
    "07058",
    "NJ"
  ],
  "PORT READING": [
    "07064",
    "NJ"
  ],
  "RAHWAY": [
    "07065",
    "NJ"
  ],
  "CLARK": [
    "80428",
    "CO"
  ],
  "COLONIA": [
    "07067",
    "NJ"
  ],
  "ROSELAND": [
    "70456",
    "LA"
  ],
  "WATCHUNG": [
    "07069",
    "NJ"
  ],
  "RUTHERFORD": [
    "94573",
    "CA"
  ],
  "LYNDHURST": [
    "22952",
    "VA"
  ],
  "CARLSTADT": [
    "07072",
    "NJ"
  ],
  "EAST RUTHERFORD": [
    "07073",
    "NJ"
  ],
  "MOONACHIE": [
    "07074",
    "NJ"
  ],
  "WOOD RIDGE": [
    "07075",
    "NJ"
  ],
  "SCOTCH PLAINS": [
    "07076",
    "NJ"
  ],
  "SEWAREN": [
    "07077",
    "NJ"
  ],
  "SHORT HILLS": [
    "07078",
    "NJ"
  ],
  "SOUTH ORANGE": [
    "07079",
    "NJ"
  ],
  "SOUTH PLAINFIELD": [
    "07080",
    "NJ"
  ],
  "TOWACO": [
    "07082",
    "NJ"
  ],
  "WEEHAWKEN": [
    "07086",
    "NJ"
  ],
  "UNION CITY": [
    "94587",
    "CA"
  ],
  "VAUXHALL": [
    "07088",
    "NJ"
  ],
  "MOUNTAINSIDE": [
    "07092",
    "NJ"
  ],
  "WEST NEW YORK": [
    "07093",
    "NJ"
  ],
  "SECAUCUS": [
    "07096",
    "NJ"
  ],
  "WOODBRIDGE": [
    "95258",
    "CA"
  ],
  "JERSEY CITY": [
    "07399",
    "NJ"
  ],
  "NEWARK": [
    "94560",
    "CA"
  ],
  "BELLEVILLE": [
    "72824",
    "AR"
  ],
  "NUTLEY": [
    "07110",
    "NJ"
  ],
  "IRVINGTON": [
    "62848",
    "IL"
  ],
  "ELIZABETH": [
    "80107",
    "CO"
  ],
  "ROSELLE": [
    "60172",
    "IL"
  ],
  "ROSELLE PARK": [
    "07204",
    "NJ"
  ],
  "HILLSIDE": [
    "81232",
    "CO"
  ],
  "ELIZABETHPORT": [
    "07206",
    "NJ"
  ],
  "ALLENDALE": [
    "64420",
    "MO"
  ],
  "BLOOMINGDALE": [
    "60108",
    "IL"
  ],
  "BUTLER": [
    "73625",
    "OK"
  ],
  "ELMWOOD PARK": [
    "60707",
    "IL"
  ],
  "FAIR LAWN": [
    "07410",
    "NJ"
  ],
  "FRANKLIN LAKES": [
    "07417",
    "NJ"
  ],
  "GLENWOOD": [
    "98619",
    "WA"
  ],
  "HAMBURG": [
    "71646",
    "AR"
  ],
  "HASKELL": [
    "79521",
    "TX"
  ],
  "HEWITT": [
    "76643",
    "TX"
  ],
  "HIGHLAND LAKES": [
    "07422",
    "NJ"
  ],
  "HO HO KUS": [
    "07423",
    "NJ"
  ],
  "LITTLE FALLS": [
    "56345",
    "MN"
  ],
  "MC AFEE": [
    "07428",
    "NJ"
  ],
  "MAHWAH": [
    "07495",
    "NJ"
  ],
  "MIDLAND PARK": [
    "07432",
    "NJ"
  ],
  "NEWFOUNDLAND": [
    "18445",
    "PA"
  ],
  "OAK RIDGE": [
    "71264",
    "LA"
  ],
  "OGDENSBURG": [
    "54962",
    "WI"
  ],
  "PEQUANNOCK": [
    "07440",
    "NJ"
  ],
  "POMPTON LAKES": [
    "07442",
    "NJ"
  ],
  "POMPTON PLAINS": [
    "07444",
    "NJ"
  ],
  "RAMSEY": [
    "62080",
    "IL"
  ],
  "RIDGEWOOD": [
    "11386",
    "NY"
  ],
  "GLEN ROCK": [
    "17327",
    "PA"
  ],
  "RINGWOOD": [
    "73768",
    "OK"
  ],
  "RIVERDALE": [
    "93656",
    "CA"
  ],
  "SADDLE RIVER": [
    "07458",
    "NJ"
  ],
  "SUSSEX": [
    "53089",
    "WI"
  ],
  "WALDWICK": [
    "07463",
    "NJ"
  ],
  "WANAQUE": [
    "07465",
    "NJ"
  ],
  "WEST MILFORD": [
    "26451",
    "WV"
  ],
  "WYCKOFF": [
    "07481",
    "NJ"
  ],
  "PATERSON": [
    "99345",
    "WA"
  ],
  "HAWTHORNE": [
    "90251",
    "CA"
  ],
  "HALEDON": [
    "07538",
    "NJ"
  ],
  "TOTOWA": [
    "07512",
    "NJ"
  ],
  "HACKENSACK": [
    "56452",
    "MN"
  ],
  "BOGOTA": [
    "38007",
    "TN"
  ],
  "HASBROUCK HEIGHTS": [
    "07604",
    "NJ"
  ],
  "LEONIA": [
    "07605",
    "NJ"
  ],
  "SOUTH HACKENSACK": [
    "07606",
    "NJ"
  ],
  "MAYWOOD": [
    "90270",
    "CA"
  ],
  "TETERBORO": [
    "07608",
    "NJ"
  ],
  "ALPINE": [
    "91903",
    "CA"
  ],
  "BERGENFIELD": [
    "07621",
    "NJ"
  ],
  "CLOSTER": [
    "07624",
    "NJ"
  ],
  "CRESSKILL": [
    "07626",
    "NJ"
  ],
  "DEMAREST": [
    "07627",
    "NJ"
  ],
  "DUMONT": [
    "80436",
    "CO"
  ],
  "EMERSON": [
    "71740",
    "AR"
  ],
  "ENGLEWOOD": [
    "80155",
    "CO"
  ],
  "ENGLEWOOD CLIFFS": [
    "07632",
    "NJ"
  ],
  "HARRINGTON PARK": [
    "07640",
    "NJ"
  ],
  "HAWORTH": [
    "74740",
    "OK"
  ],
  "HILLSDALE": [
    "82060",
    "WY"
  ],
  "LITTLE FERRY": [
    "07643",
    "NJ"
  ],
  "LODI": [
    "95242",
    "CA"
  ],
  "MONTVALE": [
    "24122",
    "VA"
  ],
  "NORTHVALE": [
    "07647",
    "NJ"
  ],
  "ORADELL": [
    "07649",
    "NJ"
  ],
  "PALISADES PARK": [
    "07650",
    "NJ"
  ],
  "PARAMUS": [
    "07653",
    "NJ"
  ],
  "PARK RIDGE": [
    "60068",
    "IL"
  ],
  "RIDGEFIELD PARK": [
    "07660",
    "NJ"
  ],
  "RIVER EDGE": [
    "07661",
    "NJ"
  ],
  "ROCHELLE PARK": [
    "07662",
    "NJ"
  ],
  "SADDLE BROOK": [
    "07663",
    "NJ"
  ],
  "TEANECK": [
    "07666",
    "NJ"
  ],
  "TENAFLY": [
    "07670",
    "NJ"
  ],
  "TOWNSHIP OF WASHINGTON": [
    "07676",
    "NJ"
  ],
  "WOODCLIFF LAKE": [
    "07677",
    "NJ"
  ],
  "RED BANK": [
    "07709",
    "NJ"
  ],
  "FORT MONMOUTH": [
    "07703",
    "NJ"
  ],
  "ADELPHIA": [
    "07710",
    "NJ"
  ],
  "ALLENHURST": [
    "31301",
    "GA"
  ],
  "ASBURY PARK": [
    "07712",
    "NJ"
  ],
  "ATLANTIC HIGHLANDS": [
    "07716",
    "NJ"
  ],
  "AVON BY THE SEA": [
    "07717",
    "NJ"
  ],
  "BELFORD": [
    "07718",
    "NJ"
  ],
  "BELMAR": [
    "07719",
    "NJ"
  ],
  "BRADLEY BEACH": [
    "07720",
    "NJ"
  ],
  "CLIFFWOOD": [
    "07721",
    "NJ"
  ],
  "COLTS NECK": [
    "07722",
    "NJ"
  ],
  "DEAL": [
    "07723",
    "NJ"
  ],
  "EATONTOWN": [
    "07724",
    "NJ"
  ],
  "ENGLISHTOWN": [
    "07726",
    "NJ"
  ],
  "FREEHOLD": [
    "12431",
    "NY"
  ],
  "HAZLET": [
    "07730",
    "NJ"
  ],
  "HOWELL": [
    "84316",
    "UT"
  ],
  "HIGHLANDS": [
    "77562",
    "TX"
  ],
  "HOLMDEL": [
    "07733",
    "NJ"
  ],
  "KEANSBURG": [
    "07734",
    "NJ"
  ],
  "KEYPORT": [
    "98345",
    "WA"
  ],
  "LEONARDO": [
    "07737",
    "NJ"
  ],
  "LINCROFT": [
    "07738",
    "NJ"
  ],
  "LITTLE SILVER": [
    "07739",
    "NJ"
  ],
  "LONG BRANCH": [
    "75669",
    "TX"
  ],
  "MATAWAN": [
    "07747",
    "NJ"
  ],
  "MONMOUTH BEACH": [
    "07750",
    "NJ"
  ],
  "MORGANVILLE": [
    "67468",
    "KS"
  ],
  "NAVESINK": [
    "07752",
    "NJ"
  ],
  "NEPTUNE": [
    "07754",
    "NJ"
  ],
  "OAKHURST": [
    "93644",
    "CA"
  ],
  "OCEAN GROVE": [
    "07756",
    "NJ"
  ],
  "OCEANPORT": [
    "07757",
    "NJ"
  ],
  "PORT MONMOUTH": [
    "07758",
    "NJ"
  ],
  "RUMSON": [
    "07760",
    "NJ"
  ],
  "SPRING LAKE": [
    "56680",
    "MN"
  ],
  "TENNENT": [
    "07763",
    "NJ"
  ],
  "WEST LONG BRANCH": [
    "07764",
    "NJ"
  ],
  "WICKATUNK": [
    "07765",
    "NJ"
  ],
  "MINE HILL": [
    "07803",
    "NJ"
  ],
  "PICATINNY ARSENAL": [
    "07806",
    "NJ"
  ],
  "ALLAMUCHY": [
    "07820",
    "NJ"
  ],
  "BELVIDERE": [
    "68315",
    "NE"
  ],
  "BLAIRSTOWN": [
    "64726",
    "MO"
  ],
  "BRANCHVILLE": [
    "47514",
    "IN"
  ],
  "BUDD LAKE": [
    "07828",
    "NJ"
  ],
  "BUTTZVILLE": [
    "07829",
    "NJ"
  ],
  "CALIFON": [
    "07830",
    "NJ"
  ],
  "CHANGEWATER": [
    "07831",
    "NJ"
  ],
  "DELAWARE": [
    "74027",
    "OK"
  ],
  "DENVILLE": [
    "07834",
    "NJ"
  ],
  "FLANDERS": [
    "07836",
    "NJ"
  ],
  "GREAT MEADOWS": [
    "07838",
    "NJ"
  ],
  "GREENDELL": [
    "07839",
    "NJ"
  ],
  "HACKETTSTOWN": [
    "07840",
    "NJ"
  ],
  "HIBERNIA": [
    "07842",
    "NJ"
  ],
  "HOPATCONG": [
    "07843",
    "NJ"
  ],
  "IRONIA": [
    "07845",
    "NJ"
  ],
  "JOHNSONBURG": [
    "15845",
    "PA"
  ],
  "KENVIL": [
    "07847",
    "NJ"
  ],
  "LAFAYETTE": [
    "97127",
    "OR"
  ],
  "LAKE HOPATCONG": [
    "07849",
    "NJ"
  ],
  "LANDING": [
    "07850",
    "NJ"
  ],
  "LAYTON": [
    "84041",
    "UT"
  ],
  "LEDGEWOOD": [
    "07852",
    "NJ"
  ],
  "LONG VALLEY": [
    "07853",
    "NJ"
  ],
  "MIDDLEVILLE": [
    "49333",
    "MI"
  ],
  "MOUNT ARLINGTON": [
    "07856",
    "NJ"
  ],
  "NETCONG": [
    "07857",
    "NJ"
  ],
  "PORT MURRAY": [
    "07865",
    "NJ"
  ],
  "ROCKAWAY": [
    "07866",
    "NJ"
  ],
  "SCHOOLEYS MOUNTAIN": [
    "07870",
    "NJ"
  ],
  "SPARTA": [
    "65753",
    "MO"
  ],
  "STANHOPE": [
    "50246",
    "IA"
  ],
  "SUCCASUNNA": [
    "07876",
    "NJ"
  ],
  "SWARTSWOOD": [
    "07877",
    "NJ"
  ],
  "MOUNT TABOR": [
    "07878",
    "NJ"
  ],
  "TRANQUILITY": [
    "07879",
    "NJ"
  ],
  "WALLPACK CENTER": [
    "07881",
    "NJ"
  ],
  "WHARTON": [
    "77488",
    "TX"
  ],
  "SUMMIT": [
    "84772",
    "UT"
  ],
  "BASKING RIDGE": [
    "07920",
    "NJ"
  ],
  "BEDMINSTER": [
    "18910",
    "PA"
  ],
  "BERKELEY HEIGHTS": [
    "07922",
    "NJ"
  ],
  "BERNARDSVILLE": [
    "07924",
    "NJ"
  ],
  "BROOKSIDE": [
    "35036",
    "AL"
  ],
  "CEDAR KNOLLS": [
    "07927",
    "NJ"
  ],
  "FAR HILLS": [
    "07931",
    "NJ"
  ],
  "FLORHAM PARK": [
    "07932",
    "NJ"
  ],
  "GILLETTE": [
    "82718",
    "WY"
  ],
  "GLADSTONE": [
    "97027",
    "OR"
  ],
  "GREEN VILLAGE": [
    "07935",
    "NJ"
  ],
  "EAST HANOVER": [
    "07936",
    "NJ"
  ],
  "LIBERTY CORNER": [
    "07938",
    "NJ"
  ],
  "LYONS": [
    "97358",
    "OR"
  ],
  "MENDHAM": [
    "07945",
    "NJ"
  ],
  "MILLINGTON": [
    "60537",
    "IL"
  ],
  "MORRIS PLAINS": [
    "07950",
    "NJ"
  ],
  "MORRISTOWN": [
    "85342",
    "AZ"
  ],
  "CONVENT STATION": [
    "07961",
    "NJ"
  ],
  "MOUNT FREEDOM": [
    "07970",
    "NJ"
  ],
  "NEW PROVIDENCE": [
    "50206",
    "IA"
  ],
  "NEW VERNON": [
    "07976",
    "NJ"
  ],
  "PEAPACK": [
    "07977",
    "NJ"
  ],
  "PLUCKEMIN": [
    "07978",
    "NJ"
  ],
  "POTTERSVILLE": [
    "65790",
    "MO"
  ],
  "STIRLING": [
    "07980",
    "NJ"
  ],
  "WHIPPANY": [
    "07981",
    "NJ"
  ],
  "ALLOWAY": [
    "08001",
    "NJ"
  ],
  "CHERRY HILL": [
    "08034",
    "NJ"
  ],
  "ATCO": [
    "08004",
    "NJ"
  ],
  "BARNEGAT": [
    "08005",
    "NJ"
  ],
  "BARNEGAT LIGHT": [
    "08006",
    "NJ"
  ],
  "BEACH HAVEN": [
    "18601",
    "PA"
  ],
  "BIRMINGHAM": [
    "52535",
    "IA"
  ],
  "BLACKWOOD": [
    "08012",
    "NJ"
  ],
  "BROWNS MILLS": [
    "08015",
    "NJ"
  ],
  "CEDAR BROOK": [
    "08018",
    "NJ"
  ],
  "CHATSWORTH": [
    "91313",
    "CA"
  ],
  "CLARKSBORO": [
    "08020",
    "NJ"
  ],
  "CLEMENTON": [
    "08021",
    "NJ"
  ],
  "COLUMBUS": [
    "88029",
    "NM"
  ],
  "DEEPWATER": [
    "64740",
    "MO"
  ],
  "EWAN": [
    "08025",
    "NJ"
  ],
  "GIBBSBORO": [
    "08026",
    "NJ"
  ],
  "GIBBSTOWN": [
    "08027",
    "NJ"
  ],
  "GLASSBORO": [
    "08028",
    "NJ"
  ],
  "GLENDORA": [
    "91741",
    "CA"
  ],
  "GLOUCESTER CITY": [
    "08030",
    "NJ"
  ],
  "BELLMAWR": [
    "08099",
    "NJ"
  ],
  "GRENLOCH": [
    "08032",
    "NJ"
  ],
  "HADDONFIELD": [
    "08033",
    "NJ"
  ],
  "HADDON HEIGHTS": [
    "08035",
    "NJ"
  ],
  "HAINESPORT": [
    "08036",
    "NJ"
  ],
  "HAMMONTON": [
    "08037",
    "NJ"
  ],
  "HANCOCKS BRIDGE": [
    "08038",
    "NJ"
  ],
  "HARRISONVILLE": [
    "64701",
    "MO"
  ],
  "JOBSTOWN": [
    "08041",
    "NJ"
  ],
  "JULIUSTOWN": [
    "08042",
    "NJ"
  ],
  "VOORHEES": [
    "08043",
    "NJ"
  ],
  "LAWNSIDE": [
    "08045",
    "NJ"
  ],
  "WILLINGBORO": [
    "08046",
    "NJ"
  ],
  "LUMBERTON": [
    "77657",
    "TX"
  ],
  "MAGNOLIA": [
    "77355",
    "TX"
  ],
  "MANAHAWKIN": [
    "08050",
    "NJ"
  ],
  "MANTUA": [
    "84324",
    "UT"
  ],
  "MAPLE SHADE": [
    "08052",
    "NJ"
  ],
  "MARLTON": [
    "08053",
    "NJ"
  ],
  "MOUNT LAUREL": [
    "08054",
    "NJ"
  ],
  "MICKLETON": [
    "08056",
    "NJ"
  ],
  "MOORESTOWN": [
    "08057",
    "NJ"
  ],
  "MOUNT EPHRAIM": [
    "08059",
    "NJ"
  ],
  "MOUNT ROYAL": [
    "08061",
    "NJ"
  ],
  "MULLICA HILL": [
    "08062",
    "NJ"
  ],
  "NATIONAL PARK": [
    "08063",
    "NJ"
  ],
  "NEW LISBON": [
    "53950",
    "WI"
  ],
  "PAULSBORO": [
    "08066",
    "NJ"
  ],
  "PEDRICKTOWN": [
    "08067",
    "NJ"
  ],
  "PEMBERTON": [
    "56078",
    "MN"
  ],
  "PENNS GROVE": [
    "08069",
    "NJ"
  ],
  "PENNSVILLE": [
    "08070",
    "NJ"
  ],
  "PITMAN": [
    "17964",
    "PA"
  ],
  "QUINTON": [
    "74561",
    "OK"
  ],
  "RANCOCAS": [
    "08073",
    "NJ"
  ],
  "RICHWOOD": [
    "56577",
    "MN"
  ],
  "RUNNEMEDE": [
    "08078",
    "NJ"
  ],
  "SEWELL": [
    "08080",
    "NJ"
  ],
  "SICKLERVILLE": [
    "08081",
    "NJ"
  ],
  "SOMERDALE": [
    "44678",
    "OH"
  ],
  "SWEDESBORO": [
    "08085",
    "NJ"
  ],
  "THOROFARE": [
    "08086",
    "NJ"
  ],
  "TUCKERTON": [
    "08087",
    "NJ"
  ],
  "VINCENTOWN": [
    "08088",
    "NJ"
  ],
  "WATERFORD WORKS": [
    "08089",
    "NJ"
  ],
  "WENONAH": [
    "08090",
    "NJ"
  ],
  "WEST BERLIN": [
    "08091",
    "NJ"
  ],
  "WEST CREEK": [
    "08092",
    "NJ"
  ],
  "WESTVILLE": [
    "74965",
    "OK"
  ],
  "WINSLOW": [
    "86047",
    "AZ"
  ],
  "DEPTFORD": [
    "08096",
    "NJ"
  ],
  "WOODBURY HEIGHTS": [
    "08097",
    "NJ"
  ],
  "WOODSTOWN": [
    "08098",
    "NJ"
  ],
  "AUDUBON": [
    "56511",
    "MN"
  ],
  "OAKLYN": [
    "08107",
    "NJ"
  ],
  "COLLINGSWOOD": [
    "08108",
    "NJ"
  ],
  "MERCHANTVILLE": [
    "08109",
    "NJ"
  ],
  "PENNSAUKEN": [
    "08110",
    "NJ"
  ],
  "ABSECON": [
    "08205",
    "NJ"
  ],
  "AVALON": [
    "90704",
    "CA"
  ],
  "BRIGANTINE": [
    "08203",
    "NJ"
  ],
  "CAPE MAY": [
    "08204",
    "NJ"
  ],
  "CAPE MAY COURT HOUSE": [
    "08210",
    "NJ"
  ],
  "CAPE MAY POINT": [
    "08212",
    "NJ"
  ],
  "COLOGNE": [
    "55322",
    "MN"
  ],
  "DENNISVILLE": [
    "08214",
    "NJ"
  ],
  "EGG HARBOR CITY": [
    "08215",
    "NJ"
  ],
  "ELWOOD": [
    "68937",
    "NE"
  ],
  "GREEN CREEK": [
    "08219",
    "NJ"
  ],
  "LEEDS POINT": [
    "08220",
    "NJ"
  ],
  "MARMORA": [
    "08223",
    "NJ"
  ],
  "NEW GRETNA": [
    "08224",
    "NJ"
  ],
  "OCEAN CITY": [
    "21843",
    "MD"
  ],
  "OCEAN VIEW": [
    "96737",
    "HI"
  ],
  "OCEANVILLE": [
    "08231",
    "NJ"
  ],
  "PLEASANTVILLE": [
    "50225",
    "IA"
  ],
  "EGG HARBOR TOWNSHIP": [
    "08234",
    "NJ"
  ],
  "POMONA": [
    "91769",
    "CA"
  ],
  "PORT REPUBLIC": [
    "24471",
    "VA"
  ],
  "RIO GRANDE": [
    "45674",
    "OH"
  ],
  "SEA ISLE CITY": [
    "08243",
    "NJ"
  ],
  "SOMERS POINT": [
    "08244",
    "NJ"
  ],
  "SOUTH SEAVILLE": [
    "08246",
    "NJ"
  ],
  "STONE HARBOR": [
    "08247",
    "NJ"
  ],
  "STRATHMERE": [
    "08248",
    "NJ"
  ],
  "TUCKAHOE": [
    "10707",
    "NY"
  ],
  "VILLAS": [
    "08251",
    "NJ"
  ],
  "WHITESBORO": [
    "76273",
    "TX"
  ],
  "WILDWOOD": [
    "34785",
    "FL"
  ],
  "WOODBINE": [
    "67492",
    "KS"
  ],
  "BRIDGETON": [
    "63044",
    "MO"
  ],
  "BUENA": [
    "98921",
    "WA"
  ],
  "CEDARVILLE": [
    "96104",
    "CA"
  ],
  "CLAYTON": [
    "99110",
    "WA"
  ],
  "DEERFIELD STREET": [
    "08313",
    "NJ"
  ],
  "DELMONT": [
    "57330",
    "SD"
  ],
  "DIVIDING CREEK": [
    "08315",
    "NJ"
  ],
  "DOROTHY": [
    "08317",
    "NJ"
  ],
  "ELMER": [
    "71424",
    "LA"
  ],
  "ESTELL MANOR": [
    "08319",
    "NJ"
  ],
  "FAIRTON": [
    "08320",
    "NJ"
  ],
  "FORTESCUE": [
    "08321",
    "NJ"
  ],
  "FRANKLINVILLE": [
    "27248",
    "NC"
  ],
  "HEISLERVILLE": [
    "08324",
    "NJ"
  ],
  "LANDISVILLE": [
    "17538",
    "PA"
  ],
  "LEESBURG": [
    "75451",
    "TX"
  ],
  "MALAGA": [
    "98828",
    "WA"
  ],
  "MAURICETOWN": [
    "08329",
    "NJ"
  ],
  "MAYS LANDING": [
    "08330",
    "NJ"
  ],
  "MILMAY": [
    "08340",
    "NJ"
  ],
  "MINOTOLA": [
    "08341",
    "NJ"
  ],
  "MIZPAH": [
    "56660",
    "MN"
  ],
  "MONROEVILLE": [
    "46773",
    "IN"
  ],
  "NORMA": [
    "08347",
    "NJ"
  ],
  "PORT ELIZABETH": [
    "08348",
    "NJ"
  ],
  "PORT NORRIS": [
    "08349",
    "NJ"
  ],
  "RICHLAND": [
    "99354",
    "WA"
  ],
  "ROSENHAYN": [
    "08352",
    "NJ"
  ],
  "SHILOH": [
    "44878",
    "OH"
  ],
  "VINELAND": [
    "08362",
    "NJ"
  ],
  "ATLANTIC CITY": [
    "08405",
    "NJ"
  ],
  "MARGATE CITY": [
    "08402",
    "NJ"
  ],
  "LONGPORT": [
    "08403",
    "NJ"
  ],
  "VENTNOR CITY": [
    "08406",
    "NJ"
  ],
  "ALLENTOWN": [
    "31003",
    "GA"
  ],
  "BELLE MEAD": [
    "08502",
    "NJ"
  ],
  "BLAWENBURG": [
    "08504",
    "NJ"
  ],
  "BORDENTOWN": [
    "08505",
    "NJ"
  ],
  "MILLSTONE TOWNSHIP": [
    "08535",
    "NJ"
  ],
  "COOKSTOWN": [
    "08511",
    "NJ"
  ],
  "CRANBURY": [
    "08512",
    "NJ"
  ],
  "CREAM RIDGE": [
    "08514",
    "NJ"
  ],
  "HIGHTSTOWN": [
    "08520",
    "NJ"
  ],
  "HOPEWELL": [
    "43746",
    "OH"
  ],
  "IMLAYSTOWN": [
    "08526",
    "NJ"
  ],
  "LAMBERTVILLE": [
    "48144",
    "MI"
  ],
  "NEW EGYPT": [
    "08533",
    "NJ"
  ],
  "PENNINGTON": [
    "75856",
    "TX"
  ],
  "PLAINSBORO": [
    "08536",
    "NJ"
  ],
  "PRINCETON JUNCTION": [
    "08550",
    "NJ"
  ],
  "RINGOES": [
    "08551",
    "NJ"
  ],
  "ROEBLING": [
    "08554",
    "NJ"
  ],
  "ROOSEVELT": [
    "99356",
    "WA"
  ],
  "ROSEMONT": [
    "08556",
    "NJ"
  ],
  "SERGEANTSVILLE": [
    "08557",
    "NJ"
  ],
  "SKILLMAN": [
    "08558",
    "NJ"
  ],
  "STOCKTON": [
    "95297",
    "CA"
  ],
  "TITUSVILLE": [
    "32796",
    "FL"
  ],
  "WRIGHTSTOWN": [
    "54180",
    "WI"
  ],
  "TRENTON": [
    "75490",
    "TX"
  ],
  "FORT DIX": [
    "08640",
    "NJ"
  ],
  "LAWRENCE TOWNSHIP": [
    "08648",
    "NJ"
  ],
  "LAKEWOOD": [
    "98499",
    "WA"
  ],
  "ALLENWOOD": [
    "17810",
    "PA"
  ],
  "BAYVILLE": [
    "11709",
    "NY"
  ],
  "BEACHWOOD": [
    "44122",
    "OH"
  ],
  "BRICK": [
    "08724",
    "NJ"
  ],
  "BRIELLE": [
    "08730",
    "NJ"
  ],
  "FORKED RIVER": [
    "08731",
    "NJ"
  ],
  "ISLAND HEIGHTS": [
    "08732",
    "NJ"
  ],
  "LAKEHURST": [
    "08733",
    "NJ"
  ],
  "LANOKA HARBOR": [
    "08734",
    "NJ"
  ],
  "LAVALLETTE": [
    "08735",
    "NJ"
  ],
  "MANASQUAN": [
    "08736",
    "NJ"
  ],
  "MANTOLOKING": [
    "08738",
    "NJ"
  ],
  "NORMANDY BEACH": [
    "08739",
    "NJ"
  ],
  "OCEAN GATE": [
    "08740",
    "NJ"
  ],
  "PINE BEACH": [
    "08741",
    "NJ"
  ],
  "POINT PLEASANT BEACH": [
    "08742",
    "NJ"
  ],
  "SEA GIRT": [
    "08750",
    "NJ"
  ],
  "SEASIDE HEIGHTS": [
    "08751",
    "NJ"
  ],
  "SEASIDE PARK": [
    "08752",
    "NJ"
  ],
  "TOMS RIVER": [
    "08757",
    "NJ"
  ],
  "WARETOWN": [
    "08758",
    "NJ"
  ],
  "MANCHESTER TOWNSHIP": [
    "08759",
    "NJ"
  ],
  "ANNANDALE": [
    "55302",
    "MN"
  ],
  "ASBURY": [
    "64832",
    "MO"
  ],
  "BAPTISTOWN": [
    "08803",
    "NJ"
  ],
  "BLOOMSBURY": [
    "08804",
    "NJ"
  ],
  "BOUND BROOK": [
    "08805",
    "NJ"
  ],
  "BROADWAY": [
    "43007",
    "OH"
  ],
  "DAYTON": [
    "99328",
    "WA"
  ],
  "DUNELLEN": [
    "08812",
    "NJ"
  ],
  "EAST BRUNSWICK": [
    "08816",
    "NJ"
  ],
  "EDISON": [
    "93220",
    "CA"
  ],
  "FLAGTOWN": [
    "08821",
    "NJ"
  ],
  "FLEMINGTON": [
    "65650",
    "MO"
  ],
  "FRANKLIN PARK": [
    "60131",
    "IL"
  ],
  "KENDALL PARK": [
    "08824",
    "NJ"
  ],
  "FRENCHTOWN": [
    "59834",
    "MT"
  ],
  "GLEN GARDNER": [
    "08826",
    "NJ"
  ],
  "HELMETTA": [
    "08828",
    "NJ"
  ],
  "HIGH BRIDGE": [
    "54846",
    "WI"
  ],
  "ISELIN": [
    "08830",
    "NJ"
  ],
  "MONROE TOWNSHIP": [
    "08831",
    "NJ"
  ],
  "KEASBEY": [
    "08832",
    "NJ"
  ],
  "MARTINSVILLE": [
    "75958",
    "TX"
  ],
  "METUCHEN": [
    "08840",
    "NJ"
  ],
  "MIDDLESEX": [
    "27557",
    "NC"
  ],
  "MILLTOWN": [
    "59851",
    "MT"
  ],
  "MONMOUTH JUNCTION": [
    "08852",
    "NJ"
  ],
  "NESHANIC STATION": [
    "08853",
    "NJ"
  ],
  "PISCATAWAY": [
    "08855",
    "NJ"
  ],
  "OLD BRIDGE": [
    "08857",
    "NJ"
  ],
  "OLDWICK": [
    "08858",
    "NJ"
  ],
  "PARLIN": [
    "81239",
    "CO"
  ],
  "PERTH AMBOY": [
    "08862",
    "NJ"
  ],
  "FORDS": [
    "08863",
    "NJ"
  ],
  "PHILLIPSBURG": [
    "67661",
    "KS"
  ],
  "PITTSTOWN": [
    "08867",
    "NJ"
  ],
  "QUAKERTOWN": [
    "18951",
    "PA"
  ],
  "RARITAN": [
    "61471",
    "IL"
  ],
  "READINGTON": [
    "08870",
    "NJ"
  ],
  "SAYREVILLE": [
    "08872",
    "NJ"
  ],
  "SOUTH AMBOY": [
    "08879",
    "NJ"
  ],
  "SOUTH BOUND BROOK": [
    "08880",
    "NJ"
  ],
  "SOUTH RIVER": [
    "08882",
    "NJ"
  ],
  "SPOTSWOOD": [
    "08884",
    "NJ"
  ],
  "STANTON": [
    "90680",
    "CA"
  ],
  "STEWARTSVILLE": [
    "64490",
    "MO"
  ],
  "THREE BRIDGES": [
    "08887",
    "NJ"
  ],
  "WHITEHOUSE": [
    "75791",
    "TX"
  ],
  "WHITEHOUSE STATION": [
    "08889",
    "NJ"
  ],
  "ZAREPHATH": [
    "08890",
    "NJ"
  ],
  "NEW BRUNSWICK": [
    "08933",
    "NJ"
  ],
  "NORTH BRUNSWICK": [
    "08902",
    "NJ"
  ],
  "HIGHLAND PARK": [
    "60035",
    "IL"
  ],
  "NEW YORK": [
    "10292",
    "NY"
  ],
  "STATEN ISLAND": [
    "10314",
    "NY"
  ],
  "BRONX": [
    "10475",
    "NY"
  ],
  "AMAWALK": [
    "10501",
    "NY"
  ],
  "ARDSLEY": [
    "10502",
    "NY"
  ],
  "ARDSLEY ON HUDSON": [
    "10503",
    "NY"
  ],
  "ARMONK": [
    "10504",
    "NY"
  ],
  "BALDWIN PLACE": [
    "10505",
    "NY"
  ],
  "BEDFORD HILLS": [
    "10507",
    "NY"
  ],
  "BRIARCLIFF MANOR": [
    "10510",
    "NY"
  ],
  "BUCHANAN": [
    "58420",
    "ND"
  ],
  "CHAPPAQUA": [
    "10514",
    "NY"
  ],
  "COLD SPRING": [
    "56320",
    "MN"
  ],
  "CROMPOND": [
    "10517",
    "NY"
  ],
  "CROSS RIVER": [
    "10518",
    "NY"
  ],
  "CROTON FALLS": [
    "10519",
    "NY"
  ],
  "CROTON ON HUDSON": [
    "10521",
    "NY"
  ],
  "DOBBS FERRY": [
    "10522",
    "NY"
  ],
  "ELMSFORD": [
    "10523",
    "NY"
  ],
  "GARRISON": [
    "84728",
    "UT"
  ],
  "GOLDENS BRIDGE": [
    "10526",
    "NY"
  ],
  "GRANITE SPRINGS": [
    "10527",
    "NY"
  ],
  "HARTSDALE": [
    "10530",
    "NY"
  ],
  "JEFFERSON VALLEY": [
    "10535",
    "NY"
  ],
  "KATONAH": [
    "10536",
    "NY"
  ],
  "LAKE PEEKSKILL": [
    "10537",
    "NY"
  ],
  "LARCHMONT": [
    "10538",
    "NY"
  ],
  "LINCOLNDALE": [
    "10540",
    "NY"
  ],
  "MAHOPAC": [
    "10541",
    "NY"
  ],
  "MAHOPAC FALLS": [
    "10542",
    "NY"
  ],
  "MAMARONECK": [
    "10543",
    "NY"
  ],
  "MARYKNOLL": [
    "10545",
    "NY"
  ],
  "MILLWOOD": [
    "42762",
    "KY"
  ],
  "MOHEGAN LAKE": [
    "10547",
    "NY"
  ],
  "MONTROSE": [
    "91021",
    "CA"
  ],
  "MOUNT KISCO": [
    "10549",
    "NY"
  ],
  "OSSINING": [
    "10562",
    "NY"
  ],
  "PEEKSKILL": [
    "10566",
    "NY"
  ],
  "CORTLANDT MANOR": [
    "10567",
    "NY"
  ],
  "PORT CHESTER": [
    "10573",
    "NY"
  ],
  "POUND RIDGE": [
    "10576",
    "NY"
  ],
  "PURCHASE": [
    "10577",
    "NY"
  ],
  "PURDYS": [
    "10578",
    "NY"
  ],
  "PUTNAM VALLEY": [
    "10579",
    "NY"
  ],
  "SCARSDALE": [
    "10583",
    "NY"
  ],
  "SHENOROCK": [
    "10587",
    "NY"
  ],
  "SHRUB OAK": [
    "10588",
    "NY"
  ],
  "SOUTH SALEM": [
    "45681",
    "OH"
  ],
  "TARRYTOWN": [
    "30470",
    "GA"
  ],
  "THORNWOOD": [
    "10594",
    "NY"
  ],
  "VALHALLA": [
    "10595",
    "NY"
  ],
  "VERPLANCK": [
    "10596",
    "NY"
  ],
  "WACCABUC": [
    "10597",
    "NY"
  ],
  "YORKTOWN HEIGHTS": [
    "10598",
    "NY"
  ],
  "WHITE PLAINS": [
    "42464",
    "KY"
  ],
  "WEST HARRISON": [
    "47060",
    "IN"
  ],
  "YONKERS": [
    "10710",
    "NY"
  ],
  "HASTINGS ON HUDSON": [
    "10706",
    "NY"
  ],
  "BRONXVILLE": [
    "10708",
    "NY"
  ],
  "EASTCHESTER": [
    "10709",
    "NY"
  ],
  "NEW ROCHELLE": [
    "10805",
    "NY"
  ],
  "SUFFERN": [
    "10901",
    "NY"
  ],
  "ARDEN": [
    "28704",
    "NC"
  ],
  "BEAR MOUNTAIN": [
    "10911",
    "NY"
  ],
  "BELLVALE": [
    "10912",
    "NY"
  ],
  "BLAUVELT": [
    "10913",
    "NY"
  ],
  "BLOOMING GROVE": [
    "76626",
    "TX"
  ],
  "BULLVILLE": [
    "10915",
    "NY"
  ],
  "CAMPBELL HALL": [
    "10916",
    "NY"
  ],
  "CENTRAL VALLEY": [
    "10917",
    "NY"
  ],
  "CIRCLEVILLE": [
    "84723",
    "UT"
  ],
  "CONGERS": [
    "10920",
    "NY"
  ],
  "FLORIDA": [
    "10921",
    "NY"
  ],
  "FORT MONTGOMERY": [
    "10922",
    "NY"
  ],
  "GARNERVILLE": [
    "10923",
    "NY"
  ],
  "GREENWOOD LAKE": [
    "10925",
    "NY"
  ],
  "HARRIMAN": [
    "37748",
    "TN"
  ],
  "HAVERSTRAW": [
    "10927",
    "NY"
  ],
  "HIGHLAND FALLS": [
    "10928",
    "NY"
  ],
  "HIGHLAND MILLS": [
    "10930",
    "NY"
  ],
  "HILLBURN": [
    "10931",
    "NY"
  ],
  "HOWELLS": [
    "68641",
    "NE"
  ],
  "MONSEY": [
    "10952",
    "NY"
  ],
  "MOUNTAINVILLE": [
    "10953",
    "NY"
  ],
  "NANUET": [
    "10954",
    "NY"
  ],
  "NEW CITY": [
    "10956",
    "NY"
  ],
  "NYACK": [
    "10960",
    "NY"
  ],
  "ORANGEBURG": [
    "29118",
    "SC"
  ],
  "OTISVILLE": [
    "48463",
    "MI"
  ],
  "PALISADES": [
    "98845",
    "WA"
  ],
  "PEARL RIVER": [
    "70452",
    "LA"
  ],
  "PINE ISLAND": [
    "55963",
    "MN"
  ],
  "SLATE HILL": [
    "10973",
    "NY"
  ],
  "SLOATSBURG": [
    "10974",
    "NY"
  ],
  "SOUTHFIELDS": [
    "10975",
    "NY"
  ],
  "SPARKILL": [
    "10976",
    "NY"
  ],
  "SPRING VALLEY": [
    "91979",
    "CA"
  ],
  "STERLING FOREST": [
    "10979",
    "NY"
  ],
  "STONY POINT": [
    "28678",
    "NC"
  ],
  "SUGAR LOAF": [
    "10981",
    "NY"
  ],
  "TALLMAN": [
    "10982",
    "NY"
  ],
  "TAPPAN": [
    "10983",
    "NY"
  ],
  "THIELLS": [
    "10984",
    "NY"
  ],
  "THOMPSON RIDGE": [
    "10985",
    "NY"
  ],
  "TOMKINS COVE": [
    "10986",
    "NY"
  ],
  "TUXEDO PARK": [
    "10987",
    "NY"
  ],
  "VALLEY COTTAGE": [
    "10989",
    "NY"
  ],
  "WASHINGTONVILLE": [
    "44490",
    "OH"
  ],
  "WEST HAVERSTRAW": [
    "10993",
    "NY"
  ],
  "WEST NYACK": [
    "10994",
    "NY"
  ],
  "WEST POINT": [
    "95255",
    "CA"
  ],
  "WESTTOWN": [
    "19395",
    "PA"
  ],
  "FLORAL PARK": [
    "11005",
    "NY"
  ],
  "ELMONT": [
    "11003",
    "NY"
  ],
  "GLEN OAKS": [
    "11004",
    "NY"
  ],
  "FRANKLIN SQUARE": [
    "11010",
    "NY"
  ],
  "GREAT NECK": [
    "11027",
    "NY"
  ],
  "MANHASSET": [
    "11030",
    "NY"
  ],
  "NEW HYDE PARK": [
    "11042",
    "NY"
  ],
  "PORT WASHINGTON": [
    "53074",
    "WI"
  ],
  "INWOOD": [
    "51240",
    "IA"
  ],
  "LONG ISLAND CITY": [
    "11120",
    "NY"
  ],
  "ASTORIA": [
    "97103",
    "OR"
  ],
  "SUNNYSIDE": [
    "98944",
    "WA"
  ],
  "FLUSHING": [
    "48433",
    "MI"
  ],
  "COLLEGE POINT": [
    "11356",
    "NY"
  ],
  "WHITESTONE": [
    "11357",
    "NY"
  ],
  "BAYSIDE": [
    "95524",
    "CA"
  ],
  "LITTLE NECK": [
    "11363",
    "NY"
  ],
  "OAKLAND GARDENS": [
    "11364",
    "NY"
  ],
  "FRESH MEADOWS": [
    "11366",
    "NY"
  ],
  "CORONA": [
    "92883",
    "CA"
  ],
  "EAST ELMHURST": [
    "11370",
    "NY"
  ],
  "JACKSON HEIGHTS": [
    "11372",
    "NY"
  ],
  "ELMHURST": [
    "60126",
    "IL"
  ],
  "REGO PARK": [
    "11374",
    "NY"
  ],
  "FOREST HILLS": [
    "41527",
    "KY"
  ],
  "WOODSIDE": [
    "19980",
    "DE"
  ],
  "MASPETH": [
    "11378",
    "NY"
  ],
  "MIDDLE VILLAGE": [
    "11379",
    "NY"
  ],
  "CAMBRIA HEIGHTS": [
    "11411",
    "NY"
  ],
  "SPRINGFIELD GARDENS": [
    "11413",
    "NY"
  ],
  "HOWARD BEACH": [
    "11414",
    "NY"
  ],
  "KEW GARDENS": [
    "11415",
    "NY"
  ],
  "OZONE PARK": [
    "11417",
    "NY"
  ],
  "RICHMOND HILL": [
    "31324",
    "GA"
  ],
  "SOUTH RICHMOND HILL": [
    "11419",
    "NY"
  ],
  "SOUTH OZONE PARK": [
    "11420",
    "NY"
  ],
  "WOODHAVEN": [
    "11421",
    "NY"
  ],
  "ROSEDALE": [
    "70772",
    "LA"
  ],
  "BELLEROSE": [
    "11426",
    "NY"
  ],
  "QUEENS VILLAGE": [
    "11429",
    "NY"
  ],
  "MINEOLA": [
    "75773",
    "TX"
  ],
  "ALBERTSON": [
    "28508",
    "NC"
  ],
  "ATLANTIC BEACH": [
    "32233",
    "FL"
  ],
  "BALDWIN": [
    "70514",
    "LA"
  ],
  "CARLE PLACE": [
    "11514",
    "NY"
  ],
  "CEDARHURST": [
    "11516",
    "NY"
  ],
  "EAST ROCKAWAY": [
    "11518",
    "NY"
  ],
  "GARDEN CITY": [
    "84028",
    "UT"
  ],
  "GLEN COVE": [
    "11542",
    "NY"
  ],
  "GLEN HEAD": [
    "11545",
    "NY"
  ],
  "GLENWOOD LANDING": [
    "11547",
    "NY"
  ],
  "GREENVALE": [
    "11548",
    "NY"
  ],
  "HEMPSTEAD": [
    "77445",
    "TX"
  ],
  "WEST HEMPSTEAD": [
    "11552",
    "NY"
  ],
  "UNIONDALE": [
    "46791",
    "IN"
  ],
  "EAST MEADOW": [
    "11554",
    "NY"
  ],
  "HEWLETT": [
    "11557",
    "NY"
  ],
  "ISLAND PARK": [
    "83429",
    "ID"
  ],
  "LOCUST VALLEY": [
    "11560",
    "NY"
  ],
  "LONG BEACH": [
    "98631",
    "WA"
  ],
  "LYNBROOK": [
    "11563",
    "NY"
  ],
  "MALVERNE": [
    "11565",
    "NY"
  ],
  "MERRICK": [
    "11566",
    "NY"
  ],
  "OLD WESTBURY": [
    "11568",
    "NY"
  ],
  "POINT LOOKOUT": [
    "65726",
    "MO"
  ],
  "ROCKVILLE CENTRE": [
    "11571",
    "NY"
  ],
  "OCEANSIDE": [
    "97134",
    "OR"
  ],
  "ROSLYN": [
    "98941",
    "WA"
  ],
  "ROSLYN HEIGHTS": [
    "11577",
    "NY"
  ],
  "SEA CLIFF": [
    "11579",
    "NY"
  ],
  "VALLEY STREAM": [
    "11582",
    "NY"
  ],
  "WESTBURY": [
    "11590",
    "NY"
  ],
  "WILLISTON PARK": [
    "11596",
    "NY"
  ],
  "WOODMERE": [
    "11598",
    "NY"
  ],
  "FAR ROCKAWAY": [
    "11695",
    "NY"
  ],
  "ARVERNE": [
    "11692",
    "NY"
  ],
  "ROCKAWAY PARK": [
    "11694",
    "NY"
  ],
  "BREEZY POINT": [
    "11697",
    "NY"
  ],
  "AMITYVILLE": [
    "11701",
    "NY"
  ],
  "BABYLON": [
    "11702",
    "NY"
  ],
  "NORTH BABYLON": [
    "11703",
    "NY"
  ],
  "WEST BABYLON": [
    "11707",
    "NY"
  ],
  "BAYPORT": [
    "55003",
    "MN"
  ],
  "BAY SHORE": [
    "49711",
    "MI"
  ],
  "BELLMORE": [
    "11710",
    "NY"
  ],
  "BELLPORT": [
    "11713",
    "NY"
  ],
  "BETHPAGE": [
    "37022",
    "TN"
  ],
  "BLUE POINT": [
    "11715",
    "NY"
  ],
  "BOHEMIA": [
    "11716",
    "NY"
  ],
  "BRENTWOOD": [
    "94513",
    "CA"
  ],
  "BRIGHTWATERS": [
    "11718",
    "NY"
  ],
  "BROOKHAVEN": [
    "39603",
    "MS"
  ],
  "CENTEREACH": [
    "11720",
    "NY"
  ],
  "CENTERPORT": [
    "19516",
    "PA"
  ],
  "CENTRAL ISLIP": [
    "11722",
    "NY"
  ],
  "COLD SPRING HARBOR": [
    "11724",
    "NY"
  ],
  "COMMACK": [
    "11725",
    "NY"
  ],
  "COPIAGUE": [
    "11726",
    "NY"
  ],
  "CORAM": [
    "59913",
    "MT"
  ],
  "DEER PARK": [
    "99006",
    "WA"
  ],
  "EAST ISLIP": [
    "11730",
    "NY"
  ],
  "EAST NORTHPORT": [
    "11731",
    "NY"
  ],
  "EAST NORWICH": [
    "11732",
    "NY"
  ],
  "EAST SETAUKET": [
    "11733",
    "NY"
  ],
  "FARMINGVILLE": [
    "11738",
    "NY"
  ],
  "GREAT RIVER": [
    "11739",
    "NY"
  ],
  "GREENLAWN": [
    "11740",
    "NY"
  ],
  "HUNTINGTON STATION": [
    "11746",
    "NY"
  ],
  "MELVILLE": [
    "71353",
    "LA"
  ],
  "ISLANDIA": [
    "11749",
    "NY"
  ],
  "ISLIP": [
    "11751",
    "NY"
  ],
  "ISLIP TERRACE": [
    "11752",
    "NY"
  ],
  "KINGS PARK": [
    "11754",
    "NY"
  ],
  "LAKE GROVE": [
    "11755",
    "NY"
  ],
  "LEVITTOWN": [
    "19058",
    "PA"
  ],
  "LINDENHURST": [
    "11757",
    "NY"
  ],
  "MASSAPEQUA": [
    "11758",
    "NY"
  ],
  "MASSAPEQUA PARK": [
    "11762",
    "NY"
  ],
  "MILLER PLACE": [
    "11764",
    "NY"
  ],
  "MILL NECK": [
    "11765",
    "NY"
  ],
  "MOUNT SINAI": [
    "11766",
    "NY"
  ],
  "NESCONSET": [
    "11767",
    "NY"
  ],
  "NORTHPORT": [
    "99157",
    "WA"
  ],
  "OCEAN BEACH": [
    "11770",
    "NY"
  ],
  "OYSTER BAY": [
    "11771",
    "NY"
  ],
  "PATCHOGUE": [
    "11772",
    "NY"
  ],
  "SYOSSET": [
    "11791",
    "NY"
  ],
  "PORT JEFFERSON STATION": [
    "11776",
    "NY"
  ],
  "PORT JEFFERSON": [
    "45360",
    "OH"
  ],
  "ROCKY POINT": [
    "28457",
    "NC"
  ],
  "RONKONKOMA": [
    "11779",
    "NY"
  ],
  "SAINT JAMES": [
    "70086",
    "LA"
  ],
  "SAYVILLE": [
    "11782",
    "NY"
  ],
  "SEAFORD": [
    "23696",
    "VA"
  ],
  "SELDEN": [
    "67757",
    "KS"
  ],
  "SMITHTOWN": [
    "11787",
    "NY"
  ],
  "HAUPPAUGE": [
    "11788",
    "NY"
  ],
  "SOUND BEACH": [
    "11789",
    "NY"
  ],
  "STONY BROOK": [
    "11794",
    "NY"
  ],
  "WADING RIVER": [
    "11792",
    "NY"
  ],
  "WANTAGH": [
    "11793",
    "NY"
  ],
  "WEST ISLIP": [
    "11795",
    "NY"
  ],
  "WEST SAYVILLE": [
    "11796",
    "NY"
  ],
  "WYANDANCH": [
    "11798",
    "NY"
  ],
  "HICKSVILLE": [
    "43526",
    "OH"
  ],
  "PLAINVIEW": [
    "79073",
    "TX"
  ],
  "OLD BETHPAGE": [
    "11804",
    "NY"
  ],
  "RIVERHEAD": [
    "11901",
    "NY"
  ],
  "AMAGANSETT": [
    "11930",
    "NY"
  ],
  "AQUEBOGUE": [
    "11931",
    "NY"
  ],
  "BRIDGEHAMPTON": [
    "11932",
    "NY"
  ],
  "CALVERTON": [
    "20138",
    "VA"
  ],
  "CENTER MORICHES": [
    "11934",
    "NY"
  ],
  "CUTCHOGUE": [
    "11935",
    "NY"
  ],
  "EAST MARION": [
    "11939",
    "NY"
  ],
  "EAST MORICHES": [
    "11940",
    "NY"
  ],
  "EAST QUOGUE": [
    "11942",
    "NY"
  ],
  "GREENPORT": [
    "11944",
    "NY"
  ],
  "HAMPTON BAYS": [
    "11946",
    "NY"
  ],
  "JAMESPORT": [
    "64648",
    "MO"
  ],
  "LAUREL": [
    "68745",
    "NE"
  ],
  "MANORVILLE": [
    "16238",
    "PA"
  ],
  "MASTIC": [
    "11950",
    "NY"
  ],
  "MASTIC BEACH": [
    "11951",
    "NY"
  ],
  "MATTITUCK": [
    "11952",
    "NY"
  ],
  "MIDDLE ISLAND": [
    "11953",
    "NY"
  ],
  "MONTAUK": [
    "11954",
    "NY"
  ],
  "MORICHES": [
    "11955",
    "NY"
  ],
  "NEW SUFFOLK": [
    "11956",
    "NY"
  ],
  "PECONIC": [
    "11958",
    "NY"
  ],
  "QUOGUE": [
    "11959",
    "NY"
  ],
  "REMSENBURG": [
    "11960",
    "NY"
  ],
  "RIDGE": [
    "20680",
    "MD"
  ],
  "SAGAPONACK": [
    "11962",
    "NY"
  ],
  "SAG HARBOR": [
    "11963",
    "NY"
  ],
  "SHELTER ISLAND": [
    "11964",
    "NY"
  ],
  "SHELTER ISLAND HEIGHTS": [
    "11965",
    "NY"
  ],
  "SOUTH JAMESPORT": [
    "11970",
    "NY"
  ],
  "SOUTHOLD": [
    "11971",
    "NY"
  ],
  "SPEONK": [
    "11972",
    "NY"
  ],
  "WAINSCOTT": [
    "11975",
    "NY"
  ],
  "WATER MILL": [
    "11976",
    "NY"
  ],
  "WESTHAMPTON": [
    "11977",
    "NY"
  ],
  "WESTHAMPTON BEACH": [
    "11978",
    "NY"
  ],
  "YAPHANK": [
    "11980",
    "NY"
  ],
  "ALCOVE": [
    "12007",
    "NY"
  ],
  "ALPLAUS": [
    "12008",
    "NY"
  ],
  "ALTAMONT": [
    "84001",
    "UT"
  ],
  "AMSTERDAM": [
    "64723",
    "MO"
  ],
  "AUSTERLITZ": [
    "12017",
    "NY"
  ],
  "AVERILL PARK": [
    "12018",
    "NY"
  ],
  "BALLSTON LAKE": [
    "12019",
    "NY"
  ],
  "BALLSTON SPA": [
    "12020",
    "NY"
  ],
  "BERNE": [
    "46711",
    "IN"
  ],
  "BRAINARD": [
    "68626",
    "NE"
  ],
  "BROADALBIN": [
    "12025",
    "NY"
  ],
  "BURNT HILLS": [
    "12027",
    "NY"
  ],
  "BUSKIRK": [
    "12028",
    "NY"
  ],
  "CAROGA LAKE": [
    "12032",
    "NY"
  ],
  "CASTLETON ON HUDSON": [
    "12033",
    "NY"
  ],
  "CENTRAL BRIDGE": [
    "12035",
    "NY"
  ],
  "CHARLOTTEVILLE": [
    "12036",
    "NY"
  ],
  "CHERRY PLAIN": [
    "12040",
    "NY"
  ],
  "CLARKSVILLE": [
    "75426",
    "TX"
  ],
  "CLIMAX": [
    "80429",
    "CO"
  ],
  "COBLESKILL": [
    "12043",
    "NY"
  ],
  "COEYMANS": [
    "12045",
    "NY"
  ],
  "COEYMANS HOLLOW": [
    "12046",
    "NY"
  ],
  "COHOES": [
    "12047",
    "NY"
  ],
  "COLUMBIAVILLE": [
    "48421",
    "MI"
  ],
  "COXSACKIE": [
    "12051",
    "NY"
  ],
  "CROPSEYVILLE": [
    "12052",
    "NY"
  ],
  "DELANSON": [
    "12053",
    "NY"
  ],
  "DELMAR": [
    "52037",
    "IA"
  ],
  "DORMANSVILLE": [
    "12055",
    "NY"
  ],
  "DUANESBURG": [
    "12056",
    "NY"
  ],
  "EAGLE BRIDGE": [
    "12057",
    "NY"
  ],
  "EARLTON": [
    "12058",
    "NY"
  ],
  "EAST BERNE": [
    "12059",
    "NY"
  ],
  "EAST CHATHAM": [
    "12060",
    "NY"
  ],
  "EAST GREENBUSH": [
    "12061",
    "NY"
  ],
  "EAST NASSAU": [
    "12062",
    "NY"
  ],
  "EAST SCHODACK": [
    "12063",
    "NY"
  ],
  "EAST WORCESTER": [
    "12064",
    "NY"
  ],
  "CLIFTON PARK": [
    "12065",
    "NY"
  ],
  "ESPERANCE": [
    "12066",
    "NY"
  ],
  "FEURA BUSH": [
    "12067",
    "NY"
  ],
  "FONDA": [
    "50540",
    "IA"
  ],
  "FORT HUNTER": [
    "12069",
    "NY"
  ],
  "FORT JOHNSON": [
    "12070",
    "NY"
  ],
  "FULTONHAM": [
    "43738",
    "OH"
  ],
  "FULTONVILLE": [
    "12072",
    "NY"
  ],
  "GALLUPVILLE": [
    "12073",
    "NY"
  ],
  "GALWAY": [
    "12074",
    "NY"
  ],
  "GHENT": [
    "56239",
    "MN"
  ],
  "GILBOA": [
    "26671",
    "WV"
  ],
  "GLENMONT": [
    "44628",
    "OH"
  ],
  "GLOVERSVILLE": [
    "12078",
    "NY"
  ],
  "GUILDERLAND": [
    "12084",
    "NY"
  ],
  "GUILDERLAND CENTER": [
    "12085",
    "NY"
  ],
  "HAGAMAN": [
    "12086",
    "NY"
  ],
  "HANNACROIX": [
    "12087",
    "NY"
  ],
  "HOOSICK": [
    "12089",
    "NY"
  ],
  "HOOSICK FALLS": [
    "12090",
    "NY"
  ],
  "HOWES CAVE": [
    "12092",
    "NY"
  ],
  "JOHNSONVILLE": [
    "62850",
    "IL"
  ],
  "JOHNSTOWN": [
    "80534",
    "CO"
  ],
  "KINDERHOOK": [
    "62345",
    "IL"
  ],
  "KNOX": [
    "46534",
    "IN"
  ],
  "LATHAM": [
    "67072",
    "KS"
  ],
  "MALDEN BRIDGE": [
    "12115",
    "NY"
  ],
  "MARYLAND": [
    "12116",
    "NY"
  ],
  "MAYFIELD": [
    "84643",
    "UT"
  ],
  "MECHANICVILLE": [
    "12118",
    "NY"
  ],
  "MEDUSA": [
    "12120",
    "NY"
  ],
  "MIDDLEBURGH": [
    "12122",
    "NY"
  ],
  "NASSAU": [
    "19969",
    "DE"
  ],
  "NEW BALTIMORE": [
    "48051",
    "MI"
  ],
  "NEW LEBANON": [
    "45345",
    "OH"
  ],
  "NIVERVILLE": [
    "12130",
    "NY"
  ],
  "NORTH BLENHEIM": [
    "12131",
    "NY"
  ],
  "NORTH HOOSICK": [
    "12133",
    "NY"
  ],
  "NORTHVILLE": [
    "57465",
    "SD"
  ],
  "OLD CHATHAM": [
    "12136",
    "NY"
  ],
  "PATTERSONVILLE": [
    "12137",
    "NY"
  ],
  "PETERSBURG": [
    "99833",
    "AK"
  ],
  "PISECO": [
    "12139",
    "NY"
  ],
  "POESTENKILL": [
    "12140",
    "NY"
  ],
  "QUAKER STREET": [
    "12141",
    "NY"
  ],
  "RAVENA": [
    "12143",
    "NY"
  ],
  "RENSSELAER": [
    "47978",
    "IN"
  ],
  "RENSSELAERVILLE": [
    "12147",
    "NY"
  ],
  "REXFORD": [
    "67753",
    "KS"
  ],
  "RICHMONDVILLE": [
    "12149",
    "NY"
  ],
  "ROTTERDAM JUNCTION": [
    "12150",
    "NY"
  ],
  "ROUND LAKE": [
    "60073",
    "IL"
  ],
  "SAND LAKE": [
    "49343",
    "MI"
  ],
  "SCHAGHTICOKE": [
    "12154",
    "NY"
  ],
  "SCHENEVUS": [
    "12155",
    "NY"
  ],
  "SCHODACK LANDING": [
    "12156",
    "NY"
  ],
  "SCHOHARIE": [
    "12157",
    "NY"
  ],
  "SELKIRK": [
    "12158",
    "NY"
  ],
  "SLINGERLANDS": [
    "12159",
    "NY"
  ],
  "SLOANSVILLE": [
    "12160",
    "NY"
  ],
  "SOUTH BETHLEHEM": [
    "12161",
    "NY"
  ],
  "SPECULATOR": [
    "12164",
    "NY"
  ],
  "SPENCERTOWN": [
    "12165",
    "NY"
  ],
  "SPRAKERS": [
    "12166",
    "NY"
  ],
  "STEPHENTOWN": [
    "12169",
    "NY"
  ],
  "STOTTVILLE": [
    "12172",
    "NY"
  ],
  "STUYVESANT": [
    "12173",
    "NY"
  ],
  "STUYVESANT FALLS": [
    "12174",
    "NY"
  ],
  "SURPRISE": [
    "85388",
    "AZ"
  ],
  "TRIBES HILL": [
    "12177",
    "NY"
  ],
  "VALATIE": [
    "12184",
    "NY"
  ],
  "VALLEY FALLS": [
    "66088",
    "KS"
  ],
  "VOORHEESVILLE": [
    "12186",
    "NY"
  ],
  "WARNERVILLE": [
    "12187",
    "NY"
  ],
  "WATERVLIET": [
    "49098",
    "MI"
  ],
  "WEST COXSACKIE": [
    "12192",
    "NY"
  ],
  "WESTERLO": [
    "12193",
    "NY"
  ],
  "WEST FULTON": [
    "12194",
    "NY"
  ],
  "WEST SAND LAKE": [
    "12196",
    "NY"
  ],
  "WYNANTSKILL": [
    "12198",
    "NY"
  ],
  "SCHENECTADY": [
    "12345",
    "NY"
  ],
  "ACRA": [
    "12405",
    "NY"
  ],
  "ARKVILLE": [
    "12406",
    "NY"
  ],
  "BEARSVILLE": [
    "12409",
    "NY"
  ],
  "BIG INDIAN": [
    "12410",
    "NY"
  ],
  "BLOOMINGTON": [
    "92316",
    "CA"
  ],
  "BOICEVILLE": [
    "12412",
    "NY"
  ],
  "CAIRO": [
    "68824",
    "NE"
  ],
  "CATSKILL": [
    "12414",
    "NY"
  ],
  "CONNELLY": [
    "12417",
    "NY"
  ],
  "CORNWALLVILLE": [
    "12418",
    "NY"
  ],
  "COTTEKILL": [
    "12419",
    "NY"
  ],
  "CRAGSMOOR": [
    "12420",
    "NY"
  ],
  "DENVER": [
    "80299",
    "CO"
  ],
  "EAST DURHAM": [
    "12423",
    "NY"
  ],
  "EAST JEWETT": [
    "12424",
    "NY"
  ],
  "ELKA PARK": [
    "12427",
    "NY"
  ],
  "ELLENVILLE": [
    "12428",
    "NY"
  ],
  "ESOPUS": [
    "12429",
    "NY"
  ],
  "FLEISCHMANNS": [
    "12430",
    "NY"
  ],
  "GLASCO": [
    "67445",
    "KS"
  ],
  "GLENFORD": [
    "43739",
    "OH"
  ],
  "GRAND GORGE": [
    "12434",
    "NY"
  ],
  "GREENFIELD PARK": [
    "12435",
    "NY"
  ],
  "HAINES FALLS": [
    "12436",
    "NY"
  ],
  "HALCOTTSVILLE": [
    "12438",
    "NY"
  ],
  "HENSONVILLE": [
    "12439",
    "NY"
  ],
  "HIGH FALLS": [
    "12440",
    "NY"
  ],
  "HIGHMOUNT": [
    "12441",
    "NY"
  ],
  "HUNTER": [
    "74640",
    "OK"
  ],
  "HURLEY": [
    "88043",
    "NM"
  ],
  "JEWETT": [
    "75846",
    "TX"
  ],
  "KERHONKSON": [
    "12446",
    "NY"
  ],
  "LAKE HILL": [
    "12448",
    "NY"
  ],
  "LAKE KATRINE": [
    "12449",
    "NY"
  ],
  "LANESVILLE": [
    "47136",
    "IN"
  ],
  "MALDEN ON HUDSON": [
    "12453",
    "NY"
  ],
  "MAPLECREST": [
    "12454",
    "NY"
  ],
  "MARGARETVILLE": [
    "12455",
    "NY"
  ],
  "MOUNT MARION": [
    "12456",
    "NY"
  ],
  "MOUNT TREMPER": [
    "12457",
    "NY"
  ],
  "NAPANOCH": [
    "12458",
    "NY"
  ],
  "NEW KINGSTON": [
    "12459",
    "NY"
  ],
  "OAK HILL": [
    "45656",
    "OH"
  ],
  "OLIVEBRIDGE": [
    "12461",
    "NY"
  ],
  "PALENVILLE": [
    "12463",
    "NY"
  ],
  "PHOENICIA": [
    "12464",
    "NY"
  ],
  "PINE HILL": [
    "36769",
    "AL"
  ],
  "PORT EWEN": [
    "12466",
    "NY"
  ],
  "PRATTSVILLE": [
    "72129",
    "AR"
  ],
  "PRESTON HOLLOW": [
    "12469",
    "NY"
  ],
  "PURLING": [
    "12470",
    "NY"
  ],
  "RIFTON": [
    "12471",
    "NY"
  ],
  "ROSENDALE": [
    "64483",
    "MO"
  ],
  "ROUND TOP": [
    "78954",
    "TX"
  ],
  "RUBY": [
    "99768",
    "AK"
  ],
  "SAUGERTIES": [
    "12477",
    "NY"
  ],
  "SHANDAKEN": [
    "12480",
    "NY"
  ],
  "SHOKAN": [
    "12481",
    "NY"
  ],
  "SOUTH CAIRO": [
    "12482",
    "NY"
  ],
  "SPRING GLEN": [
    "17978",
    "PA"
  ],
  "STONE RIDGE": [
    "12484",
    "NY"
  ],
  "TANNERSVILLE": [
    "24377",
    "VA"
  ],
  "TILLSON": [
    "12486",
    "NY"
  ],
  "ULSTER PARK": [
    "12487",
    "NY"
  ],
  "WAWARSING": [
    "12489",
    "NY"
  ],
  "WEST CAMP": [
    "12490",
    "NY"
  ],
  "WEST HURLEY": [
    "12491",
    "NY"
  ],
  "WEST KILL": [
    "12492",
    "NY"
  ],
  "WEST PARK": [
    "12493",
    "NY"
  ],
  "WEST SHOKAN": [
    "12494",
    "NY"
  ],
  "WILLOW": [
    "99688",
    "AK"
  ],
  "AMENIA": [
    "58004",
    "ND"
  ],
  "ANCRAM": [
    "12502",
    "NY"
  ],
  "ANCRAMDALE": [
    "12503",
    "NY"
  ],
  "ANNANDALE ON HUDSON": [
    "12504",
    "NY"
  ],
  "BANGALL": [
    "12506",
    "NY"
  ],
  "BARRYTOWN": [
    "12507",
    "NY"
  ],
  "BEACON": [
    "52534",
    "IA"
  ],
  "BILLINGS": [
    "74630",
    "OK"
  ],
  "CASTLE POINT": [
    "12511",
    "NY"
  ],
  "CLAVERACK": [
    "12513",
    "NY"
  ],
  "CLINTON CORNERS": [
    "12514",
    "NY"
  ],
  "CLINTONDALE": [
    "12515",
    "NY"
  ],
  "COPAKE": [
    "12516",
    "NY"
  ],
  "COPAKE FALLS": [
    "12517",
    "NY"
  ],
  "CORNWALL ON HUDSON": [
    "12520",
    "NY"
  ],
  "CRARYVILLE": [
    "12521",
    "NY"
  ],
  "DOVER PLAINS": [
    "12522",
    "NY"
  ],
  "ELIZAVILLE": [
    "41037",
    "KY"
  ],
  "FISHKILL": [
    "12524",
    "NY"
  ],
  "GERMANTOWN": [
    "62245",
    "IL"
  ],
  "GLENHAM": [
    "57631",
    "SD"
  ],
  "HIGHLAND": [
    "92346",
    "CA"
  ],
  "HOLLOWVILLE": [
    "12530",
    "NY"
  ],
  "HOLMES": [
    "19043",
    "PA"
  ],
  "HOPEWELL JUNCTION": [
    "12533",
    "NY"
  ],
  "HUGHSONVILLE": [
    "12537",
    "NY"
  ],
  "LAGRANGEVILLE": [
    "12540",
    "NY"
  ],
  "MAYBROOK": [
    "12543",
    "NY"
  ],
  "MELLENVILLE": [
    "12544",
    "NY"
  ],
  "MILLBROOK": [
    "60536",
    "IL"
  ],
  "MILLERTON": [
    "74750",
    "OK"
  ],
  "MODENA": [
    "19358",
    "PA"
  ],
  "NEWBURGH": [
    "47630",
    "IN"
  ],
  "NEW WINDSOR": [
    "61465",
    "IL"
  ],
  "NEW PALTZ": [
    "12561",
    "NY"
  ],
  "PATTERSON": [
    "95363",
    "CA"
  ],
  "PAWLING": [
    "12564",
    "NY"
  ],
  "PHILMONT": [
    "12565",
    "NY"
  ],
  "PINE BUSH": [
    "12566",
    "NY"
  ],
  "PINE PLAINS": [
    "12567",
    "NY"
  ],
  "PLATTEKILL": [
    "12568",
    "NY"
  ],
  "PLEASANT VALLEY": [
    "52767",
    "IA"
  ],
  "POUGHQUAG": [
    "12570",
    "NY"
  ],
  "RED HOOK": [
    "12571",
    "NY"
  ],
  "RHINEBECK": [
    "12572",
    "NY"
  ],
  "RHINECLIFF": [
    "12574",
    "NY"
  ],
  "ROCK TAVERN": [
    "12575",
    "NY"
  ],
  "SALISBURY MILLS": [
    "12577",
    "NY"
  ],
  "SALT POINT": [
    "12578",
    "NY"
  ],
  "STAATSBURG": [
    "12580",
    "NY"
  ],
  "STANFORDVILLE": [
    "12581",
    "NY"
  ],
  "STORMVILLE": [
    "12582",
    "NY"
  ],
  "TIVOLI": [
    "77990",
    "TX"
  ],
  "VAILS GATE": [
    "12584",
    "NY"
  ],
  "VERBANK": [
    "12585",
    "NY"
  ],
  "WALDEN": [
    "80480",
    "CO"
  ],
  "WALKER VALLEY": [
    "12588",
    "NY"
  ],
  "WALLKILL": [
    "12589",
    "NY"
  ],
  "WAPPINGERS FALLS": [
    "12590",
    "NY"
  ],
  "WASSAIC": [
    "12592",
    "NY"
  ],
  "WINGDALE": [
    "12594",
    "NY"
  ],
  "POUGHKEEPSIE": [
    "72569",
    "AR"
  ],
  "BARRYVILLE": [
    "12719",
    "NY"
  ],
  "BLOOMINGBURG": [
    "43106",
    "OH"
  ],
  "BURLINGHAM": [
    "12722",
    "NY"
  ],
  "CALLICOON": [
    "12723",
    "NY"
  ],
  "CALLICOON CENTER": [
    "12724",
    "NY"
  ],
  "CLARYVILLE": [
    "12725",
    "NY"
  ],
  "COCHECTON": [
    "12726",
    "NY"
  ],
  "COCHECTON CENTER": [
    "12727",
    "NY"
  ],
  "CUDDEBACKVILLE": [
    "12729",
    "NY"
  ],
  "ELDRED": [
    "62027",
    "IL"
  ],
  "FALLSBURG": [
    "12733",
    "NY"
  ],
  "FERNDALE": [
    "98248",
    "WA"
  ],
  "FREMONT CENTER": [
    "12736",
    "NY"
  ],
  "GLEN SPEY": [
    "12737",
    "NY"
  ],
  "GLEN WILD": [
    "12738",
    "NY"
  ],
  "GRAHAMSVILLE": [
    "12740",
    "NY"
  ],
  "HANKINS": [
    "12741",
    "NY"
  ],
  "HARRIS": [
    "64645",
    "MO"
  ],
  "HIGHLAND LAKE": [
    "12743",
    "NY"
  ],
  "HORTONVILLE": [
    "54944",
    "WI"
  ],
  "HUGUENOT": [
    "12746",
    "NY"
  ],
  "HURLEYVILLE": [
    "12747",
    "NY"
  ],
  "KAUNEONGA LAKE": [
    "12749",
    "NY"
  ],
  "KENOZA LAKE": [
    "12750",
    "NY"
  ],
  "KIAMESHA LAKE": [
    "12751",
    "NY"
  ],
  "LAKE HUNTINGTON": [
    "12752",
    "NY"
  ],
  "LIVINGSTON MANOR": [
    "12758",
    "NY"
  ],
  "LOCH SHELDRAKE": [
    "12759",
    "NY"
  ],
  "LONG EDDY": [
    "12760",
    "NY"
  ],
  "MONGAUP VALLEY": [
    "12762",
    "NY"
  ],
  "MOUNTAIN DALE": [
    "12763",
    "NY"
  ],
  "NARROWSBURG": [
    "12764",
    "NY"
  ],
  "NEVERSINK": [
    "12765",
    "NY"
  ],
  "NORTH BRANCH": [
    "55056",
    "MN"
  ],
  "OBERNBURG": [
    "12767",
    "NY"
  ],
  "PARKSVILLE": [
    "40464",
    "KY"
  ],
  "POND EDDY": [
    "12770",
    "NY"
  ],
  "PORT JERVIS": [
    "12771",
    "NY"
  ],
  "ROCK HILL": [
    "29733",
    "SC"
  ],
  "ROSCOE": [
    "79545",
    "TX"
  ],
  "FORESTBURGH": [
    "12777",
    "NY"
  ],
  "SMALLWOOD": [
    "12778",
    "NY"
  ],
  "SOUTH FALLSBURG": [
    "12779",
    "NY"
  ],
  "SPARROW BUSH": [
    "12780",
    "NY"
  ],
  "SUMMITVILLE": [
    "46070",
    "IN"
  ],
  "SWAN LAKE": [
    "12783",
    "NY"
  ],
  "THOMPSONVILLE": [
    "62890",
    "IL"
  ],
  "WESTBROOKVILLE": [
    "12785",
    "NY"
  ],
  "WHITE LAKE": [
    "57383",
    "SD"
  ],
  "WHITE SULPHUR SPRINGS": [
    "59645",
    "MT"
  ],
  "WOODBOURNE": [
    "12788",
    "NY"
  ],
  "WOODRIDGE": [
    "60517",
    "IL"
  ],
  "WURTSBORO": [
    "12790",
    "NY"
  ],
  "YOUNGSVILLE": [
    "70592",
    "LA"
  ],
  "YULAN": [
    "12792",
    "NY"
  ],
  "GLENS FALLS": [
    "12801",
    "NY"
  ],
  "SOUTH GLENS FALLS": [
    "12803",
    "NY"
  ],
  "QUEENSBURY": [
    "12804",
    "NY"
  ],
  "ADIRONDACK": [
    "12808",
    "NY"
  ],
  "ARGYLE": [
    "76226",
    "TX"
  ],
  "BAKERS MILLS": [
    "12811",
    "NY"
  ],
  "BLUE MOUNTAIN LAKE": [
    "12812",
    "NY"
  ],
  "BOLTON LANDING": [
    "12814",
    "NY"
  ],
  "BRANT LAKE": [
    "12815",
    "NY"
  ],
  "CHESTERTOWN": [
    "21620",
    "MD"
  ],
  "CLEMONS": [
    "50051",
    "IA"
  ],
  "CLEVERDALE": [
    "12820",
    "NY"
  ],
  "COMSTOCK": [
    "68828",
    "NE"
  ],
  "COSSAYUNA": [
    "12823",
    "NY"
  ],
  "DIAMOND POINT": [
    "12824",
    "NY"
  ],
  "FORT ANN": [
    "12827",
    "NY"
  ],
  "FORT EDWARD": [
    "12828",
    "NY"
  ],
  "GANSEVOORT": [
    "12831",
    "NY"
  ],
  "GREENFIELD CENTER": [
    "12833",
    "NY"
  ],
  "HAGUE": [
    "58542",
    "ND"
  ],
  "HUDSON FALLS": [
    "12839",
    "NY"
  ],
  "HULETTS LANDING": [
    "12841",
    "NY"
  ],
  "INDIAN LAKE": [
    "12842",
    "NY"
  ],
  "JOHNSBURG": [
    "12843",
    "NY"
  ],
  "KATTSKILL BAY": [
    "12844",
    "NY"
  ],
  "LAKE GEORGE": [
    "80827",
    "CO"
  ],
  "LAKE LUZERNE": [
    "12846",
    "NY"
  ],
  "LONG LAKE": [
    "57457",
    "SD"
  ],
  "MIDDLE FALLS": [
    "12848",
    "NY"
  ],
  "MIDDLE GRANVILLE": [
    "12849",
    "NY"
  ],
  "MIDDLE GROVE": [
    "12850",
    "NY"
  ],
  "MINERVA": [
    "44657",
    "OH"
  ],
  "NEWCOMB": [
    "87455",
    "NM"
  ],
  "NORTH CREEK": [
    "12853",
    "NY"
  ],
  "NORTH GRANVILLE": [
    "12854",
    "NY"
  ],
  "NORTH HUDSON": [
    "12855",
    "NY"
  ],
  "NORTH RIVER": [
    "12856",
    "NY"
  ],
  "OLMSTEDVILLE": [
    "12857",
    "NY"
  ],
  "PARADOX": [
    "81429",
    "CO"
  ],
  "PORTER CORNERS": [
    "12859",
    "NY"
  ],
  "PUTNAM STATION": [
    "12861",
    "NY"
  ],
  "RIPARIUS": [
    "12862",
    "NY"
  ],
  "ROCK CITY FALLS": [
    "12863",
    "NY"
  ],
  "SABAEL": [
    "12864",
    "NY"
  ],
  "SARATOGA SPRINGS": [
    "84045",
    "UT"
  ],
  "SCHROON LAKE": [
    "12870",
    "NY"
  ],
  "SCHUYLERVILLE": [
    "12871",
    "NY"
  ],
  "SEVERANCE": [
    "80546",
    "CO"
  ],
  "SHUSHAN": [
    "12873",
    "NY"
  ],
  "SILVER BAY": [
    "55614",
    "MN"
  ],
  "STONY CREEK": [
    "23882",
    "VA"
  ],
  "TICONDEROGA": [
    "12883",
    "NY"
  ],
  "VICTORY MILLS": [
    "12884",
    "NY"
  ],
  "WARRENSBURG": [
    "64093",
    "MO"
  ],
  "WEVERTOWN": [
    "12886",
    "NY"
  ],
  "WHITEHALL": [
    "59759",
    "MT"
  ],
  "PLATTSBURGH": [
    "12903",
    "NY"
  ],
  "ALTONA": [
    "61414",
    "IL"
  ],
  "KEESEVILLE": [
    "12944",
    "NY"
  ],
  "AU SABLE FORKS": [
    "12912",
    "NY"
  ],
  "BOMBAY": [
    "12914",
    "NY"
  ],
  "BRAINARDSVILLE": [
    "12915",
    "NY"
  ],
  "BRUSHTON": [
    "12916",
    "NY"
  ],
  "BURKE": [
    "57523",
    "SD"
  ],
  "CADYVILLE": [
    "12918",
    "NY"
  ],
  "CHAMPLAIN": [
    "22438",
    "VA"
  ],
  "CHATEAUGAY": [
    "12920",
    "NY"
  ],
  "CHAZY": [
    "12921",
    "NY"
  ],
  "CHILDWOLD": [
    "12922",
    "NY"
  ],
  "CHURUBUSCO": [
    "46723",
    "IN"
  ],
  "CONSTABLE": [
    "12926",
    "NY"
  ],
  "CRANBERRY LAKE": [
    "12927",
    "NY"
  ],
  "CROWN POINT": [
    "46308",
    "IN"
  ],
  "DANNEMORA": [
    "12929",
    "NY"
  ],
  "DICKINSON CENTER": [
    "12930",
    "NY"
  ],
  "ELIZABETHTOWN": [
    "62931",
    "IL"
  ],
  "ELLENBURG": [
    "12933",
    "NY"
  ],
  "ELLENBURG CENTER": [
    "12934",
    "NY"
  ],
  "ELLENBURG DEPOT": [
    "12935",
    "NY"
  ],
  "FORT COVINGTON": [
    "12937",
    "NY"
  ],
  "GABRIELS": [
    "12939",
    "NY"
  ],
  "KEENE VALLEY": [
    "12943",
    "NY"
  ],
  "LAKE CLEAR": [
    "12945",
    "NY"
  ],
  "LAKE PLACID": [
    "33862",
    "FL"
  ],
  "LAWRENCEVILLE": [
    "62439",
    "IL"
  ],
  "LEWIS": [
    "81327",
    "CO"
  ],
  "LYON MOUNTAIN": [
    "12955",
    "NY"
  ],
  "MALONE": [
    "98559",
    "WA"
  ],
  "MINEVILLE": [
    "12956",
    "NY"
  ],
  "MOIRA": [
    "12957",
    "NY"
  ],
  "MOOERS": [
    "12958",
    "NY"
  ],
  "MOOERS FORKS": [
    "12959",
    "NY"
  ],
  "MORIAH": [
    "12960",
    "NY"
  ],
  "MORIAH CENTER": [
    "12961",
    "NY"
  ],
  "MORRISONVILLE": [
    "62546",
    "IL"
  ],
  "NEW RUSSIA": [
    "12964",
    "NY"
  ],
  "NICHOLVILLE": [
    "12965",
    "NY"
  ],
  "NORTH BANGOR": [
    "12966",
    "NY"
  ],
  "NORTH LAWRENCE": [
    "44666",
    "OH"
  ],
  "PAUL SMITHS": [
    "12970",
    "NY"
  ],
  "PIERCEFIELD": [
    "12973",
    "NY"
  ],
  "PORT HENRY": [
    "12974",
    "NY"
  ],
  "PORT KENT": [
    "12975",
    "NY"
  ],
  "RAINBOW LAKE": [
    "12976",
    "NY"
  ],
  "RAY BROOK": [
    "12977",
    "NY"
  ],
  "REDFORD": [
    "63665",
    "MO"
  ],
  "ROUSES POINT": [
    "12979",
    "NY"
  ],
  "SAINT REGIS FALLS": [
    "12980",
    "NY"
  ],
  "SARANAC": [
    "48881",
    "MI"
  ],
  "SARANAC LAKE": [
    "12983",
    "NY"
  ],
  "SCHUYLER FALLS": [
    "12985",
    "NY"
  ],
  "TUPPER LAKE": [
    "12986",
    "NY"
  ],
  "UPPER JAY": [
    "12987",
    "NY"
  ],
  "VERMONTVILLE": [
    "49096",
    "MI"
  ],
  "WEST CHAZY": [
    "12992",
    "NY"
  ],
  "WILLSBORO": [
    "12996",
    "NY"
  ],
  "WITHERBEE": [
    "12998",
    "NY"
  ],
  "APULIA STATION": [
    "13020",
    "NY"
  ],
  "BALDWINSVILLE": [
    "13027",
    "NY"
  ],
  "BERNHARDS BAY": [
    "13028",
    "NY"
  ],
  "BREWERTON": [
    "13029",
    "NY"
  ],
  "CAMILLUS": [
    "13031",
    "NY"
  ],
  "CANASTOTA": [
    "13032",
    "NY"
  ],
  "CATO": [
    "13033",
    "NY"
  ],
  "CAYUGA": [
    "75832",
    "TX"
  ],
  "CAZENOVIA": [
    "53924",
    "WI"
  ],
  "CENTRAL SQUARE": [
    "13036",
    "NY"
  ],
  "CHITTENANGO": [
    "13037",
    "NY"
  ],
  "CICERO": [
    "60804",
    "IL"
  ],
  "CINCINNATUS": [
    "13040",
    "NY"
  ],
  "CLAY": [
    "42404",
    "KY"
  ],
  "CLEVELAND": [
    "87715",
    "NM"
  ],
  "CONSTANTIA": [
    "13044",
    "NY"
  ],
  "CORTLAND": [
    "68331",
    "NE"
  ],
  "DELPHI FALLS": [
    "13051",
    "NY"
  ],
  "DE RUYTER": [
    "13052",
    "NY"
  ],
  "DURHAMVILLE": [
    "13054",
    "NY"
  ],
  "EAST SYRACUSE": [
    "13057",
    "NY"
  ],
  "ELBRIDGE": [
    "13060",
    "NY"
  ],
  "ERIEVILLE": [
    "13061",
    "NY"
  ],
  "FABIUS": [
    "13063",
    "NY"
  ],
  "FAYETTE": [
    "65248",
    "MO"
  ],
  "FAYETTEVILLE": [
    "78940",
    "TX"
  ],
  "FREEVILLE": [
    "13068",
    "NY"
  ],
  "FULTON": [
    "95439",
    "CA"
  ],
  "GENOA": [
    "89411",
    "NV"
  ],
  "HANNIBAL": [
    "63401",
    "MO"
  ],
  "HASTINGS": [
    "73548",
    "OK"
  ],
  "HOMER": [
    "99603",
    "AK"
  ],
  "JAMESVILLE": [
    "27846",
    "NC"
  ],
  "JORDAN": [
    "59337",
    "MT"
  ],
  "KING FERRY": [
    "13081",
    "NY"
  ],
  "KIRKVILLE": [
    "13082",
    "NY"
  ],
  "LACONA": [
    "50139",
    "IA"
  ],
  "LA FAYETTE": [
    "61449",
    "IL"
  ],
  "LITTLE YORK": [
    "61453",
    "IL"
  ],
  "LIVERPOOL": [
    "77577",
    "TX"
  ],
  "LOCKE": [
    "13092",
    "NY"
  ],
  "LYCOMING": [
    "13093",
    "NY"
  ],
  "MC GRAW": [
    "13101",
    "NY"
  ],
  "MC LEAN": [
    "61754",
    "IL"
  ],
  "MALLORY": [
    "25634",
    "WV"
  ],
  "MANLIUS": [
    "61338",
    "IL"
  ],
  "MAPLE VIEW": [
    "13107",
    "NY"
  ],
  "MARCELLUS": [
    "49067",
    "MI"
  ],
  "MARIETTA": [
    "75566",
    "TX"
  ],
  "MARTVILLE": [
    "13111",
    "NY"
  ],
  "MEMPHIS": [
    "79245",
    "TX"
  ],
  "MERIDIAN": [
    "95957",
    "CA"
  ],
  "MINETTO": [
    "13115",
    "NY"
  ],
  "MINOA": [
    "13116",
    "NY"
  ],
  "MONTEZUMA": [
    "87731",
    "NM"
  ],
  "MORAVIA": [
    "52571",
    "IA"
  ],
  "MOTTVILLE": [
    "13119",
    "NY"
  ],
  "NEDROW": [
    "13120",
    "NY"
  ],
  "NEW WOODSTOCK": [
    "13122",
    "NY"
  ],
  "NORTH BAY": [
    "13123",
    "NY"
  ],
  "NORTH PITCHER": [
    "13124",
    "NY"
  ],
  "OSWEGO": [
    "67356",
    "KS"
  ],
  "PARISH": [
    "13131",
    "NY"
  ],
  "PENNELLVILLE": [
    "13132",
    "NY"
  ],
  "PHOENIX": [
    "97535",
    "OR"
  ],
  "PITCHER": [
    "13136",
    "NY"
  ],
  "POMPEY": [
    "13138",
    "NY"
  ],
  "POPLAR RIDGE": [
    "13139",
    "NY"
  ],
  "PORT BYRON": [
    "61275",
    "IL"
  ],
  "PREBLE": [
    "46782",
    "IN"
  ],
  "PULASKI": [
    "62976",
    "IL"
  ],
  "RED CREEK": [
    "13143",
    "NY"
  ],
  "SANDY CREEK": [
    "13145",
    "NY"
  ],
  "SAVANNAH": [
    "64485",
    "MO"
  ],
  "SCIPIO CENTER": [
    "13147",
    "NY"
  ],
  "SENECA FALLS": [
    "13148",
    "NY"
  ],
  "SKANEATELES": [
    "13152",
    "NY"
  ],
  "SKANEATELES FALLS": [
    "13153",
    "NY"
  ],
  "SOUTH BUTLER": [
    "13154",
    "NY"
  ],
  "SOUTH OTSELIC": [
    "13155",
    "NY"
  ],
  "SYLVAN BEACH": [
    "13157",
    "NY"
  ],
  "TRUXTON": [
    "63381",
    "MO"
  ],
  "TULLY": [
    "13159",
    "NY"
  ],
  "UNION SPRINGS": [
    "36089",
    "AL"
  ],
  "VERONA BEACH": [
    "13162",
    "NY"
  ],
  "WAMPSVILLE": [
    "13163",
    "NY"
  ],
  "WARNERS": [
    "13164",
    "NY"
  ],
  "WATERLOO": [
    "68069",
    "NE"
  ],
  "WEEDSPORT": [
    "13166",
    "NY"
  ],
  "WEST MONROE": [
    "71294",
    "LA"
  ],
  "SYRACUSE": [
    "84075",
    "UT"
  ],
  "ALDER CREEK": [
    "13301",
    "NY"
  ],
  "ALTMAR": [
    "13302",
    "NY"
  ],
  "AVA": [
    "65608",
    "MO"
  ],
  "BARNEVELD": [
    "53507",
    "WI"
  ],
  "BEAVER FALLS": [
    "15010",
    "PA"
  ],
  "BLOSSVALE": [
    "13308",
    "NY"
  ],
  "BOONVILLE": [
    "95415",
    "CA"
  ],
  "BOUCKVILLE": [
    "13310",
    "NY"
  ],
  "BRANTINGHAM": [
    "13312",
    "NY"
  ],
  "BURLINGTON FLATS": [
    "13315",
    "NY"
  ],
  "CANAJOHARIE": [
    "13317",
    "NY"
  ],
  "CASSVILLE": [
    "65625",
    "MO"
  ],
  "CHADWICKS": [
    "13319",
    "NY"
  ],
  "CLARK MILLS": [
    "13321",
    "NY"
  ],
  "COLD BROOK": [
    "13324",
    "NY"
  ],
  "CONSTABLEVILLE": [
    "13325",
    "NY"
  ],
  "COOPERSTOWN": [
    "58425",
    "ND"
  ],
  "CROGHAN": [
    "13327",
    "NY"
  ],
  "DEANSBORO": [
    "13328",
    "NY"
  ],
  "DOLGEVILLE": [
    "13329",
    "NY"
  ],
  "EAGLE BAY": [
    "13331",
    "NY"
  ],
  "EARLVILLE": [
    "60518",
    "IL"
  ],
  "EAST SPRINGFIELD": [
    "43925",
    "OH"
  ],
  "EATON": [
    "80615",
    "CO"
  ],
  "EDMESTON": [
    "13335",
    "NY"
  ],
  "FLY CREEK": [
    "13337",
    "NY"
  ],
  "FORESTPORT": [
    "13338",
    "NY"
  ],
  "FORT PLAIN": [
    "13339",
    "NY"
  ],
  "FRANKLIN SPRINGS": [
    "30639",
    "GA"
  ],
  "GARRATTSVILLE": [
    "13342",
    "NY"
  ],
  "GLENFIELD": [
    "58443",
    "ND"
  ],
  "GREIG": [
    "13345",
    "NY"
  ],
  "HARTWICK": [
    "52232",
    "IA"
  ],
  "HERKIMER": [
    "13350",
    "NY"
  ],
  "HOFFMEISTER": [
    "13353",
    "NY"
  ],
  "HOLLAND PATENT": [
    "13354",
    "NY"
  ],
  "HUBBARDSVILLE": [
    "13355",
    "NY"
  ],
  "ILION": [
    "13357",
    "NY"
  ],
  "INLET": [
    "13360",
    "NY"
  ],
  "JORDANVILLE": [
    "13361",
    "NY"
  ],
  "KNOXBORO": [
    "13362",
    "NY"
  ],
  "LEE CENTER": [
    "13363",
    "NY"
  ],
  "LEONARDSVILLE": [
    "13364",
    "NY"
  ],
  "LOWVILLE": [
    "13367",
    "NY"
  ],
  "LYONS FALLS": [
    "13368",
    "NY"
  ],
  "MC CONNELLSVILLE": [
    "13401",
    "NY"
  ],
  "MARCY": [
    "13403",
    "NY"
  ],
  "MARTINSBURG": [
    "65264",
    "MO"
  ],
  "MOHAWK": [
    "49950",
    "MI"
  ],
  "MUNNSVILLE": [
    "13409",
    "NY"
  ],
  "NELLISTON": [
    "13410",
    "NY"
  ],
  "NEW BERLIN": [
    "62670",
    "IL"
  ],
  "NEW YORK MILLS": [
    "56567",
    "MN"
  ],
  "OLD FORGE": [
    "18518",
    "PA"
  ],
  "ONEIDA": [
    "72369",
    "AR"
  ],
  "ORISKANY": [
    "13424",
    "NY"
  ],
  "ORISKANY FALLS": [
    "13425",
    "NY"
  ],
  "PALATINE BRIDGE": [
    "13428",
    "NY"
  ],
  "PORT LEYDEN": [
    "13433",
    "NY"
  ],
  "RAQUETTE LAKE": [
    "13436",
    "NY"
  ],
  "REDFIELD": [
    "72132",
    "AR"
  ],
  "REMSEN": [
    "51050",
    "IA"
  ],
  "RICHFIELD SPRINGS": [
    "13439",
    "NY"
  ],
  "ROME": [
    "61562",
    "IL"
  ],
  "ROSEBOOM": [
    "13450",
    "NY"
  ],
  "SAINT JOHNSVILLE": [
    "13452",
    "NY"
  ],
  "SALISBURY CENTER": [
    "13454",
    "NY"
  ],
  "SANGERFIELD": [
    "13455",
    "NY"
  ],
  "SAUQUOIT": [
    "13456",
    "NY"
  ],
  "SCHUYLER LAKE": [
    "13457",
    "NY"
  ],
  "SHARON SPRINGS": [
    "67758",
    "KS"
  ],
  "SHERBURNE": [
    "13460",
    "NY"
  ],
  "SHERRILL": [
    "72152",
    "AR"
  ],
  "SMYRNA": [
    "48887",
    "MI"
  ],
  "SOLSVILLE": [
    "13465",
    "NY"
  ],
  "SPRINGFIELD CENTER": [
    "13468",
    "NY"
  ],
  "STITTVILLE": [
    "13469",
    "NY"
  ],
  "TABERG": [
    "13471",
    "NY"
  ],
  "THENDARA": [
    "13472",
    "NY"
  ],
  "TURIN": [
    "30289",
    "GA"
  ],
  "VAN HORNESVILLE": [
    "13475",
    "NY"
  ],
  "VERNON CENTER": [
    "56090",
    "MN"
  ],
  "WASHINGTON MILLS": [
    "13479",
    "NY"
  ],
  "WEST BURLINGTON": [
    "52655",
    "IA"
  ],
  "WESTDALE": [
    "13483",
    "NY"
  ],
  "WEST EATON": [
    "13484",
    "NY"
  ],
  "WEST EDMESTON": [
    "13485",
    "NY"
  ],
  "WESTERNVILLE": [
    "13486",
    "NY"
  ],
  "WEST LEYDEN": [
    "13489",
    "NY"
  ],
  "WEST WINFIELD": [
    "13491",
    "NY"
  ],
  "WOODGATE": [
    "13494",
    "NY"
  ],
  "YORKVILLE": [
    "95494",
    "CA"
  ],
  "UTICA": [
    "68456",
    "NE"
  ],
  "FORT DRUM": [
    "13602",
    "NY"
  ],
  "ADAMS CENTER": [
    "13606",
    "NY"
  ],
  "ALEXANDRIA BAY": [
    "13607",
    "NY"
  ],
  "ANTWERP": [
    "45813",
    "OH"
  ],
  "BLACK RIVER": [
    "48721",
    "MI"
  ],
  "BRASHER FALLS": [
    "13613",
    "NY"
  ],
  "BRIER HILL": [
    "15415",
    "PA"
  ],
  "CALCIUM": [
    "13616",
    "NY"
  ],
  "CAPE VINCENT": [
    "13618",
    "NY"
  ],
  "CARTHAGE": [
    "75633",
    "TX"
  ],
  "CASTORLAND": [
    "13620",
    "NY"
  ],
  "CHASE MILLS": [
    "13621",
    "NY"
  ],
  "CHAUMONT": [
    "13622",
    "NY"
  ],
  "CHIPPEWA BAY": [
    "13623",
    "NY"
  ],
  "COLTON": [
    "99113",
    "WA"
  ],
  "COPENHAGEN": [
    "13626",
    "NY"
  ],
  "DEER RIVER": [
    "56636",
    "MN"
  ],
  "DEFERIET": [
    "13628",
    "NY"
  ],
  "DE KALB JUNCTION": [
    "13630",
    "NY"
  ],
  "DEPAUVILLE": [
    "13632",
    "NY"
  ],
  "DE PEYSTER": [
    "13633",
    "NY"
  ],
  "EDWARDS": [
    "93524",
    "CA"
  ],
  "ELLISBURG": [
    "13636",
    "NY"
  ],
  "EVANS MILLS": [
    "13637",
    "NY"
  ],
  "FELTS MILLS": [
    "13638",
    "NY"
  ],
  "FINE": [
    "13639",
    "NY"
  ],
  "WELLESLEY ISLAND": [
    "13640",
    "NY"
  ],
  "FISHERS LANDING": [
    "13641",
    "NY"
  ],
  "GOUVERNEUR": [
    "13642",
    "NY"
  ],
  "GREAT BEND": [
    "67530",
    "KS"
  ],
  "HAILESBORO": [
    "13645",
    "NY"
  ],
  "HAMMOND": [
    "97121",
    "OR"
  ],
  "HANNAWA FALLS": [
    "13647",
    "NY"
  ],
  "HELENA": [
    "73741",
    "OK"
  ],
  "HENDERSON": [
    "89077",
    "NV"
  ],
  "HENDERSON HARBOR": [
    "13651",
    "NY"
  ],
  "HERMON": [
    "13652",
    "NY"
  ],
  "HEUVELTON": [
    "13654",
    "NY"
  ],
  "HOGANSBURG": [
    "13655",
    "NY"
  ],
  "LA FARGEVILLE": [
    "13656",
    "NY"
  ],
  "LORRAINE": [
    "67459",
    "KS"
  ],
  "MADRID": [
    "69150",
    "NE"
  ],
  "MANNSVILLE": [
    "73447",
    "OK"
  ],
  "MASSENA": [
    "50853",
    "IA"
  ],
  "NATURAL BRIDGE": [
    "35577",
    "AL"
  ],
  "NEWTON FALLS": [
    "44444",
    "OH"
  ],
  "OSWEGATCHIE": [
    "13670",
    "NY"
  ],
  "PARISHVILLE": [
    "13672",
    "NY"
  ],
  "PHILADELPHIA": [
    "63463",
    "MO"
  ],
  "PIERREPONT MANOR": [
    "13674",
    "NY"
  ],
  "PLESSIS": [
    "13675",
    "NY"
  ],
  "POTSDAM": [
    "45361",
    "OH"
  ],
  "RAYMONDVILLE": [
    "78580",
    "TX"
  ],
  "REDWOOD": [
    "39156",
    "MS"
  ],
  "RENSSELAER FALLS": [
    "13680",
    "NY"
  ],
  "RICHVILLE": [
    "56576",
    "MN"
  ],
  "RODMAN": [
    "13682",
    "NY"
  ],
  "ROOSEVELTOWN": [
    "13683",
    "NY"
  ],
  "SACKETS HARBOR": [
    "13685",
    "NY"
  ],
  "SOUTH COLTON": [
    "13687",
    "NY"
  ],
  "STAR LAKE": [
    "54561",
    "WI"
  ],
  "THERESA": [
    "53091",
    "WI"
  ],
  "THOUSAND ISLAND PARK": [
    "13692",
    "NY"
  ],
  "THREE MILE BAY": [
    "13693",
    "NY"
  ],
  "WADDINGTON": [
    "13694",
    "NY"
  ],
  "WANAKENA": [
    "13695",
    "NY"
  ],
  "WEST STOCKHOLM": [
    "13696",
    "NY"
  ],
  "AFTON": [
    "83110",
    "WY"
  ],
  "ANDES": [
    "13731",
    "NY"
  ],
  "APALACHIN": [
    "13732",
    "NY"
  ],
  "BAINBRIDGE": [
    "46105",
    "IN"
  ],
  "BLODGETT MILLS": [
    "13738",
    "NY"
  ],
  "BLOOMVILLE": [
    "44818",
    "OH"
  ],
  "BOVINA CENTER": [
    "13740",
    "NY"
  ],
  "CANDOR": [
    "27229",
    "NC"
  ],
  "CASTLE CREEK": [
    "13744",
    "NY"
  ],
  "CHENANGO BRIDGE": [
    "13745",
    "NY"
  ],
  "CHENANGO FORKS": [
    "13746",
    "NY"
  ],
  "COLLIERSVILLE": [
    "13747",
    "NY"
  ],
  "CONKLIN": [
    "49403",
    "MI"
  ],
  "DAVENPORT": [
    "99122",
    "WA"
  ],
  "DAVENPORT CENTER": [
    "13751",
    "NY"
  ],
  "DELANCEY": [
    "13752",
    "NY"
  ],
  "DELHI": [
    "95315",
    "CA"
  ],
  "DEPOSIT": [
    "13754",
    "NY"
  ],
  "DOWNSVILLE": [
    "71234",
    "LA"
  ],
  "EAST BRANCH": [
    "13756",
    "NY"
  ],
  "EAST MEREDITH": [
    "13757",
    "NY"
  ],
  "ENDICOTT": [
    "99125",
    "WA"
  ],
  "ENDWELL": [
    "13762",
    "NY"
  ],
  "FISHS EDDY": [
    "13774",
    "NY"
  ],
  "GILBERTSVILLE": [
    "42044",
    "KY"
  ],
  "GLEN AUBREY": [
    "13777",
    "NY"
  ],
  "HARFORD": [
    "18823",
    "PA"
  ],
  "HARPERSFIELD": [
    "13786",
    "NY"
  ],
  "HARPURSVILLE": [
    "13787",
    "NY"
  ],
  "HOBART": [
    "98025",
    "WA"
  ],
  "JOHNSON CITY": [
    "78636",
    "TX"
  ],
  "KILLAWOG": [
    "13794",
    "NY"
  ],
  "KIRKWOOD": [
    "95646",
    "CA"
  ],
  "LAURENS": [
    "50554",
    "IA"
  ],
  "LISLE": [
    "60532",
    "IL"
  ],
  "MC DONOUGH": [
    "13801",
    "NY"
  ],
  "MAINE": [
    "13802",
    "NY"
  ],
  "MARATHON": [
    "79842",
    "TX"
  ],
  "MASONVILLE": [
    "80541",
    "CO"
  ],
  "MERIDALE": [
    "13806",
    "NY"
  ],
  "MOUNT UPTON": [
    "13809",
    "NY"
  ],
  "MOUNT VISION": [
    "13810",
    "NY"
  ],
  "NEWARK VALLEY": [
    "13811",
    "NY"
  ],
  "NICHOLS": [
    "54152",
    "WI"
  ],
  "NINEVEH": [
    "46164",
    "IN"
  ],
  "NORTH NORWICH": [
    "13814",
    "NY"
  ],
  "ONEONTA": [
    "35121",
    "AL"
  ],
  "OTEGO": [
    "13825",
    "NY"
  ],
  "OUAQUAGA": [
    "13826",
    "NY"
  ],
  "OWEGO": [
    "13827",
    "NY"
  ],
  "PORT CRANE": [
    "13833",
    "NY"
  ],
  "PORTLANDVILLE": [
    "13834",
    "NY"
  ],
  "SIDNEY": [
    "76474",
    "TX"
  ],
  "SIDNEY CENTER": [
    "13839",
    "NY"
  ],
  "SMITHBORO": [
    "62284",
    "IL"
  ],
  "SMITHVILLE FLATS": [
    "13841",
    "NY"
  ],
  "SOUTH KORTRIGHT": [
    "13842",
    "NY"
  ],
  "SOUTH NEW BERLIN": [
    "13843",
    "NY"
  ],
  "SOUTH PLYMOUTH": [
    "13844",
    "NY"
  ],
  "TIOGA CENTER": [
    "13845",
    "NY"
  ],
  "TREADWELL": [
    "13846",
    "NY"
  ],
  "TROUT CREEK": [
    "59874",
    "MT"
  ],
  "TUNNEL": [
    "13848",
    "NY"
  ],
  "UNADILLA": [
    "68454",
    "NE"
  ],
  "VESTAL": [
    "13851",
    "NY"
  ],
  "WALTON": [
    "97490",
    "OR"
  ],
  "WELLS BRIDGE": [
    "13859",
    "NY"
  ],
  "WEST DAVENPORT": [
    "13860",
    "NY"
  ],
  "WEST ONEONTA": [
    "13861",
    "NY"
  ],
  "WHITNEY POINT": [
    "13862",
    "NY"
  ],
  "WILLET": [
    "13863",
    "NY"
  ],
  "WILLSEYVILLE": [
    "13864",
    "NY"
  ],
  "BINGHAMTON": [
    "13905",
    "NY"
  ],
  "AKRON": [
    "80720",
    "CO"
  ],
  "ALDEN": [
    "67512",
    "KS"
  ],
  "ALEXANDER": [
    "72002",
    "AR"
  ],
  "ANGOLA": [
    "70712",
    "LA"
  ],
  "APPLETON": [
    "98602",
    "WA"
  ],
  "ARCADE": [
    "14009",
    "NY"
  ],
  "ATHOL SPRINGS": [
    "14010",
    "NY"
  ],
  "ATTICA": [
    "67009",
    "KS"
  ],
  "BARKER": [
    "77413",
    "TX"
  ],
  "BASOM": [
    "14013",
    "NY"
  ],
  "BATAVIA": [
    "60510",
    "IL"
  ],
  "BLISS": [
    "83314",
    "ID"
  ],
  "BOWMANSVILLE": [
    "17507",
    "PA"
  ],
  "BRANT": [
    "48614",
    "MI"
  ],
  "BURT": [
    "50522",
    "IA"
  ],
  "CHAFFEE": [
    "63740",
    "MO"
  ],
  "CLARENCE": [
    "71414",
    "LA"
  ],
  "CLARENCE CENTER": [
    "14032",
    "NY"
  ],
  "COLDEN": [
    "14033",
    "NY"
  ],
  "COLLINS": [
    "64738",
    "MO"
  ],
  "COLLINS CENTER": [
    "14035",
    "NY"
  ],
  "CORFU": [
    "14036",
    "NY"
  ],
  "COWLESVILLE": [
    "14037",
    "NY"
  ],
  "CRITTENDEN": [
    "41030",
    "KY"
  ],
  "DALE": [
    "78616",
    "TX"
  ],
  "DARIEN CENTER": [
    "14040",
    "NY"
  ],
  "DELEVAN": [
    "14042",
    "NY"
  ],
  "DEPEW": [
    "74028",
    "OK"
  ],
  "DUNKIRK": [
    "47336",
    "IN"
  ],
  "EAST AMHERST": [
    "14051",
    "NY"
  ],
  "EAST AURORA": [
    "14052",
    "NY"
  ],
  "EAST BETHANY": [
    "14054",
    "NY"
  ],
  "EAST CONCORD": [
    "14055",
    "NY"
  ],
  "EAST PEMBROKE": [
    "14056",
    "NY"
  ],
  "ELBA": [
    "68835",
    "NE"
  ],
  "ELMA": [
    "98541",
    "WA"
  ],
  "FARMERSVILLE STATION": [
    "14060",
    "NY"
  ],
  "FARNHAM": [
    "22460",
    "VA"
  ],
  "FORESTVILLE": [
    "95436",
    "CA"
  ],
  "FREDONIA": [
    "86022",
    "AZ"
  ],
  "GAINESVILLE": [
    "76241",
    "TX"
  ],
  "GASPORT": [
    "14067",
    "NY"
  ],
  "GETZVILLE": [
    "14068",
    "NY"
  ],
  "GOWANDA": [
    "14070",
    "NY"
  ],
  "GRAND ISLAND": [
    "68803",
    "NE"
  ],
  "IRVING": [
    "75063",
    "TX"
  ],
  "JAVA CENTER": [
    "14082",
    "NY"
  ],
  "JAVA VILLAGE": [
    "14083",
    "NY"
  ],
  "LAKE VIEW": [
    "51450",
    "IA"
  ],
  "LAWTONS": [
    "14091",
    "NY"
  ],
  "LOCKPORT": [
    "70374",
    "LA"
  ],
  "MARILLA": [
    "14102",
    "NY"
  ],
  "MEDINA": [
    "98039",
    "WA"
  ],
  "MIDDLEPORT": [
    "45760",
    "OH"
  ],
  "MODEL CITY": [
    "14107",
    "NY"
  ],
  "NIAGARA UNIVERSITY": [
    "14109",
    "NY"
  ],
  "NORTH BOSTON": [
    "14110",
    "NY"
  ],
  "NORTH COLLINS": [
    "14111",
    "NY"
  ],
  "NORTH EVANS": [
    "14112",
    "NY"
  ],
  "NORTH JAVA": [
    "14113",
    "NY"
  ],
  "NORTH TONAWANDA": [
    "14120",
    "NY"
  ],
  "OLCOTT": [
    "14126",
    "NY"
  ],
  "ORCHARD PARK": [
    "14127",
    "NY"
  ],
  "PERRYSBURG": [
    "43552",
    "OH"
  ],
  "RANSOMVILLE": [
    "14131",
    "NY"
  ],
  "SANBORN": [
    "58480",
    "ND"
  ],
  "SANDUSKY": [
    "48471",
    "MI"
  ],
  "SARDINIA": [
    "45171",
    "OH"
  ],
  "SHERIDAN": [
    "97378",
    "OR"
  ],
  "SILVER CREEK": [
    "98585",
    "WA"
  ],
  "SOUTH DAYTON": [
    "14138",
    "NY"
  ],
  "SOUTH WALES": [
    "14139",
    "NY"
  ],
  "SPRING BROOK": [
    "14140",
    "NY"
  ],
  "SPRINGVILLE": [
    "93265",
    "CA"
  ],
  "STELLA NIAGARA": [
    "14144",
    "NY"
  ],
  "STRYKERSVILLE": [
    "14145",
    "NY"
  ],
  "TONAWANDA": [
    "14151",
    "NY"
  ],
  "VAN BUREN POINT": [
    "14166",
    "NY"
  ],
  "VARYSBURG": [
    "14167",
    "NY"
  ],
  "WALES CENTER": [
    "14169",
    "NY"
  ],
  "WEST FALLS": [
    "14170",
    "NY"
  ],
  "WEST VALLEY": [
    "14171",
    "NY"
  ],
  "WILSON": [
    "83014",
    "WY"
  ],
  "YORKSHIRE": [
    "45388",
    "OH"
  ],
  "YOUNGSTOWN": [
    "44555",
    "OH"
  ],
  "BUFFALO": [
    "82834",
    "WY"
  ],
  "NIAGARA FALLS": [
    "14305",
    "NY"
  ],
  "ADAMS BASIN": [
    "14410",
    "NY"
  ],
  "BELLONA": [
    "14415",
    "NY"
  ],
  "BERGEN": [
    "14416",
    "NY"
  ],
  "BRANCHPORT": [
    "14418",
    "NY"
  ],
  "BROCKPORT": [
    "15823",
    "PA"
  ],
  "BYRON": [
    "94514",
    "CA"
  ],
  "CALEDONIA": [
    "63631",
    "MO"
  ],
  "CANANDAIGUA": [
    "14424",
    "NY"
  ],
  "CASTILE": [
    "14427",
    "NY"
  ],
  "CHURCHVILLE": [
    "24421",
    "VA"
  ],
  "CLARENDON": [
    "79226",
    "TX"
  ],
  "CLARKSON": [
    "68629",
    "NE"
  ],
  "CLIFTON SPRINGS": [
    "14432",
    "NY"
  ],
  "CLYDE": [
    "79510",
    "TX"
  ],
  "CONESUS": [
    "14435",
    "NY"
  ],
  "DANSVILLE": [
    "48819",
    "MI"
  ],
  "EAST BLOOMFIELD": [
    "14443",
    "NY"
  ],
  "EAST ROCHESTER": [
    "44625",
    "OH"
  ],
  "EAST WILLIAMSON": [
    "14449",
    "NY"
  ],
  "FAIRPORT": [
    "14450",
    "NY"
  ],
  "FANCHER": [
    "14452",
    "NY"
  ],
  "FISHERS": [
    "46038",
    "IN"
  ],
  "GENESEO": [
    "67444",
    "KS"
  ],
  "GENEVA": [
    "83238",
    "ID"
  ],
  "HALL": [
    "59837",
    "MT"
  ],
  "HAMLIN": [
    "79520",
    "TX"
  ],
  "HEMLOCK": [
    "48626",
    "MI"
  ],
  "HENRIETTA": [
    "76365",
    "TX"
  ],
  "HILTON": [
    "14468",
    "NY"
  ],
  "HOLLEY": [
    "14470",
    "NY"
  ],
  "HONEOYE": [
    "14471",
    "NY"
  ],
  "HONEOYE FALLS": [
    "14472",
    "NY"
  ],
  "IONIA": [
    "65335",
    "MO"
  ],
  "KENDALL": [
    "67857",
    "KS"
  ],
  "KEUKA PARK": [
    "14478",
    "NY"
  ],
  "KNOWLESVILLE": [
    "14479",
    "NY"
  ],
  "LE ROY": [
    "66857",
    "KS"
  ],
  "LIMA": [
    "62348",
    "IL"
  ],
  "LIVONIA": [
    "70755",
    "LA"
  ],
  "MACEDON": [
    "14502",
    "NY"
  ],
  "MORTON": [
    "98356",
    "WA"
  ],
  "MOUNT MORRIS": [
    "61054",
    "IL"
  ],
  "MUMFORD": [
    "77867",
    "TX"
  ],
  "NORTH CHILI": [
    "14514",
    "NY"
  ],
  "NORTH GREECE": [
    "14515",
    "NY"
  ],
  "NORTH ROSE": [
    "14516",
    "NY"
  ],
  "NUNDA": [
    "57050",
    "SD"
  ],
  "OAKS CORNERS": [
    "14518",
    "NY"
  ],
  "ONTARIO": [
    "97914",
    "OR"
  ],
  "ONTARIO CENTER": [
    "14520",
    "NY"
  ],
  "OVID": [
    "80744",
    "CO"
  ],
  "PAVILION": [
    "14525",
    "NY"
  ],
  "PENFIELD": [
    "61862",
    "IL"
  ],
  "PENN YAN": [
    "14527",
    "NY"
  ],
  "PHELPS": [
    "54554",
    "WI"
  ],
  "PIFFARD": [
    "14533",
    "NY"
  ],
  "PORTAGEVILLE": [
    "63873",
    "MO"
  ],
  "PORT GIBSON": [
    "39150",
    "MS"
  ],
  "PULTNEYVILLE": [
    "14538",
    "NY"
  ],
  "RETSOF": [
    "14539",
    "NY"
  ],
  "ROMULUS": [
    "48174",
    "MI"
  ],
  "ROSE": [
    "74364",
    "OK"
  ],
  "RUSH": [
    "80833",
    "CO"
  ],
  "RUSHVILLE": [
    "69360",
    "NE"
  ],
  "SCOTTSBURG": [
    "97473",
    "OR"
  ],
  "SCOTTSVILLE": [
    "75688",
    "TX"
  ],
  "SENECA CASTLE": [
    "14547",
    "NY"
  ],
  "SHORTSVILLE": [
    "14548",
    "NY"
  ],
  "SILVER SPRINGS": [
    "89429",
    "NV"
  ],
  "SODUS": [
    "49126",
    "MI"
  ],
  "SODUS POINT": [
    "14555",
    "NY"
  ],
  "SONYEA": [
    "14556",
    "NY"
  ],
  "SOUTH BYRON": [
    "14557",
    "NY"
  ],
  "SOUTH LIMA": [
    "14558",
    "NY"
  ],
  "SPENCERPORT": [
    "14559",
    "NY"
  ],
  "SPRINGWATER": [
    "14560",
    "NY"
  ],
  "STANLEY": [
    "87056",
    "NM"
  ],
  "UNION HILL": [
    "60969",
    "IL"
  ],
  "VICTOR": [
    "95253",
    "CA"
  ],
  "WALWORTH": [
    "53184",
    "WI"
  ],
  "WARSAW": [
    "65355",
    "MO"
  ],
  "WATERPORT": [
    "14571",
    "NY"
  ],
  "WEST BLOOMFIELD": [
    "48325",
    "MI"
  ],
  "WEST HENRIETTA": [
    "14586",
    "NY"
  ],
  "WILLARD": [
    "87063",
    "NM"
  ],
  "WILLIAMSON": [
    "50272",
    "IA"
  ],
  "ALLEGANY": [
    "97407",
    "OR"
  ],
  "ANGELICA": [
    "14709",
    "NY"
  ],
  "ASHVILLE": [
    "43103",
    "OH"
  ],
  "BEMUS POINT": [
    "14712",
    "NY"
  ],
  "BLACK CREEK": [
    "54106",
    "WI"
  ],
  "BOLIVAR": [
    "65613",
    "MO"
  ],
  "BROCTON": [
    "61917",
    "IL"
  ],
  "CANEADEA": [
    "14717",
    "NY"
  ],
  "CASSADAGA": [
    "32706",
    "FL"
  ],
  "CATTARAUGUS": [
    "14719",
    "NY"
  ],
  "CELORON": [
    "14720",
    "NY"
  ],
  "CERES": [
    "95307",
    "CA"
  ],
  "CHAUTAUQUA": [
    "67334",
    "KS"
  ],
  "CHERRY CREEK": [
    "14723",
    "NY"
  ],
  "CLYMER": [
    "15728",
    "PA"
  ],
  "CONEWANGO VALLEY": [
    "14726",
    "NY"
  ],
  "CUBA": [
    "87013",
    "NM"
  ],
  "DEWITTVILLE": [
    "14728",
    "NY"
  ],
  "EAST OTTO": [
    "14729",
    "NY"
  ],
  "ELLICOTTVILLE": [
    "14731",
    "NY"
  ],
  "FALCONER": [
    "14733",
    "NY"
  ],
  "FILLMORE": [
    "93016",
    "CA"
  ],
  "FINDLEY LAKE": [
    "14736",
    "NY"
  ],
  "FREWSBURG": [
    "14738",
    "NY"
  ],
  "GERRY": [
    "14740",
    "NY"
  ],
  "GREAT VALLEY": [
    "14741",
    "NY"
  ],
  "GREENHURST": [
    "14742",
    "NY"
  ],
  "HOUGHTON": [
    "57449",
    "SD"
  ],
  "HUME": [
    "93628",
    "CA"
  ],
  "KENNEDY": [
    "56733",
    "MN"
  ],
  "KILL BUCK": [
    "14748",
    "NY"
  ],
  "LEON": [
    "67074",
    "KS"
  ],
  "LILY DALE": [
    "14752",
    "NY"
  ],
  "LITTLE GENESEE": [
    "14754",
    "NY"
  ],
  "LITTLE VALLEY": [
    "14755",
    "NY"
  ],
  "MAPLE SPRINGS": [
    "14756",
    "NY"
  ],
  "MAYVILLE": [
    "58257",
    "ND"
  ],
  "OLEAN": [
    "65064",
    "MO"
  ],
  "OTTO": [
    "82434",
    "WY"
  ],
  "PANAMA": [
    "74951",
    "OK"
  ],
  "PORTVILLE": [
    "14770",
    "NY"
  ],
  "RICHBURG": [
    "29729",
    "SC"
  ],
  "RIPLEY": [
    "74062",
    "OK"
  ],
  "RUSHFORD": [
    "55971",
    "MN"
  ],
  "SAINT BONAVENTURE": [
    "14778",
    "NY"
  ],
  "SALAMANCA": [
    "14779",
    "NY"
  ],
  "SINCLAIRVILLE": [
    "14782",
    "NY"
  ],
  "STEAMBURG": [
    "14783",
    "NY"
  ],
  "WEST CLARKSVILLE": [
    "14786",
    "NY"
  ],
  "WESTONS MILLS": [
    "14788",
    "NY"
  ],
  "ALFRED STATION": [
    "14803",
    "NY"
  ],
  "ALMOND": [
    "54909",
    "WI"
  ],
  "ARKPORT": [
    "14807",
    "NY"
  ],
  "ATLANTA": [
    "83601",
    "ID"
  ],
  "AVOCA": [
    "79503",
    "TX"
  ],
  "BEAVER DAMS": [
    "14812",
    "NY"
  ],
  "BIG FLATS": [
    "14814",
    "NY"
  ],
  "BREESPORT": [
    "14816",
    "NY"
  ],
  "BROOKTONDALE": [
    "14817",
    "NY"
  ],
  "BURDETT": [
    "67523",
    "KS"
  ],
  "CAMERON MILLS": [
    "14820",
    "NY"
  ],
  "CAMPBELL": [
    "95011",
    "CA"
  ],
  "CANASERAGA": [
    "14822",
    "NY"
  ],
  "CANISTEO": [
    "14823",
    "NY"
  ],
  "CAYUTA": [
    "14824",
    "NY"
  ],
  "CHEMUNG": [
    "14825",
    "NY"
  ],
  "COHOCTON": [
    "14826",
    "NY"
  ],
  "COOPERS PLAINS": [
    "14827",
    "NY"
  ],
  "CORNING": [
    "96021",
    "CA"
  ],
  "DUNDEE": [
    "97115",
    "OR"
  ],
  "ERIN": [
    "37061",
    "TN"
  ],
  "HAMMONDSPORT": [
    "14840",
    "NY"
  ],
  "HECTOR": [
    "72843",
    "AR"
  ],
  "HIMROD": [
    "14842",
    "NY"
  ],
  "HORNELL": [
    "14843",
    "NY"
  ],
  "HORSEHEADS": [
    "14845",
    "NY"
  ],
  "HUNT": [
    "78024",
    "TX"
  ],
  "INTERLAKEN": [
    "14847",
    "NY"
  ],
  "ITHACA": [
    "68033",
    "NE"
  ],
  "JASPER": [
    "75951",
    "TX"
  ],
  "KANONA": [
    "14856",
    "NY"
  ],
  "LAKEMONT": [
    "30552",
    "GA"
  ],
  "LINDLEY": [
    "14858",
    "NY"
  ],
  "LOCKWOOD": [
    "93932",
    "CA"
  ],
  "LOWMAN": [
    "83637",
    "ID"
  ],
  "MILLPORT": [
    "35576",
    "AL"
  ],
  "MONTOUR FALLS": [
    "14865",
    "NY"
  ],
  "ODESSA": [
    "99159",
    "WA"
  ],
  "PAINTED POST": [
    "14870",
    "NY"
  ],
  "PINE CITY": [
    "55063",
    "MN"
  ],
  "PINE VALLEY": [
    "91962",
    "CA"
  ],
  "PRATTSBURGH": [
    "14873",
    "NY"
  ],
  "PULTENEY": [
    "14874",
    "NY"
  ],
  "READING CENTER": [
    "14876",
    "NY"
  ],
  "REXVILLE": [
    "14877",
    "NY"
  ],
  "ROCK STREAM": [
    "14878",
    "NY"
  ],
  "SAVONA": [
    "14879",
    "NY"
  ],
  "SCIO": [
    "97374",
    "OR"
  ],
  "SLATERVILLE SPRINGS": [
    "14881",
    "NY"
  ],
  "LANSING": [
    "66043",
    "KS"
  ],
  "SWAIN": [
    "14884",
    "NY"
  ],
  "TROUPSBURG": [
    "14885",
    "NY"
  ],
  "TRUMANSBURG": [
    "14886",
    "NY"
  ],
  "TYRONE": [
    "88065",
    "NM"
  ],
  "VAN ETTEN": [
    "14889",
    "NY"
  ],
  "WATKINS GLEN": [
    "14891",
    "NY"
  ],
  "WAVERLY": [
    "99039",
    "WA"
  ],
  "WELLSBURG": [
    "50680",
    "IA"
  ],
  "WELLSVILLE": [
    "84339",
    "UT"
  ],
  "WHITESVILLE": [
    "42378",
    "KY"
  ],
  "WOODHULL": [
    "61490",
    "IL"
  ],
  "ELMIRA": [
    "97437",
    "OR"
  ],
  "ALIQUIPPA": [
    "15001",
    "PA"
  ],
  "AMBRIDGE": [
    "15003",
    "PA"
  ],
  "ATLASBURG": [
    "15004",
    "PA"
  ],
  "BADEN": [
    "15005",
    "PA"
  ],
  "BAIRDFORD": [
    "15006",
    "PA"
  ],
  "BAKERSTOWN": [
    "15007",
    "PA"
  ],
  "BEAVER": [
    "98305",
    "WA"
  ],
  "BELLE VERNON": [
    "15012",
    "PA"
  ],
  "BRACKENRIDGE": [
    "15014",
    "PA"
  ],
  "BRADFORDWOODS": [
    "15015",
    "PA"
  ],
  "BRIDGEVILLE": [
    "95526",
    "CA"
  ],
  "BUENA VISTA": [
    "87712",
    "NM"
  ],
  "BULGER": [
    "15019",
    "PA"
  ],
  "BUNOLA": [
    "15020",
    "PA"
  ],
  "BURGETTSTOWN": [
    "15021",
    "PA"
  ],
  "CHARLEROI": [
    "15022",
    "PA"
  ],
  "CHESWICK": [
    "15024",
    "PA"
  ],
  "CLAIRTON": [
    "15025",
    "PA"
  ],
  "COULTERS": [
    "15028",
    "PA"
  ],
  "CREIGHTON": [
    "68729",
    "NE"
  ],
  "CUDDY": [
    "15031",
    "PA"
  ],
  "CURTISVILLE": [
    "15032",
    "PA"
  ],
  "DONORA": [
    "15033",
    "PA"
  ],
  "DRAVOSBURG": [
    "15034",
    "PA"
  ],
  "EAST MC KEESPORT": [
    "15035",
    "PA"
  ],
  "ELRAMA": [
    "15038",
    "PA"
  ],
  "GIBSONIA": [
    "15044",
    "PA"
  ],
  "GLASSPORT": [
    "15045",
    "PA"
  ],
  "CRESCENT": [
    "97733",
    "OR"
  ],
  "GREENOCK": [
    "15047",
    "PA"
  ],
  "HARWICK": [
    "15049",
    "PA"
  ],
  "HOOKSTOWN": [
    "15050",
    "PA"
  ],
  "INDIANOLA": [
    "98342",
    "WA"
  ],
  "INDUSTRY": [
    "78944",
    "TX"
  ],
  "JOFFRE": [
    "15053",
    "PA"
  ],
  "LANGELOTH": [
    "15054",
    "PA"
  ],
  "LEETSDALE": [
    "15056",
    "PA"
  ],
  "MC DONALD": [
    "67745",
    "KS"
  ],
  "MIDLAND": [
    "97634",
    "OR"
  ],
  "MIDWAY": [
    "84049",
    "UT"
  ],
  "MONACA": [
    "15061",
    "PA"
  ],
  "MONESSEN": [
    "15062",
    "PA"
  ],
  "MONONGAHELA": [
    "15063",
    "PA"
  ],
  "NATRONA HEIGHTS": [
    "15065",
    "PA"
  ],
  "NEW BRIGHTON": [
    "15066",
    "PA"
  ],
  "NEW EAGLE": [
    "15067",
    "PA"
  ],
  "NEW KENSINGTON": [
    "15069",
    "PA"
  ],
  "PRICEDALE": [
    "15072",
    "PA"
  ],
  "RURAL RIDGE": [
    "15075",
    "PA"
  ],
  "RUSSELLTON": [
    "15076",
    "PA"
  ],
  "SHIPPINGPORT": [
    "15077",
    "PA"
  ],
  "SLOVAN": [
    "15078",
    "PA"
  ],
  "SOUTH HEIGHTS": [
    "15081",
    "PA"
  ],
  "STURGEON": [
    "65284",
    "MO"
  ],
  "SUTERSVILLE": [
    "15083",
    "PA"
  ],
  "TARENTUM": [
    "15084",
    "PA"
  ],
  "TRAFFORD": [
    "35172",
    "AL"
  ],
  "WARRENDALE": [
    "15096",
    "PA"
  ],
  "WEST ELIZABETH": [
    "15088",
    "PA"
  ],
  "WEXFORD": [
    "15090",
    "PA"
  ],
  "ALLISON PARK": [
    "15101",
    "PA"
  ],
  "BETHEL PARK": [
    "15102",
    "PA"
  ],
  "BRADDOCK": [
    "58524",
    "ND"
  ],
  "CARNEGIE": [
    "73015",
    "OK"
  ],
  "CORAOPOLIS": [
    "15108",
    "PA"
  ],
  "DUQUESNE": [
    "15110",
    "PA"
  ],
  "EAST PITTSBURGH": [
    "15112",
    "PA"
  ],
  "GLENSHAW": [
    "15116",
    "PA"
  ],
  "HOMESTEAD": [
    "52236",
    "IA"
  ],
  "WEST MIFFLIN": [
    "15123",
    "PA"
  ],
  "IMPERIAL": [
    "92251",
    "CA"
  ],
  "INGOMAR": [
    "59039",
    "MT"
  ],
  "SOUTH PARK": [
    "15129",
    "PA"
  ],
  "MCKEESPORT": [
    "15135",
    "PA"
  ],
  "MC KEES ROCKS": [
    "15136",
    "PA"
  ],
  "NORTH VERSAILLES": [
    "15137",
    "PA"
  ],
  "OAKMONT": [
    "15139",
    "PA"
  ],
  "PITCAIRN": [
    "15140",
    "PA"
  ],
  "PRESTO": [
    "15142",
    "PA"
  ],
  "SEWICKLEY": [
    "15143",
    "PA"
  ],
  "SPRINGDALE": [
    "99173",
    "WA"
  ],
  "TURTLE CREEK": [
    "25203",
    "WV"
  ],
  "WILMERDING": [
    "15148",
    "PA"
  ],
  "PITTSBURGH": [
    "15290",
    "PA"
  ],
  "ALEPPO": [
    "15310",
    "PA"
  ],
  "AMITY": [
    "97101",
    "OR"
  ],
  "AVELLA": [
    "15312",
    "PA"
  ],
  "BEALLSVILLE": [
    "43716",
    "OH"
  ],
  "BENTLEYVILLE": [
    "15314",
    "PA"
  ],
  "BOBTOWN": [
    "15315",
    "PA"
  ],
  "BRAVE": [
    "15316",
    "PA"
  ],
  "CANONSBURG": [
    "15317",
    "PA"
  ],
  "CARMICHAELS": [
    "15320",
    "PA"
  ],
  "CECIL": [
    "72930",
    "AR"
  ],
  "CLAYSVILLE": [
    "15323",
    "PA"
  ],
  "COKEBURG": [
    "15324",
    "PA"
  ],
  "CRUCIBLE": [
    "15325",
    "PA"
  ],
  "DILLINER": [
    "15327",
    "PA"
  ],
  "PROSPERITY": [
    "29127",
    "SC"
  ],
  "EIGHTY FOUR": [
    "15330",
    "PA"
  ],
  "FINLEYVILLE": [
    "15332",
    "PA"
  ],
  "FREDERICKTOWN": [
    "63645",
    "MO"
  ],
  "GARARDS FORT": [
    "15334",
    "PA"
  ],
  "GASTONVILLE": [
    "15336",
    "PA"
  ],
  "GRAYSVILLE": [
    "47852",
    "IN"
  ],
  "HENDERSONVILLE": [
    "37077",
    "TN"
  ],
  "HICKORY": [
    "42051",
    "KY"
  ],
  "HOUSTON": [
    "99694",
    "AK"
  ],
  "MARIANNA": [
    "72360",
    "AR"
  ],
  "MATHER": [
    "95655",
    "CA"
  ],
  "MEADOW LANDS": [
    "15347",
    "PA"
  ],
  "MILLSBORO": [
    "19966",
    "DE"
  ],
  "MUSE": [
    "74949",
    "OK"
  ],
  "NEMACOLIN": [
    "15351",
    "PA"
  ],
  "NEW FREEPORT": [
    "15352",
    "PA"
  ],
  "RICES LANDING": [
    "15357",
    "PA"
  ],
  "RICHEYVILLE": [
    "15358",
    "PA"
  ],
  "ROGERSVILLE": [
    "65742",
    "MO"
  ],
  "SCENERY HILL": [
    "15360",
    "PA"
  ],
  "SPRAGGS": [
    "15362",
    "PA"
  ],
  "STRABANE": [
    "15363",
    "PA"
  ],
  "SYCAMORE": [
    "67363",
    "KS"
  ],
  "TAYLORSTOWN": [
    "15365",
    "PA"
  ],
  "VAN VOORHIS": [
    "15366",
    "PA"
  ],
  "VENETIA": [
    "15367",
    "PA"
  ],
  "VESTABURG": [
    "48891",
    "MI"
  ],
  "WAYNESBURG": [
    "44688",
    "OH"
  ],
  "WEST ALEXANDER": [
    "15376",
    "PA"
  ],
  "WEST FINLEY": [
    "15377",
    "PA"
  ],
  "WESTLAND": [
    "48186",
    "MI"
  ],
  "WEST MIDDLETOWN": [
    "15379",
    "PA"
  ],
  "WIND RIDGE": [
    "15380",
    "PA"
  ],
  "UNIONTOWN": [
    "99179",
    "WA"
  ],
  "ADAH": [
    "15410",
    "PA"
  ],
  "ALLENPORT": [
    "15412",
    "PA"
  ],
  "ALLISON": [
    "79003",
    "TX"
  ],
  "CALIFORNIA": [
    "65018",
    "MO"
  ],
  "CARDALE": [
    "15420",
    "PA"
  ],
  "CHALK HILL": [
    "15421",
    "PA"
  ],
  "CHESTNUT RIDGE": [
    "15422",
    "PA"
  ],
  "COAL CENTER": [
    "15423",
    "PA"
  ],
  "CONFLUENCE": [
    "15424",
    "PA"
  ],
  "CONNELLSVILLE": [
    "15425",
    "PA"
  ],
  "DAISYTOWN": [
    "15427",
    "PA"
  ],
  "DAWSON": [
    "76639",
    "TX"
  ],
  "DICKERSON RUN": [
    "15430",
    "PA"
  ],
  "DUNBAR": [
    "68346",
    "NE"
  ],
  "DUNLEVY": [
    "15432",
    "PA"
  ],
  "EAST MILLSBORO": [
    "15433",
    "PA"
  ],
  "ELCO": [
    "15434",
    "PA"
  ],
  "FAIRBANK": [
    "50629",
    "IA"
  ],
  "FAIRCHANCE": [
    "15436",
    "PA"
  ],
  "FAYETTE CITY": [
    "15438",
    "PA"
  ],
  "GIBBON GLADE": [
    "15440",
    "PA"
  ],
  "GRINDSTONE": [
    "15442",
    "PA"
  ],
  "HIBBS": [
    "15443",
    "PA"
  ],
  "HILLER": [
    "15444",
    "PA"
  ],
  "HOPWOOD": [
    "15445",
    "PA"
  ],
  "INDIAN HEAD": [
    "20640",
    "MD"
  ],
  "JACOBS CREEK": [
    "15448",
    "PA"
  ],
  "KEISTERVILLE": [
    "15449",
    "PA"
  ],
  "LA BELLE": [
    "63447",
    "MO"
  ],
  "LAKE LYNN": [
    "15451",
    "PA"
  ],
  "LECKRONE": [
    "15454",
    "PA"
  ],
  "LEISENRING": [
    "15455",
    "PA"
  ],
  "LEMONT FURNACE": [
    "15456",
    "PA"
  ],
  "MC CLELLANDTOWN": [
    "15458",
    "PA"
  ],
  "MARKLEYSBURG": [
    "15459",
    "PA"
  ],
  "MARTIN": [
    "58758",
    "ND"
  ],
  "MASONTOWN": [
    "26542",
    "WV"
  ],
  "MELCROFT": [
    "15462",
    "PA"
  ],
  "MERRITTSTOWN": [
    "15463",
    "PA"
  ],
  "MILL RUN": [
    "15464",
    "PA"
  ],
  "MOUNT BRADDOCK": [
    "15465",
    "PA"
  ],
  "NEWELL": [
    "57760",
    "SD"
  ],
  "NEW GENEVA": [
    "15467",
    "PA"
  ],
  "NORMALVILLE": [
    "15469",
    "PA"
  ],
  "OHIOPYLE": [
    "15470",
    "PA"
  ],
  "OLIVER": [
    "30449",
    "GA"
  ],
  "PERRYOPOLIS": [
    "15473",
    "PA"
  ],
  "POINT MARION": [
    "15474",
    "PA"
  ],
  "REPUBLIC": [
    "99166",
    "WA"
  ],
  "SMITHTON": [
    "65350",
    "MO"
  ],
  "SMOCK": [
    "15480",
    "PA"
  ],
  "STAR JUNCTION": [
    "15482",
    "PA"
  ],
  "STOCKDALE": [
    "78160",
    "TX"
  ],
  "ULEDI": [
    "15484",
    "PA"
  ],
  "URSINA": [
    "15485",
    "PA"
  ],
  "VANDERBILT": [
    "77991",
    "TX"
  ],
  "WALTERSBURG": [
    "15488",
    "PA"
  ],
  "WEST LEISENRING": [
    "15489",
    "PA"
  ],
  "WHITE": [
    "57276",
    "SD"
  ],
  "HIDDEN VALLEY": [
    "15502",
    "PA"
  ],
  "ACOSTA": [
    "15520",
    "PA"
  ],
  "ALUM BANK": [
    "15521",
    "PA"
  ],
  "BOSWELL": [
    "74727",
    "OK"
  ],
  "BOYNTON": [
    "74422",
    "OK"
  ],
  "BREEZEWOOD": [
    "15533",
    "PA"
  ],
  "BUFFALO MILLS": [
    "15534",
    "PA"
  ],
  "CLEARVILLE": [
    "15535",
    "PA"
  ],
  "CRYSTAL SPRING": [
    "15536",
    "PA"
  ],
  "FAIRHOPE": [
    "36533",
    "AL"
  ],
  "FISHERTOWN": [
    "15539",
    "PA"
  ],
  "FORT HILL": [
    "15540",
    "PA"
  ],
  "FRIEDENS": [
    "15541",
    "PA"
  ],
  "GARRETT": [
    "46738",
    "IN"
  ],
  "HYNDMAN": [
    "15545",
    "PA"
  ],
  "JENNERS": [
    "15546",
    "PA"
  ],
  "JENNERSTOWN": [
    "15547",
    "PA"
  ],
  "LISTIE": [
    "15549",
    "PA"
  ],
  "MANNS CHOICE": [
    "15550",
    "PA"
  ],
  "MARKLETON": [
    "15551",
    "PA"
  ],
  "MEYERSDALE": [
    "15552",
    "PA"
  ],
  "NEW PARIS": [
    "46553",
    "IN"
  ],
  "SCHELLSBURG": [
    "15559",
    "PA"
  ],
  "SHANKSVILLE": [
    "15560",
    "PA"
  ],
  "SIPESVILLE": [
    "15561",
    "PA"
  ],
  "SPRINGS": [
    "15562",
    "PA"
  ],
  "STOYSTOWN": [
    "15563",
    "PA"
  ],
  "WELLERSBURG": [
    "15564",
    "PA"
  ],
  "WEST SALISBURY": [
    "15565",
    "PA"
  ],
  "GREENSBURG": [
    "70441",
    "LA"
  ],
  "ACME": [
    "98220",
    "WA"
  ],
  "ADAMSBURG": [
    "15611",
    "PA"
  ],
  "ALVERTON": [
    "15612",
    "PA"
  ],
  "APOLLO": [
    "15613",
    "PA"
  ],
  "ARDARA": [
    "15615",
    "PA"
  ],
  "ARMBRUST": [
    "15616",
    "PA"
  ],
  "ARONA": [
    "15617",
    "PA"
  ],
  "AVONMORE": [
    "15618",
    "PA"
  ],
  "BOVARD": [
    "15619",
    "PA"
  ],
  "BRADENVILLE": [
    "15620",
    "PA"
  ],
  "CALUMET": [
    "73014",
    "OK"
  ],
  "CHAMPION": [
    "69023",
    "NE"
  ],
  "CLARIDGE": [
    "15623",
    "PA"
  ],
  "CRABTREE": [
    "97335",
    "OR"
  ],
  "DARRAGH": [
    "15625",
    "PA"
  ],
  "DONEGAL": [
    "15628",
    "PA"
  ],
  "EAST VANDERGRIFT": [
    "15629",
    "PA"
  ],
  "EVERSON": [
    "98247",
    "WA"
  ],
  "EXPORT": [
    "15632",
    "PA"
  ],
  "FORBES ROAD": [
    "15633",
    "PA"
  ],
  "GRAPEVILLE": [
    "15634",
    "PA"
  ],
  "HANNASTOWN": [
    "15635",
    "PA"
  ],
  "HARRISON CITY": [
    "15636",
    "PA"
  ],
  "HERMINIE": [
    "15637",
    "PA"
  ],
  "HOSTETTER": [
    "15638",
    "PA"
  ],
  "HUNKER": [
    "15639",
    "PA"
  ],
  "IRWIN": [
    "83428",
    "ID"
  ],
  "JEANNETTE": [
    "15644",
    "PA"
  ],
  "JONES MILLS": [
    "15646",
    "PA"
  ],
  "LARIMER": [
    "15647",
    "PA"
  ],
  "LATROBE": [
    "15650",
    "PA"
  ],
  "LAUGHLINTOWN": [
    "15655",
    "PA"
  ],
  "LEECHBURG": [
    "15656",
    "PA"
  ],
  "LIGONIER": [
    "46767",
    "IN"
  ],
  "LOWBER": [
    "15660",
    "PA"
  ],
  "LOYALHANNA": [
    "15661",
    "PA"
  ],
  "LUXOR": [
    "15662",
    "PA"
  ],
  "MAMMOTH": [
    "85618",
    "AZ"
  ],
  "MANOR": [
    "78653",
    "TX"
  ],
  "MOUNT PLEASANT": [
    "84647",
    "UT"
  ],
  "MURRYSVILLE": [
    "15668",
    "PA"
  ],
  "NEW ALEXANDRIA": [
    "15670",
    "PA"
  ],
  "NEW DERRY": [
    "15671",
    "PA"
  ],
  "NEW STANTON": [
    "15672",
    "PA"
  ],
  "NORTH APOLLO": [
    "15673",
    "PA"
  ],
  "NORVELT": [
    "15674",
    "PA"
  ],
  "PENN": [
    "58362",
    "ND"
  ],
  "PLEASANT UNITY": [
    "15676",
    "PA"
  ],
  "RECTOR": [
    "72461",
    "AR"
  ],
  "RILLTON": [
    "15678",
    "PA"
  ],
  "RUFFS DALE": [
    "15679",
    "PA"
  ],
  "SALINA": [
    "84654",
    "UT"
  ],
  "SALTSBURG": [
    "15681",
    "PA"
  ],
  "SCHENLEY": [
    "15682",
    "PA"
  ],
  "SCOTTDALE": [
    "30079",
    "GA"
  ],
  "SLICKVILLE": [
    "15684",
    "PA"
  ],
  "SOUTHWEST": [
    "15685",
    "PA"
  ],
  "SPRING CHURCH": [
    "15686",
    "PA"
  ],
  "STAHLSTOWN": [
    "15687",
    "PA"
  ],
  "TARRS": [
    "15688",
    "PA"
  ],
  "UNITED": [
    "15689",
    "PA"
  ],
  "VANDERGRIFT": [
    "15690",
    "PA"
  ],
  "WENDEL": [
    "96136",
    "CA"
  ],
  "WESTMORELAND CITY": [
    "15692",
    "PA"
  ],
  "WHITNEY": [
    "76692",
    "TX"
  ],
  "WYANO": [
    "15695",
    "PA"
  ],
  "YOUNGWOOD": [
    "15697",
    "PA"
  ],
  "YUKON": [
    "73099",
    "OK"
  ],
  "INDIANA": [
    "15705",
    "PA"
  ],
  "ALVERDA": [
    "15710",
    "PA"
  ],
  "ANITA": [
    "50020",
    "IA"
  ],
  "ARCADIA": [
    "91077",
    "CA"
  ],
  "AULTMAN": [
    "15713",
    "PA"
  ],
  "NORTHERN CAMBRIA": [
    "15714",
    "PA"
  ],
  "BIG RUN": [
    "15715",
    "PA"
  ],
  "BLACK LICK": [
    "15716",
    "PA"
  ],
  "BLAIRSVILLE": [
    "30514",
    "GA"
  ],
  "BRUSH VALLEY": [
    "15720",
    "PA"
  ],
  "BURNSIDE": [
    "70738",
    "LA"
  ],
  "CARROLLTOWN": [
    "15722",
    "PA"
  ],
  "CHAMBERSVILLE": [
    "15723",
    "PA"
  ],
  "CHERRY TREE": [
    "15724",
    "PA"
  ],
  "CLARKSBURG": [
    "95612",
    "CA"
  ],
  "COMMODORE": [
    "15729",
    "PA"
  ],
  "COOLSPRING": [
    "15730",
    "PA"
  ],
  "CORAL": [
    "49322",
    "MI"
  ],
  "CREEKSIDE": [
    "15732",
    "PA"
  ],
  "DE LANCEY": [
    "15733",
    "PA"
  ],
  "DIXONVILLE": [
    "15734",
    "PA"
  ],
  "ELDERTON": [
    "15736",
    "PA"
  ],
  "ELMORA": [
    "15737",
    "PA"
  ],
  "EMEIGH": [
    "15738",
    "PA"
  ],
  "GIPSY": [
    "15741",
    "PA"
  ],
  "GLEN CAMPBELL": [
    "15742",
    "PA"
  ],
  "HEILWOOD": [
    "15745",
    "PA"
  ],
  "HOME": [
    "66438",
    "KS"
  ],
  "HOMER CITY": [
    "15748",
    "PA"
  ],
  "JOSEPHINE": [
    "75164",
    "TX"
  ],
  "LA JOSE": [
    "15753",
    "PA"
  ],
  "LUCERNEMINES": [
    "15754",
    "PA"
  ],
  "MC INTYRE": [
    "31054",
    "GA"
  ],
  "MAHAFFEY": [
    "15757",
    "PA"
  ],
  "MARION CENTER": [
    "15759",
    "PA"
  ],
  "MARSTELLER": [
    "15760",
    "PA"
  ],
  "MENTCLE": [
    "15761",
    "PA"
  ],
  "NICKTOWN": [
    "15762",
    "PA"
  ],
  "NORTHPOINT": [
    "15763",
    "PA"
  ],
  "OLIVEBURG": [
    "15764",
    "PA"
  ],
  "PENN RUN": [
    "15765",
    "PA"
  ],
  "PUNXSUTAWNEY": [
    "15767",
    "PA"
  ],
  "RINGGOLD": [
    "76261",
    "TX"
  ],
  "ROCHESTER MILLS": [
    "15771",
    "PA"
  ],
  "ROSSITER": [
    "15772",
    "PA"
  ],
  "SAINT BENEDICT": [
    "97373",
    "OR"
  ],
  "SHELOCTA": [
    "15774",
    "PA"
  ],
  "SPANGLER": [
    "15775",
    "PA"
  ],
  "SPRANKLE MILLS": [
    "15776",
    "PA"
  ],
  "STARFORD": [
    "15777",
    "PA"
  ],
  "TORRANCE": [
    "90510",
    "CA"
  ],
  "VALIER": [
    "62891",
    "IL"
  ],
  "WALSTON": [
    "15781",
    "PA"
  ],
  "WORTHVILLE": [
    "41098",
    "KY"
  ],
  "DU BOIS": [
    "68345",
    "NE"
  ],
  "BENEZETT": [
    "15821",
    "PA"
  ],
  "BRANDY CAMP": [
    "15822",
    "PA"
  ],
  "BROCKWAY": [
    "15824",
    "PA"
  ],
  "BROOKVILLE": [
    "67425",
    "KS"
  ],
  "BYRNEDALE": [
    "15827",
    "PA"
  ],
  "CLARINGTON": [
    "43915",
    "OH"
  ],
  "CORSICA": [
    "57328",
    "SD"
  ],
  "DAGUS MINES": [
    "15831",
    "PA"
  ],
  "DRIFTWOOD": [
    "78619",
    "TX"
  ],
  "EMPORIUM": [
    "15834",
    "PA"
  ],
  "FALLS CREEK": [
    "15840",
    "PA"
  ],
  "FORCE": [
    "15841",
    "PA"
  ],
  "KERSEY": [
    "80644",
    "CO"
  ],
  "KNOX DALE": [
    "15847",
    "PA"
  ],
  "LUTHERSBURG": [
    "15848",
    "PA"
  ],
  "REYNOLDSVILLE": [
    "26422",
    "WV"
  ],
  "RIDGWAY": [
    "81432",
    "CO"
  ],
  "ROCKTON": [
    "61072",
    "IL"
  ],
  "SAINT MARYS": [
    "99658",
    "AK"
  ],
  "SIGEL": [
    "62462",
    "IL"
  ],
  "SINNAMAHONING": [
    "15861",
    "PA"
  ],
  "STUMP CREEK": [
    "15863",
    "PA"
  ],
  "SUMMERVILLE": [
    "97876",
    "OR"
  ],
  "SYKESVILLE": [
    "21784",
    "MD"
  ],
  "TROUTVILLE": [
    "24175",
    "VA"
  ],
  "WEEDVILLE": [
    "15868",
    "PA"
  ],
  "WILCOX": [
    "68982",
    "NE"
  ],
  "ARMAGH": [
    "15920",
    "PA"
  ],
  "BEAVERDALE": [
    "15921",
    "PA"
  ],
  "BELSANO": [
    "15922",
    "PA"
  ],
  "CAIRNBROOK": [
    "15924",
    "PA"
  ],
  "CENTRAL CITY": [
    "80427",
    "CO"
  ],
  "COLVER": [
    "15927",
    "PA"
  ],
  "DAVIDSVILLE": [
    "15928",
    "PA"
  ],
  "DILLTOWN": [
    "15929",
    "PA"
  ],
  "DUNLO": [
    "15930",
    "PA"
  ],
  "EBENSBURG": [
    "15931",
    "PA"
  ],
  "ELTON": [
    "70532",
    "LA"
  ],
  "HOLLSOPPLE": [
    "15935",
    "PA"
  ],
  "HOOVERSVILLE": [
    "15936",
    "PA"
  ],
  "JEROME": [
    "86331",
    "AZ"
  ],
  "LILLY": [
    "31051",
    "GA"
  ],
  "LORETTO": [
    "55598",
    "MN"
  ],
  "MINERAL POINT": [
    "63660",
    "MO"
  ],
  "NANTY GLO": [
    "15943",
    "PA"
  ],
  "NEW FLORENCE": [
    "63363",
    "MO"
  ],
  "PARKHILL": [
    "15945",
    "PA"
  ],
  "REVLOC": [
    "15948",
    "PA"
  ],
  "ROBINSON": [
    "66532",
    "KS"
  ],
  "SAINT MICHAEL": [
    "99659",
    "AK"
  ],
  "SALIX": [
    "51052",
    "IA"
  ],
  "SEANOR": [
    "15953",
    "PA"
  ],
  "SEWARD": [
    "99664",
    "AK"
  ],
  "SIDMAN": [
    "15955",
    "PA"
  ],
  "SOUTH FORK": [
    "81154",
    "CO"
  ],
  "STRONGSTOWN": [
    "15957",
    "PA"
  ],
  "SUMMERHILL": [
    "15958",
    "PA"
  ],
  "TIRE HILL": [
    "15959",
    "PA"
  ],
  "TWIN ROCKS": [
    "15960",
    "PA"
  ],
  "VINTONDALE": [
    "15961",
    "PA"
  ],
  "WILMORE": [
    "67155",
    "KS"
  ],
  "WINDBER": [
    "15963",
    "PA"
  ],
  "BOYERS": [
    "16020",
    "PA"
  ],
  "BRANCHTON": [
    "16021",
    "PA"
  ],
  "BRUIN": [
    "16022",
    "PA"
  ],
  "CALLERY": [
    "16024",
    "PA"
  ],
  "CHICORA": [
    "16025",
    "PA"
  ],
  "CONNOQUENESSING": [
    "16027",
    "PA"
  ],
  "EAST BRADY": [
    "16028",
    "PA"
  ],
  "EAST BUTLER": [
    "16029",
    "PA"
  ],
  "EAU CLAIRE": [
    "54703",
    "WI"
  ],
  "EVANS CITY": [
    "16033",
    "PA"
  ],
  "FENELTON": [
    "16034",
    "PA"
  ],
  "FOXBURG": [
    "16036",
    "PA"
  ],
  "HERMAN": [
    "68029",
    "NE"
  ],
  "HILLIARDS": [
    "16040",
    "PA"
  ],
  "KARNS CITY": [
    "16041",
    "PA"
  ],
  "LYNDORA": [
    "16045",
    "PA"
  ],
  "MARS": [
    "16046",
    "PA"
  ],
  "NORTH WASHINGTON": [
    "50661",
    "IA"
  ],
  "PARKER": [
    "98939",
    "WA"
  ],
  "PETROLIA": [
    "95558",
    "CA"
  ],
  "PORTERSVILLE": [
    "16051",
    "PA"
  ],
  "RENFREW": [
    "16053",
    "PA"
  ],
  "SAINT PETERSBURG": [
    "33784",
    "FL"
  ],
  "SARVER": [
    "16055",
    "PA"
  ],
  "SAXONBURG": [
    "16056",
    "PA"
  ],
  "SLIPPERY ROCK": [
    "16057",
    "PA"
  ],
  "TURKEY CITY": [
    "16058",
    "PA"
  ],
  "VALENCIA": [
    "91385",
    "CA"
  ],
  "WEST SUNBURY": [
    "16061",
    "PA"
  ],
  "ZELIENOPLE": [
    "16063",
    "PA"
  ],
  "CRANBERRY TOWNSHIP": [
    "16066",
    "PA"
  ],
  "ATLANTIC": [
    "50022",
    "IA"
  ],
  "BESSEMER": [
    "49911",
    "MI"
  ],
  "CLARKS MILLS": [
    "16114",
    "PA"
  ],
  "DARLINGTON": [
    "64438",
    "MO"
  ],
  "EDINBURG": [
    "78542",
    "TX"
  ],
  "ELLWOOD CITY": [
    "16117",
    "PA"
  ],
  "ENON VALLEY": [
    "16120",
    "PA"
  ],
  "FARRELL": [
    "16121",
    "PA"
  ],
  "FOMBELL": [
    "16123",
    "PA"
  ],
  "GROVE CITY": [
    "56243",
    "MN"
  ],
  "HARTSTOWN": [
    "16131",
    "PA"
  ],
  "HILLSVILLE": [
    "24343",
    "VA"
  ],
  "JACKSON CENTER": [
    "45334",
    "OH"
  ],
  "KOPPEL": [
    "16136",
    "PA"
  ],
  "MERCER": [
    "64661",
    "MO"
  ],
  "NEW GALILEE": [
    "16141",
    "PA"
  ],
  "NEW WILMINGTON": [
    "16172",
    "PA"
  ],
  "SANDY LAKE": [
    "16145",
    "PA"
  ],
  "HERMITAGE": [
    "71647",
    "AR"
  ],
  "SHARPSVILLE": [
    "46068",
    "IN"
  ],
  "SHEAKLEYVILLE": [
    "16151",
    "PA"
  ],
  "STONEBORO": [
    "16153",
    "PA"
  ],
  "TRANSFER": [
    "16154",
    "PA"
  ],
  "VILLA MARIA": [
    "16155",
    "PA"
  ],
  "VOLANT": [
    "16156",
    "PA"
  ],
  "WAMPUM": [
    "16157",
    "PA"
  ],
  "WEST MIDDLESEX": [
    "16159",
    "PA"
  ],
  "WEST PITTSBURG": [
    "16160",
    "PA"
  ],
  "WHEATLAND": [
    "95692",
    "CA"
  ],
  "KITTANNING": [
    "16201",
    "PA"
  ],
  "ADRIAN": [
    "97901",
    "OR"
  ],
  "BEYER": [
    "16211",
    "PA"
  ],
  "CADOGAN": [
    "16212",
    "PA"
  ],
  "CALLENSBURG": [
    "16213",
    "PA"
  ],
  "CLARION": [
    "50525",
    "IA"
  ],
  "COOKSBURG": [
    "16217",
    "PA"
  ],
  "COWANSVILLE": [
    "16218",
    "PA"
  ],
  "CROWN": [
    "16220",
    "PA"
  ],
  "DISTANT": [
    "16223",
    "PA"
  ],
  "FAIRMOUNT CITY": [
    "16224",
    "PA"
  ],
  "FORD CITY": [
    "16226",
    "PA"
  ],
  "FORD CLIFF": [
    "16228",
    "PA"
  ],
  "HAWTHORN": [
    "16230",
    "PA"
  ],
  "LEEPER": [
    "16233",
    "PA"
  ],
  "LUCINDA": [
    "16235",
    "PA"
  ],
  "MC GRANN": [
    "16236",
    "PA"
  ],
  "MARIENVILLE": [
    "16239",
    "PA"
  ],
  "MAYPORT": [
    "16240",
    "PA"
  ],
  "NEW BETHLEHEM": [
    "16242",
    "PA"
  ],
  "NU MINE": [
    "16244",
    "PA"
  ],
  "PLUMVILLE": [
    "16246",
    "PA"
  ],
  "RIMERSBURG": [
    "16248",
    "PA"
  ],
  "RURAL VALLEY": [
    "16249",
    "PA"
  ],
  "SEMINOLE": [
    "79360",
    "TX"
  ],
  "SHIPPENVILLE": [
    "16254",
    "PA"
  ],
  "SLIGO": [
    "16255",
    "PA"
  ],
  "SMICKSBURG": [
    "16256",
    "PA"
  ],
  "STRATTANVILLE": [
    "16258",
    "PA"
  ],
  "VOWINCKEL": [
    "16260",
    "PA"
  ],
  "YATESBORO": [
    "16263",
    "PA"
  ],
  "OIL CITY": [
    "71061",
    "LA"
  ],
  "CARLTON": [
    "98814",
    "WA"
  ],
  "CHANDLERS VALLEY": [
    "16312",
    "PA"
  ],
  "COCHRANTON": [
    "16314",
    "PA"
  ],
  "CONNEAUT LAKE": [
    "16316",
    "PA"
  ],
  "CRANBERRY": [
    "16319",
    "PA"
  ],
  "EAST HICKORY": [
    "16321",
    "PA"
  ],
  "ENDEAVOR": [
    "53930",
    "WI"
  ],
  "FRYBURG": [
    "16326",
    "PA"
  ],
  "GUYS MILLS": [
    "16327",
    "PA"
  ],
  "HYDETOWN": [
    "16328",
    "PA"
  ],
  "IRVINE": [
    "92697",
    "CA"
  ],
  "KOSSUTH": [
    "16331",
    "PA"
  ],
  "LICKINGVILLE": [
    "16332",
    "PA"
  ],
  "MARBLE": [
    "55764",
    "MN"
  ],
  "MEADVILLE": [
    "64659",
    "MO"
  ],
  "POLK": [
    "68654",
    "NE"
  ],
  "RENO": [
    "89595",
    "NV"
  ],
  "ROUSEVILLE": [
    "16344",
    "PA"
  ],
  "SENECA": [
    "97873",
    "OR"
  ],
  "SUGAR GROVE": [
    "60554",
    "IL"
  ],
  "TIDIOUTE": [
    "16351",
    "PA"
  ],
  "TIONA": [
    "16352",
    "PA"
  ],
  "TIONESTA": [
    "16353",
    "PA"
  ],
  "TOWNVILLE": [
    "29689",
    "SC"
  ],
  "TYLERSBURG": [
    "16361",
    "PA"
  ],
  "VENUS": [
    "76084",
    "TX"
  ],
  "WEST HICKORY": [
    "16370",
    "PA"
  ],
  "CLINTONVILLE": [
    "54929",
    "WI"
  ],
  "EMLENTON": [
    "16373",
    "PA"
  ],
  "KENNERDELL": [
    "16374",
    "PA"
  ],
  "LAMARTINE": [
    "16375",
    "PA"
  ],
  "BEAR LAKE": [
    "49614",
    "MI"
  ],
  "CAMBRIDGE SPRINGS": [
    "16403",
    "PA"
  ],
  "CONNEAUTVILLE": [
    "16406",
    "PA"
  ],
  "CORRY": [
    "16407",
    "PA"
  ],
  "CRANESVILLE": [
    "16410",
    "PA"
  ],
  "EDINBORO": [
    "16444",
    "PA"
  ],
  "GIRARD": [
    "79518",
    "TX"
  ],
  "GRAND VALLEY": [
    "16420",
    "PA"
  ],
  "HARBORCREEK": [
    "16421",
    "PA"
  ],
  "HARMONSBURG": [
    "16422",
    "PA"
  ],
  "LAKE CITY": [
    "96115",
    "CA"
  ],
  "LINESVILLE": [
    "16424",
    "PA"
  ],
  "MC KEAN": [
    "16426",
    "PA"
  ],
  "MILL VILLAGE": [
    "16427",
    "PA"
  ],
  "NORTH EAST": [
    "21901",
    "MD"
  ],
  "SAEGERTOWN": [
    "16433",
    "PA"
  ],
  "SPARTANSBURG": [
    "16434",
    "PA"
  ],
  "SPRINGBORO": [
    "45066",
    "OH"
  ],
  "SPRING CREEK": [
    "89815",
    "NV"
  ],
  "VENANGO": [
    "69168",
    "NE"
  ],
  "WATTSBURG": [
    "16442",
    "PA"
  ],
  "ERIE": [
    "80516",
    "CO"
  ],
  "ALTOONA": [
    "66710",
    "KS"
  ],
  "ALEXANDRIA": [
    "71315",
    "LA"
  ],
  "BECCARIA": [
    "16616",
    "PA"
  ],
  "BELLWOOD": [
    "68624",
    "NE"
  ],
  "BLANDBURG": [
    "16619",
    "PA"
  ],
  "BRISBIN": [
    "16620",
    "PA"
  ],
  "BROAD TOP": [
    "16621",
    "PA"
  ],
  "CALVIN": [
    "74531",
    "OK"
  ],
  "CHEST SPRINGS": [
    "16624",
    "PA"
  ],
  "CLAYSBURG": [
    "16625",
    "PA"
  ],
  "COALPORT": [
    "16627",
    "PA"
  ],
  "COUPON": [
    "16629",
    "PA"
  ],
  "CRESSON": [
    "76035",
    "TX"
  ],
  "CURRYVILLE": [
    "63339",
    "MO"
  ],
  "DEFIANCE": [
    "63341",
    "MO"
  ],
  "DUNCANSVILLE": [
    "16635",
    "PA"
  ],
  "DYSART": [
    "52224",
    "IA"
  ],
  "EAST FREEDOM": [
    "16637",
    "PA"
  ],
  "ENTRIKEN": [
    "16638",
    "PA"
  ],
  "FALLENTIMBER": [
    "16639",
    "PA"
  ],
  "FLINTON": [
    "16640",
    "PA"
  ],
  "GALLITZIN": [
    "16641",
    "PA"
  ],
  "GLASGOW": [
    "65254",
    "MO"
  ],
  "GLEN HOPE": [
    "16645",
    "PA"
  ],
  "HESSTON": [
    "67062",
    "KS"
  ],
  "HOLLIDAYSBURG": [
    "16648",
    "PA"
  ],
  "HOUTZDALE": [
    "16698",
    "PA"
  ],
  "HUNTINGDON": [
    "38344",
    "TN"
  ],
  "IMLER": [
    "16655",
    "PA"
  ],
  "IRVONA": [
    "16656",
    "PA"
  ],
  "JAMES CREEK": [
    "16657",
    "PA"
  ],
  "LOYSBURG": [
    "16659",
    "PA"
  ],
  "MC CONNELLSTOWN": [
    "16660",
    "PA"
  ],
  "MADERA": [
    "93639",
    "CA"
  ],
  "MORANN": [
    "16663",
    "PA"
  ],
  "NEW ENTERPRISE": [
    "16664",
    "PA"
  ],
  "OSCEOLA MILLS": [
    "16666",
    "PA"
  ],
  "OSTERBURG": [
    "16667",
    "PA"
  ],
  "PATTON": [
    "92369",
    "CA"
  ],
  "RAMEY": [
    "16671",
    "PA"
  ],
  "RIDDLESBURG": [
    "16672",
    "PA"
  ],
  "ROARING SPRING": [
    "16673",
    "PA"
  ],
  "ROBERTSDALE": [
    "36567",
    "AL"
  ],
  "SAINT BONIFACE": [
    "16675",
    "PA"
  ],
  "SANDY RIDGE": [
    "27046",
    "NC"
  ],
  "SAXTON": [
    "16678",
    "PA"
  ],
  "SIX MILE RUN": [
    "16679",
    "PA"
  ],
  "SMITHMILL": [
    "16680",
    "PA"
  ],
  "SMOKERUN": [
    "16681",
    "PA"
  ],
  "SPRUCE CREEK": [
    "16683",
    "PA"
  ],
  "TIPTON": [
    "93272",
    "CA"
  ],
  "TODD": [
    "28684",
    "NC"
  ],
  "WATERFALL": [
    "16689",
    "PA"
  ],
  "WESTOVER": [
    "35185",
    "AL"
  ],
  "AUSTIN": [
    "89310",
    "NV"
  ],
  "CROSBY": [
    "77532",
    "TX"
  ],
  "CUSTER CITY": [
    "73639",
    "OK"
  ],
  "CYCLONE": [
    "24827",
    "WV"
  ],
  "DERRICK CITY": [
    "16727",
    "PA"
  ],
  "DUKE CENTER": [
    "16729",
    "PA"
  ],
  "EAST SMETHPORT": [
    "16730",
    "PA"
  ],
  "GIFFORD": [
    "99131",
    "WA"
  ],
  "HAZEL HURST": [
    "16733",
    "PA"
  ],
  "JAMES CITY": [
    "16734",
    "PA"
  ],
  "KANE": [
    "62054",
    "IL"
  ],
  "LEWIS RUN": [
    "16738",
    "PA"
  ],
  "MOUNT JEWETT": [
    "16740",
    "PA"
  ],
  "PORT ALLEGANY": [
    "16743",
    "PA"
  ],
  "REW": [
    "16744",
    "PA"
  ],
  "RIXFORD": [
    "16745",
    "PA"
  ],
  "ROULETTE": [
    "16746",
    "PA"
  ],
  "SHINGLEHOUSE": [
    "16748",
    "PA"
  ],
  "SMETHPORT": [
    "16749",
    "PA"
  ],
  "TURTLEPOINT": [
    "16750",
    "PA"
  ],
  "STATE COLLEGE": [
    "16804",
    "PA"
  ],
  "UNIVERSITY PARK": [
    "60484",
    "IL"
  ],
  "AARONSBURG": [
    "16820",
    "PA"
  ],
  "ALLPORT": [
    "16821",
    "PA"
  ],
  "BEECH CREEK": [
    "42321",
    "KY"
  ],
  "BELLEFONTE": [
    "16823",
    "PA"
  ],
  "BIGLER": [
    "16825",
    "PA"
  ],
  "BLANCHARD": [
    "83804",
    "ID"
  ],
  "BOALSBURG": [
    "16827",
    "PA"
  ],
  "CENTRE HALL": [
    "16828",
    "PA"
  ],
  "CLEARFIELD": [
    "84089",
    "UT"
  ],
  "COBURN": [
    "16832",
    "PA"
  ],
  "CURWENSVILLE": [
    "16833",
    "PA"
  ],
  "DRIFTING": [
    "16834",
    "PA"
  ],
  "FLEMING": [
    "80728",
    "CO"
  ],
  "GLEN RICHEY": [
    "16837",
    "PA"
  ],
  "GRAMPIAN": [
    "16838",
    "PA"
  ],
  "GRASSFLAT": [
    "16839",
    "PA"
  ],
  "HAWK RUN": [
    "16840",
    "PA"
  ],
  "HOWARD": [
    "81233",
    "CO"
  ],
  "HYDE": [
    "16843",
    "PA"
  ],
  "JULIAN": [
    "92036",
    "CA"
  ],
  "KARTHAUS": [
    "16845",
    "PA"
  ],
  "KYLERTOWN": [
    "16847",
    "PA"
  ],
  "LAMAR": [
    "81052",
    "CO"
  ],
  "LANSE": [
    "49946",
    "MI"
  ],
  "LEMONT": [
    "60439",
    "IL"
  ],
  "MADISONBURG": [
    "16852",
    "PA"
  ],
  "MILESBURG": [
    "16853",
    "PA"
  ],
  "MILLHEIM": [
    "16854",
    "PA"
  ],
  "MINERAL SPRINGS": [
    "71851",
    "AR"
  ],
  "MINGOVILLE": [
    "16856",
    "PA"
  ],
  "MORRISDALE": [
    "16858",
    "PA"
  ],
  "MOSHANNON": [
    "16859",
    "PA"
  ],
  "MUNSON": [
    "16860",
    "PA"
  ],
  "NEW MILLPORT": [
    "16861",
    "PA"
  ],
  "OLANTA": [
    "29114",
    "SC"
  ],
  "PENNSYLVANIA FURNACE": [
    "16865",
    "PA"
  ],
  "PHILIPSBURG": [
    "59858",
    "MT"
  ],
  "PINE GROVE MILLS": [
    "16868",
    "PA"
  ],
  "PORT MATILDA": [
    "16870",
    "PA"
  ],
  "REBERSBURG": [
    "16872",
    "PA"
  ],
  "SHAWVILLE": [
    "16873",
    "PA"
  ],
  "SNOW SHOE": [
    "16874",
    "PA"
  ],
  "SPRING MILLS": [
    "16875",
    "PA"
  ],
  "WALLACETON": [
    "16876",
    "PA"
  ],
  "WARRIORS MARK": [
    "16877",
    "PA"
  ],
  "WEST DECATUR": [
    "16878",
    "PA"
  ],
  "WINBURNE": [
    "16879",
    "PA"
  ],
  "WOODLAND": [
    "98674",
    "WA"
  ],
  "WOODWARD": [
    "73802",
    "OK"
  ],
  "WELLSBORO": [
    "16901",
    "PA"
  ],
  "ARNOT": [
    "16911",
    "PA"
  ],
  "BLOSSBURG": [
    "16912",
    "PA"
  ],
  "COLUMBIA CROSS ROADS": [
    "16914",
    "PA"
  ],
  "COUDERSPORT": [
    "16915",
    "PA"
  ],
  "COVINGTON": [
    "76636",
    "TX"
  ],
  "ELKLAND": [
    "65644",
    "MO"
  ],
  "GAINES": [
    "48436",
    "MI"
  ],
  "GALETON": [
    "80622",
    "CO"
  ],
  "GENESEE": [
    "83832",
    "ID"
  ],
  "GILLETT": [
    "78116",
    "TX"
  ],
  "GRANVILLE SUMMIT": [
    "16926",
    "PA"
  ],
  "HARRISON VALLEY": [
    "16927",
    "PA"
  ],
  "KNOXVILLE": [
    "72845",
    "AR"
  ],
  "MAINESBURG": [
    "16932",
    "PA"
  ],
  "MIDDLEBURY CENTER": [
    "16935",
    "PA"
  ],
  "MILLS": [
    "82644",
    "WY"
  ],
  "MORRIS RUN": [
    "16939",
    "PA"
  ],
  "OSCEOLA": [
    "72370",
    "AR"
  ],
  "SABINSVILLE": [
    "16943",
    "PA"
  ],
  "SYLVANIA": [
    "43560",
    "OH"
  ],
  "TIOGA": [
    "76271",
    "TX"
  ],
  "ULYSSES": [
    "68669",
    "NE"
  ],
  "CAMP HILL": [
    "36850",
    "AL"
  ],
  "ALLENSVILLE": [
    "42204",
    "KY"
  ],
  "ANNVILLE": [
    "40402",
    "KY"
  ],
  "BERRYSBURG": [
    "17005",
    "PA"
  ],
  "BLAIN": [
    "17006",
    "PA"
  ],
  "BOILING SPRINGS": [
    "29316",
    "SC"
  ],
  "CAMPBELLTOWN": [
    "17010",
    "PA"
  ],
  "COCOLAMUS": [
    "17014",
    "PA"
  ],
  "DALMATIA": [
    "17017",
    "PA"
  ],
  "DAUPHIN": [
    "17018",
    "PA"
  ],
  "DILLSBURG": [
    "17019",
    "PA"
  ],
  "DUNCANNON": [
    "17020",
    "PA"
  ],
  "EAST WATERFORD": [
    "17021",
    "PA"
  ],
  "ELIZABETHVILLE": [
    "17023",
    "PA"
  ],
  "ELLIOTTSBURG": [
    "17024",
    "PA"
  ],
  "ENOLA": [
    "72047",
    "AR"
  ],
  "FREDERICKSBURG": [
    "78624",
    "TX"
  ],
  "GRANTVILLE": [
    "66429",
    "KS"
  ],
  "GRATZ": [
    "17030",
    "PA"
  ],
  "HERSHEY": [
    "69143",
    "NE"
  ],
  "HIGHSPIRE": [
    "17034",
    "PA"
  ],
  "HONEY GROVE": [
    "75446",
    "TX"
  ],
  "HUMMELSTOWN": [
    "17036",
    "PA"
  ],
  "ICKESBURG": [
    "17037",
    "PA"
  ],
  "JONESTOWN": [
    "38639",
    "MS"
  ],
  "KLEINFELTERSVILLE": [
    "17039",
    "PA"
  ],
  "LANDISBURG": [
    "17040",
    "PA"
  ],
  "LAWN": [
    "79530",
    "TX"
  ],
  "LEMOYNE": [
    "69146",
    "NE"
  ],
  "LEWISTOWN": [
    "63452",
    "MO"
  ],
  "LOYSVILLE": [
    "17047",
    "PA"
  ],
  "LYKENS": [
    "17048",
    "PA"
  ],
  "MC ALISTERVILLE": [
    "17049",
    "PA"
  ],
  "MECHANICSBURG": [
    "62545",
    "IL"
  ],
  "MC VEYTOWN": [
    "17051",
    "PA"
  ],
  "MAPLETON DEPOT": [
    "17052",
    "PA"
  ],
  "MARYSVILLE": [
    "98271",
    "WA"
  ],
  "MATTAWANA": [
    "17054",
    "PA"
  ],
  "MIFFLIN": [
    "17058",
    "PA"
  ],
  "MIFFLINTOWN": [
    "17059",
    "PA"
  ],
  "MILL CREEK": [
    "98082",
    "WA"
  ],
  "MILLERSBURG": [
    "52308",
    "IA"
  ],
  "MILLERSTOWN": [
    "17062",
    "PA"
  ],
  "MILROY": [
    "56263",
    "MN"
  ],
  "MOUNT GRETNA": [
    "17064",
    "PA"
  ],
  "MOUNT HOLLY SPRINGS": [
    "17065",
    "PA"
  ],
  "MOUNT UNION": [
    "52644",
    "IA"
  ],
  "MYERSTOWN": [
    "17067",
    "PA"
  ],
  "NEW BLOOMFIELD": [
    "65063",
    "MO"
  ],
  "NEW BUFFALO": [
    "49117",
    "MI"
  ],
  "NEW CUMBERLAND": [
    "26047",
    "WV"
  ],
  "NEW KINGSTOWN": [
    "17072",
    "PA"
  ],
  "NEWMANSTOWN": [
    "17073",
    "PA"
  ],
  "NEWTON HAMILTON": [
    "17075",
    "PA"
  ],
  "OAKLAND MILLS": [
    "17076",
    "PA"
  ],
  "ONO": [
    "17077",
    "PA"
  ],
  "PILLOW": [
    "17080",
    "PA"
  ],
  "PORT ROYAL": [
    "40058",
    "KY"
  ],
  "QUENTIN": [
    "17083",
    "PA"
  ],
  "REEDSVILLE": [
    "54230",
    "WI"
  ],
  "REXMONT": [
    "17085",
    "PA"
  ],
  "RICHFIELD": [
    "84701",
    "UT"
  ],
  "SCHAEFFERSTOWN": [
    "17088",
    "PA"
  ],
  "SHERMANS DALE": [
    "17090",
    "PA"
  ],
  "SUMMERDALE": [
    "36580",
    "AL"
  ],
  "THOMPSONTOWN": [
    "17094",
    "PA"
  ],
  "WICONISCO": [
    "17097",
    "PA"
  ],
  "YEAGERTOWN": [
    "17099",
    "PA"
  ],
  "HARRISBURG": [
    "97446",
    "OR"
  ],
  "CHAMBERSBURG": [
    "62323",
    "IL"
  ],
  "ARTEMAS": [
    "17211",
    "PA"
  ],
  "BIG COVE TANNERY": [
    "17212",
    "PA"
  ],
  "BLAIRS MILLS": [
    "17213",
    "PA"
  ],
  "BLUE RIDGE SUMMIT": [
    "17214",
    "PA"
  ],
  "BURNT CABINS": [
    "17215",
    "PA"
  ],
  "DOYLESBURG": [
    "17219",
    "PA"
  ],
  "DRY RUN": [
    "17220",
    "PA"
  ],
  "FANNETTSBURG": [
    "17221",
    "PA"
  ],
  "FORT LITTLETON": [
    "17223",
    "PA"
  ],
  "FORT LOUDON": [
    "17224",
    "PA"
  ],
  "GREENCASTLE": [
    "46135",
    "IN"
  ],
  "HUSTONTOWN": [
    "17229",
    "PA"
  ],
  "LEMASTERS": [
    "17231",
    "PA"
  ],
  "LURGAN": [
    "17232",
    "PA"
  ],
  "MC CONNELLSBURG": [
    "17233",
    "PA"
  ],
  "MERCERSBURG": [
    "17236",
    "PA"
  ],
  "MONT ALTO": [
    "17237",
    "PA"
  ],
  "NEEDMORE": [
    "17238",
    "PA"
  ],
  "NEELYTON": [
    "17239",
    "PA"
  ],
  "NEWBURG": [
    "65550",
    "MO"
  ],
  "NEWVILLE": [
    "36353",
    "AL"
  ],
  "ORBISONIA": [
    "17243",
    "PA"
  ],
  "ORRSTOWN": [
    "17244",
    "PA"
  ],
  "PLEASANT HALL": [
    "17246",
    "PA"
  ],
  "ROCKHILL FURNACE": [
    "17249",
    "PA"
  ],
  "ROUZERVILLE": [
    "17250",
    "PA"
  ],
  "SAINT THOMAS": [
    "65076",
    "MO"
  ],
  "SALTILLO": [
    "75478",
    "TX"
  ],
  "SHADE GAP": [
    "17255",
    "PA"
  ],
  "SHADY GROVE": [
    "32357",
    "FL"
  ],
  "SHIPPENSBURG": [
    "17257",
    "PA"
  ],
  "SHIRLEYSBURG": [
    "17260",
    "PA"
  ],
  "SOUTH MOUNTAIN": [
    "17261",
    "PA"
  ],
  "SPRING RUN": [
    "17262",
    "PA"
  ],
  "STATE LINE": [
    "47982",
    "IN"
  ],
  "THREE SPRINGS": [
    "17264",
    "PA"
  ],
  "UPPERSTRASBURG": [
    "17265",
    "PA"
  ],
  "WALNUT BOTTOM": [
    "17266",
    "PA"
  ],
  "WARFORDSBURG": [
    "17267",
    "PA"
  ],
  "WAYNESBORO": [
    "39367",
    "MS"
  ],
  "WILLOW HILL": [
    "62480",
    "IL"
  ],
  "ZULLINGER": [
    "17272",
    "PA"
  ],
  "ABBOTTSTOWN": [
    "17301",
    "PA"
  ],
  "AIRVILLE": [
    "17302",
    "PA"
  ],
  "ARENDTSVILLE": [
    "17303",
    "PA"
  ],
  "ASPERS": [
    "17304",
    "PA"
  ],
  "BENDERSVILLE": [
    "17306",
    "PA"
  ],
  "BIGLERVILLE": [
    "17307",
    "PA"
  ],
  "BROGUE": [
    "17309",
    "PA"
  ],
  "CASHTOWN": [
    "17310",
    "PA"
  ],
  "CODORUS": [
    "17311",
    "PA"
  ],
  "CRALEY": [
    "17312",
    "PA"
  ],
  "DALLASTOWN": [
    "17313",
    "PA"
  ],
  "DELTA": [
    "84624",
    "UT"
  ],
  "EAST PROSPECT": [
    "17317",
    "PA"
  ],
  "EMIGSVILLE": [
    "17318",
    "PA"
  ],
  "ETTERS": [
    "17319",
    "PA"
  ],
  "FAWN GROVE": [
    "17321",
    "PA"
  ],
  "FELTON": [
    "95018",
    "CA"
  ],
  "FRANKLINTOWN": [
    "17323",
    "PA"
  ],
  "GARDNERS": [
    "17324",
    "PA"
  ],
  "GETTYSBURG": [
    "57442",
    "SD"
  ],
  "GLENVILLE": [
    "56036",
    "MN"
  ],
  "LEWISBERRY": [
    "17339",
    "PA"
  ],
  "LITTLESTOWN": [
    "17340",
    "PA"
  ],
  "LOGANVILLE": [
    "53943",
    "WI"
  ],
  "MC KNIGHTSTOWN": [
    "17343",
    "PA"
  ],
  "MC SHERRYSTOWN": [
    "17344",
    "PA"
  ],
  "MOUNT WOLF": [
    "17347",
    "PA"
  ],
  "NEW FREEDOM": [
    "17349",
    "PA"
  ],
  "NEW OXFORD": [
    "17350",
    "PA"
  ],
  "NEW PARK": [
    "17352",
    "PA"
  ],
  "ORRTANNA": [
    "17353",
    "PA"
  ],
  "RAILROAD": [
    "17355",
    "PA"
  ],
  "RED LION": [
    "17356",
    "PA"
  ],
  "ROSSVILLE": [
    "66533",
    "KS"
  ],
  "SEVEN VALLEYS": [
    "17360",
    "PA"
  ],
  "SPRING GROVE": [
    "60081",
    "IL"
  ],
  "STEWARTSTOWN": [
    "17363",
    "PA"
  ],
  "THOMASVILLE": [
    "36784",
    "AL"
  ],
  "WRIGHTSVILLE": [
    "72183",
    "AR"
  ],
  "YORK HAVEN": [
    "17370",
    "PA"
  ],
  "YORK NEW SALEM": [
    "17371",
    "PA"
  ],
  "YORK SPRINGS": [
    "17372",
    "PA"
  ],
  "PEACH GLEN": [
    "17375",
    "PA"
  ],
  "BART": [
    "17503",
    "PA"
  ],
  "BIRD IN HAND": [
    "17505",
    "PA"
  ],
  "BLUE BALL": [
    "17506",
    "PA"
  ],
  "BROWNSTOWN": [
    "62418",
    "IL"
  ],
  "CHRISTIANA": [
    "37037",
    "TN"
  ],
  "CONESTOGA": [
    "17516",
    "PA"
  ],
  "DRUMORE": [
    "17518",
    "PA"
  ],
  "EAST EARL": [
    "17519",
    "PA"
  ],
  "EAST PETERSBURG": [
    "17520",
    "PA"
  ],
  "ELM": [
    "17521",
    "PA"
  ],
  "EPHRATA": [
    "98823",
    "WA"
  ],
  "GAP": [
    "17527",
    "PA"
  ],
  "GOODVILLE": [
    "17528",
    "PA"
  ],
  "GORDONVILLE": [
    "76245",
    "TX"
  ],
  "HOLTWOOD": [
    "17532",
    "PA"
  ],
  "HOPELAND": [
    "17533",
    "PA"
  ],
  "INTERCOURSE": [
    "17534",
    "PA"
  ],
  "KINZERS": [
    "17535",
    "PA"
  ],
  "LAMPETER": [
    "17537",
    "PA"
  ],
  "LEOLA": [
    "72084",
    "AR"
  ],
  "LITITZ": [
    "17543",
    "PA"
  ],
  "MANHEIM": [
    "17545",
    "PA"
  ],
  "MARTINDALE": [
    "78655",
    "TX"
  ],
  "MAYTOWN": [
    "17550",
    "PA"
  ],
  "MILLERSVILLE": [
    "63766",
    "MO"
  ],
  "MOUNT JOY": [
    "17552",
    "PA"
  ],
  "MOUNTVILLE": [
    "29370",
    "SC"
  ],
  "NARVON": [
    "17555",
    "PA"
  ],
  "NEW HOLLAND": [
    "62671",
    "IL"
  ],
  "PARADISE": [
    "95969",
    "CA"
  ],
  "PEACH BOTTOM": [
    "17563",
    "PA"
  ],
  "PENRYN": [
    "95663",
    "CA"
  ],
  "PEQUEA": [
    "17565",
    "PA"
  ],
  "QUARRYVILLE": [
    "17566",
    "PA"
  ],
  "REAMSTOWN": [
    "17567",
    "PA"
  ],
  "REFTON": [
    "17568",
    "PA"
  ],
  "REINHOLDS": [
    "17569",
    "PA"
  ],
  "RHEEMS": [
    "17570",
    "PA"
  ],
  "RONKS": [
    "17572",
    "PA"
  ],
  "SILVER SPRING": [
    "20993",
    "MD"
  ],
  "SMOKETOWN": [
    "17576",
    "PA"
  ],
  "STEVENS": [
    "17578",
    "PA"
  ],
  "STRASBURG": [
    "80136",
    "CO"
  ],
  "TALMAGE": [
    "95481",
    "CA"
  ],
  "TERRE HILL": [
    "17581",
    "PA"
  ],
  "WASHINGTON BORO": [
    "17582",
    "PA"
  ],
  "WEST WILLOW": [
    "17583",
    "PA"
  ],
  "WILLOW STREET": [
    "17584",
    "PA"
  ],
  "WITMER": [
    "17585",
    "PA"
  ],
  "WILLIAMSPORT": [
    "47993",
    "IN"
  ],
  "ANTES FORT": [
    "17720",
    "PA"
  ],
  "AVIS": [
    "17721",
    "PA"
  ],
  "CASTANEA": [
    "17726",
    "PA"
  ],
  "CEDAR RUN": [
    "17727",
    "PA"
  ],
  "COGAN STATION": [
    "17728",
    "PA"
  ],
  "CROSS FORK": [
    "17729",
    "PA"
  ],
  "DEWART": [
    "17730",
    "PA"
  ],
  "EAGLES MERE": [
    "17731",
    "PA"
  ],
  "HUGHESVILLE": [
    "65334",
    "MO"
  ],
  "JERSEY SHORE": [
    "17740",
    "PA"
  ],
  "LAIRDSVILLE": [
    "17742",
    "PA"
  ],
  "LOCK HAVEN": [
    "17745",
    "PA"
  ],
  "LOGANTON": [
    "17747",
    "PA"
  ],
  "MC ELHATTAN": [
    "17748",
    "PA"
  ],
  "MC EWENSVILLE": [
    "17749",
    "PA"
  ],
  "MACKEYVILLE": [
    "17750",
    "PA"
  ],
  "MILL HALL": [
    "17751",
    "PA"
  ],
  "MONTOURSVILLE": [
    "17754",
    "PA"
  ],
  "MUNCY": [
    "17756",
    "PA"
  ],
  "MUNCY VALLEY": [
    "17758",
    "PA"
  ],
  "NORTH BEND": [
    "98045",
    "WA"
  ],
  "PICTURE ROCKS": [
    "17762",
    "PA"
  ],
  "RALSTON": [
    "82440",
    "WY"
  ],
  "RENOVO": [
    "17764",
    "PA"
  ],
  "ROARING BRANCH": [
    "17765",
    "PA"
  ],
  "SHUNK": [
    "17768",
    "PA"
  ],
  "SLATE RUN": [
    "17769",
    "PA"
  ],
  "TROUT RUN": [
    "17771",
    "PA"
  ],
  "TURBOTVILLE": [
    "17772",
    "PA"
  ],
  "UNITYVILLE": [
    "17774",
    "PA"
  ],
  "WATSONTOWN": [
    "17777",
    "PA"
  ],
  "WOOLRICH": [
    "17779",
    "PA"
  ],
  "SUNBURY": [
    "43074",
    "OH"
  ],
  "BEAVER SPRINGS": [
    "17812",
    "PA"
  ],
  "BEAVERTOWN": [
    "17813",
    "PA"
  ],
  "BENTON": [
    "93512",
    "CA"
  ],
  "BLOOMSBURG": [
    "17815",
    "PA"
  ],
  "CATAWISSA": [
    "63015",
    "MO"
  ],
  "DORNSIFE": [
    "17823",
    "PA"
  ],
  "ELYSBURG": [
    "17824",
    "PA"
  ],
  "FREEBURG": [
    "65035",
    "MO"
  ],
  "HARTLETON": [
    "17829",
    "PA"
  ],
  "HERNDON": [
    "67739",
    "KS"
  ],
  "HUMMELS WHARF": [
    "17831",
    "PA"
  ],
  "MARION HEIGHTS": [
    "17832",
    "PA"
  ],
  "KREAMER": [
    "17833",
    "PA"
  ],
  "KULPMONT": [
    "17834",
    "PA"
  ],
  "LAURELTON": [
    "17835",
    "PA"
  ],
  "LECK KILL": [
    "17836",
    "PA"
  ],
  "LEWISBURG": [
    "45338",
    "OH"
  ],
  "LIGHTSTREET": [
    "17839",
    "PA"
  ],
  "LOCUST GAP": [
    "17840",
    "PA"
  ],
  "MC CLURE": [
    "62957",
    "IL"
  ],
  "MIDDLEBURG": [
    "43336",
    "OH"
  ],
  "MIFFLINBURG": [
    "17844",
    "PA"
  ],
  "MILLMONT": [
    "17845",
    "PA"
  ],
  "MONTANDON": [
    "17850",
    "PA"
  ],
  "MOUNT CARMEL": [
    "84755",
    "UT"
  ],
  "MOUNT PLEASANT MILLS": [
    "17853",
    "PA"
  ],
  "NEW COLUMBIA": [
    "17856",
    "PA"
  ],
  "NORTHUMBERLAND": [
    "17857",
    "PA"
  ],
  "NUMIDIA": [
    "17858",
    "PA"
  ],
  "ORANGEVILLE": [
    "84537",
    "UT"
  ],
  "PAXINOS": [
    "17860",
    "PA"
  ],
  "PAXTONVILLE": [
    "17861",
    "PA"
  ],
  "PENNS CREEK": [
    "17862",
    "PA"
  ],
  "PORT TREVORTON": [
    "17864",
    "PA"
  ],
  "POTTS GROVE": [
    "17865",
    "PA"
  ],
  "COAL TOWNSHIP": [
    "17866",
    "PA"
  ],
  "REBUCK": [
    "17867",
    "PA"
  ],
  "SELINSGROVE": [
    "17870",
    "PA"
  ],
  "SHAMOKIN": [
    "17872",
    "PA"
  ],
  "SHAMOKIN DAM": [
    "17876",
    "PA"
  ],
  "SNYDERTOWN": [
    "17877",
    "PA"
  ],
  "SWENGEL": [
    "17880",
    "PA"
  ],
  "TREVORTON": [
    "17881",
    "PA"
  ],
  "VICKSBURG": [
    "49097",
    "MI"
  ],
  "WEIKERT": [
    "17885",
    "PA"
  ],
  "WEST MILTON": [
    "45383",
    "OH"
  ],
  "WHITE DEER": [
    "79097",
    "TX"
  ],
  "WILBURTON": [
    "74578",
    "OK"
  ],
  "WINFIELD": [
    "75493",
    "TX"
  ],
  "POTTSVILLE": [
    "72858",
    "AR"
  ],
  "ARISTES": [
    "17920",
    "PA"
  ],
  "BRANCHDALE": [
    "17923",
    "PA"
  ],
  "CRESSONA": [
    "17929",
    "PA"
  ],
  "CUMBOLA": [
    "17930",
    "PA"
  ],
  "FRACKVILLE": [
    "17931",
    "PA"
  ],
  "FRIEDENSBURG": [
    "17933",
    "PA"
  ],
  "GILBERTON": [
    "17934",
    "PA"
  ],
  "GIRARDVILLE": [
    "17935",
    "PA"
  ],
  "GORDON": [
    "76453",
    "TX"
  ],
  "HEGINS": [
    "17938",
    "PA"
  ],
  "KLINGERSTOWN": [
    "17941",
    "PA"
  ],
  "LAVELLE": [
    "17943",
    "PA"
  ],
  "LLEWELLYN": [
    "17944",
    "PA"
  ],
  "LOCUSTDALE": [
    "17945",
    "PA"
  ],
  "MAHANOY CITY": [
    "17948",
    "PA"
  ],
  "MAHANOY PLANE": [
    "17949",
    "PA"
  ],
  "MAR LIN": [
    "17951",
    "PA"
  ],
  "MARY D": [
    "17952",
    "PA"
  ],
  "MINERSVILLE": [
    "84752",
    "UT"
  ],
  "MUIR": [
    "48860",
    "MI"
  ],
  "NEW PHILADELPHIA": [
    "44663",
    "OH"
  ],
  "NEW RINGGOLD": [
    "17960",
    "PA"
  ],
  "ORWIGSBURG": [
    "17961",
    "PA"
  ],
  "PINE GROVE": [
    "95665",
    "CA"
  ],
  "PORT CARBON": [
    "17965",
    "PA"
  ],
  "RINGTOWN": [
    "17967",
    "PA"
  ],
  "SACRAMENTO": [
    "95867",
    "CA"
  ],
  "SAINT CLAIR": [
    "63077",
    "MO"
  ],
  "SCHUYLKILL HAVEN": [
    "17972",
    "PA"
  ],
  "SELTZER": [
    "17974",
    "PA"
  ],
  "SHENANDOAH": [
    "51603",
    "IA"
  ],
  "SUMMIT STATION": [
    "43073",
    "OH"
  ],
  "TOWER CITY": [
    "58071",
    "ND"
  ],
  "TREMONT": [
    "61568",
    "IL"
  ],
  "TUSCARORA": [
    "21790",
    "MD"
  ],
  "VALLEY VIEW": [
    "76272",
    "TX"
  ],
  "ZION GROVE": [
    "17985",
    "PA"
  ],
  "LEHIGH VALLEY": [
    "18003",
    "PA"
  ],
  "ACKERMANVILLE": [
    "18010",
    "PA"
  ],
  "ALBURTIS": [
    "18011",
    "PA"
  ],
  "BOWMANSTOWN": [
    "18030",
    "PA"
  ],
  "BREINIGSVILLE": [
    "18031",
    "PA"
  ],
  "CATASAUQUA": [
    "18032",
    "PA"
  ],
  "CENTER VALLEY": [
    "18034",
    "PA"
  ],
  "CHERRYVILLE": [
    "65446",
    "MO"
  ],
  "COOPERSBURG": [
    "18036",
    "PA"
  ],
  "COPLAY": [
    "18037",
    "PA"
  ],
  "DANIELSVILLE": [
    "30633",
    "GA"
  ],
  "EAST GREENVILLE": [
    "18041",
    "PA"
  ],
  "EAST TEXAS": [
    "18046",
    "PA"
  ],
  "EMMAUS": [
    "18098",
    "PA"
  ],
  "FLICKSVILLE": [
    "18050",
    "PA"
  ],
  "FOGELSVILLE": [
    "18051",
    "PA"
  ],
  "GERMANSVILLE": [
    "18053",
    "PA"
  ],
  "GREEN LANE": [
    "18054",
    "PA"
  ],
  "HELLERTOWN": [
    "18055",
    "PA"
  ],
  "HEREFORD": [
    "97837",
    "OR"
  ],
  "KUNKLETOWN": [
    "18058",
    "PA"
  ],
  "LAURYS STATION": [
    "18059",
    "PA"
  ],
  "LIMEPORT": [
    "18060",
    "PA"
  ],
  "MACUNGIE": [
    "18062",
    "PA"
  ],
  "MARTINS CREEK": [
    "18063",
    "PA"
  ],
  "NAZARETH": [
    "79063",
    "TX"
  ],
  "NEFFS": [
    "43940",
    "OH"
  ],
  "NEW TRIPOLI": [
    "18066",
    "PA"
  ],
  "OLD ZIONSVILLE": [
    "18068",
    "PA"
  ],
  "OREFIELD": [
    "18069",
    "PA"
  ],
  "PALM": [
    "18070",
    "PA"
  ],
  "PALMERTON": [
    "18071",
    "PA"
  ],
  "PEN ARGYL": [
    "18072",
    "PA"
  ],
  "PENNSBURG": [
    "18073",
    "PA"
  ],
  "PERKIOMENVILLE": [
    "18074",
    "PA"
  ],
  "RED HILL": [
    "18076",
    "PA"
  ],
  "RIEGELSVILLE": [
    "18077",
    "PA"
  ],
  "SCHNECKSVILLE": [
    "18078",
    "PA"
  ],
  "SLATEDALE": [
    "18079",
    "PA"
  ],
  "SLATINGTON": [
    "18080",
    "PA"
  ],
  "SPRINGTOWN": [
    "76082",
    "TX"
  ],
  "STOCKERTOWN": [
    "18083",
    "PA"
  ],
  "SUMNEYTOWN": [
    "18084",
    "PA"
  ],
  "TATAMY": [
    "18085",
    "PA"
  ],
  "TREICHLERS": [
    "18086",
    "PA"
  ],
  "TREXLERTOWN": [
    "18087",
    "PA"
  ],
  "WALNUTPORT": [
    "18088",
    "PA"
  ],
  "WIND GAP": [
    "18091",
    "PA"
  ],
  "ZIONSVILLE": [
    "46077",
    "IN"
  ],
  "HAZLETON": [
    "50641",
    "IA"
  ],
  "ALBRIGHTSVILLE": [
    "18210",
    "PA"
  ],
  "ANDREAS": [
    "18211",
    "PA"
  ],
  "BARNESVILLE": [
    "56514",
    "MN"
  ],
  "BEAVER MEADOWS": [
    "18216",
    "PA"
  ],
  "COALDALE": [
    "81222",
    "CO"
  ],
  "CONYNGHAM": [
    "18219",
    "PA"
  ],
  "DELANO": [
    "93216",
    "CA"
  ],
  "DRIFTON": [
    "18221",
    "PA"
  ],
  "DRUMS": [
    "18222",
    "PA"
  ],
  "EBERVALE": [
    "18223",
    "PA"
  ],
  "FREELAND": [
    "98249",
    "WA"
  ],
  "HARLEIGH": [
    "18225",
    "PA"
  ],
  "JIM THORPE": [
    "18229",
    "PA"
  ],
  "KELAYRES": [
    "18231",
    "PA"
  ],
  "LANSFORD": [
    "58750",
    "ND"
  ],
  "LATTIMER MINES": [
    "18234",
    "PA"
  ],
  "LEHIGHTON": [
    "18235",
    "PA"
  ],
  "MCADOO": [
    "79243",
    "TX"
  ],
  "MILNESVILLE": [
    "18239",
    "PA"
  ],
  "NESQUEHONING": [
    "18240",
    "PA"
  ],
  "NUREMBERG": [
    "18241",
    "PA"
  ],
  "PARRYVILLE": [
    "18244",
    "PA"
  ],
  "QUAKAKE": [
    "18245",
    "PA"
  ],
  "ROCK GLEN": [
    "18246",
    "PA"
  ],
  "SAINT JOHNS": [
    "85936",
    "AZ"
  ],
  "SHEPPTON": [
    "18248",
    "PA"
  ],
  "SUGARLOAF": [
    "92386",
    "CA"
  ],
  "SUMMIT HILL": [
    "18250",
    "PA"
  ],
  "SYBERTSVILLE": [
    "18251",
    "PA"
  ],
  "TAMAQUA": [
    "18252",
    "PA"
  ],
  "TRESCKOW": [
    "18254",
    "PA"
  ],
  "WEATHERLY": [
    "18255",
    "PA"
  ],
  "EAST STROUDSBURG": [
    "18302",
    "PA"
  ],
  "ANALOMINK": [
    "18320",
    "PA"
  ],
  "BARTONSVILLE": [
    "18321",
    "PA"
  ],
  "BRODHEADSVILLE": [
    "18322",
    "PA"
  ],
  "BUCK HILL FALLS": [
    "18323",
    "PA"
  ],
  "BUSHKILL": [
    "18324",
    "PA"
  ],
  "CANADENSIS": [
    "18325",
    "PA"
  ],
  "CRESCO": [
    "52136",
    "IA"
  ],
  "DELAWARE WATER GAP": [
    "18327",
    "PA"
  ],
  "DINGMANS FERRY": [
    "18328",
    "PA"
  ],
  "EFFORT": [
    "18330",
    "PA"
  ],
  "GILBERT": [
    "85299",
    "AZ"
  ],
  "HENRYVILLE": [
    "47126",
    "IN"
  ],
  "KRESGEVILLE": [
    "18333",
    "PA"
  ],
  "LONG POND": [
    "18334",
    "PA"
  ],
  "MARSHALLS CREEK": [
    "18335",
    "PA"
  ],
  "MATAMORAS": [
    "18336",
    "PA"
  ],
  "MILLRIFT": [
    "18340",
    "PA"
  ],
  "MINISINK HILLS": [
    "18341",
    "PA"
  ],
  "MOUNTAINHOME": [
    "18342",
    "PA"
  ],
  "MOUNT BETHEL": [
    "18343",
    "PA"
  ],
  "MOUNT POCONO": [
    "18344",
    "PA"
  ],
  "POCONO SUMMIT": [
    "18346",
    "PA"
  ],
  "POCONO LAKE": [
    "18347",
    "PA"
  ],
  "POCONO LAKE PRESERVE": [
    "18348",
    "PA"
  ],
  "POCONO MANOR": [
    "18349",
    "PA"
  ],
  "POCONO PINES": [
    "18350",
    "PA"
  ],
  "REEDERS": [
    "18352",
    "PA"
  ],
  "SAYLORSBURG": [
    "18353",
    "PA"
  ],
  "SCIOTA": [
    "61475",
    "IL"
  ],
  "SCOTRUN": [
    "18355",
    "PA"
  ],
  "SHAWNEE ON DELAWARE": [
    "18356",
    "PA"
  ],
  "SKYTOP": [
    "18357",
    "PA"
  ],
  "STROUDSBURG": [
    "18360",
    "PA"
  ],
  "SWIFTWATER": [
    "18370",
    "PA"
  ],
  "TAMIMENT": [
    "18371",
    "PA"
  ],
  "ARCHBALD": [
    "18403",
    "PA"
  ],
  "BEACH LAKE": [
    "18405",
    "PA"
  ],
  "CARBONDALE": [
    "81623",
    "CO"
  ],
  "CHINCHILLA": [
    "18410",
    "PA"
  ],
  "CLARKS SUMMIT": [
    "18411",
    "PA"
  ],
  "CLIFFORD": [
    "58016",
    "ND"
  ],
  "DAMASCUS": [
    "97089",
    "OR"
  ],
  "EQUINUNK": [
    "18417",
    "PA"
  ],
  "FACTORYVILLE": [
    "18419",
    "PA"
  ],
  "FLEETVILLE": [
    "18420",
    "PA"
  ],
  "FOREST CITY": [
    "64451",
    "MO"
  ],
  "GREELEY": [
    "80639",
    "CO"
  ],
  "GREENTOWN": [
    "46936",
    "IN"
  ],
  "HAWLEY": [
    "79525",
    "TX"
  ],
  "HONESDALE": [
    "18431",
    "PA"
  ],
  "JERMYN": [
    "76459",
    "TX"
  ],
  "JESSUP": [
    "20794",
    "MD"
  ],
  "LACKAWAXEN": [
    "18435",
    "PA"
  ],
  "LAKE ARIEL": [
    "18436",
    "PA"
  ],
  "LAKE COMO": [
    "32157",
    "FL"
  ],
  "LA PLUME": [
    "18440",
    "PA"
  ],
  "LENOXVILLE": [
    "18441",
    "PA"
  ],
  "MILANVILLE": [
    "18443",
    "PA"
  ],
  "NICHOLSON": [
    "39463",
    "MS"
  ],
  "OLYPHANT": [
    "18448",
    "PA"
  ],
  "ORSON": [
    "18449",
    "PA"
  ],
  "PAUPACK": [
    "18451",
    "PA"
  ],
  "PECKVILLE": [
    "18452",
    "PA"
  ],
  "PLEASANT MOUNT": [
    "18453",
    "PA"
  ],
  "POYNTELLE": [
    "18454",
    "PA"
  ],
  "PRESTON PARK": [
    "18455",
    "PA"
  ],
  "PROMPTON": [
    "18456",
    "PA"
  ],
  "ROWLAND": [
    "28383",
    "NC"
  ],
  "SHOHOLA": [
    "18458",
    "PA"
  ],
  "SOUTH CANAAN": [
    "18459",
    "PA"
  ],
  "SOUTH STERLING": [
    "18460",
    "PA"
  ],
  "STARLIGHT": [
    "18461",
    "PA"
  ],
  "STARRUCCA": [
    "18462",
    "PA"
  ],
  "TAFTON": [
    "18464",
    "PA"
  ],
  "TOBYHANNA": [
    "18466",
    "PA"
  ],
  "TYLER HILL": [
    "18469",
    "PA"
  ],
  "UNION DALE": [
    "18470",
    "PA"
  ],
  "WAYMART": [
    "18472",
    "PA"
  ],
  "WHITE MILLS": [
    "42788",
    "KY"
  ],
  "SCRANTON": [
    "72863",
    "AR"
  ],
  "MOOSIC": [
    "18507",
    "PA"
  ],
  "TAYLOR": [
    "85939",
    "AZ"
  ],
  "BEAR CREEK": [
    "54922",
    "WI"
  ],
  "BLAKESLEE": [
    "43505",
    "OH"
  ],
  "CAMBRA": [
    "18611",
    "PA"
  ],
  "DALLAS": [
    "97338",
    "OR"
  ],
  "DUSHORE": [
    "18614",
    "PA"
  ],
  "FALLS": [
    "18615",
    "PA"
  ],
  "FORKSVILLE": [
    "18616",
    "PA"
  ],
  "GLEN LYON": [
    "18617",
    "PA"
  ],
  "HARVEYS LAKE": [
    "18618",
    "PA"
  ],
  "HILLSGROVE": [
    "18619",
    "PA"
  ],
  "HUNLOCK CREEK": [
    "18621",
    "PA"
  ],
  "HUNTINGTON MILLS": [
    "18622",
    "PA"
  ],
  "LACEYVILLE": [
    "18623",
    "PA"
  ],
  "LAKE HARMONY": [
    "18624",
    "PA"
  ],
  "LAKE WINOLA": [
    "18625",
    "PA"
  ],
  "LAPORTE": [
    "80535",
    "CO"
  ],
  "LEHMAN": [
    "18627",
    "PA"
  ],
  "LOPEZ": [
    "18628",
    "PA"
  ],
  "MEHOOPANY": [
    "18629",
    "PA"
  ],
  "MESHOPPEN": [
    "18630",
    "PA"
  ],
  "MIFFLINVILLE": [
    "18631",
    "PA"
  ],
  "MILDRED": [
    "59341",
    "MT"
  ],
  "NANTICOKE": [
    "21840",
    "MD"
  ],
  "NESCOPECK": [
    "18635",
    "PA"
  ],
  "NOXEN": [
    "18636",
    "PA"
  ],
  "PITTSTON": [
    "18643",
    "PA"
  ],
  "DURYEA": [
    "18642",
    "PA"
  ],
  "SHAWANESE": [
    "18654",
    "PA"
  ],
  "SHICKSHINNY": [
    "18655",
    "PA"
  ],
  "SWEET VALLEY": [
    "18656",
    "PA"
  ],
  "TUNKHANNOCK": [
    "18657",
    "PA"
  ],
  "WAPWALLOPEN": [
    "18660",
    "PA"
  ],
  "WHITE HAVEN": [
    "18661",
    "PA"
  ],
  "WILKES BARRE": [
    "18773",
    "PA"
  ],
  "MOUNTAIN TOP": [
    "18707",
    "PA"
  ],
  "SHAVERTOWN": [
    "18708",
    "PA"
  ],
  "LUZERNE": [
    "52257",
    "IA"
  ],
  "BRACKNEY": [
    "18812",
    "PA"
  ],
  "CAMPTOWN": [
    "18815",
    "PA"
  ],
  "DIMOCK": [
    "57331",
    "SD"
  ],
  "EAST SMITHFIELD": [
    "18817",
    "PA"
  ],
  "FRIENDSVILLE": [
    "37737",
    "TN"
  ],
  "HALLSTEAD": [
    "18822",
    "PA"
  ],
  "HOP BOTTOM": [
    "18824",
    "PA"
  ],
  "KINGSLEY": [
    "51028",
    "IA"
  ],
  "LAWTON": [
    "73507",
    "OK"
  ],
  "LE RAYSVILLE": [
    "18829",
    "PA"
  ],
  "LITTLE MEADOWS": [
    "18830",
    "PA"
  ],
  "MONROETON": [
    "18832",
    "PA"
  ],
  "NEW ALBANY": [
    "47151",
    "IN"
  ],
  "SAYRE": [
    "73662",
    "OK"
  ],
  "SOUTH GIBSON": [
    "18842",
    "PA"
  ],
  "SOUTH MONTROSE": [
    "18843",
    "PA"
  ],
  "STEVENSVILLE": [
    "59870",
    "MT"
  ],
  "SUGAR RUN": [
    "18846",
    "PA"
  ],
  "SUSQUEHANNA": [
    "18847",
    "PA"
  ],
  "TOWANDA": [
    "67144",
    "KS"
  ],
  "ULSTER": [
    "18850",
    "PA"
  ],
  "WARREN CENTER": [
    "18851",
    "PA"
  ],
  "WYALUSING": [
    "18853",
    "PA"
  ],
  "WYSOX": [
    "18854",
    "PA"
  ],
  "DOYLESTOWN": [
    "53928",
    "WI"
  ],
  "BLOOMING GLEN": [
    "18911",
    "PA"
  ],
  "BUCKINGHAM": [
    "60917",
    "IL"
  ],
  "CARVERSVILLE": [
    "18913",
    "PA"
  ],
  "CHALFONT": [
    "18914",
    "PA"
  ],
  "COLMAR": [
    "18915",
    "PA"
  ],
  "DANBORO": [
    "18916",
    "PA"
  ],
  "EARLINGTON": [
    "42410",
    "KY"
  ],
  "ERWINNA": [
    "18920",
    "PA"
  ],
  "FOREST GROVE": [
    "97116",
    "OR"
  ],
  "FOUNTAINVILLE": [
    "18923",
    "PA"
  ],
  "FURLONG": [
    "18925",
    "PA"
  ],
  "HILLTOWN": [
    "18927",
    "PA"
  ],
  "HOLICONG": [
    "18928",
    "PA"
  ],
  "JAMISON": [
    "18929",
    "PA"
  ],
  "KINTNERSVILLE": [
    "18930",
    "PA"
  ],
  "LAHASKA": [
    "18931",
    "PA"
  ],
  "LINE LEXINGTON": [
    "18932",
    "PA"
  ],
  "LUMBERVILLE": [
    "18933",
    "PA"
  ],
  "MECHANICSVILLE": [
    "52306",
    "IA"
  ],
  "MILFORD SQUARE": [
    "18935",
    "PA"
  ],
  "MONTGOMERYVILLE": [
    "18936",
    "PA"
  ],
  "NEW HOPE": [
    "40052",
    "KY"
  ],
  "OTTSVILLE": [
    "18942",
    "PA"
  ],
  "PENNS PARK": [
    "18943",
    "PA"
  ],
  "PERKASIE": [
    "18944",
    "PA"
  ],
  "PINEVILLE": [
    "72566",
    "AR"
  ],
  "PIPERSVILLE": [
    "18947",
    "PA"
  ],
  "PLUMSTEADVILLE": [
    "18949",
    "PA"
  ],
  "POINT PLEASANT": [
    "25550",
    "WV"
  ],
  "RICHBORO": [
    "18954",
    "PA"
  ],
  "RICHLANDTOWN": [
    "18955",
    "PA"
  ],
  "RUSHLAND": [
    "18956",
    "PA"
  ],
  "SALFORD": [
    "18957",
    "PA"
  ],
  "SALFORDVILLE": [
    "18958",
    "PA"
  ],
  "SELLERSVILLE": [
    "18960",
    "PA"
  ],
  "SILVERDALE": [
    "98383",
    "WA"
  ],
  "SOLEBURY": [
    "18963",
    "PA"
  ],
  "SOUDERTON": [
    "18964",
    "PA"
  ],
  "SPINNERSTOWN": [
    "18968",
    "PA"
  ],
  "TELFORD": [
    "37690",
    "TN"
  ],
  "TRUMBAUERSVILLE": [
    "18970",
    "PA"
  ],
  "TYLERSPORT": [
    "18971",
    "PA"
  ],
  "UPPER BLACK EDDY": [
    "18972",
    "PA"
  ],
  "WARMINSTER": [
    "18991",
    "PA"
  ],
  "WARRINGTON": [
    "18976",
    "PA"
  ],
  "WASHINGTON CROSSING": [
    "18977",
    "PA"
  ],
  "WOXALL": [
    "18979",
    "PA"
  ],
  "WYCOMBE": [
    "18980",
    "PA"
  ],
  "ZIONHILL": [
    "18981",
    "PA"
  ],
  "AMBLER": [
    "99786",
    "AK"
  ],
  "ARDMORE": [
    "73403",
    "OK"
  ],
  "BALA CYNWYD": [
    "19004",
    "PA"
  ],
  "HUNTINGDON VALLEY": [
    "19006",
    "PA"
  ],
  "BROOMALL": [
    "19008",
    "PA"
  ],
  "BRYN ATHYN": [
    "19009",
    "PA"
  ],
  "BRYN MAWR": [
    "92318",
    "CA"
  ],
  "CHELTENHAM": [
    "20623",
    "MD"
  ],
  "ASTON": [
    "19014",
    "PA"
  ],
  "CHESTER HEIGHTS": [
    "19017",
    "PA"
  ],
  "CLIFTON HEIGHTS": [
    "19018",
    "PA"
  ],
  "BENSALEM": [
    "19020",
    "PA"
  ],
  "CROYDON": [
    "84018",
    "UT"
  ],
  "CRUM LYNNE": [
    "19022",
    "PA"
  ],
  "DARBY": [
    "59829",
    "MT"
  ],
  "DRESHER": [
    "19025",
    "PA"
  ],
  "DREXEL HILL": [
    "19026",
    "PA"
  ],
  "ELKINS PARK": [
    "19027",
    "PA"
  ],
  "EDGEMONT": [
    "72044",
    "AR"
  ],
  "ESSINGTON": [
    "19029",
    "PA"
  ],
  "FAIRLESS HILLS": [
    "19030",
    "PA"
  ],
  "FLOURTOWN": [
    "19031",
    "PA"
  ],
  "FOLCROFT": [
    "19032",
    "PA"
  ],
  "FOLSOM": [
    "95763",
    "CA"
  ],
  "FORT WASHINGTON": [
    "20749",
    "MD"
  ],
  "GLADWYNE": [
    "19035",
    "PA"
  ],
  "GLENOLDEN": [
    "19036",
    "PA"
  ],
  "GLEN RIDDLE LIMA": [
    "19037",
    "PA"
  ],
  "GLENSIDE": [
    "19038",
    "PA"
  ],
  "GRADYVILLE": [
    "19039",
    "PA"
  ],
  "HATBORO": [
    "19040",
    "PA"
  ],
  "HAVERFORD": [
    "19041",
    "PA"
  ],
  "HORSHAM": [
    "19044",
    "PA"
  ],
  "JENKINTOWN": [
    "19046",
    "PA"
  ],
  "LANGHORNE": [
    "19047",
    "PA"
  ],
  "LANSDOWNE": [
    "19050",
    "PA"
  ],
  "LENNI": [
    "19052",
    "PA"
  ],
  "FEASTERVILLE TREVOSE": [
    "19053",
    "PA"
  ],
  "GARNET VALLEY": [
    "19060",
    "PA"
  ],
  "MARCUS HOOK": [
    "19061",
    "PA"
  ],
  "MEDIA": [
    "61460",
    "IL"
  ],
  "MERION STATION": [
    "19066",
    "PA"
  ],
  "NARBERTH": [
    "19072",
    "PA"
  ],
  "NEWTOWN SQUARE": [
    "19073",
    "PA"
  ],
  "ORELAND": [
    "19075",
    "PA"
  ],
  "PROSPECT PARK": [
    "19076",
    "PA"
  ],
  "RIDLEY PARK": [
    "19078",
    "PA"
  ],
  "SHARON HILL": [
    "19079",
    "PA"
  ],
  "SWARTHMORE": [
    "19081",
    "PA"
  ],
  "UPPER DARBY": [
    "19082",
    "PA"
  ],
  "HAVERTOWN": [
    "19083",
    "PA"
  ],
  "VILLANOVA": [
    "19085",
    "PA"
  ],
  "WILLOW GROVE": [
    "19090",
    "PA"
  ],
  "WOODLYN": [
    "19094",
    "PA"
  ],
  "WYNCOTE": [
    "19095",
    "PA"
  ],
  "WYNNEWOOD": [
    "73098",
    "OK"
  ],
  "PAOLI": [
    "80746",
    "CO"
  ],
  "ATGLEN": [
    "19310",
    "PA"
  ],
  "AVONDALE": [
    "85392",
    "AZ"
  ],
  "BERWYN": [
    "60402",
    "IL"
  ],
  "BRANDAMORE": [
    "19316",
    "PA"
  ],
  "CHADDS FORD": [
    "19317",
    "PA"
  ],
  "CHEYNEY": [
    "19319",
    "PA"
  ],
  "COATESVILLE": [
    "46121",
    "IN"
  ],
  "COCHRANVILLE": [
    "19330",
    "PA"
  ],
  "CONCORDVILLE": [
    "19339",
    "PA"
  ],
  "DEVON": [
    "19333",
    "PA"
  ],
  "DOWNINGTOWN": [
    "19335",
    "PA"
  ],
  "EXTON": [
    "19341",
    "PA"
  ],
  "GLEN MILLS": [
    "19342",
    "PA"
  ],
  "GLENMOORE": [
    "19343",
    "PA"
  ],
  "HONEY BROOK": [
    "19344",
    "PA"
  ],
  "IMMACULATA": [
    "19345",
    "PA"
  ],
  "KELTON": [
    "19346",
    "PA"
  ],
  "KEMBLESVILLE": [
    "19347",
    "PA"
  ],
  "KENNETT SQUARE": [
    "19348",
    "PA"
  ],
  "LANDENBERG": [
    "19350",
    "PA"
  ],
  "LEWISVILLE": [
    "83431",
    "ID"
  ],
  "LINCOLN UNIVERSITY": [
    "19352",
    "PA"
  ],
  "LIONVILLE": [
    "19353",
    "PA"
  ],
  "LYNDELL": [
    "19354",
    "PA"
  ],
  "MALVERN": [
    "72104",
    "AR"
  ],
  "MENDENHALL": [
    "39114",
    "MS"
  ],
  "PARKESBURG": [
    "19365",
    "PA"
  ],
  "POCOPSON": [
    "19366",
    "PA"
  ],
  "POMEROY": [
    "99347",
    "WA"
  ],
  "SADSBURYVILLE": [
    "19369",
    "PA"
  ],
  "THORNDALE": [
    "76577",
    "TX"
  ],
  "TOUGHKENAMON": [
    "19374",
    "PA"
  ],
  "WAGONTOWN": [
    "19376",
    "PA"
  ],
  "WEST CHESTER": [
    "52359",
    "IA"
  ],
  "WEST GROVE": [
    "19390",
    "PA"
  ],
  "SOUTHEASTERN": [
    "19399",
    "PA"
  ],
  "NORRISTOWN": [
    "19404",
    "PA"
  ],
  "KING OF PRUSSIA": [
    "19406",
    "PA"
  ],
  "EAGLEVILLE": [
    "64442",
    "MO"
  ],
  "FAIRVIEW VILLAGE": [
    "19409",
    "PA"
  ],
  "BIRCHRUNVILLE": [
    "19421",
    "PA"
  ],
  "BLUE BELL": [
    "19422",
    "PA"
  ],
  "CEDARS": [
    "19423",
    "PA"
  ],
  "CHESTER SPRINGS": [
    "19425",
    "PA"
  ],
  "COLLEGEVILLE": [
    "56321",
    "MN"
  ],
  "CONSHOHOCKEN": [
    "19429",
    "PA"
  ],
  "CREAMERY": [
    "19430",
    "PA"
  ],
  "DEVAULT": [
    "19432",
    "PA"
  ],
  "FREDERICK": [
    "80530",
    "CO"
  ],
  "GWYNEDD": [
    "19436",
    "PA"
  ],
  "GWYNEDD VALLEY": [
    "19437",
    "PA"
  ],
  "HARLEYSVILLE": [
    "19438",
    "PA"
  ],
  "KIMBERTON": [
    "19442",
    "PA"
  ],
  "KULPSVILLE": [
    "19443",
    "PA"
  ],
  "LAFAYETTE HILL": [
    "19444",
    "PA"
  ],
  "LANSDALE": [
    "19446",
    "PA"
  ],
  "LEDERACH": [
    "19450",
    "PA"
  ],
  "MAINLAND": [
    "19451",
    "PA"
  ],
  "MONT CLARE": [
    "19453",
    "PA"
  ],
  "NORTH WALES": [
    "19454",
    "PA"
  ],
  "OAKS": [
    "74359",
    "OK"
  ],
  "PARKER FORD": [
    "19457",
    "PA"
  ],
  "PHOENIXVILLE": [
    "19460",
    "PA"
  ],
  "PLYMOUTH MEETING": [
    "19462",
    "PA"
  ],
  "POTTSTOWN": [
    "19465",
    "PA"
  ],
  "ROYERSFORD": [
    "19468",
    "PA"
  ],
  "SAINT PETERS": [
    "63376",
    "MO"
  ],
  "SASSAMANSVILLE": [
    "19472",
    "PA"
  ],
  "SCHWENKSVILLE": [
    "19473",
    "PA"
  ],
  "SKIPPACK": [
    "19474",
    "PA"
  ],
  "SPRING CITY": [
    "84662",
    "UT"
  ],
  "SPRING HOUSE": [
    "19477",
    "PA"
  ],
  "SPRING MOUNT": [
    "19478",
    "PA"
  ],
  "UWCHLAND": [
    "19480",
    "PA"
  ],
  "VALLEY FORGE": [
    "19482",
    "PA"
  ],
  "ZIEGLERVILLE": [
    "19492",
    "PA"
  ],
  "ADAMSTOWN": [
    "21710",
    "MD"
  ],
  "BALLY": [
    "19503",
    "PA"
  ],
  "BARTO": [
    "19504",
    "PA"
  ],
  "BECHTELSVILLE": [
    "19505",
    "PA"
  ],
  "BERNVILLE": [
    "19506",
    "PA"
  ],
  "BIRDSBORO": [
    "19508",
    "PA"
  ],
  "BLANDON": [
    "19510",
    "PA"
  ],
  "BOWERS": [
    "19511",
    "PA"
  ],
  "BOYERTOWN": [
    "19512",
    "PA"
  ],
  "DOUGLASSVILLE": [
    "75560",
    "TX"
  ],
  "ELVERSON": [
    "19520",
    "PA"
  ],
  "FLEETWOOD": [
    "28626",
    "NC"
  ],
  "GEIGERTOWN": [
    "19523",
    "PA"
  ],
  "KEMPTON": [
    "60946",
    "IL"
  ],
  "KUTZTOWN": [
    "19530",
    "PA"
  ],
  "LEESPORT": [
    "19533",
    "PA"
  ],
  "LENHARTSVILLE": [
    "19534",
    "PA"
  ],
  "LIMEKILN": [
    "19535",
    "PA"
  ],
  "LYON STATION": [
    "19536",
    "PA"
  ],
  "MAXATAWNY": [
    "19538",
    "PA"
  ],
  "MERTZTOWN": [
    "19539",
    "PA"
  ],
  "MOHNTON": [
    "19540",
    "PA"
  ],
  "MOHRSVILLE": [
    "19541",
    "PA"
  ],
  "MONOCACY STATION": [
    "19542",
    "PA"
  ],
  "MORGANTOWN": [
    "46160",
    "IN"
  ],
  "MOUNT AETNA": [
    "19544",
    "PA"
  ],
  "NEW BERLINVILLE": [
    "19545",
    "PA"
  ],
  "OLEY": [
    "19547",
    "PA"
  ],
  "PINE FORGE": [
    "19548",
    "PA"
  ],
  "PORT CLINTON": [
    "43452",
    "OH"
  ],
  "REHRERSBURG": [
    "19550",
    "PA"
  ],
  "ROBESONIA": [
    "19551",
    "PA"
  ],
  "SHARTLESVILLE": [
    "19554",
    "PA"
  ],
  "SHOEMAKERSVILLE": [
    "19555",
    "PA"
  ],
  "STRAUSSTOWN": [
    "19559",
    "PA"
  ],
  "TOPTON": [
    "28781",
    "NC"
  ],
  "VIRGINVILLE": [
    "19564",
    "PA"
  ],
  "WERNERSVILLE": [
    "19565",
    "PA"
  ],
  "WOMELSDORF": [
    "19567",
    "PA"
  ],
  "BEAR": [
    "19701",
    "DE"
  ],
  "CLAYMONT": [
    "19703",
    "DE"
  ],
  "DELAWARE CITY": [
    "19706",
    "DE"
  ],
  "HOCKESSIN": [
    "19707",
    "DE"
  ],
  "MONTCHANIN": [
    "19710",
    "DE"
  ],
  "PORT PENN": [
    "19731",
    "DE"
  ],
  "SAINT GEORGES": [
    "19733",
    "DE"
  ],
  "WINTERTHUR": [
    "19735",
    "DE"
  ],
  "YORKLYN": [
    "19736",
    "DE"
  ],
  "DOVER AFB": [
    "19902",
    "DE"
  ],
  "BETHANY BEACH": [
    "19930",
    "DE"
  ],
  "CAMDEN WYOMING": [
    "19934",
    "DE"
  ],
  "CHESWOLD": [
    "19936",
    "DE"
  ],
  "DAGSBORO": [
    "19939",
    "DE"
  ],
  "ELLENDALE": [
    "58436",
    "ND"
  ],
  "FENWICK ISLAND": [
    "19944",
    "DE"
  ],
  "FRANKFORD": [
    "63441",
    "MO"
  ],
  "FREDERICA": [
    "19946",
    "DE"
  ],
  "HARBESON": [
    "19951",
    "DE"
  ],
  "HARTLY": [
    "19953",
    "DE"
  ],
  "KENTON": [
    "73946",
    "OK"
  ],
  "LEWES": [
    "19958",
    "DE"
  ],
  "LITTLE CREEK": [
    "19961",
    "DE"
  ],
  "MARYDEL": [
    "21649",
    "MD"
  ],
  "REHOBOTH BEACH": [
    "19971",
    "DE"
  ],
  "SELBYVILLE": [
    "19975",
    "DE"
  ],
  "VIOLA": [
    "83872",
    "ID"
  ],
  "DULLES": [
    "20189",
    "VA"
  ],
  "ALDIE": [
    "20105",
    "VA"
  ],
  "AMISSVILLE": [
    "20106",
    "VA"
  ],
  "MANASSAS": [
    "30438",
    "GA"
  ],
  "MARSHALL": [
    "99585",
    "AK"
  ],
  "CATLETT": [
    "20119",
    "VA"
  ],
  "CENTREVILLE": [
    "49032",
    "MI"
  ],
  "ORLEAN": [
    "20128",
    "VA"
  ],
  "PAEONIAN SPRINGS": [
    "20129",
    "VA"
  ],
  "PHILOMONT": [
    "20131",
    "VA"
  ],
  "PURCELLVILLE": [
    "20134",
    "VA"
  ],
  "BLUEMONT": [
    "20135",
    "VA"
  ],
  "BRISTOW": [
    "74010",
    "OK"
  ],
  "BROAD RUN": [
    "20137",
    "VA"
  ],
  "CASANOVA": [
    "20139",
    "VA"
  ],
  "RECTORTOWN": [
    "20140",
    "VA"
  ],
  "ROUND HILL": [
    "20142",
    "VA"
  ],
  "CATHARPIN": [
    "20143",
    "VA"
  ],
  "DELAPLANE": [
    "20144",
    "VA"
  ],
  "ASHBURN": [
    "31714",
    "GA"
  ],
  "CHANTILLY": [
    "20153",
    "VA"
  ],
  "HAYMARKET": [
    "20169",
    "VA"
  ],
  "LOVETTSVILLE": [
    "20180",
    "VA"
  ],
  "NOKESVILLE": [
    "20182",
    "VA"
  ],
  "UPPERVILLE": [
    "20185",
    "VA"
  ],
  "WARRENTON": [
    "97146",
    "OR"
  ],
  "RESTON": [
    "22096",
    "VA"
  ],
  "THE PLAINS": [
    "45780",
    "OH"
  ],
  "NAVAL ANACOST ANNEX": [
    "20373",
    "DC"
  ],
  "WASHINGTON NAVY YARD": [
    "20398",
    "DC"
  ],
  "DHS": [
    "20598",
    "VA"
  ],
  "WALDORF": [
    "56091",
    "MN"
  ],
  "ACCOKEEK": [
    "20607",
    "MD"
  ],
  "AQUASCO": [
    "20608",
    "MD"
  ],
  "AVENUE": [
    "20609",
    "MD"
  ],
  "BARSTOW": [
    "92312",
    "CA"
  ],
  "BEL ALTON": [
    "20611",
    "MD"
  ],
  "BENEDICT": [
    "68316",
    "NE"
  ],
  "BRANDYWINE": [
    "26802",
    "WV"
  ],
  "BROOMES ISLAND": [
    "20615",
    "MD"
  ],
  "BRYANS ROAD": [
    "20616",
    "MD"
  ],
  "BRYANTOWN": [
    "20617",
    "MD"
  ],
  "BUSHWOOD": [
    "20618",
    "MD"
  ],
  "CALLAWAY": [
    "68825",
    "NE"
  ],
  "CHAPTICO": [
    "20621",
    "MD"
  ],
  "CHARLOTTE HALL": [
    "20622",
    "MD"
  ],
  "CLEMENTS": [
    "95227",
    "CA"
  ],
  "COBB ISLAND": [
    "20625",
    "MD"
  ],
  "COLTONS POINT": [
    "20626",
    "MD"
  ],
  "COMPTON": [
    "90224",
    "CA"
  ],
  "DAMERON": [
    "20628",
    "MD"
  ],
  "DOWELL": [
    "62927",
    "IL"
  ],
  "DRAYDEN": [
    "20630",
    "MD"
  ],
  "FAULKNER": [
    "20632",
    "MD"
  ],
  "GREAT MILLS": [
    "20634",
    "MD"
  ],
  "HELEN": [
    "30545",
    "GA"
  ],
  "HOLLYWOOD": [
    "35752",
    "AL"
  ],
  "HUNTINGTOWN": [
    "20639",
    "MD"
  ],
  "ISSUE": [
    "20645",
    "MD"
  ],
  "LA PLATA": [
    "87418",
    "NM"
  ],
  "LEONARDTOWN": [
    "20650",
    "MD"
  ],
  "LEXINGTON PARK": [
    "20653",
    "MD"
  ],
  "LOVEVILLE": [
    "20656",
    "MD"
  ],
  "LUSBY": [
    "20657",
    "MD"
  ],
  "MARBURY": [
    "36051",
    "AL"
  ],
  "MORGANZA": [
    "70759",
    "LA"
  ],
  "MOUNT VICTORIA": [
    "20661",
    "MD"
  ],
  "NANJEMOY": [
    "20662",
    "MD"
  ],
  "PARK HALL": [
    "20667",
    "MD"
  ],
  "PATUXENT RIVER": [
    "20670",
    "MD"
  ],
  "PINEY POINT": [
    "20674",
    "MD"
  ],
  "PORT TOBACCO": [
    "20677",
    "MD"
  ],
  "PRINCE FREDERICK": [
    "20678",
    "MD"
  ],
  "SAINT INIGOES": [
    "20684",
    "MD"
  ],
  "SAINT LEONARD": [
    "20685",
    "MD"
  ],
  "SAINT MARYS CITY": [
    "20686",
    "MD"
  ],
  "SOLOMONS": [
    "20688",
    "MD"
  ],
  "TALL TIMBERS": [
    "20690",
    "MD"
  ],
  "VALLEY LEE": [
    "20692",
    "MD"
  ],
  "WELCOME": [
    "56181",
    "MN"
  ],
  "ANNAPOLIS JUNCTION": [
    "20701",
    "MD"
  ],
  "LANHAM": [
    "20706",
    "MD"
  ],
  "BELTSVILLE": [
    "20705",
    "MD"
  ],
  "BLADENSBURG": [
    "43005",
    "OH"
  ],
  "LOTHIAN": [
    "20711",
    "MD"
  ],
  "MOUNT RAINIER": [
    "20712",
    "MD"
  ],
  "NORTH BEACH": [
    "20714",
    "MD"
  ],
  "BOWIE": [
    "85605",
    "AZ"
  ],
  "CAPITOL HEIGHTS": [
    "20799",
    "MD"
  ],
  "CHESAPEAKE BEACH": [
    "20732",
    "MD"
  ],
  "CHURCHTON": [
    "20733",
    "MD"
  ],
  "OWINGS": [
    "20736",
    "MD"
  ],
  "COLLEGE PARK": [
    "20742",
    "MD"
  ],
  "OXON HILL": [
    "20745",
    "MD"
  ],
  "SUITLAND": [
    "20752",
    "MD"
  ],
  "DISTRICT HEIGHTS": [
    "20753",
    "MD"
  ],
  "TEMPLE HILLS": [
    "20757",
    "MD"
  ],
  "DEALE": [
    "20751",
    "MD"
  ],
  "FORT GEORGE G MEADE": [
    "20755",
    "MD"
  ],
  "ANDREWS AIR FORCE BASE": [
    "20762",
    "MD"
  ],
  "SAVAGE": [
    "59262",
    "MT"
  ],
  "SHADY SIDE": [
    "20764",
    "MD"
  ],
  "GALESVILLE": [
    "54630",
    "WI"
  ],
  "GREENBELT": [
    "20771",
    "MD"
  ],
  "GLENN DALE": [
    "20769",
    "MD"
  ],
  "UPPER MARLBORO": [
    "20792",
    "MD"
  ],
  "HARWOOD": [
    "78632",
    "TX"
  ],
  "WEST RIVER": [
    "20778",
    "MD"
  ],
  "TRACYS LANDING": [
    "20779",
    "MD"
  ],
  "HYATTSVILLE": [
    "20788",
    "MD"
  ],
  "SOUTHERN MD FACILITY": [
    "20797",
    "MD"
  ],
  "BETHESDA": [
    "43719",
    "OH"
  ],
  "GLEN ECHO": [
    "20812",
    "MD"
  ],
  "CHEVY CHASE": [
    "20825",
    "MD"
  ],
  "CABIN JOHN": [
    "20818",
    "MD"
  ],
  "OLNEY": [
    "76374",
    "TX"
  ],
  "BROOKEVILLE": [
    "20833",
    "MD"
  ],
  "POOLESVILLE": [
    "20837",
    "MD"
  ],
  "BOYDS": [
    "99107",
    "WA"
  ],
  "DICKERSON": [
    "20842",
    "MD"
  ],
  "POTOMAC": [
    "61865",
    "IL"
  ],
  "DERWOOD": [
    "20855",
    "MD"
  ],
  "SANDY SPRING": [
    "20860",
    "MD"
  ],
  "ASHTON": [
    "83420",
    "ID"
  ],
  "BRINKLOW": [
    "20862",
    "MD"
  ],
  "BURTONSVILLE": [
    "20866",
    "MD"
  ],
  "SPENCERVILLE": [
    "46788",
    "IN"
  ],
  "GAITHERSBURG": [
    "20899",
    "MD"
  ],
  "WASHINGTON GROVE": [
    "20880",
    "MD"
  ],
  "MONTGOMERY VILLAGE": [
    "20886",
    "MD"
  ],
  "KENSINGTON": [
    "66951",
    "KS"
  ],
  "GARRETT PARK": [
    "20896",
    "MD"
  ],
  "SUBURB MARYLAND FAC": [
    "20897",
    "MD"
  ],
  "TAKOMA PARK": [
    "20913",
    "MD"
  ],
  "ABERDEEN": [
    "98520",
    "WA"
  ],
  "ABERDEEN PROVING GROUND": [
    "21005",
    "MD"
  ],
  "ABINGDON": [
    "61410",
    "IL"
  ],
  "GUNPOWDER": [
    "21010",
    "MD"
  ],
  "ARNOLD": [
    "95223",
    "CA"
  ],
  "BEL AIR": [
    "21015",
    "MD"
  ],
  "BELCAMP": [
    "21017",
    "MD"
  ],
  "BORING": [
    "97009",
    "OR"
  ],
  "BROOKLANDVILLE": [
    "21022",
    "MD"
  ],
  "CHASE": [
    "71324",
    "LA"
  ],
  "COCKEYSVILLE": [
    "21030",
    "MD"
  ],
  "HUNT VALLEY": [
    "21065",
    "MD"
  ],
  "CROWNSVILLE": [
    "21032",
    "MD"
  ],
  "DAVIDSONVILLE": [
    "21035",
    "MD"
  ],
  "EDGEWOOD": [
    "87015",
    "NM"
  ],
  "ELLICOTT CITY": [
    "21043",
    "MD"
  ],
  "FALLSTON": [
    "28042",
    "NC"
  ],
  "FINKSBURG": [
    "21048",
    "MD"
  ],
  "FOREST HILL": [
    "71430",
    "LA"
  ],
  "FORK": [
    "29543",
    "SC"
  ],
  "FORT HOWARD": [
    "21052",
    "MD"
  ],
  "GAMBRILLS": [
    "21054",
    "MD"
  ],
  "GIBSON ISLAND": [
    "21056",
    "MD"
  ],
  "GLEN ARM": [
    "21057",
    "MD"
  ],
  "GLEN BURNIE": [
    "21062",
    "MD"
  ],
  "GLYNDON": [
    "56547",
    "MN"
  ],
  "ELKRIDGE": [
    "21075",
    "MD"
  ],
  "HARMANS": [
    "21077",
    "MD"
  ],
  "HAVRE DE GRACE": [
    "21078",
    "MD"
  ],
  "HYDES": [
    "21082",
    "MD"
  ],
  "JARRETTSVILLE": [
    "21084",
    "MD"
  ],
  "JOPPA": [
    "62953",
    "IL"
  ],
  "KINGSVILLE": [
    "78364",
    "TX"
  ],
  "LINEBORO": [
    "21088",
    "MD"
  ],
  "LINTHICUM HEIGHTS": [
    "21090",
    "MD"
  ],
  "LONG GREEN": [
    "21092",
    "MD"
  ],
  "LUTHERVILLE TIMONIUM": [
    "21094",
    "MD"
  ],
  "MARRIOTTSVILLE": [
    "21104",
    "MD"
  ],
  "MARYLAND LINE": [
    "21105",
    "MD"
  ],
  "MAYO": [
    "32066",
    "FL"
  ],
  "ODENTON": [
    "21113",
    "MD"
  ],
  "CROFTON": [
    "68730",
    "NE"
  ],
  "OWINGS MILLS": [
    "21117",
    "MD"
  ],
  "PARKTON": [
    "28371",
    "NC"
  ],
  "PASADENA": [
    "91188",
    "CA"
  ],
  "PERRY HALL": [
    "21128",
    "MD"
  ],
  "PERRYMAN": [
    "21130",
    "MD"
  ],
  "PYLESVILLE": [
    "21132",
    "MD"
  ],
  "RANDALLSTOWN": [
    "21133",
    "MD"
  ],
  "REISTERSTOWN": [
    "21136",
    "MD"
  ],
  "RIDERWOOD": [
    "21139",
    "MD"
  ],
  "RIVA": [
    "21140",
    "MD"
  ],
  "SEVERN": [
    "27877",
    "NC"
  ],
  "SEVERNA PARK": [
    "21146",
    "MD"
  ],
  "SIMPSONVILLE": [
    "40067",
    "KY"
  ],
  "SPARKS GLENCOE": [
    "21152",
    "MD"
  ],
  "STREET": [
    "21154",
    "MD"
  ],
  "UPPERCO": [
    "21155",
    "MD"
  ],
  "UPPER FALLS": [
    "21156",
    "MD"
  ],
  "WHITEFORD": [
    "21160",
    "MD"
  ],
  "WHITE HALL": [
    "71612",
    "AR"
  ],
  "WHITE MARSH": [
    "23183",
    "VA"
  ],
  "BALTIMORE": [
    "43105",
    "OH"
  ],
  "TOWSON": [
    "21286",
    "MD"
  ],
  "GWYNN OAK": [
    "21207",
    "MD"
  ],
  "PIKESVILLE": [
    "21282",
    "MD"
  ],
  "SPARROWS POINT": [
    "21219",
    "MD"
  ],
  "MIDDLE RIVER": [
    "56737",
    "MN"
  ],
  "DUNDALK": [
    "21222",
    "MD"
  ],
  "CURTIS BAY": [
    "21226",
    "MD"
  ],
  "HALETHORPE": [
    "21227",
    "MD"
  ],
  "CATONSVILLE": [
    "21228",
    "MD"
  ],
  "PARKVILLE": [
    "21234",
    "MD"
  ],
  "WINDSOR MILL": [
    "21244",
    "MD"
  ],
  "ANNAPOLIS": [
    "95412",
    "CA"
  ],
  "ACCIDENT": [
    "21520",
    "MD"
  ],
  "BITTINGER": [
    "21522",
    "MD"
  ],
  "CORRIGANVILLE": [
    "21524",
    "MD"
  ],
  "ECKHART MINES": [
    "21528",
    "MD"
  ],
  "ELLERSLIE": [
    "31807",
    "GA"
  ],
  "FLINTSTONE": [
    "30725",
    "GA"
  ],
  "FROSTBURG": [
    "21532",
    "MD"
  ],
  "GRANTSVILLE": [
    "84029",
    "UT"
  ],
  "KITZMILLER": [
    "21538",
    "MD"
  ],
  "LONACONING": [
    "21539",
    "MD"
  ],
  "LUKE": [
    "21540",
    "MD"
  ],
  "MC HENRY": [
    "42354",
    "KY"
  ],
  "MIDLOTHIAN": [
    "76065",
    "TX"
  ],
  "MOUNT SAVAGE": [
    "21545",
    "MD"
  ],
  "OLDTOWN": [
    "83822",
    "ID"
  ],
  "PINTO": [
    "21556",
    "MD"
  ],
  "RAWLINGS": [
    "23876",
    "VA"
  ],
  "WESTERNPORT": [
    "21562",
    "MD"
  ],
  "BARCLAY": [
    "21607",
    "MD"
  ],
  "BETTERTON": [
    "21610",
    "MD"
  ],
  "BOZMAN": [
    "21612",
    "MD"
  ],
  "CHURCH CREEK": [
    "21622",
    "MD"
  ],
  "CHURCH HILL": [
    "37642",
    "TN"
  ],
  "CLAIBORNE": [
    "21624",
    "MD"
  ],
  "CORDOVA": [
    "99574",
    "AK"
  ],
  "CRUMPTON": [
    "21628",
    "MD"
  ],
  "DENTON": [
    "76210",
    "TX"
  ],
  "EAST NEW MARKET": [
    "21631",
    "MD"
  ],
  "FEDERALSBURG": [
    "21632",
    "MD"
  ],
  "FISHING CREEK": [
    "21634",
    "MD"
  ],
  "GALENA": [
    "99741",
    "AK"
  ],
  "GOLDSBORO": [
    "79519",
    "TX"
  ],
  "GRASONVILLE": [
    "21638",
    "MD"
  ],
  "HILLSBORO": [
    "97124",
    "OR"
  ],
  "HURLOCK": [
    "21643",
    "MD"
  ],
  "INGLESIDE": [
    "78362",
    "TX"
  ],
  "KENNEDYVILLE": [
    "21645",
    "MD"
  ],
  "MCDANIEL": [
    "21647",
    "MD"
  ],
  "MASSEY": [
    "21650",
    "MD"
  ],
  "NEAVITT": [
    "21652",
    "MD"
  ],
  "QUEEN ANNE": [
    "21657",
    "MD"
  ],
  "QUEENSTOWN": [
    "21658",
    "MD"
  ],
  "RHODESDALE": [
    "21659",
    "MD"
  ],
  "RIDGELY": [
    "38080",
    "TN"
  ],
  "ROCK HALL": [
    "21661",
    "MD"
  ],
  "ROYAL OAK": [
    "48073",
    "MI"
  ],
  "SAINT MICHAELS": [
    "86511",
    "AZ"
  ],
  "SECRETARY": [
    "21664",
    "MD"
  ],
  "SHERWOOD": [
    "97140",
    "OR"
  ],
  "STILL POND": [
    "21667",
    "MD"
  ],
  "SUDLERSVILLE": [
    "21668",
    "MD"
  ],
  "TAYLORS ISLAND": [
    "21669",
    "MD"
  ],
  "TILGHMAN": [
    "21671",
    "MD"
  ],
  "TODDVILLE": [
    "52341",
    "IA"
  ],
  "TRAPPE": [
    "21673",
    "MD"
  ],
  "WITTMAN": [
    "21676",
    "MD"
  ],
  "WOOLFORD": [
    "21677",
    "MD"
  ],
  "WORTON": [
    "21678",
    "MD"
  ],
  "WYE MILLS": [
    "21679",
    "MD"
  ],
  "BIG POOL": [
    "21711",
    "MD"
  ],
  "BOONSBORO": [
    "21713",
    "MD"
  ],
  "BRADDOCK HEIGHTS": [
    "21714",
    "MD"
  ],
  "BUCKEYSTOWN": [
    "21717",
    "MD"
  ],
  "BURKITTSVILLE": [
    "21718",
    "MD"
  ],
  "CASCADE": [
    "83611",
    "ID"
  ],
  "CAVETOWN": [
    "21720",
    "MD"
  ],
  "CHEWSVILLE": [
    "21721",
    "MD"
  ],
  "CLEAR SPRING": [
    "21722",
    "MD"
  ],
  "COOKSVILLE": [
    "61730",
    "IL"
  ],
  "EMMITSBURG": [
    "21727",
    "MD"
  ],
  "FAIRPLAY": [
    "80440",
    "CO"
  ],
  "FUNKSTOWN": [
    "21734",
    "MD"
  ],
  "GLENELG": [
    "21737",
    "MD"
  ],
  "HAGERSTOWN": [
    "47346",
    "IN"
  ],
  "IJAMSVILLE": [
    "21754",
    "MD"
  ],
  "KEEDYSVILLE": [
    "21756",
    "MD"
  ],
  "KEYMAR": [
    "21757",
    "MD"
  ],
  "LIBERTYTOWN": [
    "21762",
    "MD"
  ],
  "LITTLE ORLEANS": [
    "21766",
    "MD"
  ],
  "MAUGANSVILLE": [
    "21767",
    "MD"
  ],
  "MONROVIA": [
    "91017",
    "CA"
  ],
  "MOUNT AIRY": [
    "70076",
    "LA"
  ],
  "MYERSVILLE": [
    "21773",
    "MD"
  ],
  "NEW MARKET": [
    "51646",
    "IA"
  ],
  "NEW MIDWAY": [
    "21775",
    "MD"
  ],
  "POINT OF ROCKS": [
    "82942",
    "WY"
  ],
  "ROCKY RIDGE": [
    "43458",
    "OH"
  ],
  "ROHRERSVILLE": [
    "21779",
    "MD"
  ],
  "SABILLASVILLE": [
    "21780",
    "MD"
  ],
  "SHARPSBURG": [
    "50862",
    "IA"
  ],
  "SMITHSBURG": [
    "21783",
    "MD"
  ],
  "TANEYTOWN": [
    "21787",
    "MD"
  ],
  "THURMONT": [
    "21788",
    "MD"
  ],
  "UNION BRIDGE": [
    "21791",
    "MD"
  ],
  "WALKERSVILLE": [
    "26447",
    "WV"
  ],
  "WEST FRIENDSHIP": [
    "21794",
    "MD"
  ],
  "WOODSBORO": [
    "78393",
    "TX"
  ],
  "ALLEN": [
    "75013",
    "TX"
  ],
  "BISHOPVILLE": [
    "29010",
    "SC"
  ],
  "BIVALVE": [
    "21814",
    "MD"
  ],
  "CRISFIELD": [
    "21817",
    "MD"
  ],
  "DEAL ISLAND": [
    "21821",
    "MD"
  ],
  "EWELL": [
    "21824",
    "MD"
  ],
  "FRUITLAND": [
    "99129",
    "WA"
  ],
  "GIRDLETREE": [
    "21829",
    "MD"
  ],
  "LINKWOOD": [
    "21835",
    "MD"
  ],
  "MARDELA SPRINGS": [
    "21837",
    "MD"
  ],
  "MARION STATION": [
    "21838",
    "MD"
  ],
  "PARSONSBURG": [
    "21849",
    "MD"
  ],
  "PITTSVILLE": [
    "54466",
    "WI"
  ],
  "POCOMOKE CITY": [
    "21851",
    "MD"
  ],
  "POWELLVILLE": [
    "21852",
    "MD"
  ],
  "PRINCESS ANNE": [
    "21853",
    "MD"
  ],
  "QUANTICO": [
    "22135",
    "VA"
  ],
  "REHOBETH": [
    "21857",
    "MD"
  ],
  "SHARPTOWN": [
    "21861",
    "MD"
  ],
  "SHOWELL": [
    "21862",
    "MD"
  ],
  "SNOW HILL": [
    "28580",
    "NC"
  ],
  "TYASKIN": [
    "21865",
    "MD"
  ],
  "TYLERTON": [
    "21866",
    "MD"
  ],
  "UPPER FAIRMOUNT": [
    "21867",
    "MD"
  ],
  "WHALEYVILLE": [
    "21872",
    "MD"
  ],
  "WILLARDS": [
    "21874",
    "MD"
  ],
  "PERRY POINT": [
    "21902",
    "MD"
  ],
  "PERRYVILLE": [
    "99648",
    "AK"
  ],
  "PORT DEPOSIT": [
    "21904",
    "MD"
  ],
  "RISING SUN": [
    "47040",
    "IN"
  ],
  "CECILTON": [
    "21913",
    "MD"
  ],
  "CHESAPEAKE CITY": [
    "21915",
    "MD"
  ],
  "CHILDS": [
    "21916",
    "MD"
  ],
  "COLORA": [
    "21917",
    "MD"
  ],
  "CONOWINGO": [
    "21918",
    "MD"
  ],
  "EARLEVILLE": [
    "21919",
    "MD"
  ],
  "ELK MILLS": [
    "21920",
    "MD"
  ],
  "ELKTON": [
    "97436",
    "OR"
  ],
  "DUMFRIES": [
    "22026",
    "VA"
  ],
  "DUNN LORING": [
    "22027",
    "VA"
  ],
  "FAIRFAX STATION": [
    "22039",
    "VA"
  ],
  "FALLS CHURCH": [
    "22046",
    "VA"
  ],
  "FORT BELVOIR": [
    "22060",
    "VA"
  ],
  "GREAT FALLS": [
    "59406",
    "MT"
  ],
  "LORTON": [
    "68382",
    "NE"
  ],
  "MERRIFIELD": [
    "56465",
    "MN"
  ],
  "WEST MCLEAN": [
    "22103",
    "VA"
  ],
  "OAKTON": [
    "22124",
    "VA"
  ],
  "OCCOQUAN": [
    "22125",
    "VA"
  ],
  "TRIANGLE": [
    "22172",
    "VA"
  ],
  "FORT MYER": [
    "22211",
    "VA"
  ],
  "BOWLING GREEN": [
    "63334",
    "MO"
  ],
  "BURGESS": [
    "22432",
    "VA"
  ],
  "BURR HILL": [
    "22433",
    "VA"
  ],
  "CALLAO": [
    "63534",
    "MO"
  ],
  "CARET": [
    "22436",
    "VA"
  ],
  "CENTER CROSS": [
    "22437",
    "VA"
  ],
  "COLES POINT": [
    "22442",
    "VA"
  ],
  "COLONIAL BEACH": [
    "22443",
    "VA"
  ],
  "CORBIN": [
    "40702",
    "KY"
  ],
  "DAHLGREN": [
    "62828",
    "IL"
  ],
  "DUNNSVILLE": [
    "22454",
    "VA"
  ],
  "EDWARDSVILLE": [
    "66113",
    "KS"
  ],
  "GARRISONVILLE": [
    "22463",
    "VA"
  ],
  "HARTWOOD": [
    "22471",
    "VA"
  ],
  "HAYNESVILLE": [
    "71038",
    "LA"
  ],
  "HEATHSVILLE": [
    "22473",
    "VA"
  ],
  "HUSTLE": [
    "22476",
    "VA"
  ],
  "JERSEY": [
    "71651",
    "AR"
  ],
  "KILMARNOCK": [
    "22482",
    "VA"
  ],
  "KING GEORGE": [
    "22485",
    "VA"
  ],
  "KINSALE": [
    "22488",
    "VA"
  ],
  "LADYSMITH": [
    "54848",
    "WI"
  ],
  "LANEVIEW": [
    "22504",
    "VA"
  ],
  "LIVELY": [
    "22507",
    "VA"
  ],
  "LOCUST GROVE": [
    "74352",
    "OK"
  ],
  "LOTTSBURG": [
    "22511",
    "VA"
  ],
  "MOLLUSK": [
    "22517",
    "VA"
  ],
  "MONTROSS": [
    "22520",
    "VA"
  ],
  "MORATTICO": [
    "22523",
    "VA"
  ],
  "NINDE": [
    "22526",
    "VA"
  ],
  "OLDHAMS": [
    "22529",
    "VA"
  ],
  "OPHELIA": [
    "22530",
    "VA"
  ],
  "PARTLOW": [
    "22534",
    "VA"
  ],
  "RAPPAHANNOCK ACADEMY": [
    "22538",
    "VA"
  ],
  "REEDVILLE": [
    "22539",
    "VA"
  ],
  "RHOADESVILLE": [
    "22542",
    "VA"
  ],
  "ROLLINS FORK": [
    "22544",
    "VA"
  ],
  "RUTHER GLEN": [
    "22546",
    "VA"
  ],
  "SEALSTON": [
    "22547",
    "VA"
  ],
  "SHARPS": [
    "22548",
    "VA"
  ],
  "SPOTSYLVANIA": [
    "22553",
    "VA"
  ],
  "TAPPAHANNOCK": [
    "22560",
    "VA"
  ],
  "THORNBURG": [
    "22565",
    "VA"
  ],
  "VILLAGE": [
    "22570",
    "VA"
  ],
  "WEEMS": [
    "22576",
    "VA"
  ],
  "WHITE STONE": [
    "29386",
    "SC"
  ],
  "WICOMICO CHURCH": [
    "22579",
    "VA"
  ],
  "WOODFORD": [
    "53599",
    "WI"
  ],
  "BENTONVILLE": [
    "72716",
    "AR"
  ],
  "BERRYVILLE": [
    "72616",
    "AR"
  ],
  "BOYCE": [
    "71409",
    "LA"
  ],
  "CHESTER GAP": [
    "22623",
    "VA"
  ],
  "CLEAR BROOK": [
    "22624",
    "VA"
  ],
  "CROSS JUNCTION": [
    "22625",
    "VA"
  ],
  "FISHERS HILL": [
    "22626",
    "VA"
  ],
  "FLINT HILL": [
    "22627",
    "VA"
  ],
  "FRONT ROYAL": [
    "22630",
    "VA"
  ],
  "GORE": [
    "74435",
    "OK"
  ],
  "HUNTLY": [
    "22640",
    "VA"
  ],
  "MARKHAM": [
    "77456",
    "TX"
  ],
  "MAURERTOWN": [
    "22644",
    "VA"
  ],
  "RILEYVILLE": [
    "22650",
    "VA"
  ],
  "FORT VALLEY": [
    "31030",
    "GA"
  ],
  "STAR TANNERY": [
    "22654",
    "VA"
  ],
  "STEPHENS CITY": [
    "22655",
    "VA"
  ],
  "STEPHENSON": [
    "49887",
    "MI"
  ],
  "TOMS BROOK": [
    "22660",
    "VA"
  ],
  "WHITE POST": [
    "22663",
    "VA"
  ],
  "CULPEPER": [
    "22701",
    "VA"
  ],
  "ARODA": [
    "22709",
    "VA"
  ],
  "BEALETON": [
    "22712",
    "VA"
  ],
  "BRANDY STATION": [
    "22714",
    "VA"
  ],
  "BRIGHTWOOD": [
    "97011",
    "OR"
  ],
  "ELKWOOD": [
    "22718",
    "VA"
  ],
  "ETLAN": [
    "22719",
    "VA"
  ],
  "GOLDVEIN": [
    "22720",
    "VA"
  ],
  "HAYWOOD": [
    "26366",
    "WV"
  ],
  "HOOD": [
    "95639",
    "CA"
  ],
  "JEFFERSONTON": [
    "22724",
    "VA"
  ],
  "LIGNUM": [
    "22726",
    "VA"
  ],
  "MITCHELLS": [
    "22729",
    "VA"
  ],
  "OAKPARK": [
    "22730",
    "VA"
  ],
  "PRATTS": [
    "22731",
    "VA"
  ],
  "RADIANT": [
    "22732",
    "VA"
  ],
  "RAPIDAN": [
    "22733",
    "VA"
  ],
  "REMINGTON": [
    "47977",
    "IN"
  ],
  "REVA": [
    "57651",
    "SD"
  ],
  "RICHARDSVILLE": [
    "22736",
    "VA"
  ],
  "RIXEYVILLE": [
    "22737",
    "VA"
  ],
  "ROCHELLE": [
    "76872",
    "TX"
  ],
  "SPERRYVILLE": [
    "22740",
    "VA"
  ],
  "STEVENSBURG": [
    "22741",
    "VA"
  ],
  "SUMERDUCK": [
    "22742",
    "VA"
  ],
  "SYRIA": [
    "22743",
    "VA"
  ],
  "VIEWTOWN": [
    "22746",
    "VA"
  ],
  "WOLFTOWN": [
    "22748",
    "VA"
  ],
  "HARRISONBURG": [
    "71340",
    "LA"
  ],
  "BASYE": [
    "22810",
    "VA"
  ],
  "BERGTON": [
    "22811",
    "VA"
  ],
  "CRIDERS": [
    "22820",
    "VA"
  ],
  "FULKS RUN": [
    "22830",
    "VA"
  ],
  "HINTON": [
    "73047",
    "OK"
  ],
  "KEEZLETOWN": [
    "22832",
    "VA"
  ],
  "LACEY SPRING": [
    "22833",
    "VA"
  ],
  "LINVILLE": [
    "28646",
    "NC"
  ],
  "LURAY": [
    "67649",
    "KS"
  ],
  "MC GAHEYSVILLE": [
    "22840",
    "VA"
  ],
  "MOUNT CRAWFORD": [
    "22841",
    "VA"
  ],
  "MOUNT JACKSON": [
    "22842",
    "VA"
  ],
  "MOUNT SOLON": [
    "22843",
    "VA"
  ],
  "ORKNEY SPRINGS": [
    "22845",
    "VA"
  ],
  "PENN LAIRD": [
    "22846",
    "VA"
  ],
  "QUICKSBURG": [
    "22847",
    "VA"
  ],
  "SINGERS GLEN": [
    "22850",
    "VA"
  ],
  "TIMBERVILLE": [
    "22853",
    "VA"
  ],
  "CHARLOTTESVILLE": [
    "46117",
    "IN"
  ],
  "ARRINGTON": [
    "37014",
    "TN"
  ],
  "BARBOURSVILLE": [
    "25504",
    "WV"
  ],
  "BATESVILLE": [
    "78829",
    "TX"
  ],
  "COVESVILLE": [
    "22931",
    "VA"
  ],
  "CROZET": [
    "22932",
    "VA"
  ],
  "DYKE": [
    "22935",
    "VA"
  ],
  "EARLYSVILLE": [
    "22936",
    "VA"
  ],
  "ESMONT": [
    "22937",
    "VA"
  ],
  "FABER": [
    "22938",
    "VA"
  ],
  "FISHERSVILLE": [
    "22939",
    "VA"
  ],
  "FREE UNION": [
    "22940",
    "VA"
  ],
  "GORDONSVILLE": [
    "38563",
    "TN"
  ],
  "IVY": [
    "22945",
    "VA"
  ],
  "KESWICK": [
    "50136",
    "IA"
  ],
  "LOCUST DALE": [
    "22948",
    "VA"
  ],
  "LOVINGSTON": [
    "22949",
    "VA"
  ],
  "MONTPELIER STATION": [
    "22957",
    "VA"
  ],
  "NELLYSFORD": [
    "22958",
    "VA"
  ],
  "NORTH GARDEN": [
    "22959",
    "VA"
  ],
  "PINEY RIVER": [
    "22964",
    "VA"
  ],
  "QUINQUE": [
    "22965",
    "VA"
  ],
  "RUCKERSVILLE": [
    "22968",
    "VA"
  ],
  "SCHUYLER": [
    "68661",
    "NE"
  ],
  "SHIPMAN": [
    "62685",
    "IL"
  ],
  "STANARDSVILLE": [
    "22973",
    "VA"
  ],
  "TYRO": [
    "67364",
    "KS"
  ],
  "WOODBERRY FOREST": [
    "22989",
    "VA"
  ],
  "ACHILLES": [
    "23001",
    "VA"
  ],
  "AMELIA COURT HOUSE": [
    "23002",
    "VA"
  ],
  "ARK": [
    "23003",
    "VA"
  ],
  "ARVONIA": [
    "23004",
    "VA"
  ],
  "AYLETT": [
    "23009",
    "VA"
  ],
  "BARHAMSVILLE": [
    "23011",
    "VA"
  ],
  "BEAVERDAM": [
    "45808",
    "OH"
  ],
  "BENA": [
    "56626",
    "MN"
  ],
  "BOHANNON": [
    "23021",
    "VA"
  ],
  "BREMO BLUFF": [
    "23022",
    "VA"
  ],
  "BRUINGTON": [
    "23023",
    "VA"
  ],
  "BUMPASS": [
    "23024",
    "VA"
  ],
  "CARDINAL": [
    "23025",
    "VA"
  ],
  "CARTERSVILLE": [
    "30121",
    "GA"
  ],
  "CHARLES CITY": [
    "50616",
    "IA"
  ],
  "CHRISTCHURCH": [
    "23031",
    "VA"
  ],
  "CHURCH VIEW": [
    "23032",
    "VA"
  ],
  "COBBS CREEK": [
    "23035",
    "VA"
  ],
  "CROZIER": [
    "23039",
    "VA"
  ],
  "DELTAVILLE": [
    "23043",
    "VA"
  ],
  "DIGGS": [
    "23045",
    "VA"
  ],
  "DOSWELL": [
    "23047",
    "VA"
  ],
  "DUTTON": [
    "59433",
    "MT"
  ],
  "FORK UNION": [
    "23055",
    "VA"
  ],
  "GLEN ALLEN": [
    "35559",
    "AL"
  ],
  "GLOUCESTER POINT": [
    "23062",
    "VA"
  ],
  "GOOCHLAND": [
    "23063",
    "VA"
  ],
  "GRIMSTEAD": [
    "23064",
    "VA"
  ],
  "GUM SPRING": [
    "23065",
    "VA"
  ],
  "GWYNN": [
    "23066",
    "VA"
  ],
  "HADENSVILLE": [
    "23067",
    "VA"
  ],
  "HARDYVILLE": [
    "42746",
    "KY"
  ],
  "HARTFIELD": [
    "23071",
    "VA"
  ],
  "HAYES": [
    "70646",
    "LA"
  ],
  "HENRICO": [
    "27842",
    "NC"
  ],
  "HUDGINS": [
    "23076",
    "VA"
  ],
  "JETERSVILLE": [
    "23083",
    "VA"
  ],
  "KENTS STORE": [
    "23084",
    "VA"
  ],
  "KING AND QUEEN COURT HOUSE": [
    "23085",
    "VA"
  ],
  "KING WILLIAM": [
    "23086",
    "VA"
  ],
  "LANEXA": [
    "23089",
    "VA"
  ],
  "LIGHTFOOT": [
    "23090",
    "VA"
  ],
  "LITTLE PLYMOUTH": [
    "23091",
    "VA"
  ],
  "LOCUST HILL": [
    "23092",
    "VA"
  ],
  "LOUISA": [
    "41230",
    "KY"
  ],
  "MAIDENS": [
    "23102",
    "VA"
  ],
  "MANAKIN SABOT": [
    "23103",
    "VA"
  ],
  "MANNBORO": [
    "23105",
    "VA"
  ],
  "MANQUIN": [
    "23106",
    "VA"
  ],
  "MASCOT": [
    "37806",
    "TN"
  ],
  "MATHEWS": [
    "70375",
    "LA"
  ],
  "MATTAPONI": [
    "23110",
    "VA"
  ],
  "MILLERS TAVERN": [
    "23115",
    "VA"
  ],
  "MINERAL": [
    "98355",
    "WA"
  ],
  "MOON": [
    "23119",
    "VA"
  ],
  "MOSELEY": [
    "23120",
    "VA"
  ],
  "NEW CANTON": [
    "62356",
    "IL"
  ],
  "NEW KENT": [
    "23124",
    "VA"
  ],
  "NEW POINT": [
    "47263",
    "IN"
  ],
  "NORGE": [
    "23127",
    "VA"
  ],
  "NORTH": [
    "29112",
    "SC"
  ],
  "OILVILLE": [
    "23129",
    "VA"
  ],
  "ONEMO": [
    "23130",
    "VA"
  ],
  "ORDINARY": [
    "23131",
    "VA"
  ],
  "PORT HAYWOOD": [
    "23138",
    "VA"
  ],
  "POWHATAN": [
    "72458",
    "AR"
  ],
  "PROVIDENCE FORGE": [
    "23140",
    "VA"
  ],
  "SAINT STEPHENS CHURCH": [
    "23148",
    "VA"
  ],
  "SALUDA": [
    "29138",
    "SC"
  ],
  "SANDSTON": [
    "23150",
    "VA"
  ],
  "SCHLEY": [
    "23154",
    "VA"
  ],
  "SHACKLEFORDS": [
    "23156",
    "VA"
  ],
  "STATE FARM": [
    "23160",
    "VA"
  ],
  "STUDLEY": [
    "23162",
    "VA"
  ],
  "SUSAN": [
    "23163",
    "VA"
  ],
  "TOANO": [
    "23168",
    "VA"
  ],
  "TOPPING": [
    "23169",
    "VA"
  ],
  "TREVILIANS": [
    "23170",
    "VA"
  ],
  "URBANNA": [
    "23175",
    "VA"
  ],
  "WAKE": [
    "23176",
    "VA"
  ],
  "WALKERTON": [
    "46574",
    "IN"
  ],
  "WARE NECK": [
    "23178",
    "VA"
  ],
  "WATER VIEW": [
    "23180",
    "VA"
  ],
  "WICOMICO": [
    "23184",
    "VA"
  ],
  "WOODS CROSS ROADS": [
    "23190",
    "VA"
  ],
  "ACCOMAC": [
    "23301",
    "VA"
  ],
  "ASSAWOMAN": [
    "23302",
    "VA"
  ],
  "BATTERY PARK": [
    "23304",
    "VA"
  ],
  "BELLE HAVEN": [
    "23306",
    "VA"
  ],
  "BIRDSNEST": [
    "23307",
    "VA"
  ],
  "BLOXOM": [
    "23308",
    "VA"
  ],
  "CAPE CHARLES": [
    "23310",
    "VA"
  ],
  "CAPEVILLE": [
    "23313",
    "VA"
  ],
  "CARROLLTON": [
    "75011",
    "TX"
  ],
  "CARRSVILLE": [
    "23315",
    "VA"
  ],
  "CHERITON": [
    "23316",
    "VA"
  ],
  "CHESAPEAKE": [
    "45619",
    "OH"
  ],
  "CHINCOTEAGUE ISLAND": [
    "23336",
    "VA"
  ],
  "WALLOPS ISLAND": [
    "23337",
    "VA"
  ],
  "CRADDOCKVILLE": [
    "23341",
    "VA"
  ],
  "EASTVILLE": [
    "23347",
    "VA"
  ],
  "EXMORE": [
    "23350",
    "VA"
  ],
  "FRANKTOWN": [
    "80116",
    "CO"
  ],
  "GREENBACKVILLE": [
    "23356",
    "VA"
  ],
  "HACKSNECK": [
    "23358",
    "VA"
  ],
  "HALLWOOD": [
    "23359",
    "VA"
  ],
  "HARBORTON": [
    "23389",
    "VA"
  ],
  "HORNTOWN": [
    "23395",
    "VA"
  ],
  "ISLE OF WIGHT": [
    "23397",
    "VA"
  ],
  "KELLER": [
    "99140",
    "WA"
  ],
  "LOCUSTVILLE": [
    "23404",
    "VA"
  ],
  "MACHIPONGO": [
    "23405",
    "VA"
  ],
  "MAPPSVILLE": [
    "23407",
    "VA"
  ],
  "MARIONVILLE": [
    "65705",
    "MO"
  ],
  "MEARS": [
    "49436",
    "MI"
  ],
  "MELFA": [
    "23410",
    "VA"
  ],
  "NASSAWADOX": [
    "23413",
    "VA"
  ],
  "NELSONIA": [
    "23414",
    "VA"
  ],
  "NEW CHURCH": [
    "23415",
    "VA"
  ],
  "OAK HALL": [
    "23416",
    "VA"
  ],
  "ONANCOCK": [
    "23417",
    "VA"
  ],
  "ONLEY": [
    "23418",
    "VA"
  ],
  "OYSTER": [
    "23419",
    "VA"
  ],
  "PAINTER": [
    "23420",
    "VA"
  ],
  "PARKSLEY": [
    "23421",
    "VA"
  ],
  "PUNGOTEAGUE": [
    "23422",
    "VA"
  ],
  "QUINBY": [
    "23423",
    "VA"
  ],
  "RESCUE": [
    "95672",
    "CA"
  ],
  "SAXIS": [
    "23427",
    "VA"
  ],
  "SUFFOLK": [
    "23439",
    "VA"
  ],
  "TANGIER": [
    "23440",
    "VA"
  ],
  "TASLEY": [
    "23441",
    "VA"
  ],
  "TEMPERANCEVILLE": [
    "23442",
    "VA"
  ],
  "VIRGINIA BEACH": [
    "23471",
    "VA"
  ],
  "WACHAPREAGUE": [
    "23480",
    "VA"
  ],
  "WARDTOWN": [
    "23482",
    "VA"
  ],
  "WATTSVILLE": [
    "35182",
    "AL"
  ],
  "WILLIS WHARF": [
    "23486",
    "VA"
  ],
  "NEWPORT NEWS": [
    "23612",
    "VA"
  ],
  "FORT EUSTIS": [
    "23604",
    "VA"
  ],
  "FORT MONROE": [
    "23651",
    "VA"
  ],
  "POQUOSON": [
    "23662",
    "VA"
  ],
  "YORKTOWN": [
    "78164",
    "TX"
  ],
  "LACKEY": [
    "41643",
    "KY"
  ],
  "VIRGINIA STATE UNIVERSITY": [
    "23806",
    "VA"
  ],
  "ALBERTA": [
    "56207",
    "MN"
  ],
  "BOYKINS": [
    "23827",
    "VA"
  ],
  "CAPRON": [
    "61012",
    "IL"
  ],
  "CARSON": [
    "98610",
    "WA"
  ],
  "CHURCH ROAD": [
    "23833",
    "VA"
  ],
  "COLONIAL HEIGHTS": [
    "23834",
    "VA"
  ],
  "COURTLAND": [
    "95615",
    "CA"
  ],
  "DENDRON": [
    "23839",
    "VA"
  ],
  "DEWITT": [
    "61735",
    "IL"
  ],
  "DINWIDDIE": [
    "23841",
    "VA"
  ],
  "DISPUTANTA": [
    "23842",
    "VA"
  ],
  "DOLPHIN": [
    "23843",
    "VA"
  ],
  "DREWRYVILLE": [
    "23844",
    "VA"
  ],
  "EBONY": [
    "23845",
    "VA"
  ],
  "ELBERON": [
    "52225",
    "IA"
  ],
  "EMPORIA": [
    "66801",
    "KS"
  ],
  "FORD": [
    "99013",
    "WA"
  ],
  "FREEMAN": [
    "64746",
    "MO"
  ],
  "GASBURG": [
    "23857",
    "VA"
  ],
  "IVOR": [
    "23866",
    "VA"
  ],
  "JARRATT": [
    "23870",
    "VA"
  ],
  "MC KENNEY": [
    "23872",
    "VA"
  ],
  "NEWSOMS": [
    "23874",
    "VA"
  ],
  "PRINCE GEORGE": [
    "23875",
    "VA"
  ],
  "SEDLEY": [
    "23878",
    "VA"
  ],
  "SKIPPERS": [
    "23879",
    "VA"
  ],
  "SUTHERLAND": [
    "69165",
    "NE"
  ],
  "VALENTINES": [
    "23887",
    "VA"
  ],
  "WARFIELD": [
    "41267",
    "KY"
  ],
  "WILSONS": [
    "23894",
    "VA"
  ],
  "YALE": [
    "74085",
    "OK"
  ],
  "ZUNI": [
    "87327",
    "NM"
  ],
  "FARMVILLE": [
    "27828",
    "NC"
  ],
  "BASKERVILLE": [
    "23915",
    "VA"
  ],
  "BOYDTON": [
    "23917",
    "VA"
  ],
  "BRACEY": [
    "23919",
    "VA"
  ],
  "BRODNAX": [
    "23920",
    "VA"
  ],
  "BURKEVILLE": [
    "75932",
    "TX"
  ],
  "CHARLOTTE COURT HOUSE": [
    "23923",
    "VA"
  ],
  "CHASE CITY": [
    "23924",
    "VA"
  ],
  "CREWE": [
    "23930",
    "VA"
  ],
  "CULLEN": [
    "71021",
    "LA"
  ],
  "DILLWYN": [
    "23936",
    "VA"
  ],
  "DRAKES BRANCH": [
    "23937",
    "VA"
  ],
  "DUNDAS": [
    "62425",
    "IL"
  ],
  "EVERGREEN": [
    "80439",
    "CO"
  ],
  "GREEN BAY": [
    "54344",
    "WI"
  ],
  "HAMPDEN SYDNEY": [
    "23943",
    "VA"
  ],
  "KENBRIDGE": [
    "23944",
    "VA"
  ],
  "KEYSVILLE": [
    "30816",
    "GA"
  ],
  "LA CROSSE": [
    "67548",
    "KS"
  ],
  "MEHERRIN": [
    "23954",
    "VA"
  ],
  "NOTTOWAY": [
    "23955",
    "VA"
  ],
  "PAMPLIN": [
    "23958",
    "VA"
  ],
  "PHENIX": [
    "23959",
    "VA"
  ],
  "RED HOUSE": [
    "25168",
    "WV"
  ],
  "RED OAK": [
    "75154",
    "TX"
  ],
  "RICE": [
    "99167",
    "WA"
  ],
  "SAXE": [
    "23967",
    "VA"
  ],
  "SKIPWITH": [
    "23968",
    "VA"
  ],
  "SOUTH HILL": [
    "23970",
    "VA"
  ],
  "VICTORIA": [
    "77905",
    "TX"
  ],
  "WYLLIESBURG": [
    "23976",
    "VA"
  ],
  "ROANOKE": [
    "76262",
    "TX"
  ],
  "ARARAT": [
    "27007",
    "NC"
  ],
  "AXTON": [
    "24054",
    "VA"
  ],
  "BASSETT": [
    "72313",
    "AR"
  ],
  "BELSPRING": [
    "24058",
    "VA"
  ],
  "BENT MOUNTAIN": [
    "24059",
    "VA"
  ],
  "BLACKSBURG": [
    "29702",
    "SC"
  ],
  "BLUE RIDGE": [
    "75424",
    "TX"
  ],
  "BOONES MILL": [
    "24065",
    "VA"
  ],
  "CHRISTIANSBURG": [
    "45389",
    "OH"
  ],
  "CATAWBA": [
    "54515",
    "WI"
  ],
  "CHECK": [
    "24072",
    "VA"
  ],
  "CLAUDVILLE": [
    "24076",
    "VA"
  ],
  "CLOVERDALE": [
    "97112",
    "OR"
  ],
  "COPPER HILL": [
    "24079",
    "VA"
  ],
  "CRITZ": [
    "24082",
    "VA"
  ],
  "DALEVILLE": [
    "47334",
    "IN"
  ],
  "EAGLE ROCK": [
    "65641",
    "MO"
  ],
  "EGGLESTON": [
    "24086",
    "VA"
  ],
  "ELLISTON": [
    "59728",
    "MT"
  ],
  "FERRUM": [
    "24088",
    "VA"
  ],
  "FIELDALE": [
    "24089",
    "VA"
  ],
  "FINCASTLE": [
    "24090",
    "VA"
  ],
  "FLOYD": [
    "88118",
    "NM"
  ],
  "GLADE HILL": [
    "24092",
    "VA"
  ],
  "GLEN LYN": [
    "24093",
    "VA"
  ],
  "GOODVIEW": [
    "24095",
    "VA"
  ],
  "HARDY": [
    "72542",
    "AR"
  ],
  "HENRY": [
    "61537",
    "IL"
  ],
  "HUDDLESTON": [
    "24104",
    "VA"
  ],
  "INDIAN VALLEY": [
    "83632",
    "ID"
  ],
  "MC COY": [
    "80463",
    "CO"
  ],
  "MEADOWS OF DAN": [
    "24120",
    "VA"
  ],
  "MONETA": [
    "24121",
    "VA"
  ],
  "NARROWS": [
    "24124",
    "VA"
  ],
  "NEWBERN": [
    "38059",
    "TN"
  ],
  "NEW RIVER": [
    "85087",
    "AZ"
  ],
  "PAINT BANK": [
    "24131",
    "VA"
  ],
  "PARROTT": [
    "39877",
    "GA"
  ],
  "PATRICK SPRINGS": [
    "24133",
    "VA"
  ],
  "PEARISBURG": [
    "24134",
    "VA"
  ],
  "PENHOOK": [
    "24137",
    "VA"
  ],
  "PILOT": [
    "24138",
    "VA"
  ],
  "RADFORD": [
    "24143",
    "VA"
  ],
  "RICH CREEK": [
    "24147",
    "VA"
  ],
  "RIDGEWAY": [
    "64481",
    "MO"
  ],
  "RINER": [
    "24149",
    "VA"
  ],
  "RIPPLEMEAD": [
    "24150",
    "VA"
  ],
  "ROCKY MOUNT": [
    "65072",
    "MO"
  ],
  "SANDY LEVEL": [
    "24161",
    "VA"
  ],
  "SHAWSVILLE": [
    "24162",
    "VA"
  ],
  "STANLEYTOWN": [
    "24168",
    "VA"
  ],
  "STUART": [
    "74570",
    "OK"
  ],
  "THAXTON": [
    "38871",
    "MS"
  ],
  "UNION HALL": [
    "24176",
    "VA"
  ],
  "VESTA": [
    "56292",
    "MN"
  ],
  "VINTON": [
    "96135",
    "CA"
  ],
  "WIRTZ": [
    "24184",
    "VA"
  ],
  "WOOLWINE": [
    "24185",
    "VA"
  ],
  "APPALACHIA": [
    "24216",
    "VA"
  ],
  "BEE": [
    "68314",
    "NE"
  ],
  "BEN HUR": [
    "24218",
    "VA"
  ],
  "BIG STONE GAP": [
    "24219",
    "VA"
  ],
  "BIRCHLEAF": [
    "24220",
    "VA"
  ],
  "BLACKWATER": [
    "65322",
    "MO"
  ],
  "CASTLEWOOD": [
    "57223",
    "SD"
  ],
  "CLINCHCO": [
    "24226",
    "VA"
  ],
  "CLINTWOOD": [
    "24228",
    "VA"
  ],
  "COEBURN": [
    "24230",
    "VA"
  ],
  "DANTE": [
    "57329",
    "SD"
  ],
  "DUFFIELD": [
    "24244",
    "VA"
  ],
  "DUNGANNON": [
    "24245",
    "VA"
  ],
  "EAST STONE GAP": [
    "24246",
    "VA"
  ],
  "EWING": [
    "68735",
    "NE"
  ],
  "FORT BLACKMORE": [
    "24250",
    "VA"
  ],
  "GATE CITY": [
    "24251",
    "VA"
  ],
  "HAYSI": [
    "24256",
    "VA"
  ],
  "HILTONS": [
    "24258",
    "VA"
  ],
  "HONAKER": [
    "24260",
    "VA"
  ],
  "KEOKEE": [
    "24265",
    "VA"
  ],
  "MENDOTA": [
    "93640",
    "CA"
  ],
  "NICKELSVILLE": [
    "24271",
    "VA"
  ],
  "NORA": [
    "61059",
    "IL"
  ],
  "PENNINGTON GAP": [
    "24277",
    "VA"
  ],
  "POUND": [
    "54161",
    "WI"
  ],
  "ROSE HILL": [
    "67133",
    "KS"
  ],
  "SAINT CHARLES": [
    "83272",
    "ID"
  ],
  "SAINT PAUL": [
    "97137",
    "OR"
  ],
  "WEBER CITY": [
    "24290",
    "VA"
  ],
  "WHITETOP": [
    "24292",
    "VA"
  ],
  "WISE": [
    "27594",
    "NC"
  ],
  "ATKINS": [
    "72823",
    "AR"
  ],
  "AUSTINVILLE": [
    "50608",
    "IA"
  ],
  "BARREN SPRINGS": [
    "24313",
    "VA"
  ],
  "BASTIAN": [
    "24314",
    "VA"
  ],
  "BLAND": [
    "65014",
    "MO"
  ],
  "CANA": [
    "24317",
    "VA"
  ],
  "CHILHOWIE": [
    "24319",
    "VA"
  ],
  "CROCKETT": [
    "94525",
    "CA"
  ],
  "DRAPER": [
    "84020",
    "UT"
  ],
  "DUGSPUR": [
    "24325",
    "VA"
  ],
  "ELK CREEK": [
    "95939",
    "CA"
  ],
  "EMORY": [
    "75440",
    "TX"
  ],
  "FANCY GAP": [
    "24328",
    "VA"
  ],
  "FRIES": [
    "24330",
    "VA"
  ],
  "GALAX": [
    "24333",
    "VA"
  ],
  "GLADE SPRING": [
    "24340",
    "VA"
  ],
  "HIWASSEE": [
    "24347",
    "VA"
  ],
  "INDEPENDENCE": [
    "97351",
    "OR"
  ],
  "IVANHOE": [
    "93235",
    "CA"
  ],
  "LAMBSBURG": [
    "24351",
    "VA"
  ],
  "LAUREL FORK": [
    "24352",
    "VA"
  ],
  "MAX MEADOWS": [
    "24360",
    "VA"
  ],
  "MEADOWVIEW": [
    "24361",
    "VA"
  ],
  "MOUTH OF WILSON": [
    "24363",
    "VA"
  ],
  "ROCKY GAP": [
    "24366",
    "VA"
  ],
  "RURAL RETREAT": [
    "24368",
    "VA"
  ],
  "SALTVILLE": [
    "24370",
    "VA"
  ],
  "SPEEDWELL": [
    "37870",
    "TN"
  ],
  "TROUTDALE": [
    "97060",
    "OR"
  ],
  "WILLIS": [
    "77378",
    "TX"
  ],
  "WOODLAWN": [
    "75694",
    "TX"
  ],
  "WYTHEVILLE": [
    "24382",
    "VA"
  ],
  "STAUNTON": [
    "62088",
    "IL"
  ],
  "AUGUSTA SPRINGS": [
    "24411",
    "VA"
  ],
  "BLUE GRASS": [
    "52726",
    "IA"
  ],
  "BROWNSBURG": [
    "46112",
    "IN"
  ],
  "CLIFTON FORGE": [
    "24422",
    "VA"
  ],
  "CRAIGSVILLE": [
    "26205",
    "WV"
  ],
  "CRIMORA": [
    "24431",
    "VA"
  ],
  "DOE HILL": [
    "24433",
    "VA"
  ],
  "FORT DEFIANCE": [
    "86504",
    "AZ"
  ],
  "GROTTOES": [
    "24441",
    "VA"
  ],
  "HEAD WATERS": [
    "24442",
    "VA"
  ],
  "HOT SPRINGS": [
    "59845",
    "MT"
  ],
  "IRON GATE": [
    "24448",
    "VA"
  ],
  "LOW MOOR": [
    "52757",
    "IA"
  ],
  "MC DOWELL": [
    "41647",
    "KY"
  ],
  "MIDDLEBROOK": [
    "24459",
    "VA"
  ],
  "MILLBORO": [
    "24460",
    "VA"
  ],
  "MINT SPRING": [
    "24463",
    "VA"
  ],
  "MONTEBELLO": [
    "90640",
    "CA"
  ],
  "MOUNT SIDNEY": [
    "24467",
    "VA"
  ],
  "MUSTOE": [
    "24468",
    "VA"
  ],
  "RAPHINE": [
    "24472",
    "VA"
  ],
  "ROCKBRIDGE BATHS": [
    "24473",
    "VA"
  ],
  "SELMA": [
    "97538",
    "OR"
  ],
  "STEELES TAVERN": [
    "24476",
    "VA"
  ],
  "STUARTS DRAFT": [
    "24477",
    "VA"
  ],
  "SWOOPE": [
    "24479",
    "VA"
  ],
  "VESUVIUS": [
    "24483",
    "VA"
  ],
  "WARM SPRINGS": [
    "97761",
    "OR"
  ],
  "WEST AUGUSTA": [
    "24485",
    "VA"
  ],
  "WEYERS CAVE": [
    "24486",
    "VA"
  ],
  "LYNCHBURG": [
    "65543",
    "MO"
  ],
  "ALTAVISTA": [
    "24517",
    "VA"
  ],
  "APPOMATTOX": [
    "24522",
    "VA"
  ],
  "BIG ISLAND": [
    "24526",
    "VA"
  ],
  "BLAIRS": [
    "24527",
    "VA"
  ],
  "BROOKNEAL": [
    "24528",
    "VA"
  ],
  "BUFFALO JUNCTION": [
    "24529",
    "VA"
  ],
  "CALLANDS": [
    "24530",
    "VA"
  ],
  "CLOVER": [
    "29710",
    "SC"
  ],
  "CLUSTER SPRINGS": [
    "24535",
    "VA"
  ],
  "COLEMAN FALLS": [
    "24536",
    "VA"
  ],
  "CRYSTAL HILL": [
    "24539",
    "VA"
  ],
  "DRY FORK": [
    "24549",
    "VA"
  ],
  "EVINGTON": [
    "24550",
    "VA"
  ],
  "FOREST": [
    "71242",
    "LA"
  ],
  "GLADYS": [
    "24554",
    "VA"
  ],
  "GOODE": [
    "24556",
    "VA"
  ],
  "GRETNA": [
    "70056",
    "LA"
  ],
  "HOWARDSVILLE": [
    "24562",
    "VA"
  ],
  "HURT": [
    "24563",
    "VA"
  ],
  "JAVA": [
    "57452",
    "SD"
  ],
  "KEELING": [
    "24566",
    "VA"
  ],
  "LOWRY": [
    "56349",
    "MN"
  ],
  "LYNCH STATION": [
    "24571",
    "VA"
  ],
  "MADISON HEIGHTS": [
    "48071",
    "MI"
  ],
  "NATHALIE": [
    "24577",
    "VA"
  ],
  "NATURAL BRIDGE STATION": [
    "24579",
    "VA"
  ],
  "RUSTBURG": [
    "24588",
    "VA"
  ],
  "SOUTH BOSTON": [
    "24592",
    "VA"
  ],
  "SPOUT SPRING": [
    "24593",
    "VA"
  ],
  "SUTHERLIN": [
    "97479",
    "OR"
  ],
  "SWEET BRIAR": [
    "24595",
    "VA"
  ],
  "VERNON HILL": [
    "24597",
    "VA"
  ],
  "VIRGILINA": [
    "24598",
    "VA"
  ],
  "WINGINA": [
    "24599",
    "VA"
  ],
  "AMONATE": [
    "24601",
    "VA"
  ],
  "BANDY": [
    "24602",
    "VA"
  ],
  "BIG ROCK": [
    "60511",
    "IL"
  ],
  "BISHOP": [
    "93515",
    "CA"
  ],
  "BLUEFIELD": [
    "24701",
    "WV"
  ],
  "BOISSEVAIN": [
    "24606",
    "VA"
  ],
  "BREAKS": [
    "24607",
    "VA"
  ],
  "BURKES GARDEN": [
    "24608",
    "VA"
  ],
  "CEDAR BLUFF": [
    "35959",
    "AL"
  ],
  "DORAN": [
    "24612",
    "VA"
  ],
  "FALLS MILLS": [
    "24613",
    "VA"
  ],
  "GRUNDY": [
    "24614",
    "VA"
  ],
  "JEWELL RIDGE": [
    "24622",
    "VA"
  ],
  "KEEN MOUNTAIN": [
    "24624",
    "VA"
  ],
  "MAVISDALE": [
    "24627",
    "VA"
  ],
  "MAXIE": [
    "24628",
    "VA"
  ],
  "NORTH TAZEWELL": [
    "24630",
    "VA"
  ],
  "OAKWOOD": [
    "75855",
    "TX"
  ],
  "PILGRIMS KNOB": [
    "24634",
    "VA"
  ],
  "POCAHONTAS": [
    "72455",
    "AR"
  ],
  "POUNDING MILL": [
    "24637",
    "VA"
  ],
  "RAVEN": [
    "41861",
    "KY"
  ],
  "RED ASH": [
    "24640",
    "VA"
  ],
  "RICHLANDS": [
    "28574",
    "NC"
  ],
  "SHORTT GAP": [
    "24647",
    "VA"
  ],
  "SWORDS CREEK": [
    "24649",
    "VA"
  ],
  "TAZEWELL": [
    "37879",
    "TN"
  ],
  "VANSANT": [
    "24656",
    "VA"
  ],
  "WHITEWOOD": [
    "57793",
    "SD"
  ],
  "BEESON": [
    "24714",
    "WV"
  ],
  "BRAMWELL": [
    "24715",
    "WV"
  ],
  "BUD": [
    "24716",
    "WV"
  ],
  "HIAWATHA": [
    "66434",
    "KS"
  ],
  "KEGLEY": [
    "24731",
    "WV"
  ],
  "KELLYSVILLE": [
    "24732",
    "WV"
  ],
  "LASHMEET": [
    "24733",
    "WV"
  ],
  "MATOAKA": [
    "24736",
    "WV"
  ],
  "MONTCALM": [
    "24737",
    "WV"
  ],
  "ROCK": [
    "67131",
    "KS"
  ],
  "WOLFE": [
    "24751",
    "WV"
  ],
  "WELCH": [
    "79377",
    "TX"
  ],
  "ANAWALT": [
    "24808",
    "WV"
  ],
  "BARTLEY": [
    "69020",
    "NE"
  ],
  "BERWIND": [
    "24815",
    "WV"
  ],
  "BIG SANDY": [
    "75755",
    "TX"
  ],
  "BRADSHAW": [
    "68319",
    "NE"
  ],
  "BRENTON": [
    "24818",
    "WV"
  ],
  "CLEAR FORK": [
    "24822",
    "WV"
  ],
  "COAL MOUNTAIN": [
    "24823",
    "WV"
  ],
  "CUCUMBER": [
    "24826",
    "WV"
  ],
  "DAVY": [
    "24828",
    "WV"
  ],
  "ECKMAN": [
    "24829",
    "WV"
  ],
  "ELKHORN": [
    "68022",
    "NE"
  ],
  "GARY": [
    "75643",
    "TX"
  ],
  "IAEGER": [
    "24844",
    "WV"
  ],
  "IKES FORK": [
    "24845",
    "WV"
  ],
  "ITMANN": [
    "24847",
    "WV"
  ],
  "JESSE": [
    "24849",
    "WV"
  ],
  "JOLO": [
    "24850",
    "WV"
  ],
  "JUSTICE": [
    "60458",
    "IL"
  ],
  "KIMBALL": [
    "69145",
    "NE"
  ],
  "KOPPERSTON": [
    "24854",
    "WV"
  ],
  "LYNCO": [
    "24857",
    "WV"
  ],
  "MATHENY": [
    "24860",
    "WV"
  ],
  "MAYBEURY": [
    "24861",
    "WV"
  ],
  "NEWHALL": [
    "91322",
    "CA"
  ],
  "NEW RICHMOND": [
    "54017",
    "WI"
  ],
  "NORTHFORK": [
    "24868",
    "WV"
  ],
  "NORTH SPRING": [
    "24869",
    "WV"
  ],
  "OCEANA": [
    "24870",
    "WV"
  ],
  "PANTHER": [
    "24872",
    "WV"
  ],
  "PAYNESVILLE": [
    "56362",
    "MN"
  ],
  "PREMIER": [
    "24878",
    "WV"
  ],
  "RAYSAL": [
    "24879",
    "WV"
  ],
  "ROCK VIEW": [
    "24880",
    "WV"
  ],
  "RODERFIELD": [
    "24881",
    "WV"
  ],
  "SIMON": [
    "24882",
    "WV"
  ],
  "SQUIRE": [
    "24884",
    "WV"
  ],
  "THORPE": [
    "24888",
    "WV"
  ],
  "WAR": [
    "24892",
    "WV"
  ],
  "FAIRLEA": [
    "24902",
    "WV"
  ],
  "ALDERSON": [
    "74522",
    "OK"
  ],
  "ARBOVALE": [
    "24915",
    "WV"
  ],
  "BALLARD": [
    "24918",
    "WV"
  ],
  "BARTOW": [
    "33831",
    "FL"
  ],
  "BUCKEYE": [
    "85396",
    "AZ"
  ],
  "CASS": [
    "24927",
    "WV"
  ],
  "CRAWLEY": [
    "24931",
    "WV"
  ],
  "DUNMORE": [
    "24934",
    "WV"
  ],
  "GAP MILLS": [
    "24941",
    "WV"
  ],
  "GREEN BANK": [
    "24944",
    "WV"
  ],
  "LINDSIDE": [
    "24951",
    "WV"
  ],
  "MARLINTON": [
    "24954",
    "WV"
  ],
  "MAXWELTON": [
    "24957",
    "WV"
  ],
  "PENCE SPRINGS": [
    "24962",
    "WV"
  ],
  "PETERSTOWN": [
    "24963",
    "WV"
  ],
  "RENICK": [
    "24966",
    "WV"
  ],
  "RONCEVERTE": [
    "24970",
    "WV"
  ],
  "SECONDCREEK": [
    "24974",
    "WV"
  ],
  "SINKS GROVE": [
    "24976",
    "WV"
  ],
  "SMOOT": [
    "83126",
    "WY"
  ],
  "TALCOTT": [
    "24981",
    "WV"
  ],
  "WAYSIDE": [
    "79094",
    "TX"
  ],
  "WOLFCREEK": [
    "24993",
    "WV"
  ],
  "ALLOY": [
    "25002",
    "WV"
  ],
  "ALUM CREEK": [
    "25003",
    "WV"
  ],
  "AMMA": [
    "25005",
    "WV"
  ],
  "BANCROFT": [
    "83217",
    "ID"
  ],
  "BELLE": [
    "65013",
    "MO"
  ],
  "BICKMORE": [
    "25019",
    "WV"
  ],
  "BIM": [
    "25021",
    "WV"
  ],
  "BLOOMINGROSE": [
    "25024",
    "WV"
  ],
  "BLUE CREEK": [
    "45616",
    "OH"
  ],
  "BOMONT": [
    "25030",
    "WV"
  ],
  "BOOMER": [
    "28606",
    "NC"
  ],
  "CABIN CREEK": [
    "25035",
    "WV"
  ],
  "CANNELTON": [
    "47520",
    "IN"
  ],
  "CHARLTON HEIGHTS": [
    "25040",
    "WV"
  ],
  "CLEAR CREEK": [
    "47426",
    "IN"
  ],
  "CLENDENIN": [
    "25045",
    "WV"
  ],
  "CLOTHIER": [
    "25047",
    "WV"
  ],
  "COLCORD": [
    "74338",
    "OK"
  ],
  "COMFORT": [
    "78013",
    "TX"
  ],
  "DAWES": [
    "25054",
    "WV"
  ],
  "DIXIE": [
    "99329",
    "WA"
  ],
  "DRY CREEK": [
    "70637",
    "LA"
  ],
  "DUCK": [
    "25063",
    "WV"
  ],
  "EAST BANK": [
    "25067",
    "WV"
  ],
  "ELEANOR": [
    "25070",
    "WV"
  ],
  "ELKVIEW": [
    "25071",
    "WV"
  ],
  "ESKDALE": [
    "25075",
    "WV"
  ],
  "ETHEL": [
    "98542",
    "WA"
  ],
  "FRAZIERS BOTTOM": [
    "25082",
    "WV"
  ],
  "GALLAGHER": [
    "25083",
    "WV"
  ],
  "GAULEY BRIDGE": [
    "25085",
    "WV"
  ],
  "GLEN FERRIS": [
    "25090",
    "WV"
  ],
  "HANDLEY": [
    "25102",
    "WV"
  ],
  "HANSFORD": [
    "25103",
    "WV"
  ],
  "HERNSHAW": [
    "25107",
    "WV"
  ],
  "HEWETT": [
    "25108",
    "WV"
  ],
  "HOMETOWN": [
    "60456",
    "IL"
  ],
  "HUGHESTON": [
    "25110",
    "WV"
  ],
  "INDORE": [
    "25111",
    "WV"
  ],
  "INSTITUTE": [
    "25112",
    "WV"
  ],
  "IVYDALE": [
    "25113",
    "WV"
  ],
  "JEFFREY": [
    "25114",
    "WV"
  ],
  "KANAWHA FALLS": [
    "25115",
    "WV"
  ],
  "KIMBERLY": [
    "83341",
    "ID"
  ],
  "KINCAID": [
    "66039",
    "KS"
  ],
  "LAKE": [
    "48632",
    "MI"
  ],
  "LIZEMORES": [
    "25125",
    "WV"
  ],
  "LONDON": [
    "76854",
    "TX"
  ],
  "MAYSEL": [
    "25133",
    "WV"
  ],
  "MIAMI": [
    "87729",
    "NM"
  ],
  "MOUNT CARBON": [
    "25139",
    "WV"
  ],
  "NAOMA": [
    "25140",
    "WV"
  ],
  "NEBO": [
    "62355",
    "IL"
  ],
  "NITRO": [
    "25143",
    "WV"
  ],
  "ORGAS": [
    "25148",
    "WV"
  ],
  "PEYTONA": [
    "25154",
    "WV"
  ],
  "PINCH": [
    "25156",
    "WV"
  ],
  "POCA": [
    "25159",
    "WV"
  ],
  "POND GAP": [
    "25160",
    "WV"
  ],
  "POWELLTON": [
    "25161",
    "WV"
  ],
  "PRATT": [
    "67124",
    "KS"
  ],
  "PROCIOUS": [
    "25164",
    "WV"
  ],
  "RACINE": [
    "64858",
    "MO"
  ],
  "ROBSON": [
    "25173",
    "WV"
  ],
  "SETH": [
    "25181",
    "WV"
  ],
  "SHARPLES": [
    "25183",
    "WV"
  ],
  "MOUNT OLIVE": [
    "62069",
    "IL"
  ],
  "SMITHERS": [
    "25186",
    "WV"
  ],
  "SOUTHSIDE": [
    "37171",
    "TN"
  ],
  "SYLVESTER": [
    "79560",
    "TX"
  ],
  "TAD": [
    "25201",
    "WV"
  ],
  "TORNADO": [
    "25202",
    "WV"
  ],
  "UNEEDA": [
    "25205",
    "WV"
  ],
  "VAN": [
    "75790",
    "TX"
  ],
  "WINIFREDE": [
    "25214",
    "WV"
  ],
  "ARNOLDSBURG": [
    "25234",
    "WV"
  ],
  "CHLOE": [
    "25235",
    "WV"
  ],
  "COTTAGEVILLE": [
    "29435",
    "SC"
  ],
  "EVANS": [
    "99126",
    "WA"
  ],
  "GANDEEVILLE": [
    "25243",
    "WV"
  ],
  "GAY": [
    "30218",
    "GA"
  ],
  "GIVEN": [
    "25245",
    "WV"
  ],
  "KENNA": [
    "25248",
    "WV"
  ],
  "LEFT HAND": [
    "25251",
    "WV"
  ],
  "LETART": [
    "25253",
    "WV"
  ],
  "LOONEYVILLE": [
    "25259",
    "WV"
  ],
  "MASON": [
    "76856",
    "TX"
  ],
  "MILLSTONE": [
    "25261",
    "WV"
  ],
  "MOUNT ALTO": [
    "25264",
    "WV"
  ],
  "NORMANTOWN": [
    "25267",
    "WV"
  ],
  "ORMA": [
    "25268",
    "WV"
  ],
  "REEDY": [
    "25270",
    "WV"
  ],
  "SANDYVILLE": [
    "44671",
    "OH"
  ],
  "WALLBACK": [
    "25285",
    "WV"
  ],
  "WEST COLUMBIA": [
    "77486",
    "TX"
  ],
  "BERKELEY SPRINGS": [
    "25411",
    "WV"
  ],
  "BUNKER HILL": [
    "67626",
    "KS"
  ],
  "CHARLES TOWN": [
    "25414",
    "WV"
  ],
  "FALLING WATERS": [
    "25419",
    "WV"
  ],
  "GERRARDSTOWN": [
    "25420",
    "WV"
  ],
  "GLENGARY": [
    "25421",
    "WV"
  ],
  "GREAT CACAPON": [
    "25422",
    "WV"
  ],
  "HALLTOWN": [
    "65664",
    "MO"
  ],
  "HARPERS FERRY": [
    "52146",
    "IA"
  ],
  "HEDGESVILLE": [
    "25427",
    "WV"
  ],
  "KEARNEYSVILLE": [
    "25430",
    "WV"
  ],
  "LEVELS": [
    "25431",
    "WV"
  ],
  "PAW PAW": [
    "61353",
    "IL"
  ],
  "RANSON": [
    "25438",
    "WV"
  ],
  "RIPPON": [
    "25441",
    "WV"
  ],
  "SHENANDOAH JUNCTION": [
    "25442",
    "WV"
  ],
  "SHEPHERDSTOWN": [
    "25443",
    "WV"
  ],
  "SLANESVILLE": [
    "25444",
    "WV"
  ],
  "SUMMIT POINT": [
    "25446",
    "WV"
  ],
  "ALKOL": [
    "25501",
    "WV"
  ],
  "APPLE GROVE": [
    "25502",
    "WV"
  ],
  "BIG CREEK": [
    "93605",
    "CA"
  ],
  "BRANCHLAND": [
    "25506",
    "WV"
  ],
  "CEREDO": [
    "25507",
    "WV"
  ],
  "CHAPMANVILLE": [
    "25508",
    "WV"
  ],
  "CULLODEN": [
    "31016",
    "GA"
  ],
  "DUNLOW": [
    "25511",
    "WV"
  ],
  "EAST LYNN": [
    "60932",
    "IL"
  ],
  "FORT GAY": [
    "25514",
    "WV"
  ],
  "GALLIPOLIS FERRY": [
    "25515",
    "WV"
  ],
  "GRIFFITHSVILLE": [
    "25521",
    "WV"
  ],
  "HARTS": [
    "25524",
    "WV"
  ],
  "HURRICANE": [
    "84737",
    "UT"
  ],
  "KENOVA": [
    "25530",
    "WV"
  ],
  "KIAHSVILLE": [
    "25534",
    "WV"
  ],
  "LAVALETTE": [
    "25535",
    "WV"
  ],
  "LESAGE": [
    "25537",
    "WV"
  ],
  "MIDKIFF": [
    "79755",
    "TX"
  ],
  "ONA": [
    "33865",
    "FL"
  ],
  "PECKS MILL": [
    "25547",
    "WV"
  ],
  "PRICHARD": [
    "25555",
    "WV"
  ],
  "RANGER": [
    "76470",
    "TX"
  ],
  "SALT ROCK": [
    "25559",
    "WV"
  ],
  "SCOTT DEPOT": [
    "25560",
    "WV"
  ],
  "SOD": [
    "25564",
    "WV"
  ],
  "SPURLOCKVILLE": [
    "25565",
    "WV"
  ],
  "SUMERCO": [
    "25567",
    "WV"
  ],
  "TEAYS": [
    "25569",
    "WV"
  ],
  "WEST HAMLIN": [
    "25571",
    "WV"
  ],
  "YAWKEY": [
    "25573",
    "WV"
  ],
  "LOGAN": [
    "88426",
    "NM"
  ],
  "ACCOVILLE": [
    "25606",
    "WV"
  ],
  "AMHERSTDALE": [
    "25607",
    "WV"
  ],
  "BRUNO": [
    "68014",
    "NE"
  ],
  "CHAUNCEY": [
    "45719",
    "OH"
  ],
  "CORA": [
    "82925",
    "WY"
  ],
  "DAVIN": [
    "25617",
    "WV"
  ],
  "KISTLER": [
    "25628",
    "WV"
  ],
  "LORADO": [
    "25630",
    "WV"
  ],
  "LYBURN": [
    "25632",
    "WV"
  ],
  "MAN": [
    "25635",
    "WV"
  ],
  "MOUNT GAY": [
    "25637",
    "WV"
  ],
  "OMAR": [
    "25638",
    "WV"
  ],
  "PEACH CREEK": [
    "25639",
    "WV"
  ],
  "STOLLINGS": [
    "25646",
    "WV"
  ],
  "SWITZER": [
    "25647",
    "WV"
  ],
  "VERDUNVILLE": [
    "25649",
    "WV"
  ],
  "VERNER": [
    "25650",
    "WV"
  ],
  "WHARNCLIFFE": [
    "25651",
    "WV"
  ],
  "WILKINSON": [
    "46186",
    "IN"
  ],
  "YOLYN": [
    "25654",
    "WV"
  ],
  "BORDERLAND": [
    "25665",
    "WV"
  ],
  "BREEDEN": [
    "25666",
    "WV"
  ],
  "CHATTAROY": [
    "99003",
    "WA"
  ],
  "CRUM": [
    "25669",
    "WV"
  ],
  "DELBARTON": [
    "25670",
    "WV"
  ],
  "DINGESS": [
    "25671",
    "WV"
  ],
  "EDGARTON": [
    "25672",
    "WV"
  ],
  "KERMIT": [
    "79745",
    "TX"
  ],
  "LENORE": [
    "83541",
    "ID"
  ],
  "MATEWAN": [
    "25678",
    "WV"
  ],
  "NORTH MATEWAN": [
    "25688",
    "WV"
  ],
  "RAGLAND": [
    "35131",
    "AL"
  ],
  "RAWL": [
    "25691",
    "WV"
  ],
  "RED JACKET": [
    "25692",
    "WV"
  ],
  "VARNEY": [
    "41571",
    "KY"
  ],
  "BECKLEY": [
    "25802",
    "WV"
  ],
  "ALLEN JUNCTION": [
    "25810",
    "WV"
  ],
  "AMIGO": [
    "25811",
    "WV"
  ],
  "ANSTED": [
    "25812",
    "WV"
  ],
  "BOLT": [
    "25817",
    "WV"
  ],
  "CAMP CREEK": [
    "25820",
    "WV"
  ],
  "COAL CITY": [
    "60416",
    "IL"
  ],
  "COOL RIDGE": [
    "25825",
    "WV"
  ],
  "CORINNE": [
    "84307",
    "UT"
  ],
  "CRAB ORCHARD": [
    "68332",
    "NE"
  ],
  "DANESE": [
    "25831",
    "WV"
  ],
  "DANIELS": [
    "25832",
    "WV"
  ],
  "DOTHAN": [
    "36305",
    "AL"
  ],
  "ECCLES": [
    "25836",
    "WV"
  ],
  "EDMOND": [
    "73083",
    "OK"
  ],
  "FAIRDALE": [
    "58229",
    "ND"
  ],
  "FLAT TOP": [
    "25841",
    "WV"
  ],
  "GLEN DANIEL": [
    "25844",
    "WV"
  ],
  "GLEN FORK": [
    "25845",
    "WV"
  ],
  "GLEN JEAN": [
    "25846",
    "WV"
  ],
  "GLEN ROGERS": [
    "25848",
    "WV"
  ],
  "GLEN WHITE": [
    "25849",
    "WV"
  ],
  "HARPER": [
    "78631",
    "TX"
  ],
  "HICO": [
    "76457",
    "TX"
  ],
  "HILLTOP": [
    "25855",
    "WV"
  ],
  "LANARK": [
    "61046",
    "IL"
  ],
  "LAYLAND": [
    "25864",
    "WV"
  ],
  "LESTER": [
    "51242",
    "IA"
  ],
  "LOCHGELLY": [
    "25866",
    "WV"
  ],
  "LOOKOUT": [
    "96054",
    "CA"
  ],
  "MABEN": [
    "39750",
    "MS"
  ],
  "MABSCOTT": [
    "25871",
    "WV"
  ],
  "MAC ARTHUR": [
    "25873",
    "WV"
  ],
  "SAULSVILLE": [
    "25876",
    "WV"
  ],
  "MINDEN": [
    "89423",
    "NV"
  ],
  "MOUNT HOPE": [
    "67108",
    "KS"
  ],
  "MULLENS": [
    "25882",
    "WV"
  ],
  "PAX": [
    "25904",
    "WV"
  ],
  "PINEY VIEW": [
    "25906",
    "WV"
  ],
  "RALEIGH": [
    "62977",
    "IL"
  ],
  "RAVENCLIFF": [
    "25913",
    "WV"
  ],
  "RHODELL": [
    "25915",
    "WV"
  ],
  "SCARBRO": [
    "25917",
    "WV"
  ],
  "SHADY SPRING": [
    "25918",
    "WV"
  ],
  "SKELTON": [
    "25919",
    "WV"
  ],
  "SLAB FORK": [
    "25920",
    "WV"
  ],
  "SOPHIA": [
    "27350",
    "NC"
  ],
  "SPANISHBURG": [
    "25922",
    "WV"
  ],
  "STANAFORD": [
    "25927",
    "WV"
  ],
  "SURVEYOR": [
    "25932",
    "WV"
  ],
  "THURMOND": [
    "28683",
    "NC"
  ],
  "WINONA": [
    "75792",
    "TX"
  ],
  "CHARMCO": [
    "25958",
    "WV"
  ],
  "RAINELLE": [
    "25962",
    "WV"
  ],
  "GREEN SULPHUR SPRINGS": [
    "25966",
    "WV"
  ],
  "JUMPING BRANCH": [
    "25969",
    "WV"
  ],
  "LERONA": [
    "25971",
    "WV"
  ],
  "MEADOW BRIDGE": [
    "25976",
    "WV"
  ],
  "MEADOW CREEK": [
    "25977",
    "WV"
  ],
  "NIMITZ": [
    "25978",
    "WV"
  ],
  "PIPESTEM": [
    "25979",
    "WV"
  ],
  "QUINWOOD": [
    "25981",
    "WV"
  ],
  "SANDSTONE": [
    "55072",
    "MN"
  ],
  "SPRING DALE": [
    "25986",
    "WV"
  ],
  "WHITE OAK": [
    "75693",
    "TX"
  ],
  "WHEELING": [
    "64688",
    "MO"
  ],
  "BEECH BOTTOM": [
    "26030",
    "WV"
  ],
  "BENWOOD": [
    "26031",
    "WV"
  ],
  "CAMERON": [
    "86020",
    "AZ"
  ],
  "COLLIERS": [
    "26035",
    "WV"
  ],
  "FOLLANSBEE": [
    "26037",
    "WV"
  ],
  "GLEN DALE": [
    "26038",
    "WV"
  ],
  "GLEN EASTON": [
    "26039",
    "WV"
  ],
  "MCMECHEN": [
    "26040",
    "WV"
  ],
  "MOUNDSVILLE": [
    "26041",
    "WV"
  ],
  "NEW MANCHESTER": [
    "26056",
    "WV"
  ],
  "SHORT CREEK": [
    "26058",
    "WV"
  ],
  "TRIADELPHIA": [
    "26059",
    "WV"
  ],
  "VALLEY GROVE": [
    "26060",
    "WV"
  ],
  "WEIRTON": [
    "26062",
    "WV"
  ],
  "WEST LIBERTY": [
    "62475",
    "IL"
  ],
  "WINDSOR HEIGHTS": [
    "50324",
    "IA"
  ],
  "PARKERSBURG": [
    "62452",
    "IL"
  ],
  "MINERAL WELLS": [
    "76068",
    "TX"
  ],
  "BIG BEND": [
    "96011",
    "CA"
  ],
  "BIG SPRINGS": [
    "69122",
    "NE"
  ],
  "CRESTON": [
    "99117",
    "WA"
  ],
  "DAVISVILLE": [
    "65456",
    "MO"
  ],
  "FRIENDLY": [
    "26146",
    "WV"
  ],
  "MACFARLAN": [
    "26148",
    "WV"
  ],
  "MIDDLEBOURNE": [
    "26149",
    "WV"
  ],
  "MOUNT ZION": [
    "30150",
    "GA"
  ],
  "MUNDAY": [
    "76371",
    "TX"
  ],
  "NEW MARTINSVILLE": [
    "26155",
    "WV"
  ],
  "PADEN CITY": [
    "26159",
    "WV"
  ],
  "PALESTINE": [
    "75803",
    "TX"
  ],
  "PETROLEUM": [
    "46778",
    "IN"
  ],
  "PORTERS FALLS": [
    "26162",
    "WV"
  ],
  "RAVENSWOOD": [
    "26164",
    "WV"
  ],
  "READER": [
    "26167",
    "WV"
  ],
  "SISTERSVILLE": [
    "26175",
    "WV"
  ],
  "SMITHVILLE": [
    "78957",
    "TX"
  ],
  "WALKER": [
    "70785",
    "LA"
  ],
  "BUCKHANNON": [
    "26201",
    "WV"
  ],
  "FENWICK": [
    "48834",
    "MI"
  ],
  "ERBACON": [
    "26203",
    "WV"
  ],
  "COWEN": [
    "26206",
    "WV"
  ],
  "CAMDEN ON GAULEY": [
    "26208",
    "WV"
  ],
  "SNOWSHOE": [
    "26209",
    "WV"
  ],
  "DIANA": [
    "75640",
    "TX"
  ],
  "FRENCH CREEK": [
    "26218",
    "WV"
  ],
  "HACKER VALLEY": [
    "26222",
    "WV"
  ],
  "HELVETIA": [
    "26224",
    "WV"
  ],
  "KANAWHA HEAD": [
    "26228",
    "WV"
  ],
  "ROCK CAVE": [
    "26234",
    "WV"
  ],
  "TALLMANSVILLE": [
    "26237",
    "WV"
  ],
  "VOLGA": [
    "57071",
    "SD"
  ],
  "BELINGTON": [
    "26250",
    "WV"
  ],
  "BOWDEN": [
    "26254",
    "WV"
  ],
  "COALTON": [
    "45621",
    "OH"
  ],
  "DAILEY": [
    "26259",
    "WV"
  ],
  "DAVIS": [
    "95618",
    "CA"
  ],
  "DRYFORK": [
    "26263",
    "WV"
  ],
  "DURBIN": [
    "26264",
    "WV"
  ],
  "UPPERGLADE": [
    "26266",
    "WV"
  ],
  "ELLAMORE": [
    "26267",
    "WV"
  ],
  "GLADY": [
    "26268",
    "WV"
  ],
  "HAMBLETON": [
    "26269",
    "WV"
  ],
  "HARMAN": [
    "26270",
    "WV"
  ],
  "HENDRICKS": [
    "56136",
    "MN"
  ],
  "HUTTONSVILLE": [
    "26273",
    "WV"
  ],
  "JUNIOR": [
    "26275",
    "WV"
  ],
  "KERENS": [
    "75144",
    "TX"
  ],
  "MABIE": [
    "26278",
    "WV"
  ],
  "MONTERVILLE": [
    "26282",
    "WV"
  ],
  "PARSONS": [
    "67357",
    "KS"
  ],
  "WEBSTER SPRINGS": [
    "26288",
    "WV"
  ],
  "SLATYFORK": [
    "26291",
    "WV"
  ],
  "THOMAS": [
    "73669",
    "OK"
  ],
  "VALLEY BEND": [
    "26293",
    "WV"
  ],
  "VALLEY HEAD": [
    "35989",
    "AL"
  ],
  "WHITMER": [
    "26296",
    "WV"
  ],
  "ALMA": [
    "80420",
    "CO"
  ],
  "ALUM BRIDGE": [
    "26321",
    "WV"
  ],
  "ANMOORE": [
    "26323",
    "WV"
  ],
  "BEREA": [
    "44017",
    "OH"
  ],
  "BURNSVILLE": [
    "55337",
    "MN"
  ],
  "CENTER POINT": [
    "78010",
    "TX"
  ],
  "COXS MILLS": [
    "26342",
    "WV"
  ],
  "CRAWFORD": [
    "81415",
    "CO"
  ],
  "ELLENBORO": [
    "28040",
    "NC"
  ],
  "GALLOWAY": [
    "43119",
    "OH"
  ],
  "GYPSY": [
    "26361",
    "WV"
  ],
  "HEPZIBAH": [
    "26369",
    "WV"
  ],
  "HORNER": [
    "26372",
    "WV"
  ],
  "IRELAND": [
    "47545",
    "IN"
  ],
  "JACKSONBURG": [
    "26377",
    "WV"
  ],
  "JANE LEW": [
    "26378",
    "WV"
  ],
  "LINN": [
    "78563",
    "TX"
  ],
  "LOST CREEK": [
    "41348",
    "KY"
  ],
  "LUMBERPORT": [
    "26386",
    "WV"
  ],
  "MEADOWBROOK": [
    "26404",
    "WV"
  ],
  "MOATSVILLE": [
    "26405",
    "WV"
  ],
  "MOUNT CLARE": [
    "26408",
    "WV"
  ],
  "NEW MILTON": [
    "26411",
    "WV"
  ],
  "PENNSBORO": [
    "26415",
    "WV"
  ],
  "PHILIPPI": [
    "26416",
    "WV"
  ],
  "PULLMAN": [
    "99164",
    "WA"
  ],
  "ROWLESBURG": [
    "26425",
    "WV"
  ],
  "SAND FORK": [
    "26430",
    "WV"
  ],
  "SHINNSTON": [
    "26431",
    "WV"
  ],
  "SIMPSON": [
    "71474",
    "LA"
  ],
  "SMITHBURG": [
    "26436",
    "WV"
  ],
  "SPELTER": [
    "26438",
    "WV"
  ],
  "TUNNELTON": [
    "47467",
    "IN"
  ],
  "WALLACE": [
    "95254",
    "CA"
  ],
  "WEST UNION": [
    "62477",
    "IL"
  ],
  "ALBRIGHT": [
    "26519",
    "WV"
  ],
  "ARTHURDALE": [
    "26520",
    "WV"
  ],
  "BLACKSVILLE": [
    "26521",
    "WV"
  ],
  "BRETZ": [
    "26524",
    "WV"
  ],
  "BRUCETON MILLS": [
    "26525",
    "WV"
  ],
  "DELLSLOW": [
    "26531",
    "WV"
  ],
  "KINGWOOD": [
    "77345",
    "TX"
  ],
  "MAIDSVILLE": [
    "26541",
    "WV"
  ],
  "OSAGE": [
    "82723",
    "WY"
  ],
  "PENTRESS": [
    "26544",
    "WV"
  ],
  "PURSGLOVE": [
    "26546",
    "WV"
  ],
  "FAIRMONT": [
    "73736",
    "OK"
  ],
  "BARRACKVILLE": [
    "26559",
    "WV"
  ],
  "BAXTER": [
    "56425",
    "MN"
  ],
  "BURTON": [
    "98013",
    "WA"
  ],
  "ENTERPRISE": [
    "97828",
    "OR"
  ],
  "GRANT TOWN": [
    "26574",
    "WV"
  ],
  "HUNDRED": [
    "26575",
    "WV"
  ],
  "IDAMAY": [
    "26576",
    "WV"
  ],
  "KINGMONT": [
    "26578",
    "WV"
  ],
  "MANNINGTON": [
    "26582",
    "WV"
  ],
  "METZ": [
    "64765",
    "MO"
  ],
  "MONTANA MINES": [
    "26586",
    "WV"
  ],
  "RACHEL": [
    "26587",
    "WV"
  ],
  "RIVESVILLE": [
    "26588",
    "WV"
  ],
  "WANA": [
    "26590",
    "WV"
  ],
  "BIRCH RIVER": [
    "26610",
    "WV"
  ],
  "COPEN": [
    "26615",
    "WV"
  ],
  "EXCHANGE": [
    "26619",
    "WV"
  ],
  "FLATWOODS": [
    "71427",
    "LA"
  ],
  "FRAMETOWN": [
    "26623",
    "WV"
  ],
  "GASSAWAY": [
    "26624",
    "WV"
  ],
  "HEATERS": [
    "26627",
    "WV"
  ],
  "LITTLE BIRCH": [
    "26629",
    "WV"
  ],
  "SHOCK": [
    "26638",
    "WV"
  ],
  "SUMMERSVILLE": [
    "65571",
    "MO"
  ],
  "BELVA": [
    "26656",
    "WV"
  ],
  "CANVAS": [
    "26662",
    "WV"
  ],
  "DRENNEN": [
    "26667",
    "WV"
  ],
  "KESLERS CROSS LANES": [
    "26675",
    "WV"
  ],
  "LEIVASY": [
    "26676",
    "WV"
  ],
  "MOUNT LOOKOUT": [
    "26678",
    "WV"
  ],
  "MOUNT NEBO": [
    "26679",
    "WV"
  ],
  "NALLEN": [
    "26680",
    "WV"
  ],
  "NETTIE": [
    "26681",
    "WV"
  ],
  "POOL": [
    "26684",
    "WV"
  ],
  "SWISS": [
    "26690",
    "WV"
  ],
  "BAYARD": [
    "88023",
    "NM"
  ],
  "CAPON BRIDGE": [
    "26711",
    "WV"
  ],
  "DELRAY": [
    "26714",
    "WV"
  ],
  "EGLON": [
    "26716",
    "WV"
  ],
  "ELK GARDEN": [
    "26717",
    "WV"
  ],
  "FORT ASHBY": [
    "26719",
    "WV"
  ],
  "GORMANIA": [
    "26720",
    "WV"
  ],
  "GREEN SPRING": [
    "26722",
    "WV"
  ],
  "KEYSER": [
    "26726",
    "WV"
  ],
  "LAHMANSVILLE": [
    "26731",
    "WV"
  ],
  "MOUNT STORM": [
    "26739",
    "WV"
  ],
  "NEW CREEK": [
    "26743",
    "WV"
  ],
  "PIEDMONT": [
    "94620",
    "CA"
  ],
  "RIDGELEY": [
    "26753",
    "WV"
  ],
  "RIO": [
    "61472",
    "IL"
  ],
  "ROMNEY": [
    "47981",
    "IN"
  ],
  "SHANKS": [
    "26761",
    "WV"
  ],
  "TERRA ALTA": [
    "26764",
    "WV"
  ],
  "WILEY FORD": [
    "26767",
    "WV"
  ],
  "BAKER": [
    "92309",
    "CA"
  ],
  "HIGH VIEW": [
    "26808",
    "WV"
  ],
  "LOST CITY": [
    "26810",
    "WV"
  ],
  "MATHIAS": [
    "26812",
    "WV"
  ],
  "BLOOMERY": [
    "26817",
    "WV"
  ],
  "FISHER": [
    "72429",
    "AR"
  ],
  "CAPON SPRINGS": [
    "26823",
    "WV"
  ],
  "MAYSVILLE": [
    "73057",
    "OK"
  ],
  "MOOREFIELD": [
    "69039",
    "NE"
  ],
  "OLD FIELDS": [
    "26845",
    "WV"
  ],
  "WARDENSVILLE": [
    "26851",
    "WV"
  ],
  "PURGITSVILLE": [
    "26852",
    "WV"
  ],
  "CABINS": [
    "26855",
    "WV"
  ],
  "YELLOW SPRING": [
    "26865",
    "WV"
  ],
  "UPPER TRACT": [
    "26866",
    "WV"
  ],
  "SENECA ROCKS": [
    "26884",
    "WV"
  ],
  "ONEGO": [
    "26886",
    "WV"
  ],
  "ADVANCE": [
    "63730",
    "MO"
  ],
  "BELEWS CREEK": [
    "27009",
    "NC"
  ],
  "BETHANIA": [
    "27010",
    "NC"
  ],
  "CLEMMONS": [
    "27012",
    "NC"
  ],
  "COOLEEMEE": [
    "27014",
    "NC"
  ],
  "DOBSON": [
    "27017",
    "NC"
  ],
  "EAST BEND": [
    "27018",
    "NC"
  ],
  "GERMANTON": [
    "27019",
    "NC"
  ],
  "HAMPTONVILLE": [
    "27020",
    "NC"
  ],
  "KING": [
    "54946",
    "WI"
  ],
  "LAWSONVILLE": [
    "27022",
    "NC"
  ],
  "LOWGAP": [
    "27024",
    "NC"
  ],
  "MAYODAN": [
    "27027",
    "NC"
  ],
  "MOCKSVILLE": [
    "27028",
    "NC"
  ],
  "PFAFFTOWN": [
    "27040",
    "NC"
  ],
  "PILOT MOUNTAIN": [
    "27041",
    "NC"
  ],
  "PINE HALL": [
    "27042",
    "NC"
  ],
  "PINNACLE": [
    "27043",
    "NC"
  ],
  "RURAL HALL": [
    "27094",
    "NC"
  ],
  "SILOAM": [
    "30665",
    "GA"
  ],
  "STONEVILLE": [
    "38776",
    "MS"
  ],
  "TOAST": [
    "27049",
    "NC"
  ],
  "TOBACCOVILLE": [
    "27050",
    "NC"
  ],
  "WALKERTOWN": [
    "27051",
    "NC"
  ],
  "WALNUT COVE": [
    "27052",
    "NC"
  ],
  "WOODLEAF": [
    "27054",
    "NC"
  ],
  "YADKINVILLE": [
    "27055",
    "NC"
  ],
  "WINSTON SALEM": [
    "27199",
    "NC"
  ],
  "ALAMANCE": [
    "27201",
    "NC"
  ],
  "ALTAMAHAW": [
    "27202",
    "NC"
  ],
  "ASHEBORO": [
    "27205",
    "NC"
  ],
  "BENNETT": [
    "80102",
    "CO"
  ],
  "BISCOE": [
    "72017",
    "AR"
  ],
  "BLANCH": [
    "27212",
    "NC"
  ],
  "BONLEE": [
    "27213",
    "NC"
  ],
  "BROWNS SUMMIT": [
    "27214",
    "NC"
  ],
  "CEDAR FALLS": [
    "50614",
    "IA"
  ],
  "COLFAX": [
    "99111",
    "WA"
  ],
  "CUMNOCK": [
    "27237",
    "NC"
  ],
  "EAGLE SPRINGS": [
    "27242",
    "NC"
  ],
  "EFLAND": [
    "27243",
    "NC"
  ],
  "ELON": [
    "27244",
    "NC"
  ],
  "ETHER": [
    "27247",
    "NC"
  ],
  "GIBSONVILLE": [
    "27249",
    "NC"
  ],
  "GOLDSTON": [
    "27252",
    "NC"
  ],
  "GRAHAM": [
    "98338",
    "WA"
  ],
  "GULF": [
    "27256",
    "NC"
  ],
  "HAW RIVER": [
    "27258",
    "NC"
  ],
  "HIGHFALLS": [
    "27259",
    "NC"
  ],
  "HIGH POINT": [
    "65042",
    "MO"
  ],
  "JACKSON SPRINGS": [
    "27281",
    "NC"
  ],
  "KERNERSVILLE": [
    "27285",
    "NC"
  ],
  "LEASBURG": [
    "65535",
    "MO"
  ],
  "MC LEANSVILLE": [
    "27301",
    "NC"
  ],
  "MEBANE": [
    "27302",
    "NC"
  ],
  "MOUNT GILEAD": [
    "43338",
    "OH"
  ],
  "PITTSBORO": [
    "46167",
    "IN"
  ],
  "PLEASANT GARDEN": [
    "27313",
    "NC"
  ],
  "PROSPECT HILL": [
    "27314",
    "NC"
  ],
  "RAMSEUR": [
    "27316",
    "NC"
  ],
  "RANDLEMAN": [
    "27317",
    "NC"
  ],
  "REIDSVILLE": [
    "30453",
    "GA"
  ],
  "ROBBINS": [
    "95676",
    "CA"
  ],
  "RUFFIN": [
    "29475",
    "SC"
  ],
  "SAXAPAHAW": [
    "27340",
    "NC"
  ],
  "SEAGROVE": [
    "27341",
    "NC"
  ],
  "SEDALIA": [
    "80135",
    "CO"
  ],
  "SEMORA": [
    "27343",
    "NC"
  ],
  "SILER CITY": [
    "27344",
    "NC"
  ],
  "SNOW CAMP": [
    "27349",
    "NC"
  ],
  "SOUTHMONT": [
    "27351",
    "NC"
  ],
  "STALEY": [
    "27355",
    "NC"
  ],
  "STAR": [
    "83669",
    "ID"
  ],
  "STOKESDALE": [
    "27357",
    "NC"
  ],
  "SUMMERFIELD": [
    "79085",
    "TX"
  ],
  "SWEPSONVILLE": [
    "27359",
    "NC"
  ],
  "TRINITY": [
    "75862",
    "TX"
  ],
  "WALLBURG": [
    "27373",
    "NC"
  ],
  "WEST END": [
    "27376",
    "NC"
  ],
  "WHITSETT": [
    "78075",
    "TX"
  ],
  "YANCEYVILLE": [
    "27379",
    "NC"
  ],
  "ANGIER": [
    "27501",
    "NC"
  ],
  "APEX": [
    "27539",
    "NC"
  ],
  "BAHAMA": [
    "27503",
    "NC"
  ],
  "BUIES CREEK": [
    "27506",
    "NC"
  ],
  "BULLOCK": [
    "27507",
    "NC"
  ],
  "BUNN": [
    "27508",
    "NC"
  ],
  "BUTNER": [
    "27509",
    "NC"
  ],
  "CARRBORO": [
    "27510",
    "NC"
  ],
  "CARY": [
    "60013",
    "IL"
  ],
  "CHAPEL HILL": [
    "37034",
    "TN"
  ],
  "COATS": [
    "67028",
    "KS"
  ],
  "CREEDMOOR": [
    "27522",
    "NC"
  ],
  "FOUR OAKS": [
    "27524",
    "NC"
  ],
  "FRANKLINTON": [
    "70438",
    "LA"
  ],
  "FUQUAY VARINA": [
    "27526",
    "NC"
  ],
  "GARNER": [
    "72052",
    "AR"
  ],
  "HOLLY SPRINGS": [
    "38635",
    "MS"
  ],
  "HURDLE MILLS": [
    "27541",
    "NC"
  ],
  "KENLY": [
    "27542",
    "NC"
  ],
  "KIPLING": [
    "43750",
    "OH"
  ],
  "KITTRELL": [
    "27544",
    "NC"
  ],
  "KNIGHTDALE": [
    "27545",
    "NC"
  ],
  "LILLINGTON": [
    "27546",
    "NC"
  ],
  "LOUISBURG": [
    "66053",
    "KS"
  ],
  "MACON": [
    "63552",
    "MO"
  ],
  "MAMERS": [
    "27552",
    "NC"
  ],
  "MANSON": [
    "98831",
    "WA"
  ],
  "MICRO": [
    "27555",
    "NC"
  ],
  "MONCURE": [
    "27559",
    "NC"
  ],
  "NEW HILL": [
    "27562",
    "NC"
  ],
  "NORLINA": [
    "27563",
    "NC"
  ],
  "PINE LEVEL": [
    "36065",
    "AL"
  ],
  "ROLESVILLE": [
    "27571",
    "NC"
  ],
  "ROUGEMONT": [
    "27572",
    "NC"
  ],
  "ROXBORO": [
    "27574",
    "NC"
  ],
  "STEM": [
    "27581",
    "NC"
  ],
  "STOVALL": [
    "27582",
    "NC"
  ],
  "TIMBERLAKE": [
    "27583",
    "NC"
  ],
  "TOWNSVILLE": [
    "27584",
    "NC"
  ],
  "VAUGHAN": [
    "39179",
    "MS"
  ],
  "WAKE FOREST": [
    "27588",
    "NC"
  ],
  "WILLOW SPRING": [
    "27592",
    "NC"
  ],
  "WILSONS MILLS": [
    "27593",
    "NC"
  ],
  "ZEBULON": [
    "30295",
    "GA"
  ],
  "AULANDER": [
    "27805",
    "NC"
  ],
  "BAILEY": [
    "80421",
    "CO"
  ],
  "BATTLEBORO": [
    "27809",
    "NC"
  ],
  "BELHAVEN": [
    "27810",
    "NC"
  ],
  "BELLARTHUR": [
    "27811",
    "NC"
  ],
  "BLOUNTS CREEK": [
    "27814",
    "NC"
  ],
  "CASTALIA": [
    "52133",
    "IA"
  ],
  "CHOCOWINITY": [
    "27817",
    "NC"
  ],
  "COMO": [
    "80432",
    "CO"
  ],
  "CONETOE": [
    "27819",
    "NC"
  ],
  "EDWARD": [
    "27821",
    "NC"
  ],
  "ELM CITY": [
    "27822",
    "NC"
  ],
  "ENGELHARD": [
    "27824",
    "NC"
  ],
  "EVERETTS": [
    "27825",
    "NC"
  ],
  "FALKLAND": [
    "27827",
    "NC"
  ],
  "FOUNTAIN": [
    "80817",
    "CO"
  ],
  "GARYSBURG": [
    "27831",
    "NC"
  ],
  "GASTON": [
    "97119",
    "OR"
  ],
  "GRIMESLAND": [
    "27837",
    "NC"
  ],
  "HASSELL": [
    "27841",
    "NC"
  ],
  "HOBGOOD": [
    "27843",
    "NC"
  ],
  "HOLLISTER": [
    "95024",
    "CA"
  ],
  "KELFORD": [
    "27847",
    "NC"
  ],
  "LEWISTON WOODVILLE": [
    "27849",
    "NC"
  ],
  "LUCAMA": [
    "27851",
    "NC"
  ],
  "MACCLESFIELD": [
    "27852",
    "NC"
  ],
  "MARGARETTSVILLE": [
    "27853",
    "NC"
  ],
  "MURFREESBORO": [
    "71958",
    "AR"
  ],
  "NASHVILLE": [
    "71852",
    "AR"
  ],
  "OAK CITY": [
    "84649",
    "UT"
  ],
  "PANTEGO": [
    "27860",
    "NC"
  ],
  "PENDLETON": [
    "97801",
    "OR"
  ],
  "PIKEVILLE": [
    "41502",
    "KY"
  ],
  "PINETOPS": [
    "27864",
    "NC"
  ],
  "PINETOWN": [
    "27865",
    "NC"
  ],
  "PLEASANT HILL": [
    "97455",
    "OR"
  ],
  "POTECASI": [
    "27867",
    "NC"
  ],
  "RICH SQUARE": [
    "27869",
    "NC"
  ],
  "ROANOKE RAPIDS": [
    "27870",
    "NC"
  ],
  "ROBERSONVILLE": [
    "27871",
    "NC"
  ],
  "ROXOBEL": [
    "27872",
    "NC"
  ],
  "SARATOGA": [
    "95071",
    "CA"
  ],
  "SCOTLAND NECK": [
    "27874",
    "NC"
  ],
  "SEABOARD": [
    "27876",
    "NC"
  ],
  "SIMS": [
    "62886",
    "IL"
  ],
  "SPEED": [
    "27881",
    "NC"
  ],
  "SPRING HOPE": [
    "27882",
    "NC"
  ],
  "STANTONSBURG": [
    "27883",
    "NC"
  ],
  "STOKES": [
    "27884",
    "NC"
  ],
  "SWANQUARTER": [
    "27885",
    "NC"
  ],
  "TARBORO": [
    "27886",
    "NC"
  ],
  "TILLERY": [
    "27887",
    "NC"
  ],
  "WALSTONBURG": [
    "27888",
    "NC"
  ],
  "WELDON": [
    "93283",
    "CA"
  ],
  "WHITAKERS": [
    "27891",
    "NC"
  ],
  "WILLIAMSTON": [
    "48895",
    "MI"
  ],
  "ELIZABETH CITY": [
    "27909",
    "NC"
  ],
  "AHOSKIE": [
    "27910",
    "NC"
  ],
  "AYDLETT": [
    "27916",
    "NC"
  ],
  "BARCO": [
    "27917",
    "NC"
  ],
  "COFIELD": [
    "27922",
    "NC"
  ],
  "COINJOCK": [
    "27923",
    "NC"
  ],
  "COLERAIN": [
    "43916",
    "OH"
  ],
  "CORAPEAKE": [
    "27926",
    "NC"
  ],
  "COROLLA": [
    "27927",
    "NC"
  ],
  "CRESWELL": [
    "97426",
    "OR"
  ],
  "CURRITUCK": [
    "27929",
    "NC"
  ],
  "DURANTS NECK": [
    "27930",
    "NC"
  ],
  "EDENTON": [
    "27932",
    "NC"
  ],
  "EURE": [
    "27935",
    "NC"
  ],
  "FRISCO": [
    "80443",
    "CO"
  ],
  "GATES": [
    "97346",
    "OR"
  ],
  "GATESVILLE": [
    "76599",
    "TX"
  ],
  "GRANDY": [
    "55029",
    "MN"
  ],
  "HARBINGER": [
    "27941",
    "NC"
  ],
  "HARRELLSVILLE": [
    "27942",
    "NC"
  ],
  "HATTERAS": [
    "27943",
    "NC"
  ],
  "HERTFORD": [
    "27944",
    "NC"
  ],
  "HOBBSVILLE": [
    "27946",
    "NC"
  ],
  "JARVISBURG": [
    "27947",
    "NC"
  ],
  "KILL DEVIL HILLS": [
    "27948",
    "NC"
  ],
  "KITTY HAWK": [
    "27949",
    "NC"
  ],
  "KNOTTS ISLAND": [
    "27950",
    "NC"
  ],
  "MANNS HARBOR": [
    "27953",
    "NC"
  ],
  "MANTEO": [
    "27954",
    "NC"
  ],
  "MAPLE": [
    "54854",
    "WI"
  ],
  "MERRY HILL": [
    "27957",
    "NC"
  ],
  "MOYOCK": [
    "27958",
    "NC"
  ],
  "NAGS HEAD": [
    "27959",
    "NC"
  ],
  "OCRACOKE": [
    "27960",
    "NC"
  ],
  "POINT HARBOR": [
    "27964",
    "NC"
  ],
  "POPLAR BRANCH": [
    "27965",
    "NC"
  ],
  "POWELLS POINT": [
    "27966",
    "NC"
  ],
  "POWELLSVILLE": [
    "27967",
    "NC"
  ],
  "RODANTHE": [
    "27968",
    "NC"
  ],
  "ROPER": [
    "27970",
    "NC"
  ],
  "SALVO": [
    "27972",
    "NC"
  ],
  "SHAWBORO": [
    "27973",
    "NC"
  ],
  "SOUTH MILLS": [
    "27976",
    "NC"
  ],
  "STUMPY POINT": [
    "27978",
    "NC"
  ],
  "TYNER": [
    "46572",
    "IN"
  ],
  "WANCHESE": [
    "27981",
    "NC"
  ],
  "WAVES": [
    "27982",
    "NC"
  ],
  "WINFALL": [
    "27985",
    "NC"
  ],
  "WINTON": [
    "95388",
    "CA"
  ],
  "ALBEMARLE": [
    "28002",
    "NC"
  ],
  "ALEXIS": [
    "61412",
    "IL"
  ],
  "ANSONVILLE": [
    "28007",
    "NC"
  ],
  "BADIN": [
    "28009",
    "NC"
  ],
  "BARIUM SPRINGS": [
    "28010",
    "NC"
  ],
  "BESSEMER CITY": [
    "28016",
    "NC"
  ],
  "BOSTIC": [
    "28018",
    "NC"
  ],
  "CAROLEEN": [
    "28019",
    "NC"
  ],
  "CASAR": [
    "28020",
    "NC"
  ],
  "CHINA GROVE": [
    "28023",
    "NC"
  ],
  "CLIFFSIDE": [
    "28024",
    "NC"
  ],
  "CORNELIUS": [
    "97113",
    "OR"
  ],
  "CRAMERTON": [
    "28032",
    "NC"
  ],
  "CROUSE": [
    "28033",
    "NC"
  ],
  "DAVIDSON": [
    "73530",
    "OK"
  ],
  "EARL": [
    "28038",
    "NC"
  ],
  "EAST SPENCER": [
    "28039",
    "NC"
  ],
  "FAITH": [
    "57626",
    "SD"
  ],
  "GASTONIA": [
    "28056",
    "NC"
  ],
  "HUNTERSVILLE": [
    "28078",
    "NC"
  ],
  "GOLD HILL": [
    "97525",
    "OR"
  ],
  "GRANITE QUARRY": [
    "28072",
    "NC"
  ],
  "GROVER": [
    "83122",
    "WY"
  ],
  "HIGH SHOALS": [
    "30645",
    "GA"
  ],
  "INDIAN TRAIL": [
    "28079",
    "NC"
  ],
  "IRON STATION": [
    "28080",
    "NC"
  ],
  "KANNAPOLIS": [
    "28083",
    "NC"
  ],
  "KINGS MOUNTAIN": [
    "40442",
    "KY"
  ],
  "LANDIS": [
    "28088",
    "NC"
  ],
  "LATTIMORE": [
    "28089",
    "NC"
  ],
  "LAWNDALE": [
    "90261",
    "CA"
  ],
  "LILESVILLE": [
    "28091",
    "NC"
  ],
  "LINCOLNTON": [
    "30817",
    "GA"
  ],
  "LOCUST": [
    "28097",
    "NC"
  ],
  "MC ADENVILLE": [
    "28101",
    "NC"
  ],
  "MC FARLAN": [
    "28102",
    "NC"
  ],
  "MARSHVILLE": [
    "28103",
    "NC"
  ],
  "MATTHEWS": [
    "63867",
    "MO"
  ],
  "MISENHEIMER": [
    "28109",
    "NC"
  ],
  "MOORESBORO": [
    "28114",
    "NC"
  ],
  "MOORESVILLE": [
    "64664",
    "MO"
  ],
  "MORVEN": [
    "31638",
    "GA"
  ],
  "MOUNT MOURNE": [
    "28123",
    "NC"
  ],
  "MOUNT ULLA": [
    "28125",
    "NC"
  ],
  "OAKBORO": [
    "28129",
    "NC"
  ],
  "PAW CREEK": [
    "28130",
    "NC"
  ],
  "PEACHLAND": [
    "28133",
    "NC"
  ],
  "POLKTON": [
    "28135",
    "NC"
  ],
  "POLKVILLE": [
    "28136",
    "NC"
  ],
  "ROCKWELL": [
    "50469",
    "IA"
  ],
  "RUTHERFORDTON": [
    "28139",
    "NC"
  ],
  "SHELBY": [
    "68662",
    "NE"
  ],
  "SPINDALE": [
    "28160",
    "NC"
  ],
  "STANFIELD": [
    "97875",
    "OR"
  ],
  "TROUTMAN": [
    "28166",
    "NC"
  ],
  "UNION MILLS": [
    "46382",
    "IN"
  ],
  "VALE": [
    "97918",
    "OR"
  ],
  "WACO": [
    "76799",
    "TX"
  ],
  "WADESBORO": [
    "28170",
    "NC"
  ],
  "WAXHAW": [
    "28173",
    "NC"
  ],
  "WINGATE": [
    "79566",
    "TX"
  ],
  "FORT BRAGG": [
    "95437",
    "CA"
  ],
  "POPE ARMY AIRFIELD": [
    "28308",
    "NC"
  ],
  "AUTRYVILLE": [
    "28318",
    "NC"
  ],
  "BLADENBORO": [
    "28320",
    "NC"
  ],
  "BUNNLEVEL": [
    "28323",
    "NC"
  ],
  "CALYPSO": [
    "28325",
    "NC"
  ],
  "DUNN": [
    "28335",
    "NC"
  ],
  "ELLERBE": [
    "28338",
    "NC"
  ],
  "ERWIN": [
    "57233",
    "SD"
  ],
  "FAISON": [
    "28341",
    "NC"
  ],
  "FALCON": [
    "65470",
    "MO"
  ],
  "GIBSON": [
    "70356",
    "LA"
  ],
  "GODWIN": [
    "28344",
    "NC"
  ],
  "HAMLET": [
    "46532",
    "IN"
  ],
  "HOFFMAN": [
    "62250",
    "IL"
  ],
  "HOPE MILLS": [
    "28348",
    "NC"
  ],
  "KENANSVILLE": [
    "34739",
    "FL"
  ],
  "LAKEVIEW": [
    "97630",
    "OR"
  ],
  "LAUREL HILL": [
    "32567",
    "FL"
  ],
  "LAURINBURG": [
    "28353",
    "NC"
  ],
  "LEMON SPRINGS": [
    "28355",
    "NC"
  ],
  "LUMBER BRIDGE": [
    "28357",
    "NC"
  ],
  "MARSTON": [
    "63866",
    "MO"
  ],
  "MAXTON": [
    "28364",
    "NC"
  ],
  "NEWTON GROVE": [
    "28366",
    "NC"
  ],
  "NORMAN": [
    "73072",
    "OK"
  ],
  "OLIVIA": [
    "56277",
    "MN"
  ],
  "ORRUM": [
    "28369",
    "NC"
  ],
  "PINEBLUFF": [
    "28373",
    "NC"
  ],
  "PROCTORVILLE": [
    "45669",
    "OH"
  ],
  "RAEFORD": [
    "28376",
    "NC"
  ],
  "RED SPRINGS": [
    "28377",
    "NC"
  ],
  "REX": [
    "30273",
    "GA"
  ],
  "ROCKINGHAM": [
    "28380",
    "NC"
  ],
  "ROSEBORO": [
    "28382",
    "NC"
  ],
  "SAINT PAULS": [
    "28384",
    "NC"
  ],
  "SALEMBURG": [
    "28385",
    "NC"
  ],
  "SHANNON": [
    "61078",
    "IL"
  ],
  "SOUTHERN PINES": [
    "28388",
    "NC"
  ],
  "STEDMAN": [
    "28391",
    "NC"
  ],
  "TAR HEEL": [
    "28392",
    "NC"
  ],
  "TURKEY": [
    "79261",
    "TX"
  ],
  "VASS": [
    "28394",
    "NC"
  ],
  "WADE": [
    "28395",
    "NC"
  ],
  "WAGRAM": [
    "28396",
    "NC"
  ],
  "ASH": [
    "28420",
    "NC"
  ],
  "BOLIVIA": [
    "28422",
    "NC"
  ],
  "BURGAW": [
    "28425",
    "NC"
  ],
  "CAROLINA BEACH": [
    "28428",
    "NC"
  ],
  "CASTLE HAYNE": [
    "28429",
    "NC"
  ],
  "CERRO GORDO": [
    "61818",
    "IL"
  ],
  "CHADBOURN": [
    "28431",
    "NC"
  ],
  "CLARKTON": [
    "63837",
    "MO"
  ],
  "COUNCIL": [
    "83612",
    "ID"
  ],
  "CURRIE": [
    "56123",
    "MN"
  ],
  "DELCO": [
    "28436",
    "NC"
  ],
  "FAIR BLUFF": [
    "28439",
    "NC"
  ],
  "HALLSBORO": [
    "28442",
    "NC"
  ],
  "HARRELLS": [
    "28444",
    "NC"
  ],
  "HOLLY RIDGE": [
    "28445",
    "NC"
  ],
  "KELLY": [
    "83011",
    "WY"
  ],
  "KURE BEACH": [
    "28449",
    "NC"
  ],
  "LAKE WACCAMAW": [
    "28450",
    "NC"
  ],
  "LELAND": [
    "60531",
    "IL"
  ],
  "LONGWOOD": [
    "32791",
    "FL"
  ],
  "MAPLE HILL": [
    "66507",
    "KS"
  ],
  "NAKINA": [
    "28455",
    "NC"
  ],
  "RIEGELWOOD": [
    "28456",
    "NC"
  ],
  "SHALLOTTE": [
    "28470",
    "NC"
  ],
  "SNEADS FERRY": [
    "28460",
    "NC"
  ],
  "SUPPLY": [
    "28462",
    "NC"
  ],
  "TABOR CITY": [
    "28463",
    "NC"
  ],
  "TEACHEY": [
    "28464",
    "NC"
  ],
  "OAK ISLAND": [
    "56741",
    "MN"
  ],
  "CALABASH": [
    "28467",
    "NC"
  ],
  "SUNSET BEACH": [
    "90742",
    "CA"
  ],
  "OCEAN ISLE BEACH": [
    "28469",
    "NC"
  ],
  "WHITEVILLE": [
    "38075",
    "TN"
  ],
  "WINNABOW": [
    "28479",
    "NC"
  ],
  "WRIGHTSVILLE BEACH": [
    "28480",
    "NC"
  ],
  "KINSTON": [
    "36453",
    "AL"
  ],
  "ALLIANCE": [
    "69301",
    "NE"
  ],
  "ARAPAHOE": [
    "82510",
    "WY"
  ],
  "AYDEN": [
    "28513",
    "NC"
  ],
  "BAYBORO": [
    "28515",
    "NC"
  ],
  "BEAUFORT": [
    "63013",
    "MO"
  ],
  "BEULAVILLE": [
    "28518",
    "NC"
  ],
  "CEDAR ISLAND": [
    "28520",
    "NC"
  ],
  "CHINQUAPIN": [
    "28521",
    "NC"
  ],
  "COVE CITY": [
    "28523",
    "NC"
  ],
  "DEEP RUN": [
    "28525",
    "NC"
  ],
  "ERNUL": [
    "28527",
    "NC"
  ],
  "GRANTSBORO": [
    "28529",
    "NC"
  ],
  "GRIFTON": [
    "28530",
    "NC"
  ],
  "HARKERS ISLAND": [
    "28531",
    "NC"
  ],
  "HAVELOCK": [
    "50546",
    "IA"
  ],
  "CHERRY POINT": [
    "28533",
    "NC"
  ],
  "HOBUCKEN": [
    "28537",
    "NC"
  ],
  "HOOKERTON": [
    "28538",
    "NC"
  ],
  "HUBERT": [
    "28539",
    "NC"
  ],
  "CAMP LEJEUNE": [
    "28547",
    "NC"
  ],
  "TARAWA TERRACE": [
    "28543",
    "NC"
  ],
  "MIDWAY PARK": [
    "28544",
    "NC"
  ],
  "MCCUTCHEON FIELD": [
    "28545",
    "NC"
  ],
  "LA GRANGE": [
    "95329",
    "CA"
  ],
  "LOWLAND": [
    "28552",
    "NC"
  ],
  "MARSHALLBERG": [
    "28553",
    "NC"
  ],
  "MAURY": [
    "28554",
    "NC"
  ],
  "MERRITT": [
    "49667",
    "MI"
  ],
  "MOREHEAD CITY": [
    "28557",
    "NC"
  ],
  "NEW BERN": [
    "28564",
    "NC"
  ],
  "ORIENTAL": [
    "28571",
    "NC"
  ],
  "PINK HILL": [
    "28572",
    "NC"
  ],
  "POLLOCKSVILLE": [
    "28573",
    "NC"
  ],
  "SALTER PATH": [
    "28575",
    "NC"
  ],
  "SEALEVEL": [
    "28577",
    "NC"
  ],
  "SEVEN SPRINGS": [
    "28578",
    "NC"
  ],
  "STACY": [
    "55079",
    "MN"
  ],
  "STELLA": [
    "68442",
    "NE"
  ],
  "STONEWALL": [
    "78671",
    "TX"
  ],
  "SWANSBORO": [
    "28584",
    "NC"
  ],
  "VANDEMERE": [
    "28587",
    "NC"
  ],
  "WINTERVILLE": [
    "38782",
    "MS"
  ],
  "EMERALD ISLE": [
    "28594",
    "NC"
  ],
  "BANNER ELK": [
    "28604",
    "NC"
  ],
  "BLOWING ROCK": [
    "28605",
    "NC"
  ],
  "BOONE": [
    "81025",
    "CO"
  ],
  "COLLETTSVILLE": [
    "28611",
    "NC"
  ],
  "CONNELLY SPRINGS": [
    "28612",
    "NC"
  ],
  "CONOVER": [
    "54519",
    "WI"
  ],
  "CROSSNORE": [
    "28616",
    "NC"
  ],
  "CRUMPLER": [
    "28617",
    "NC"
  ],
  "DEEP GAP": [
    "28618",
    "NC"
  ],
  "DREXEL": [
    "64742",
    "MO"
  ],
  "ELKIN": [
    "28621",
    "NC"
  ],
  "ELK PARK": [
    "28622",
    "NC"
  ],
  "ENNICE": [
    "28623",
    "NC"
  ],
  "FERGUSON": [
    "50078",
    "IA"
  ],
  "STATESVILLE": [
    "28687",
    "NC"
  ],
  "GLADE VALLEY": [
    "28627",
    "NC"
  ],
  "GLEN ALPINE": [
    "28628",
    "NC"
  ],
  "GLENDALE SPRINGS": [
    "28629",
    "NC"
  ],
  "GRANITE FALLS": [
    "98252",
    "WA"
  ],
  "GRASSY CREEK": [
    "28631",
    "NC"
  ],
  "LENOIR": [
    "28645",
    "NC"
  ],
  "HAYS": [
    "67601",
    "KS"
  ],
  "HIDDENITE": [
    "28636",
    "NC"
  ],
  "HILDEBRAN": [
    "28637",
    "NC"
  ],
  "JONAS RIDGE": [
    "28641",
    "NC"
  ],
  "LAUREL SPRINGS": [
    "28644",
    "NC"
  ],
  "LINVILLE FALLS": [
    "28647",
    "NC"
  ],
  "MC GRADY": [
    "28649",
    "NC"
  ],
  "MAIDEN": [
    "28650",
    "NC"
  ],
  "MILLERS CREEK": [
    "28651",
    "NC"
  ],
  "MINNEAPOLIS": [
    "67467",
    "KS"
  ],
  "MORAVIAN FALLS": [
    "28654",
    "NC"
  ],
  "MORGANTON": [
    "30560",
    "GA"
  ],
  "NORTH WILKESBORO": [
    "28659",
    "NC"
  ],
  "NEWLAND": [
    "28657",
    "NC"
  ],
  "OLIN": [
    "52320",
    "IA"
  ],
  "PINEOLA": [
    "28662",
    "NC"
  ],
  "PINEY CREEK": [
    "28663",
    "NC"
  ],
  "PLUMTREE": [
    "28664",
    "NC"
  ],
  "PURLEAR": [
    "28665",
    "NC"
  ],
  "ICARD": [
    "28666",
    "NC"
  ],
  "RHODHISS": [
    "28667",
    "NC"
  ],
  "ROARING GAP": [
    "28668",
    "NC"
  ],
  "ROARING RIVER": [
    "28669",
    "NC"
  ],
  "RONDA": [
    "28670",
    "NC"
  ],
  "RUTHERFORD COLLEGE": [
    "28671",
    "NC"
  ],
  "SCOTTVILLE": [
    "49454",
    "MI"
  ],
  "SHERRILLS FORD": [
    "28673",
    "NC"
  ],
  "STATE ROAD": [
    "28676",
    "NC"
  ],
  "TAYLORSVILLE": [
    "95983",
    "CA"
  ],
  "TERRELL": [
    "75161",
    "TX"
  ],
  "TRAPHILL": [
    "28685",
    "NC"
  ],
  "UNION GROVE": [
    "53182",
    "WI"
  ],
  "VALDESE": [
    "28690",
    "NC"
  ],
  "VALLE CRUCIS": [
    "28691",
    "NC"
  ],
  "VILAS": [
    "81087",
    "CO"
  ],
  "WARRENSVILLE": [
    "28693",
    "NC"
  ],
  "WEST JEFFERSON": [
    "43162",
    "OH"
  ],
  "WILKESBORO": [
    "28697",
    "NC"
  ],
  "ZIONVILLE": [
    "28698",
    "NC"
  ],
  "SCOTTS": [
    "49088",
    "MI"
  ],
  "BAKERSVILLE": [
    "43803",
    "OH"
  ],
  "BALSAM": [
    "28707",
    "NC"
  ],
  "BALSAM GROVE": [
    "28708",
    "NC"
  ],
  "BARNARDSVILLE": [
    "28709",
    "NC"
  ],
  "BAT CAVE": [
    "28710",
    "NC"
  ],
  "BLACK MOUNTAIN": [
    "28711",
    "NC"
  ],
  "BREVARD": [
    "28712",
    "NC"
  ],
  "BRYSON CITY": [
    "28713",
    "NC"
  ],
  "CANDLER": [
    "32111",
    "FL"
  ],
  "CASHIERS": [
    "28717",
    "NC"
  ],
  "CEDAR MOUNTAIN": [
    "28718",
    "NC"
  ],
  "CHEROKEE": [
    "76832",
    "TX"
  ],
  "CHIMNEY ROCK": [
    "28720",
    "NC"
  ],
  "CULLOWHEE": [
    "28723",
    "NC"
  ],
  "DANA": [
    "61321",
    "IL"
  ],
  "DILLSBORO": [
    "47018",
    "IN"
  ],
  "EAST FLAT ROCK": [
    "28726",
    "NC"
  ],
  "EDNEYVILLE": [
    "28727",
    "NC"
  ],
  "ENKA": [
    "28728",
    "NC"
  ],
  "ETOWAH": [
    "72428",
    "AR"
  ],
  "FLAT ROCK": [
    "62427",
    "IL"
  ],
  "FLETCHER": [
    "73541",
    "OK"
  ],
  "FONTANA DAM": [
    "28733",
    "NC"
  ],
  "GERTON": [
    "28735",
    "NC"
  ],
  "HAZELWOOD": [
    "63042",
    "MO"
  ],
  "GREEN MOUNTAIN": [
    "28740",
    "NC"
  ],
  "HORSE SHOE": [
    "28742",
    "NC"
  ],
  "LAKE JUNALUSKA": [
    "28745",
    "NC"
  ],
  "LAKE LURE": [
    "28746",
    "NC"
  ],
  "LAKE TOXAWAY": [
    "28747",
    "NC"
  ],
  "LITTLE SWITZERLAND": [
    "28749",
    "NC"
  ],
  "MAGGIE VALLEY": [
    "28751",
    "NC"
  ],
  "MICAVILLE": [
    "28755",
    "NC"
  ],
  "MILL SPRING": [
    "63952",
    "MO"
  ],
  "MONTREAT": [
    "28757",
    "NC"
  ],
  "MOUNTAIN HOME": [
    "84051",
    "UT"
  ],
  "MILLS RIVER": [
    "28759",
    "NC"
  ],
  "OLD FORT": [
    "44861",
    "OH"
  ],
  "PENLAND": [
    "28765",
    "NC"
  ],
  "PENROSE": [
    "81240",
    "CO"
  ],
  "PISGAH FOREST": [
    "28768",
    "NC"
  ],
  "RIDGECREST": [
    "93556",
    "CA"
  ],
  "ROBBINSVILLE": [
    "28771",
    "NC"
  ],
  "ROSMAN": [
    "28772",
    "NC"
  ],
  "SAPPHIRE": [
    "28774",
    "NC"
  ],
  "SCALY MOUNTAIN": [
    "28775",
    "NC"
  ],
  "SKYLAND": [
    "28776",
    "NC"
  ],
  "SPRUCE PINE": [
    "35585",
    "AL"
  ],
  "SWANNANOA": [
    "28778",
    "NC"
  ],
  "SYLVA": [
    "28779",
    "NC"
  ],
  "TRYON": [
    "74875",
    "OK"
  ],
  "TUCKASEGEE": [
    "28783",
    "NC"
  ],
  "TUXEDO": [
    "28784",
    "NC"
  ],
  "WAYNESVILLE": [
    "65583",
    "MO"
  ],
  "WEAVERVILLE": [
    "96093",
    "CA"
  ],
  "WHITTIER": [
    "99693",
    "AK"
  ],
  "ZIRCONIA": [
    "28790",
    "NC"
  ],
  "ASHEVILLE": [
    "28816",
    "NC"
  ],
  "ANDREWS": [
    "79714",
    "TX"
  ],
  "BRASSTOWN": [
    "28902",
    "NC"
  ],
  "HAYESVILLE": [
    "44838",
    "OH"
  ],
  "MURPHY": [
    "97533",
    "OR"
  ],
  "WARNE": [
    "28909",
    "NC"
  ],
  "ALCOLU": [
    "29001",
    "SC"
  ],
  "BALLENTINE": [
    "29002",
    "SC"
  ],
  "BAMBERG": [
    "29003",
    "SC"
  ],
  "BATESBURG": [
    "29006",
    "SC"
  ],
  "BETHUNE": [
    "80805",
    "CO"
  ],
  "BLACKSTOCK": [
    "29014",
    "SC"
  ],
  "BLAIR": [
    "73526",
    "OK"
  ],
  "BLYTHEWOOD": [
    "29016",
    "SC"
  ],
  "BOWMAN": [
    "58623",
    "ND"
  ],
  "CASSATT": [
    "29032",
    "SC"
  ],
  "CAYCE": [
    "29033",
    "SC"
  ],
  "CHAPIN": [
    "62628",
    "IL"
  ],
  "CHAPPELLS": [
    "29037",
    "SC"
  ],
  "COPE": [
    "80812",
    "CO"
  ],
  "DALZELL": [
    "61320",
    "IL"
  ],
  "DAVIS STATION": [
    "29041",
    "SC"
  ],
  "EASTOVER": [
    "29044",
    "SC"
  ],
  "ELGIN": [
    "97827",
    "OR"
  ],
  "ELLOREE": [
    "29047",
    "SC"
  ],
  "EUTAWVILLE": [
    "29048",
    "SC"
  ],
  "GABLE": [
    "29051",
    "SC"
  ],
  "GADSDEN": [
    "85336",
    "AZ"
  ],
  "GREELEYVILLE": [
    "29056",
    "SC"
  ],
  "HEATH SPRINGS": [
    "29058",
    "SC"
  ],
  "HOLLY HILL": [
    "29059",
    "SC"
  ],
  "HOPKINS": [
    "64461",
    "MO"
  ],
  "HORATIO": [
    "71842",
    "AR"
  ],
  "IRMO": [
    "29063",
    "SC"
  ],
  "JENKINSVILLE": [
    "29065",
    "SC"
  ],
  "KERSHAW": [
    "29067",
    "SC"
  ],
  "LEESVILLE": [
    "78122",
    "TX"
  ],
  "LIBERTY HILL": [
    "78642",
    "TX"
  ],
  "LITTLE MOUNTAIN": [
    "29075",
    "SC"
  ],
  "LUGOFF": [
    "29078",
    "SC"
  ],
  "LYDIA": [
    "70569",
    "LA"
  ],
  "EHRHARDT": [
    "29081",
    "SC"
  ],
  "LODGE": [
    "29082",
    "SC"
  ],
  "MC BEE": [
    "29101",
    "SC"
  ],
  "MANNING": [
    "97125",
    "OR"
  ],
  "MAYESVILLE": [
    "29104",
    "SC"
  ],
  "MONETTA": [
    "29105",
    "SC"
  ],
  "NEESES": [
    "29107",
    "SC"
  ],
  "NEWBERRY": [
    "49868",
    "MI"
  ],
  "NEW ZION": [
    "29111",
    "SC"
  ],
  "PEAK": [
    "29122",
    "SC"
  ],
  "PELION": [
    "29123",
    "SC"
  ],
  "PINEWOOD": [
    "29125",
    "SC"
  ],
  "POMARIA": [
    "29126",
    "SC"
  ],
  "REMBERT": [
    "29128",
    "SC"
  ],
  "RIDGE SPRING": [
    "29129",
    "SC"
  ],
  "RION": [
    "29132",
    "SC"
  ],
  "ROWESVILLE": [
    "29133",
    "SC"
  ],
  "SAINT MATTHEWS": [
    "29135",
    "SC"
  ],
  "SALLEY": [
    "29137",
    "SC"
  ],
  "SANTEE": [
    "92072",
    "CA"
  ],
  "SILVERSTREET": [
    "29145",
    "SC"
  ],
  "STATE PARK": [
    "29147",
    "SC"
  ],
  "SUMMERTON": [
    "29148",
    "SC"
  ],
  "SUMTER": [
    "29154",
    "SC"
  ],
  "SHAW AFB": [
    "29152",
    "SC"
  ],
  "TIMMONSVILLE": [
    "29161",
    "SC"
  ],
  "TURBEVILLE": [
    "29162",
    "SC"
  ],
  "VANCE": [
    "38964",
    "MS"
  ],
  "WAGENER": [
    "29164",
    "SC"
  ],
  "WARD": [
    "80481",
    "CO"
  ],
  "WEDGEFIELD": [
    "29168",
    "SC"
  ],
  "WHITE ROCK": [
    "29177",
    "SC"
  ],
  "WHITMIRE": [
    "29178",
    "SC"
  ],
  "WINNSBORO": [
    "75494",
    "TX"
  ],
  "SPARTANBURG": [
    "29319",
    "SC"
  ],
  "CAMPOBELLO": [
    "29322",
    "SC"
  ],
  "CHESNEE": [
    "29323",
    "SC"
  ],
  "CONVERSE": [
    "78109",
    "TX"
  ],
  "COWPENS": [
    "29330",
    "SC"
  ],
  "CROSS ANCHOR": [
    "29331",
    "SC"
  ],
  "CROSS HILL": [
    "29332",
    "SC"
  ],
  "DRAYTON": [
    "58225",
    "ND"
  ],
  "DUNCAN": [
    "85534",
    "AZ"
  ],
  "ENOREE": [
    "29335",
    "SC"
  ],
  "FAIRFOREST": [
    "29336",
    "SC"
  ],
  "FINGERVILLE": [
    "29338",
    "SC"
  ],
  "GAFFNEY": [
    "29342",
    "SC"
  ],
  "GRAMLING": [
    "29348",
    "SC"
  ],
  "INMAN": [
    "68742",
    "NE"
  ],
  "JOANNA": [
    "29351",
    "SC"
  ],
  "KINARDS": [
    "29355",
    "SC"
  ],
  "LANDRUM": [
    "29356",
    "SC"
  ],
  "LOCKHART": [
    "78644",
    "TX"
  ],
  "LYMAN": [
    "98263",
    "WA"
  ],
  "MOORE": [
    "83255",
    "ID"
  ],
  "PACOLET": [
    "29372",
    "SC"
  ],
  "PACOLET MILLS": [
    "29373",
    "SC"
  ],
  "PAULINE": [
    "29374",
    "SC"
  ],
  "REIDVILLE": [
    "29375",
    "SC"
  ],
  "ROEBUCK": [
    "29376",
    "SC"
  ],
  "STARTEX": [
    "29377",
    "SC"
  ],
  "UNA": [
    "29378",
    "SC"
  ],
  "WELLFORD": [
    "29385",
    "SC"
  ],
  "WOODRUFF": [
    "85942",
    "AZ"
  ],
  "CHARLESTON AFB": [
    "29404",
    "SC"
  ],
  "NORTH CHARLESTON": [
    "29420",
    "SC"
  ],
  "HANAHAN": [
    "29410",
    "SC"
  ],
  "ADAMS RUN": [
    "29426",
    "SC"
  ],
  "AWENDAW": [
    "29429",
    "SC"
  ],
  "BONNEAU": [
    "29431",
    "SC"
  ],
  "CANADYS": [
    "29433",
    "SC"
  ],
  "CORDESVILLE": [
    "29434",
    "SC"
  ],
  "CROSS": [
    "29436",
    "SC"
  ],
  "EDISTO ISLAND": [
    "29438",
    "SC"
  ],
  "FOLLY BEACH": [
    "29439",
    "SC"
  ],
  "GOOSE CREEK": [
    "29445",
    "SC"
  ],
  "GREEN POND": [
    "35074",
    "AL"
  ],
  "HARLEYVILLE": [
    "29448",
    "SC"
  ],
  "HUGER": [
    "29450",
    "SC"
  ],
  "ISLE OF PALMS": [
    "29451",
    "SC"
  ],
  "JACKSONBORO": [
    "29452",
    "SC"
  ],
  "JOHNS ISLAND": [
    "29457",
    "SC"
  ],
  "LADSON": [
    "29456",
    "SC"
  ],
  "MC CLELLANVILLE": [
    "29458",
    "SC"
  ],
  "MONCKS CORNER": [
    "29461",
    "SC"
  ],
  "PINOPOLIS": [
    "29469",
    "SC"
  ],
  "RAVENEL": [
    "29470",
    "SC"
  ],
  "REEVESVILLE": [
    "29471",
    "SC"
  ],
  "RIDGEVILLE": [
    "47380",
    "IN"
  ],
  "ROUND O": [
    "29474",
    "SC"
  ],
  "RUSSELLVILLE": [
    "72812",
    "AR"
  ],
  "SAINT GEORGE": [
    "84791",
    "UT"
  ],
  "SAINT STEPHEN": [
    "56375",
    "MN"
  ],
  "SMOAKS": [
    "29481",
    "SC"
  ],
  "SULLIVANS ISLAND": [
    "29482",
    "SC"
  ],
  "WADMALAW ISLAND": [
    "29487",
    "SC"
  ],
  "WALTERBORO": [
    "29488",
    "SC"
  ],
  "WILLIAMS": [
    "97544",
    "OR"
  ],
  "AYNOR": [
    "29511",
    "SC"
  ],
  "BENNETTSVILLE": [
    "29512",
    "SC"
  ],
  "BLENHEIM": [
    "29516",
    "SC"
  ],
  "CADES": [
    "29518",
    "SC"
  ],
  "CENTENARY": [
    "29519",
    "SC"
  ],
  "CHERAW": [
    "81030",
    "CO"
  ],
  "CLIO": [
    "96106",
    "CA"
  ],
  "COWARD": [
    "29530",
    "SC"
  ],
  "DILLON": [
    "80435",
    "CO"
  ],
  "GALIVANTS FERRY": [
    "29544",
    "SC"
  ],
  "GREEN SEA": [
    "29545",
    "SC"
  ],
  "GRESHAM": [
    "97080",
    "OR"
  ],
  "HAMER": [
    "83425",
    "ID"
  ],
  "HARTSVILLE": [
    "47244",
    "IN"
  ],
  "HEMINGWAY": [
    "29554",
    "SC"
  ],
  "KINGSTREE": [
    "29556",
    "SC"
  ],
  "LANE": [
    "74555",
    "OK"
  ],
  "LATTA": [
    "29565",
    "SC"
  ],
  "LITTLE RIVER": [
    "95456",
    "CA"
  ],
  "LITTLE ROCK": [
    "72295",
    "AR"
  ],
  "LONGS": [
    "29568",
    "SC"
  ],
  "LORIS": [
    "29569",
    "SC"
  ],
  "MC COLL": [
    "29570",
    "SC"
  ],
  "MYRTLE BEACH": [
    "29588",
    "SC"
  ],
  "MULLINS": [
    "29574",
    "SC"
  ],
  "MURRELLS INLET": [
    "29576",
    "SC"
  ],
  "NESMITH": [
    "29580",
    "SC"
  ],
  "NORTH MYRTLE BEACH": [
    "29598",
    "SC"
  ],
  "PAMPLICO": [
    "29583",
    "SC"
  ],
  "PATRICK": [
    "29584",
    "SC"
  ],
  "PAWLEYS ISLAND": [
    "29585",
    "SC"
  ],
  "SALTERS": [
    "29590",
    "SC"
  ],
  "SELLERS": [
    "29592",
    "SC"
  ],
  "SOCIETY HILL": [
    "29593",
    "SC"
  ],
  "TATUM": [
    "88267",
    "NM"
  ],
  "ABBEVILLE": [
    "70511",
    "LA"
  ],
  "ANDERSON": [
    "99744",
    "AK"
  ],
  "BELTON": [
    "76513",
    "TX"
  ],
  "CALHOUN FALLS": [
    "29628",
    "SC"
  ],
  "CENTRAL": [
    "99730",
    "AK"
  ],
  "CLEMSON": [
    "29634",
    "SC"
  ],
  "CONESTEE": [
    "29636",
    "SC"
  ],
  "DONALDS": [
    "29638",
    "SC"
  ],
  "DUE WEST": [
    "29639",
    "SC"
  ],
  "EASLEY": [
    "29642",
    "SC"
  ],
  "FAIR PLAY": [
    "65649",
    "MO"
  ],
  "FOUNTAIN INN": [
    "29644",
    "SC"
  ],
  "GRAY COURT": [
    "29645",
    "SC"
  ],
  "GREER": [
    "85927",
    "AZ"
  ],
  "HODGES": [
    "35571",
    "AL"
  ],
  "HONEA PATH": [
    "29654",
    "SC"
  ],
  "IVA": [
    "29655",
    "SC"
  ],
  "LA FRANCE": [
    "29656",
    "SC"
  ],
  "LONG CREEK": [
    "97856",
    "OR"
  ],
  "MAULDIN": [
    "29662",
    "SC"
  ],
  "MOUNTAIN REST": [
    "29664",
    "SC"
  ],
  "NINETY SIX": [
    "29666",
    "SC"
  ],
  "NORRIS": [
    "61553",
    "IL"
  ],
  "PELZER": [
    "29669",
    "SC"
  ],
  "PICKENS": [
    "71662",
    "AR"
  ],
  "SANDY SPRINGS": [
    "29677",
    "SC"
  ],
  "SIX MILE": [
    "29682",
    "SC"
  ],
  "SLATER": [
    "81653",
    "CO"
  ],
  "STARR": [
    "29684",
    "SC"
  ],
  "TAMASSEE": [
    "29686",
    "SC"
  ],
  "TAYLORS": [
    "29687",
    "SC"
  ],
  "TIGERVILLE": [
    "29688",
    "SC"
  ],
  "TRAVELERS REST": [
    "29690",
    "SC"
  ],
  "WALHALLA": [
    "58282",
    "ND"
  ],
  "WARE SHOALS": [
    "29692",
    "SC"
  ],
  "FORT MILL": [
    "29716",
    "SC"
  ],
  "EDGEMOOR": [
    "29712",
    "SC"
  ],
  "FORT LAWN": [
    "29714",
    "SC"
  ],
  "HICKORY GROVE": [
    "29717",
    "SC"
  ],
  "MC CONNELLS": [
    "29726",
    "SC"
  ],
  "MOUNT CROGHAN": [
    "29727",
    "SC"
  ],
  "PAGELAND": [
    "29728",
    "SC"
  ],
  "VAN WYCK": [
    "29744",
    "SC"
  ],
  "AIKEN": [
    "79221",
    "TX"
  ],
  "NEW ELLENTON": [
    "29809",
    "SC"
  ],
  "BARNWELL": [
    "29812",
    "SC"
  ],
  "HILDA": [
    "29813",
    "SC"
  ],
  "BLACKVILLE": [
    "29817",
    "SC"
  ],
  "CLARKS HILL": [
    "47930",
    "IN"
  ],
  "CLEARWATER": [
    "68726",
    "NE"
  ],
  "EDGEFIELD": [
    "29824",
    "SC"
  ],
  "ELKO": [
    "89803",
    "NV"
  ],
  "GLOVERVILLE": [
    "29828",
    "SC"
  ],
  "LANGLEY": [
    "98260",
    "WA"
  ],
  "MC CORMICK": [
    "29835",
    "SC"
  ],
  "MODOC": [
    "62261",
    "IL"
  ],
  "MONTMORENCI": [
    "47962",
    "IN"
  ],
  "NORTH AUGUSTA": [
    "29861",
    "SC"
  ],
  "BEECH ISLAND": [
    "29842",
    "SC"
  ],
  "OLAR": [
    "29843",
    "SC"
  ],
  "PLUM BRANCH": [
    "29845",
    "SC"
  ],
  "ULMER": [
    "29849",
    "SC"
  ],
  "WARRENVILLE": [
    "60555",
    "IL"
  ],
  "PARRIS ISLAND": [
    "29905",
    "SC"
  ],
  "OKATIE": [
    "29909",
    "SC"
  ],
  "BLUFFTON": [
    "78607",
    "TX"
  ],
  "BRUNSON": [
    "29911",
    "SC"
  ],
  "COOSAWHATCHIE": [
    "29912",
    "SC"
  ],
  "DAUFUSKIE ISLAND": [
    "29915",
    "SC"
  ],
  "EARLY BRANCH": [
    "29916",
    "SC"
  ],
  "ESTILL": [
    "29918",
    "SC"
  ],
  "SAINT HELENA ISLAND": [
    "29920",
    "SC"
  ],
  "FURMAN": [
    "36741",
    "AL"
  ],
  "GARNETT": [
    "66032",
    "KS"
  ],
  "HILTON HEAD ISLAND": [
    "29938",
    "SC"
  ],
  "HARDEEVILLE": [
    "29927",
    "SC"
  ],
  "ISLANDTON": [
    "29929",
    "SC"
  ],
  "LOBECO": [
    "29931",
    "SC"
  ],
  "PINELAND": [
    "75968",
    "TX"
  ],
  "RIDGELAND": [
    "54763",
    "WI"
  ],
  "SCOTIA": [
    "95565",
    "CA"
  ],
  "TILLMAN": [
    "29943",
    "SC"
  ],
  "VARNVILLE": [
    "29944",
    "SC"
  ],
  "YEMASSEE": [
    "29945",
    "SC"
  ],
  "AVONDALE ESTATES": [
    "30002",
    "GA"
  ],
  "NORCROSS": [
    "56274",
    "MN"
  ],
  "ALPHARETTA": [
    "30023",
    "GA"
  ],
  "CONYERS": [
    "30094",
    "GA"
  ],
  "GRAYSON": [
    "71435",
    "LA"
  ],
  "DACULA": [
    "30019",
    "GA"
  ],
  "CLARKSTON": [
    "99403",
    "WA"
  ],
  "SUWANEE": [
    "30024",
    "GA"
  ],
  "SOCIAL CIRCLE": [
    "30025",
    "GA"
  ],
  "NORTH METRO": [
    "30029",
    "GA"
  ],
  "CUMMING": [
    "50061",
    "IA"
  ],
  "DECATUR": [
    "76234",
    "TX"
  ],
  "LITHONIA": [
    "30058",
    "GA"
  ],
  "SNELLVILLE": [
    "30078",
    "GA"
  ],
  "LILBURN": [
    "30048",
    "GA"
  ],
  "NEWBORN": [
    "30056",
    "GA"
  ],
  "PORTERDALE": [
    "30070",
    "GA"
  ],
  "PINE LAKE": [
    "30072",
    "GA"
  ],
  "REDAN": [
    "30074",
    "GA"
  ],
  "ROSWELL": [
    "88203",
    "NM"
  ],
  "STONE MOUNTAIN": [
    "30088",
    "GA"
  ],
  "TUCKER": [
    "72168",
    "AR"
  ],
  "DULUTH": [
    "55816",
    "MN"
  ],
  "ADAIRSVILLE": [
    "30103",
    "GA"
  ],
  "ARAGON": [
    "87820",
    "NM"
  ],
  "ARMUCHEE": [
    "30105",
    "GA"
  ],
  "AUSTELL": [
    "30168",
    "GA"
  ],
  "BALL GROUND": [
    "30107",
    "GA"
  ],
  "BOWDON": [
    "58418",
    "ND"
  ],
  "BOWDON JUNCTION": [
    "30109",
    "GA"
  ],
  "CLARKDALE": [
    "86324",
    "AZ"
  ],
  "LITHIA SPRINGS": [
    "30122",
    "GA"
  ],
  "CAVE SPRING": [
    "30124",
    "GA"
  ],
  "CEDARTOWN": [
    "30125",
    "GA"
  ],
  "MABLETON": [
    "30126",
    "GA"
  ],
  "POWDER SPRINGS": [
    "37848",
    "TN"
  ],
  "COOSA": [
    "30129",
    "GA"
  ],
  "DOUGLASVILLE": [
    "30154",
    "GA"
  ],
  "ESOM HILL": [
    "30138",
    "GA"
  ],
  "FAIRMOUNT": [
    "61841",
    "IL"
  ],
  "KENNESAW": [
    "30160",
    "GA"
  ],
  "LINDALE": [
    "75771",
    "TX"
  ],
  "MARBLE HILL": [
    "63764",
    "MO"
  ],
  "MOUNT BERRY": [
    "30149",
    "GA"
  ],
  "ROCKMART": [
    "30153",
    "GA"
  ],
  "ROOPVILLE": [
    "30170",
    "GA"
  ],
  "RYDAL": [
    "30171",
    "GA"
  ],
  "TALKING ROCK": [
    "30175",
    "GA"
  ],
  "TALLAPOOSA": [
    "63878",
    "MO"
  ],
  "TATE": [
    "30177",
    "GA"
  ],
  "VILLA RICA": [
    "30180",
    "GA"
  ],
  "WALESKA": [
    "30183",
    "GA"
  ],
  "WHITESBURG": [
    "41858",
    "KY"
  ],
  "WINSTON": [
    "97496",
    "OR"
  ],
  "EXPERIMENT": [
    "30212",
    "GA"
  ],
  "FAIRBURN": [
    "57738",
    "SD"
  ],
  "FLOVILLA": [
    "30216",
    "GA"
  ],
  "GRIFFIN": [
    "47616",
    "IN"
  ],
  "HARALSON": [
    "30229",
    "GA"
  ],
  "HOGANSVILLE": [
    "30230",
    "GA"
  ],
  "JENKINSBURG": [
    "30234",
    "GA"
  ],
  "LOVEJOY": [
    "62059",
    "IL"
  ],
  "LUTHERSVILLE": [
    "30251",
    "GA"
  ],
  "MCDONOUGH": [
    "30253",
    "GA"
  ],
  "MEANSVILLE": [
    "30256",
    "GA"
  ],
  "MILNER": [
    "30257",
    "GA"
  ],
  "MOLENA": [
    "30258",
    "GA"
  ],
  "MORELAND": [
    "83256",
    "ID"
  ],
  "MORROW": [
    "72749",
    "AR"
  ],
  "NEWNAN": [
    "30271",
    "GA"
  ],
  "ORCHARD HILL": [
    "30266",
    "GA"
  ],
  "PALMETTO": [
    "71358",
    "LA"
  ],
  "PEACHTREE CITY": [
    "30269",
    "GA"
  ],
  "SARGENT": [
    "68874",
    "NE"
  ],
  "SENOIA": [
    "30276",
    "GA"
  ],
  "SUNNY SIDE": [
    "30284",
    "GA"
  ],
  "THE ROCK": [
    "30285",
    "GA"
  ],
  "CONLEY": [
    "30288",
    "GA"
  ],
  "ELLENWOOD": [
    "30294",
    "GA"
  ],
  "FOREST PARK": [
    "60130",
    "IL"
  ],
  "SWAINSBORO": [
    "30401",
    "GA"
  ],
  "AILEY": [
    "30410",
    "GA"
  ],
  "ALAMO": [
    "94507",
    "CA"
  ],
  "ALSTON": [
    "30412",
    "GA"
  ],
  "BELLVILLE": [
    "77418",
    "TX"
  ],
  "BROOKLET": [
    "30415",
    "GA"
  ],
  "CLAXTON": [
    "30417",
    "GA"
  ],
  "COBBTOWN": [
    "30420",
    "GA"
  ],
  "DAISY": [
    "74540",
    "OK"
  ],
  "GLENNVILLE": [
    "93226",
    "CA"
  ],
  "HAGAN": [
    "30429",
    "GA"
  ],
  "LOUISVILLE": [
    "80027",
    "CO"
  ],
  "METTER": [
    "30439",
    "GA"
  ],
  "MIDVILLE": [
    "30441",
    "GA"
  ],
  "MILLEN": [
    "30442",
    "GA"
  ],
  "NUNEZ": [
    "30448",
    "GA"
  ],
  "PORTAL": [
    "58772",
    "ND"
  ],
  "REGISTER": [
    "30452",
    "GA"
  ],
  "ROCKLEDGE": [
    "32956",
    "FL"
  ],
  "ROCKY FORD": [
    "81067",
    "CO"
  ],
  "SARDIS": [
    "43946",
    "OH"
  ],
  "SOPERTON": [
    "30457",
    "GA"
  ],
  "STATESBORO": [
    "30461",
    "GA"
  ],
  "STILLMORE": [
    "30464",
    "GA"
  ],
  "TWIN CITY": [
    "30471",
    "GA"
  ],
  "UVALDA": [
    "30473",
    "GA"
  ],
  "VIDALIA": [
    "71373",
    "LA"
  ],
  "WADLEY": [
    "36276",
    "AL"
  ],
  "CHESTNUT MOUNTAIN": [
    "30502",
    "GA"
  ],
  "ALTO": [
    "88312",
    "NM"
  ],
  "BUFORD": [
    "82052",
    "WY"
  ],
  "BOWERSVILLE": [
    "45307",
    "OH"
  ],
  "BRASELTON": [
    "30517",
    "GA"
  ],
  "CANON": [
    "30520",
    "GA"
  ],
  "CARNESVILLE": [
    "30521",
    "GA"
  ],
  "CHERRY LOG": [
    "30522",
    "GA"
  ],
  "CLARKESVILLE": [
    "30523",
    "GA"
  ],
  "CLERMONT": [
    "52135",
    "IA"
  ],
  "COMMERCE": [
    "75429",
    "TX"
  ],
  "CORNELIA": [
    "30531",
    "GA"
  ],
  "DAHLONEGA": [
    "30597",
    "GA"
  ],
  "DAWSONVILLE": [
    "30534",
    "GA"
  ],
  "DEMOREST": [
    "30535",
    "GA"
  ],
  "ELLIJAY": [
    "30540",
    "GA"
  ],
  "DILLARD": [
    "97432",
    "OR"
  ],
  "EASTANOLLEE": [
    "30538",
    "GA"
  ],
  "EAST ELLIJAY": [
    "30539",
    "GA"
  ],
  "EPWORTH": [
    "52045",
    "IA"
  ],
  "FLOWERY BRANCH": [
    "30542",
    "GA"
  ],
  "GILLSVILLE": [
    "30543",
    "GA"
  ],
  "HIAWASSEE": [
    "30546",
    "GA"
  ],
  "HOSCHTON": [
    "30548",
    "GA"
  ],
  "LAVONIA": [
    "30553",
    "GA"
  ],
  "LULA": [
    "38644",
    "MS"
  ],
  "MC CAYSVILLE": [
    "30555",
    "GA"
  ],
  "MINERAL BLUFF": [
    "30559",
    "GA"
  ],
  "MOUNTAIN CITY": [
    "89831",
    "NV"
  ],
  "MURRAYVILLE": [
    "62668",
    "IL"
  ],
  "PENDERGRASS": [
    "30567",
    "GA"
  ],
  "RABUN GAP": [
    "30568",
    "GA"
  ],
  "SAUTEE NACOOCHEE": [
    "30571",
    "GA"
  ],
  "SUCHES": [
    "30572",
    "GA"
  ],
  "TALLULAH FALLS": [
    "30573",
    "GA"
  ],
  "TALMO": [
    "30575",
    "GA"
  ],
  "TIGER": [
    "30576",
    "GA"
  ],
  "TOCCOA": [
    "30577",
    "GA"
  ],
  "TURNERVILLE": [
    "30580",
    "GA"
  ],
  "WILEY": [
    "81092",
    "CO"
  ],
  "YOUNG HARRIS": [
    "30582",
    "GA"
  ],
  "TOCCOA FALLS": [
    "30598",
    "GA"
  ],
  "ARNOLDSVILLE": [
    "30619",
    "GA"
  ],
  "BOGART": [
    "30622",
    "GA"
  ],
  "BOSTWICK": [
    "32007",
    "FL"
  ],
  "BUCKHEAD": [
    "30625",
    "GA"
  ],
  "COLBERT": [
    "99005",
    "WA"
  ],
  "COMER": [
    "30629",
    "GA"
  ],
  "CRAWFORDVILLE": [
    "32327",
    "FL"
  ],
  "DEWY ROSE": [
    "30634",
    "GA"
  ],
  "ELBERTON": [
    "30635",
    "GA"
  ],
  "GOOD HOPE": [
    "61438",
    "IL"
  ],
  "HARTWELL": [
    "30643",
    "GA"
  ],
  "ILA": [
    "30647",
    "GA"
  ],
  "RAYLE": [
    "30660",
    "GA"
  ],
  "ROYSTON": [
    "30662",
    "GA"
  ],
  "RUTLEDGE": [
    "63563",
    "MO"
  ],
  "STATHAM": [
    "30666",
    "GA"
  ],
  "STEPHENS": [
    "71764",
    "AR"
  ],
  "TIGNALL": [
    "30668",
    "GA"
  ],
  "UNION POINT": [
    "30669",
    "GA"
  ],
  "MAXEY": [
    "30671",
    "GA"
  ],
  "WATKINSVILLE": [
    "30677",
    "GA"
  ],
  "WINDER": [
    "30680",
    "GA"
  ],
  "CALHOUN": [
    "71225",
    "LA"
  ],
  "CHICKAMAUGA": [
    "30707",
    "GA"
  ],
  "CISCO": [
    "84515",
    "UT"
  ],
  "COHUTTA": [
    "30710",
    "GA"
  ],
  "CRANDALL": [
    "75114",
    "TX"
  ],
  "ETON": [
    "30724",
    "GA"
  ],
  "LYERLY": [
    "30730",
    "GA"
  ],
  "MENLO": [
    "98561",
    "WA"
  ],
  "OAKMAN": [
    "35579",
    "AL"
  ],
  "RESACA": [
    "30735",
    "GA"
  ],
  "RISING FAWN": [
    "30738",
    "GA"
  ],
  "ROCK SPRING": [
    "30739",
    "GA"
  ],
  "ROCKY FACE": [
    "30740",
    "GA"
  ],
  "FORT OGLETHORPE": [
    "30742",
    "GA"
  ],
  "SUGAR VALLEY": [
    "30746",
    "GA"
  ],
  "LOOKOUT MOUNTAIN": [
    "37350",
    "TN"
  ],
  "TENNGA": [
    "30751",
    "GA"
  ],
  "TRION": [
    "30753",
    "GA"
  ],
  "TUNNEL HILL": [
    "30755",
    "GA"
  ],
  "VARNELL": [
    "30756",
    "GA"
  ],
  "APPLING": [
    "30802",
    "GA"
  ],
  "AVERA": [
    "30803",
    "GA"
  ],
  "BLYTHE": [
    "92226",
    "CA"
  ],
  "BONEVILLE": [
    "30806",
    "GA"
  ],
  "CAMAK": [
    "30807",
    "GA"
  ],
  "DEARING": [
    "67340",
    "KS"
  ],
  "GRACEWOOD": [
    "30812",
    "GA"
  ],
  "GROVETOWN": [
    "30813",
    "GA"
  ],
  "HARLEM": [
    "59526",
    "MT"
  ],
  "HEPHZIBAH": [
    "30815",
    "GA"
  ],
  "MITCHELL": [
    "97750",
    "OR"
  ],
  "PERKINS": [
    "74059",
    "OK"
  ],
  "STAPLETON": [
    "69163",
    "NE"
  ],
  "THOMSON": [
    "61285",
    "IL"
  ],
  "WRENS": [
    "30833",
    "GA"
  ],
  "BOLINGBROKE": [
    "31004",
    "GA"
  ],
  "BONAIRE": [
    "31005",
    "GA"
  ],
  "BYROMVILLE": [
    "31007",
    "GA"
  ],
  "CADWELL": [
    "31009",
    "GA"
  ],
  "CORDELE": [
    "31015",
    "GA"
  ],
  "CLINCHFIELD": [
    "31013",
    "GA"
  ],
  "COCHRAN": [
    "31014",
    "GA"
  ],
  "DAVISBORO": [
    "31018",
    "GA"
  ],
  "DRY BRANCH": [
    "31020",
    "GA"
  ],
  "EASTMAN": [
    "54626",
    "WI"
  ],
  "EATONTON": [
    "31024",
    "GA"
  ],
  "EAST DUBLIN": [
    "31027",
    "GA"
  ],
  "FORSYTH": [
    "65653",
    "MO"
  ],
  "HADDOCK": [
    "31033",
    "GA"
  ],
  "HAWKINSVILLE": [
    "31036",
    "GA"
  ],
  "IDEAL": [
    "31041",
    "GA"
  ],
  "IRWINTON": [
    "31042",
    "GA"
  ],
  "JEWELL": [
    "66949",
    "KS"
  ],
  "JULIETTE": [
    "31046",
    "GA"
  ],
  "KATHLEEN": [
    "33849",
    "FL"
  ],
  "KITE": [
    "41828",
    "KY"
  ],
  "LIZELLA": [
    "31052",
    "GA"
  ],
  "MC RAE": [
    "72102",
    "AR"
  ],
  "MARSHALLVILLE": [
    "44645",
    "OH"
  ],
  "MAUK": [
    "31058",
    "GA"
  ],
  "MILLEDGEVILLE": [
    "61051",
    "IL"
  ],
  "MUSELLA": [
    "31066",
    "GA"
  ],
  "OCONEE": [
    "62553",
    "IL"
  ],
  "OGLETHORPE": [
    "31068",
    "GA"
  ],
  "PINEVIEW": [
    "31071",
    "GA"
  ],
  "PITTS": [
    "31072",
    "GA"
  ],
  "RENTZ": [
    "31075",
    "GA"
  ],
  "REYNOLDS": [
    "68429",
    "NE"
  ],
  "RHINE": [
    "31077",
    "GA"
  ],
  "ROBERTA": [
    "31078",
    "GA"
  ],
  "SANDERSVILLE": [
    "39477",
    "MS"
  ],
  "SHADY DALE": [
    "31085",
    "GA"
  ],
  "SMARR": [
    "31086",
    "GA"
  ],
  "WARNER ROBINS": [
    "31099",
    "GA"
  ],
  "TENNILLE": [
    "31089",
    "GA"
  ],
  "TOOMSBORO": [
    "31090",
    "GA"
  ],
  "WARTHEN": [
    "31094",
    "GA"
  ],
  "YATESVILLE": [
    "31097",
    "GA"
  ],
  "CLYO": [
    "31303",
    "GA"
  ],
  "ELLABELL": [
    "31308",
    "GA"
  ],
  "HINESVILLE": [
    "31313",
    "GA"
  ],
  "GUYTON": [
    "31312",
    "GA"
  ],
  "FORT STEWART": [
    "31315",
    "GA"
  ],
  "LUDOWICI": [
    "31316",
    "GA"
  ],
  "MELDRIM": [
    "31318",
    "GA"
  ],
  "POOLER": [
    "31322",
    "GA"
  ],
  "RICEBORO": [
    "31323",
    "GA"
  ],
  "RINCON": [
    "87940",
    "NM"
  ],
  "TYBEE ISLAND": [
    "31328",
    "GA"
  ],
  "WALTHOURVILLE": [
    "31333",
    "GA"
  ],
  "PORT WENTWORTH": [
    "31407",
    "GA"
  ],
  "WAYCROSS": [
    "31503",
    "GA"
  ],
  "AMBROSE": [
    "58833",
    "ND"
  ],
  "BAXLEY": [
    "31515",
    "GA"
  ],
  "BLACKSHEAR": [
    "31516",
    "GA"
  ],
  "BROXTON": [
    "31519",
    "GA"
  ],
  "SAINT SIMONS ISLAND": [
    "31522",
    "GA"
  ],
  "JEKYLL ISLAND": [
    "31527",
    "GA"
  ],
  "FOLKSTON": [
    "31537",
    "GA"
  ],
  "HAZLEHURST": [
    "39083",
    "MS"
  ],
  "HORTENSE": [
    "31543",
    "GA"
  ],
  "JESUP": [
    "50648",
    "IA"
  ],
  "KINGS BAY": [
    "31547",
    "GA"
  ],
  "KINGSLAND": [
    "78639",
    "TX"
  ],
  "LUMBER CITY": [
    "31549",
    "GA"
  ],
  "MERSHON": [
    "31551",
    "GA"
  ],
  "NAHUNTA": [
    "31553",
    "GA"
  ],
  "NICHOLLS": [
    "31554",
    "GA"
  ],
  "ODUM": [
    "31555",
    "GA"
  ],
  "OFFERMAN": [
    "31556",
    "GA"
  ],
  "SCREVEN": [
    "31560",
    "GA"
  ],
  "SEA ISLAND": [
    "31561",
    "GA"
  ],
  "SURRENCY": [
    "31563",
    "GA"
  ],
  "WEST GREEN": [
    "31567",
    "GA"
  ],
  "VALDOSTA": [
    "31698",
    "GA"
  ],
  "ADEL": [
    "97620",
    "OR"
  ],
  "ALAPAHA": [
    "31622",
    "GA"
  ],
  "AXSON": [
    "31624",
    "GA"
  ],
  "BARNEY": [
    "58008",
    "ND"
  ],
  "DU PONT": [
    "31630",
    "GA"
  ],
  "FARGO": [
    "73840",
    "OK"
  ],
  "HAHIRA": [
    "31632",
    "GA"
  ],
  "HOMERVILLE": [
    "44235",
    "OH"
  ],
  "LAKELAND": [
    "70752",
    "LA"
  ],
  "LAKE PARK": [
    "56554",
    "MN"
  ],
  "NAYLOR": [
    "63953",
    "MO"
  ],
  "PEARSON": [
    "54462",
    "WI"
  ],
  "QUITMAN": [
    "75783",
    "TX"
  ],
  "RAY CITY": [
    "31645",
    "GA"
  ],
  "SPARKS": [
    "89441",
    "NV"
  ],
  "STATENVILLE": [
    "31648",
    "GA"
  ],
  "WILLACOOCHEE": [
    "31650",
    "GA"
  ],
  "MOODY AFB": [
    "31699",
    "GA"
  ],
  "AMERICUS": [
    "66835",
    "KS"
  ],
  "ANDERSONVILLE": [
    "37705",
    "TN"
  ],
  "ARABI": [
    "70032",
    "LA"
  ],
  "BACONTON": [
    "31716",
    "GA"
  ],
  "BARWICK": [
    "31720",
    "GA"
  ],
  "CAMILLA": [
    "31730",
    "GA"
  ],
  "CHULA": [
    "64635",
    "MO"
  ],
  "COBB": [
    "95426",
    "CA"
  ],
  "COOLIDGE": [
    "85128",
    "AZ"
  ],
  "DE SOTO": [
    "66018",
    "KS"
  ],
  "DOERUN": [
    "31744",
    "GA"
  ],
  "ELLENTON": [
    "34222",
    "FL"
  ],
  "ENIGMA": [
    "31749",
    "GA"
  ],
  "FITZGERALD": [
    "31750",
    "GA"
  ],
  "FUNSTON": [
    "31753",
    "GA"
  ],
  "HARTSFIELD": [
    "31756",
    "GA"
  ],
  "IRWINVILLE": [
    "31760",
    "GA"
  ],
  "LESLIE": [
    "72645",
    "AR"
  ],
  "MEIGS": [
    "31765",
    "GA"
  ],
  "MOULTRIE": [
    "31788",
    "GA"
  ],
  "NORMAN PARK": [
    "31771",
    "GA"
  ],
  "OCHLOCKNEE": [
    "31773",
    "GA"
  ],
  "OCILLA": [
    "31774",
    "GA"
  ],
  "OMEGA": [
    "73764",
    "OK"
  ],
  "PAVO": [
    "31778",
    "GA"
  ],
  "PLAINS": [
    "79355",
    "TX"
  ],
  "POULAN": [
    "31781",
    "GA"
  ],
  "REBECCA": [
    "31783",
    "GA"
  ],
  "SALE CITY": [
    "31784",
    "GA"
  ],
  "TIFTON": [
    "31794",
    "GA"
  ],
  "TY TY": [
    "31795",
    "GA"
  ],
  "WRAY": [
    "80758",
    "CO"
  ],
  "BOX SPRINGS": [
    "31801",
    "GA"
  ],
  "CATAULA": [
    "31804",
    "GA"
  ],
  "CUSSETA": [
    "36852",
    "AL"
  ],
  "ELLAVILLE": [
    "31806",
    "GA"
  ],
  "FORTSON": [
    "31808",
    "GA"
  ],
  "JUNCTION CITY": [
    "97448",
    "OR"
  ],
  "LUMPKIN": [
    "31815",
    "GA"
  ],
  "OMAHA": [
    "75571",
    "TX"
  ],
  "PINE MOUNTAIN": [
    "31822",
    "GA"
  ],
  "PINE MOUNTAIN VALLEY": [
    "31823",
    "GA"
  ],
  "TALBOTTON": [
    "31827",
    "GA"
  ],
  "UPATOI": [
    "31829",
    "GA"
  ],
  "WAVERLY HALL": [
    "31831",
    "GA"
  ],
  "FORT BENNING": [
    "31995",
    "GA"
  ],
  "FLEMING ISLAND": [
    "32006",
    "FL"
  ],
  "PONTE VEDRA BEACH": [
    "32082",
    "FL"
  ],
  "BRYCEVILLE": [
    "32009",
    "FL"
  ],
  "CALLAHAN": [
    "96014",
    "CA"
  ],
  "DAY": [
    "32013",
    "FL"
  ],
  "RAIFORD": [
    "32083",
    "FL"
  ],
  "FERNANDINA BEACH": [
    "32035",
    "FL"
  ],
  "FORT WHITE": [
    "32038",
    "FL"
  ],
  "GLEN SAINT MARY": [
    "32040",
    "FL"
  ],
  "YULEE": [
    "32097",
    "FL"
  ],
  "GREEN COVE SPRINGS": [
    "32043",
    "FL"
  ],
  "HILLIARD": [
    "43026",
    "OH"
  ],
  "JENNINGS": [
    "74038",
    "OK"
  ],
  "LAKE BUTLER": [
    "32054",
    "FL"
  ],
  "LAWTEY": [
    "32058",
    "FL"
  ],
  "LIVE OAK": [
    "95953",
    "CA"
  ],
  "LULU": [
    "32061",
    "FL"
  ],
  "MC ALPIN": [
    "32062",
    "FL"
  ],
  "MACCLENNY": [
    "32063",
    "FL"
  ],
  "ORANGE PARK": [
    "32073",
    "FL"
  ],
  "O BRIEN": [
    "97534",
    "OR"
  ],
  "OLUSTEE": [
    "73560",
    "OK"
  ],
  "PENNEY FARMS": [
    "32079",
    "FL"
  ],
  "SAINT AUGUSTINE": [
    "61474",
    "IL"
  ],
  "PONTE VEDRA": [
    "32081",
    "FL"
  ],
  "SANDERSON": [
    "79848",
    "TX"
  ],
  "STARKE": [
    "32091",
    "FL"
  ],
  "WELLBORN": [
    "77881",
    "TX"
  ],
  "WHITE SPRINGS": [
    "32096",
    "FL"
  ],
  "ASTOR": [
    "32102",
    "FL"
  ],
  "BARBERVILLE": [
    "32105",
    "FL"
  ],
  "BUNNELL": [
    "32110",
    "FL"
  ],
  "CRESCENT CITY": [
    "95531",
    "CA"
  ],
  "CITRA": [
    "32113",
    "FL"
  ],
  "DAYTONA BEACH": [
    "32126",
    "FL"
  ],
  "PORT ORANGE": [
    "32129",
    "FL"
  ],
  "DE LEON SPRINGS": [
    "32130",
    "FL"
  ],
  "EAST PALATKA": [
    "32131",
    "FL"
  ],
  "EASTLAKE WEIR": [
    "32133",
    "FL"
  ],
  "FORT MC COY": [
    "32134",
    "FL"
  ],
  "PALM COAST": [
    "32164",
    "FL"
  ],
  "FLAGLER BEACH": [
    "32136",
    "FL"
  ],
  "GRANDIN": [
    "63943",
    "MO"
  ],
  "FLORAHOME": [
    "32140",
    "FL"
  ],
  "INTERLACHEN": [
    "32148",
    "FL"
  ],
  "LADY LAKE": [
    "32159",
    "FL"
  ],
  "LAKE GENEVA": [
    "53147",
    "WI"
  ],
  "THE VILLAGES": [
    "32163",
    "FL"
  ],
  "NEW SMYRNA BEACH": [
    "32170",
    "FL"
  ],
  "ORMOND BEACH": [
    "32176",
    "FL"
  ],
  "PALATKA": [
    "32178",
    "FL"
  ],
  "OCKLAWAHA": [
    "32183",
    "FL"
  ],
  "PIERSON": [
    "51048",
    "IA"
  ],
  "POMONA PARK": [
    "32181",
    "FL"
  ],
  "ORANGE SPRINGS": [
    "32182",
    "FL"
  ],
  "PUTNAM HALL": [
    "32185",
    "FL"
  ],
  "SAN MATEO": [
    "94497",
    "CA"
  ],
  "SATSUMA": [
    "36572",
    "AL"
  ],
  "SEVILLE": [
    "44273",
    "OH"
  ],
  "SPARR": [
    "32192",
    "FL"
  ],
  "WELAKA": [
    "32193",
    "FL"
  ],
  "WEIRSDALE": [
    "32195",
    "FL"
  ],
  "JACKSONVILLE BEACH": [
    "32250",
    "FL"
  ],
  "NEPTUNE BEACH": [
    "32266",
    "FL"
  ],
  "TALLAHASSEE": [
    "32399",
    "FL"
  ],
  "APALACHICOLA": [
    "32329",
    "FL"
  ],
  "CARRABELLE": [
    "32322",
    "FL"
  ],
  "LANARK VILLAGE": [
    "32323",
    "FL"
  ],
  "CHATTAHOOCHEE": [
    "32324",
    "FL"
  ],
  "EASTPOINT": [
    "32328",
    "FL"
  ],
  "HAVANA": [
    "72842",
    "AR"
  ],
  "HOSFORD": [
    "32334",
    "FL"
  ],
  "SUMATRA": [
    "32335",
    "FL"
  ],
  "LAMONT": [
    "99017",
    "WA"
  ],
  "LLOYD": [
    "59535",
    "MT"
  ],
  "PANACEA": [
    "32346",
    "FL"
  ],
  "PINETTA": [
    "32350",
    "FL"
  ],
  "SAINT MARKS": [
    "32355",
    "FL"
  ],
  "SOPCHOPPY": [
    "32358",
    "FL"
  ],
  "STEINHATCHEE": [
    "32359",
    "FL"
  ],
  "TELOGIA": [
    "32360",
    "FL"
  ],
  "WACISSA": [
    "32361",
    "FL"
  ],
  "PANAMA CITY": [
    "32417",
    "FL"
  ],
  "PANAMA CITY BEACH": [
    "32413",
    "FL"
  ],
  "MEXICO BEACH": [
    "32410",
    "FL"
  ],
  "ALFORD": [
    "32420",
    "FL"
  ],
  "ALTHA": [
    "32421",
    "FL"
  ],
  "BASCOM": [
    "44809",
    "OH"
  ],
  "BLOUNTSTOWN": [
    "32424",
    "FL"
  ],
  "BONIFAY": [
    "32425",
    "FL"
  ],
  "CAMPBELLTON": [
    "78008",
    "TX"
  ],
  "CARYVILLE": [
    "37714",
    "TN"
  ],
  "CHIPLEY": [
    "32428",
    "FL"
  ],
  "COTTONDALE": [
    "35453",
    "AL"
  ],
  "DEFUNIAK SPRINGS": [
    "32435",
    "FL"
  ],
  "MOSSY HEAD": [
    "32434",
    "FL"
  ],
  "EBRO": [
    "32437",
    "FL"
  ],
  "GRACEVILLE": [
    "56240",
    "MN"
  ],
  "GRAND RIDGE": [
    "61325",
    "IL"
  ],
  "LYNN HAVEN": [
    "32444",
    "FL"
  ],
  "WEWAHITCHKA": [
    "32465",
    "FL"
  ],
  "NOMA": [
    "32452",
    "FL"
  ],
  "PONCE DE LEON": [
    "32455",
    "FL"
  ],
  "PORT SAINT JOE": [
    "32457",
    "FL"
  ],
  "SANTA ROSA BEACH": [
    "32459",
    "FL"
  ],
  "SNEADS": [
    "32460",
    "FL"
  ],
  "ROSEMARY BEACH": [
    "32461",
    "FL"
  ],
  "WAUSAU": [
    "54403",
    "WI"
  ],
  "PENSACOLA": [
    "32591",
    "FL"
  ],
  "BAGDAD": [
    "86321",
    "AZ"
  ],
  "CANTONMENT": [
    "32533",
    "FL"
  ],
  "CENTURY": [
    "32535",
    "FL"
  ],
  "CRESTVIEW": [
    "32539",
    "FL"
  ],
  "MILLIGAN": [
    "68406",
    "NE"
  ],
  "DESTIN": [
    "32541",
    "FL"
  ],
  "EGLIN AFB": [
    "32542",
    "FL"
  ],
  "HURLBURT FIELD": [
    "32544",
    "FL"
  ],
  "FORT WALTON BEACH": [
    "32549",
    "FL"
  ],
  "MIRAMAR BEACH": [
    "32550",
    "FL"
  ],
  "GONZALEZ": [
    "32560",
    "FL"
  ],
  "GULF BREEZE": [
    "32563",
    "FL"
  ],
  "HOLT": [
    "95234",
    "CA"
  ],
  "NAVARRE": [
    "55392",
    "MN"
  ],
  "MC DAVID": [
    "32568",
    "FL"
  ],
  "MARY ESTHER": [
    "32569",
    "FL"
  ],
  "MOLINO": [
    "32577",
    "FL"
  ],
  "NICEVILLE": [
    "32588",
    "FL"
  ],
  "SHALIMAR": [
    "32579",
    "FL"
  ],
  "VALPARAISO": [
    "68065",
    "NE"
  ],
  "ALACHUA": [
    "32616",
    "FL"
  ],
  "ANTHONY": [
    "88021",
    "NM"
  ],
  "ARCHER": [
    "68816",
    "NE"
  ],
  "BELL": [
    "90202",
    "CA"
  ],
  "BRONSON": [
    "75930",
    "TX"
  ],
  "BROOKER": [
    "32622",
    "FL"
  ],
  "CEDAR KEY": [
    "32625",
    "FL"
  ],
  "CHIEFLAND": [
    "32644",
    "FL"
  ],
  "CROSS CITY": [
    "32628",
    "FL"
  ],
  "EARLETON": [
    "32631",
    "FL"
  ],
  "GULF HAMMOCK": [
    "32639",
    "FL"
  ],
  "HIGH SPRINGS": [
    "32655",
    "FL"
  ],
  "HORSESHOE BEACH": [
    "32648",
    "FL"
  ],
  "ISLAND GROVE": [
    "32654",
    "FL"
  ],
  "KEYSTONE HEIGHTS": [
    "32656",
    "FL"
  ],
  "MC INTOSH": [
    "57641",
    "SD"
  ],
  "MICANOPY": [
    "32667",
    "FL"
  ],
  "MORRISTON": [
    "32668",
    "FL"
  ],
  "ORANGE LAKE": [
    "32681",
    "FL"
  ],
  "OTTER CREEK": [
    "32683",
    "FL"
  ],
  "REDDICK": [
    "60961",
    "IL"
  ],
  "SUWANNEE": [
    "32692",
    "FL"
  ],
  "WALDO": [
    "71770",
    "AR"
  ],
  "WORTHINGTON SPRINGS": [
    "32697",
    "FL"
  ],
  "ALTAMONTE SPRINGS": [
    "32716",
    "FL"
  ],
  "APOPKA": [
    "32712",
    "FL"
  ],
  "CASSELBERRY": [
    "32730",
    "FL"
  ],
  "WINTER SPRINGS": [
    "32719",
    "FL"
  ],
  "CHRISTMAS": [
    "32709",
    "FL"
  ],
  "CLARCONA": [
    "32710",
    "FL"
  ],
  "DEBARY": [
    "32753",
    "FL"
  ],
  "DELAND": [
    "32724",
    "FL"
  ],
  "DELTONA": [
    "32739",
    "FL"
  ],
  "GOLDENROD": [
    "32733",
    "FL"
  ],
  "LAKE HELEN": [
    "32744",
    "FL"
  ],
  "MID FLORIDA": [
    "32799",
    "FL"
  ],
  "LAKE MARY": [
    "32795",
    "FL"
  ],
  "LAKE MONROE": [
    "32747",
    "FL"
  ],
  "MAITLAND": [
    "64466",
    "MO"
  ],
  "MIMS": [
    "32754",
    "FL"
  ],
  "MOUNT DORA": [
    "32757",
    "FL"
  ],
  "OVIEDO": [
    "32766",
    "FL"
  ],
  "ORANGE CITY": [
    "51041",
    "IA"
  ],
  "OSTEEN": [
    "32764",
    "FL"
  ],
  "PAISLEY": [
    "97636",
    "OR"
  ],
  "SCOTTSMOOR": [
    "32775",
    "FL"
  ],
  "TANGERINE": [
    "32777",
    "FL"
  ],
  "TAVARES": [
    "32778",
    "FL"
  ],
  "UMATILLA": [
    "97882",
    "OR"
  ],
  "WINTER PARK": [
    "80482",
    "CO"
  ],
  "ZELLWOOD": [
    "32798",
    "FL"
  ],
  "ORLANDO": [
    "73073",
    "OK"
  ],
  "MELBOURNE": [
    "72556",
    "AR"
  ],
  "INDIALANTIC": [
    "32903",
    "FL"
  ],
  "PALM BAY": [
    "32911",
    "FL"
  ],
  "CAPE CANAVERAL": [
    "32920",
    "FL"
  ],
  "COCOA": [
    "32927",
    "FL"
  ],
  "PATRICK AFB": [
    "32925",
    "FL"
  ],
  "COCOA BEACH": [
    "32932",
    "FL"
  ],
  "SATELLITE BEACH": [
    "32937",
    "FL"
  ],
  "FELLSMERE": [
    "32948",
    "FL"
  ],
  "GRANT": [
    "80448",
    "CO"
  ],
  "MALABAR": [
    "32950",
    "FL"
  ],
  "MELBOURNE BEACH": [
    "32951",
    "FL"
  ],
  "MERRITT ISLAND": [
    "32954",
    "FL"
  ],
  "SEBASTIAN": [
    "78594",
    "TX"
  ],
  "SHARPES": [
    "32959",
    "FL"
  ],
  "VERO BEACH": [
    "32969",
    "FL"
  ],
  "WABASSO": [
    "56293",
    "MN"
  ],
  "WINTER BEACH": [
    "32971",
    "FL"
  ],
  "LONG KEY": [
    "33001",
    "FL"
  ],
  "HIALEAH": [
    "33018",
    "FL"
  ],
  "DANIA": [
    "33004",
    "FL"
  ],
  "HALLANDALE": [
    "33009",
    "FL"
  ],
  "PEMBROKE PINES": [
    "33082",
    "FL"
  ],
  "ISLAMORADA": [
    "33036",
    "FL"
  ],
  "KEY LARGO": [
    "33037",
    "FL"
  ],
  "KEY WEST": [
    "33045",
    "FL"
  ],
  "SUMMERLAND KEY": [
    "33042",
    "FL"
  ],
  "BIG PINE KEY": [
    "33043",
    "FL"
  ],
  "KEY COLONY BEACH": [
    "33051",
    "FL"
  ],
  "MARATHON SHORES": [
    "33052",
    "FL"
  ],
  "OPA LOCKA": [
    "33055",
    "FL"
  ],
  "MIAMI GARDENS": [
    "33056",
    "FL"
  ],
  "POMPANO BEACH": [
    "33077",
    "FL"
  ],
  "TAVERNIER": [
    "33070",
    "FL"
  ],
  "CORAL SPRINGS": [
    "33075",
    "FL"
  ],
  "MARGATE": [
    "33093",
    "FL"
  ],
  "COCONUT CREEK": [
    "33097",
    "FL"
  ],
  "MIAMI BEACH": [
    "33239",
    "FL"
  ],
  "CORAL GABLES": [
    "33114",
    "FL"
  ],
  "KEY BISCAYNE": [
    "33149",
    "FL"
  ],
  "NORTH MIAMI BEACH": [
    "33160",
    "FL"
  ],
  "FORT LAUDERDALE": [
    "33394",
    "FL"
  ],
  "PLANTATION": [
    "33388",
    "FL"
  ],
  "WEST PALM BEACH": [
    "33422",
    "FL"
  ],
  "NORTH PALM BEACH": [
    "33408",
    "FL"
  ],
  "PALM BEACH GARDENS": [
    "33418",
    "FL"
  ],
  "WELLINGTON": [
    "89444",
    "NV"
  ],
  "ROYAL PALM BEACH": [
    "33421",
    "FL"
  ],
  "BOYNTON BEACH": [
    "33474",
    "FL"
  ],
  "BOCA RATON": [
    "33499",
    "FL"
  ],
  "BELLE GLADE": [
    "33430",
    "FL"
  ],
  "CANAL POINT": [
    "33438",
    "FL"
  ],
  "CLEWISTON": [
    "33440",
    "FL"
  ],
  "DEERFIELD BEACH": [
    "33443",
    "FL"
  ],
  "DELRAY BEACH": [
    "33484",
    "FL"
  ],
  "LAKE WORTH": [
    "33467",
    "FL"
  ],
  "GREENACRES": [
    "99016",
    "WA"
  ],
  "HOBE SOUND": [
    "33475",
    "FL"
  ],
  "JUPITER": [
    "33478",
    "FL"
  ],
  "LAKE HARBOR": [
    "33459",
    "FL"
  ],
  "LOXAHATCHEE": [
    "33470",
    "FL"
  ],
  "MOORE HAVEN": [
    "33471",
    "FL"
  ],
  "PAHOKEE": [
    "33476",
    "FL"
  ],
  "PALM BEACH": [
    "33480",
    "FL"
  ],
  "SOUTH BAY": [
    "33493",
    "FL"
  ],
  "BALM": [
    "33503",
    "FL"
  ],
  "BUSHNELL": [
    "69128",
    "NE"
  ],
  "CENTER HILL": [
    "33514",
    "FL"
  ],
  "COLEMAN": [
    "76834",
    "TX"
  ],
  "DADE CITY": [
    "33526",
    "FL"
  ],
  "CRYSTAL SPRINGS": [
    "39059",
    "MS"
  ],
  "DURANT": [
    "74702",
    "OK"
  ],
  "GIBSONTON": [
    "33534",
    "FL"
  ],
  "LACOOCHEE": [
    "33537",
    "FL"
  ],
  "LAKE PANASOFFKEE": [
    "33538",
    "FL"
  ],
  "ZEPHYRHILLS": [
    "33542",
    "FL"
  ],
  "WESLEY CHAPEL": [
    "33545",
    "FL"
  ],
  "LITHIA": [
    "33547",
    "FL"
  ],
  "LUTZ": [
    "33559",
    "FL"
  ],
  "MANGO": [
    "33550",
    "FL"
  ],
  "PLANT CITY": [
    "33567",
    "FL"
  ],
  "RIVERVIEW": [
    "48193",
    "MI"
  ],
  "RUSKIN": [
    "68974",
    "NE"
  ],
  "SUN CITY CENTER": [
    "33573",
    "FL"
  ],
  "APOLLO BEACH": [
    "33572",
    "FL"
  ],
  "SAINT LEO": [
    "33574",
    "FL"
  ],
  "SAN ANTONIO": [
    "87832",
    "NM"
  ],
  "SEFFNER": [
    "33584",
    "FL"
  ],
  "SUMTERVILLE": [
    "33585",
    "FL"
  ],
  "SUN CITY": [
    "92586",
    "CA"
  ],
  "SYDNEY": [
    "33587",
    "FL"
  ],
  "THONOTOSASSA": [
    "33592",
    "FL"
  ],
  "TRILBY": [
    "33593",
    "FL"
  ],
  "VALRICO": [
    "33596",
    "FL"
  ],
  "WIMAUMA": [
    "33598",
    "FL"
  ],
  "TAMPA": [
    "67483",
    "KS"
  ],
  "BAY PINES": [
    "33744",
    "FL"
  ],
  "CLEARWATER BEACH": [
    "33767",
    "FL"
  ],
  "LARGO": [
    "33779",
    "FL"
  ],
  "PINELLAS PARK": [
    "33782",
    "FL"
  ],
  "INDIAN ROCKS BEACH": [
    "33785",
    "FL"
  ],
  "BELLEAIR BEACH": [
    "33786",
    "FL"
  ],
  "ALTURAS": [
    "96101",
    "CA"
  ],
  "AVON PARK": [
    "33826",
    "FL"
  ],
  "EATON PARK": [
    "33840",
    "FL"
  ],
  "FORT MEADE": [
    "57741",
    "SD"
  ],
  "FROSTPROOF": [
    "33843",
    "FL"
  ],
  "HAINES CITY": [
    "33845",
    "FL"
  ],
  "HIGHLAND CITY": [
    "33846",
    "FL"
  ],
  "HOMELAND": [
    "92548",
    "CA"
  ],
  "INTERCESSION CITY": [
    "33848",
    "FL"
  ],
  "LAKE ALFRED": [
    "33850",
    "FL"
  ],
  "LAKE HAMILTON": [
    "33851",
    "FL"
  ],
  "LAKE WALES": [
    "33898",
    "FL"
  ],
  "LAKESHORE": [
    "93634",
    "CA"
  ],
  "INDIAN LAKE ESTATES": [
    "33855",
    "FL"
  ],
  "NALCREST": [
    "33856",
    "FL"
  ],
  "LORIDA": [
    "33857",
    "FL"
  ],
  "LOUGHMAN": [
    "33858",
    "FL"
  ],
  "MULBERRY": [
    "72947",
    "AR"
  ],
  "RIVER RANCH": [
    "33867",
    "FL"
  ],
  "POLK CITY": [
    "50226",
    "IA"
  ],
  "SEBRING": [
    "44672",
    "OH"
  ],
  "WAUCHULA": [
    "33873",
    "FL"
  ],
  "WINTER HAVEN": [
    "33888",
    "FL"
  ],
  "ZOLFO SPRINGS": [
    "33890",
    "FL"
  ],
  "FORT MYERS": [
    "33994",
    "FL"
  ],
  "NORTH FORT MYERS": [
    "33918",
    "FL"
  ],
  "CAPE CORAL": [
    "33993",
    "FL"
  ],
  "ALVA": [
    "82711",
    "WY"
  ],
  "BOCA GRANDE": [
    "33921",
    "FL"
  ],
  "BOKEELIA": [
    "33922",
    "FL"
  ],
  "CAPTIVA": [
    "33924",
    "FL"
  ],
  "ESTERO": [
    "33929",
    "FL"
  ],
  "FELDA": [
    "33930",
    "FL"
  ],
  "FORT MYERS BEACH": [
    "33932",
    "FL"
  ],
  "LABELLE": [
    "33975",
    "FL"
  ],
  "LEHIGH ACRES": [
    "33976",
    "FL"
  ],
  "MURDOCK": [
    "68407",
    "NE"
  ],
  "PALMDALE": [
    "93599",
    "CA"
  ],
  "PLACIDA": [
    "33946",
    "FL"
  ],
  "ROTONDA WEST": [
    "33947",
    "FL"
  ],
  "PORT CHARLOTTE": [
    "33981",
    "FL"
  ],
  "PUNTA GORDA": [
    "33983",
    "FL"
  ],
  "SAINT JAMES CITY": [
    "33956",
    "FL"
  ],
  "SANIBEL": [
    "33957",
    "FL"
  ],
  "BONITA SPRINGS": [
    "34136",
    "FL"
  ],
  "COPELAND": [
    "67837",
    "KS"
  ],
  "CHOKOLOSKEE": [
    "34138",
    "FL"
  ],
  "EVERGLADES CITY": [
    "34139",
    "FL"
  ],
  "GOODLAND": [
    "67735",
    "KS"
  ],
  "OCHOPEE": [
    "34141",
    "FL"
  ],
  "IMMOKALEE": [
    "34143",
    "FL"
  ],
  "MARCO ISLAND": [
    "34146",
    "FL"
  ],
  "BRADENTON": [
    "34282",
    "FL"
  ],
  "CORTEZ": [
    "81321",
    "CO"
  ],
  "ANNA MARIA": [
    "34216",
    "FL"
  ],
  "BRADENTON BEACH": [
    "34217",
    "FL"
  ],
  "HOLMES BEACH": [
    "34218",
    "FL"
  ],
  "PARRISH": [
    "35580",
    "AL"
  ],
  "LONGBOAT KEY": [
    "34228",
    "FL"
  ],
  "OSPREY": [
    "34229",
    "FL"
  ],
  "SARASOTA": [
    "34278",
    "FL"
  ],
  "TERRA CEIA": [
    "34250",
    "FL"
  ],
  "MYAKKA CITY": [
    "34251",
    "FL"
  ],
  "FORT OGDEN": [
    "34267",
    "FL"
  ],
  "NOCATEE": [
    "34268",
    "FL"
  ],
  "TALLEVAST": [
    "34270",
    "FL"
  ],
  "NOKOMIS": [
    "62075",
    "IL"
  ],
  "VENICE": [
    "90294",
    "CA"
  ],
  "NORTH PORT": [
    "34291",
    "FL"
  ],
  "BELLEVIEW": [
    "63623",
    "MO"
  ],
  "CRYSTAL RIVER": [
    "34429",
    "FL"
  ],
  "DUNNELLON": [
    "34434",
    "FL"
  ],
  "FLORAL CITY": [
    "34436",
    "FL"
  ],
  "HERNANDO": [
    "38632",
    "MS"
  ],
  "HOLDER": [
    "34445",
    "FL"
  ],
  "HOMOSASSA": [
    "34487",
    "FL"
  ],
  "HOMOSASSA SPRINGS": [
    "34447",
    "FL"
  ],
  "INGLIS": [
    "34449",
    "FL"
  ],
  "INVERNESS": [
    "94937",
    "CA"
  ],
  "LECANTO": [
    "34461",
    "FL"
  ],
  "BEVERLY HILLS": [
    "90213",
    "CA"
  ],
  "OCALA": [
    "34483",
    "FL"
  ],
  "YANKEETOWN": [
    "34498",
    "FL"
  ],
  "SPRING HILL": [
    "66083",
    "KS"
  ],
  "ISTACHATTA": [
    "34636",
    "FL"
  ],
  "LAND O LAKES": [
    "54540",
    "WI"
  ],
  "NEW PORT RICHEY": [
    "34656",
    "FL"
  ],
  "OZONA": [
    "76943",
    "TX"
  ],
  "NOBLETON": [
    "34661",
    "FL"
  ],
  "PORT RICHEY": [
    "34673",
    "FL"
  ],
  "OLDSMAR": [
    "34677",
    "FL"
  ],
  "ARIPEKA": [
    "34679",
    "FL"
  ],
  "ELFERS": [
    "34680",
    "FL"
  ],
  "CRYSTAL BEACH": [
    "34681",
    "FL"
  ],
  "PALM HARBOR": [
    "34685",
    "FL"
  ],
  "TARPON SPRINGS": [
    "34689",
    "FL"
  ],
  "HOLIDAY": [
    "34691",
    "FL"
  ],
  "SAFETY HARBOR": [
    "34695",
    "FL"
  ],
  "DUNEDIN": [
    "34698",
    "FL"
  ],
  "ASTATULA": [
    "34705",
    "FL"
  ],
  "FRUITLAND PARK": [
    "34731",
    "FL"
  ],
  "GOTHA": [
    "34734",
    "FL"
  ],
  "HOWEY IN THE HILLS": [
    "34737",
    "FL"
  ],
  "KILLARNEY": [
    "34740",
    "FL"
  ],
  "KISSIMMEE": [
    "34759",
    "FL"
  ],
  "MASCOTTE": [
    "34753",
    "FL"
  ],
  "MINNEOLA": [
    "67865",
    "KS"
  ],
  "MONTVERDE": [
    "34756",
    "FL"
  ],
  "OCOEE": [
    "37361",
    "TN"
  ],
  "OKAHUMPKA": [
    "34762",
    "FL"
  ],
  "SAINT CLOUD": [
    "56393",
    "MN"
  ],
  "WINTER GARDEN": [
    "34787",
    "FL"
  ],
  "WINDERMERE": [
    "34786",
    "FL"
  ],
  "YALAHA": [
    "34797",
    "FL"
  ],
  "FORT PIERCE": [
    "34982",
    "FL"
  ],
  "PORT SAINT LUCIE": [
    "34988",
    "FL"
  ],
  "INDIANTOWN": [
    "34956",
    "FL"
  ],
  "JENSEN BEACH": [
    "34958",
    "FL"
  ],
  "OKEECHOBEE": [
    "34974",
    "FL"
  ],
  "PALM CITY": [
    "34991",
    "FL"
  ],
  "PORT SALERNO": [
    "34992",
    "FL"
  ],
  "ADGER": [
    "35006",
    "AL"
  ],
  "ALABASTER": [
    "35007",
    "AL"
  ],
  "ALEXANDER CITY": [
    "35011",
    "AL"
  ],
  "ALLGOOD": [
    "35013",
    "AL"
  ],
  "ARAB": [
    "35016",
    "AL"
  ],
  "BAILEYTON": [
    "35019",
    "AL"
  ],
  "BLOUNTSVILLE": [
    "35031",
    "AL"
  ],
  "BON AIR": [
    "35032",
    "AL"
  ],
  "BRENT": [
    "35034",
    "AL"
  ],
  "BRIERFIELD": [
    "35035",
    "AL"
  ],
  "CALERA": [
    "74730",
    "OK"
  ],
  "CHILDERSBURG": [
    "35044",
    "AL"
  ],
  "CLANTON": [
    "35046",
    "AL"
  ],
  "COLUMBIANA": [
    "44408",
    "OH"
  ],
  "COOK SPRINGS": [
    "35052",
    "AL"
  ],
  "CRANE HILL": [
    "35053",
    "AL"
  ],
  "CROPWELL": [
    "35054",
    "AL"
  ],
  "CULLMAN": [
    "35058",
    "AL"
  ],
  "DOCENA": [
    "35060",
    "AL"
  ],
  "DOLOMITE": [
    "35061",
    "AL"
  ],
  "DORA": [
    "88115",
    "NM"
  ],
  "EMPIRE": [
    "95319",
    "CA"
  ],
  "FULTONDALE": [
    "35068",
    "AL"
  ],
  "GARDENDALE": [
    "79758",
    "TX"
  ],
  "GOODWATER": [
    "35072",
    "AL"
  ],
  "HANCEVILLE": [
    "35077",
    "AL"
  ],
  "HARPERSVILLE": [
    "35078",
    "AL"
  ],
  "HAYDEN": [
    "85135",
    "AZ"
  ],
  "HOLLINS": [
    "35082",
    "AL"
  ],
  "HOLLY POND": [
    "35083",
    "AL"
  ],
  "JEMISON": [
    "35085",
    "AL"
  ],
  "KELLYTON": [
    "35089",
    "AL"
  ],
  "LOCUST FORK": [
    "35097",
    "AL"
  ],
  "MC CALLA": [
    "35111",
    "AL"
  ],
  "MARGARET": [
    "35112",
    "AL"
  ],
  "MAYLENE": [
    "35114",
    "AL"
  ],
  "MONTEVALLO": [
    "35115",
    "AL"
  ],
  "MULGA": [
    "35118",
    "AL"
  ],
  "ODENVILLE": [
    "35120",
    "AL"
  ],
  "PALMERDALE": [
    "35123",
    "AL"
  ],
  "PELL CITY": [
    "35128",
    "AL"
  ],
  "PINSON": [
    "38366",
    "TN"
  ],
  "PLEASANT GROVE": [
    "95668",
    "CA"
  ],
  "REMLAP": [
    "35133",
    "AL"
  ],
  "ROCKFORD": [
    "99030",
    "WA"
  ],
  "SAGINAW": [
    "64864",
    "MO"
  ],
  "STERRETT": [
    "35147",
    "AL"
  ],
  "SUMITON": [
    "35148",
    "AL"
  ],
  "SYLACAUGA": [
    "35151",
    "AL"
  ],
  "TALLADEGA": [
    "35161",
    "AL"
  ],
  "THORSBY": [
    "35171",
    "AL"
  ],
  "TRUSSVILLE": [
    "35173",
    "AL"
  ],
  "VANDIVER": [
    "35176",
    "AL"
  ],
  "VINCENT": [
    "50594",
    "IA"
  ],
  "VINEMONT": [
    "35179",
    "AL"
  ],
  "WARRIOR": [
    "35180",
    "AL"
  ],
  "WEOGUFKA": [
    "35183",
    "AL"
  ],
  "WEST BLOCTON": [
    "35184",
    "AL"
  ],
  "WILSONVILLE": [
    "97070",
    "OR"
  ],
  "TUSCALOOSA": [
    "35487",
    "AL"
  ],
  "ALICEVILLE": [
    "35442",
    "AL"
  ],
  "BOLIGEE": [
    "35443",
    "AL"
  ],
  "BROOKWOOD": [
    "35444",
    "AL"
  ],
  "BUHL": [
    "83316",
    "ID"
  ],
  "COALING": [
    "35449",
    "AL"
  ],
  "COKER": [
    "35452",
    "AL"
  ],
  "DUNCANVILLE": [
    "75138",
    "TX"
  ],
  "ECHOLA": [
    "35457",
    "AL"
  ],
  "EMELLE": [
    "35459",
    "AL"
  ],
  "EPES": [
    "35460",
    "AL"
  ],
  "ETHELSVILLE": [
    "35461",
    "AL"
  ],
  "EUTAW": [
    "35462",
    "AL"
  ],
  "FOSTERS": [
    "35463",
    "AL"
  ],
  "GORDO": [
    "35466",
    "AL"
  ],
  "MC SHAN": [
    "35471",
    "AL"
  ],
  "MOUNDVILLE": [
    "64771",
    "MO"
  ],
  "PANOLA": [
    "75685",
    "TX"
  ],
  "PETERSON": [
    "55962",
    "MN"
  ],
  "RALPH": [
    "49877",
    "MI"
  ],
  "REFORM": [
    "35481",
    "AL"
  ],
  "ARLEY": [
    "35541",
    "AL"
  ],
  "BANKSTON": [
    "35542",
    "AL"
  ],
  "BEAVERTON": [
    "97077",
    "OR"
  ],
  "BELK": [
    "35545",
    "AL"
  ],
  "BERRY": [
    "41003",
    "KY"
  ],
  "BRILLIANT": [
    "43913",
    "OH"
  ],
  "CARBON HILL": [
    "43111",
    "OH"
  ],
  "DOUBLE SPRINGS": [
    "35553",
    "AL"
  ],
  "ELDRIDGE": [
    "95431",
    "CA"
  ],
  "GOODSPRINGS": [
    "35560",
    "AL"
  ],
  "GUIN": [
    "35563",
    "AL"
  ],
  "HACKLEBURG": [
    "35564",
    "AL"
  ],
  "HALEYVILLE": [
    "35565",
    "AL"
  ],
  "KANSAS": [
    "74347",
    "OK"
  ],
  "NAUVOO": [
    "62354",
    "IL"
  ],
  "PHIL CAMPBELL": [
    "35581",
    "AL"
  ],
  "RED BAY": [
    "35582",
    "AL"
  ],
  "SIPSEY": [
    "35584",
    "AL"
  ],
  "SULLIGENT": [
    "35586",
    "AL"
  ],
  "TOWNLEY": [
    "35587",
    "AL"
  ],
  "VINA": [
    "96092",
    "CA"
  ],
  "BELLE MINA": [
    "35615",
    "AL"
  ],
  "ELKMONT": [
    "35620",
    "AL"
  ],
  "EVA": [
    "38333",
    "TN"
  ],
  "FALKVILLE": [
    "35622",
    "AL"
  ],
  "HARTSELLE": [
    "35640",
    "AL"
  ],
  "KILLEN": [
    "35645",
    "AL"
  ],
  "LEIGHTON": [
    "50143",
    "IA"
  ],
  "MOULTON": [
    "77975",
    "TX"
  ],
  "MUSCLE SHOALS": [
    "35662",
    "AL"
  ],
  "TANNER": [
    "35671",
    "AL"
  ],
  "TOWN CREEK": [
    "35672",
    "AL"
  ],
  "TUSCUMBIA": [
    "65082",
    "MO"
  ],
  "BROWNSBORO": [
    "75756",
    "TX"
  ],
  "CAPSHAW": [
    "35742",
    "AL"
  ],
  "ESTILLFORK": [
    "35745",
    "AL"
  ],
  "FACKLER": [
    "35746",
    "AL"
  ],
  "GURLEY": [
    "69141",
    "NE"
  ],
  "HARVEST": [
    "35749",
    "AL"
  ],
  "HAZEL GREEN": [
    "53811",
    "WI"
  ],
  "HOLLYTREE": [
    "35751",
    "AL"
  ],
  "LACEYS SPRING": [
    "35754",
    "AL"
  ],
  "LANGSTON": [
    "73050",
    "OK"
  ],
  "MERIDIANVILLE": [
    "35759",
    "AL"
  ],
  "NORMAL": [
    "61790",
    "IL"
  ],
  "OWENS CROSS ROADS": [
    "35763",
    "AL"
  ],
  "PAINT ROCK": [
    "76866",
    "TX"
  ],
  "PISGAH": [
    "51564",
    "IA"
  ],
  "RYLAND": [
    "35767",
    "AL"
  ],
  "SCOTTSBORO": [
    "35769",
    "AL"
  ],
  "SECTION": [
    "35771",
    "AL"
  ],
  "TONEY": [
    "35773",
    "AL"
  ],
  "VALHERMOSO SPRINGS": [
    "35775",
    "AL"
  ],
  "HUNTSVILLE": [
    "84317",
    "UT"
  ],
  "RAINBOW CITY": [
    "35906",
    "AL"
  ],
  "ALBERTVILLE": [
    "55301",
    "MN"
  ],
  "ATTALLA": [
    "35954",
    "AL"
  ],
  "BOAZ": [
    "42027",
    "KY"
  ],
  "BRYANT": [
    "72089",
    "AR"
  ],
  "CENTRE": [
    "35960",
    "AL"
  ],
  "CROSSVILLE": [
    "62827",
    "IL"
  ],
  "FORT PAYNE": [
    "35968",
    "AL"
  ],
  "FYFFE": [
    "35971",
    "AL"
  ],
  "GALLANT": [
    "35972",
    "AL"
  ],
  "GAYLESVILLE": [
    "35973",
    "AL"
  ],
  "GERALDINE": [
    "59446",
    "MT"
  ],
  "GROVEOAK": [
    "35975",
    "AL"
  ],
  "GUNTERSVILLE": [
    "35976",
    "AL"
  ],
  "HENAGAR": [
    "35978",
    "AL"
  ],
  "HIGDON": [
    "35979",
    "AL"
  ],
  "HORTON": [
    "66439",
    "KS"
  ],
  "IDER": [
    "35981",
    "AL"
  ],
  "MENTONE": [
    "92359",
    "CA"
  ],
  "RAINSVILLE": [
    "35986",
    "AL"
  ],
  "STEELE": [
    "63877",
    "MO"
  ],
  "WALNUT GROVE": [
    "95690",
    "CA"
  ],
  "AUTAUGAVILLE": [
    "36003",
    "AL"
  ],
  "BANKS": [
    "97106",
    "OR"
  ],
  "BILLINGSLEY": [
    "36006",
    "AL"
  ],
  "BOOTH": [
    "36008",
    "AL"
  ],
  "BRANTLEY": [
    "36009",
    "AL"
  ],
  "BRUNDIDGE": [
    "36010",
    "AL"
  ],
  "CHAPMAN": [
    "68827",
    "NE"
  ],
  "COOSADA": [
    "36020",
    "AL"
  ],
  "DEATSVILLE": [
    "36022",
    "AL"
  ],
  "EAST TALLASSEE": [
    "36023",
    "AL"
  ],
  "ECLECTIC": [
    "36024",
    "AL"
  ],
  "ELMORE": [
    "56027",
    "MN"
  ],
  "EQUALITY": [
    "62934",
    "IL"
  ],
  "EUFAULA": [
    "74432",
    "OK"
  ],
  "DOZIER": [
    "36028",
    "AL"
  ],
  "FITZPATRICK": [
    "36029",
    "AL"
  ],
  "FOREST HOME": [
    "36030",
    "AL"
  ],
  "FORT DEPOSIT": [
    "36032",
    "AL"
  ],
  "GEORGIANA": [
    "36033",
    "AL"
  ],
  "GRADY": [
    "88120",
    "NM"
  ],
  "GANTT": [
    "36038",
    "AL"
  ],
  "HARDAWAY": [
    "36039",
    "AL"
  ],
  "HAYNEVILLE": [
    "36040",
    "AL"
  ],
  "HIGHLAND HOME": [
    "36041",
    "AL"
  ],
  "HONORAVILLE": [
    "36042",
    "AL"
  ],
  "HOPE HULL": [
    "36043",
    "AL"
  ],
  "LAPINE": [
    "36046",
    "AL"
  ],
  "LETOHATCHEE": [
    "36047",
    "AL"
  ],
  "LUVERNE": [
    "58056",
    "ND"
  ],
  "MOUNT MEIGS": [
    "36057",
    "AL"
  ],
  "PIKE ROAD": [
    "36064",
    "AL"
  ],
  "PRATTVILLE": [
    "36068",
    "AL"
  ],
  "RAMER": [
    "38367",
    "TN"
  ],
  "SHORTER": [
    "36075",
    "AL"
  ],
  "TALLASSEE": [
    "37878",
    "TN"
  ],
  "TITUS": [
    "36080",
    "AL"
  ],
  "TUSKEGEE": [
    "36083",
    "AL"
  ],
  "TUSKEGEE INSTITUTE": [
    "36088",
    "AL"
  ],
  "VERBENA": [
    "36091",
    "AL"
  ],
  "WETUMPKA": [
    "36093",
    "AL"
  ],
  "ANNISTON": [
    "63820",
    "MO"
  ],
  "BYNUM": [
    "76631",
    "TX"
  ],
  "CHOCCOLOCCO": [
    "36254",
    "AL"
  ],
  "CRAGFORD": [
    "36255",
    "AL"
  ],
  "DAVISTON": [
    "36256",
    "AL"
  ],
  "DE ARMANVILLE": [
    "36257",
    "AL"
  ],
  "EASTABOGA": [
    "36260",
    "AL"
  ],
  "FRUITHURST": [
    "36262",
    "AL"
  ],
  "HEFLIN": [
    "71039",
    "LA"
  ],
  "LINEVILLE": [
    "50147",
    "IA"
  ],
  "MILLERVILLE": [
    "36267",
    "AL"
  ],
  "MUNFORD": [
    "38058",
    "TN"
  ],
  "MUSCADINE": [
    "36269",
    "AL"
  ],
  "OHATCHEE": [
    "36271",
    "AL"
  ],
  "RANBURNE": [
    "36273",
    "AL"
  ],
  "WEAVER": [
    "36277",
    "AL"
  ],
  "WEDOWEE": [
    "36278",
    "AL"
  ],
  "ARITON": [
    "36311",
    "AL"
  ],
  "BLACK": [
    "63625",
    "MO"
  ],
  "CHANCELLOR": [
    "57015",
    "SD"
  ],
  "COFFEE SPRINGS": [
    "36318",
    "AL"
  ],
  "COTTONWOOD": [
    "96022",
    "CA"
  ],
  "COWARTS": [
    "36321",
    "AL"
  ],
  "HEADLAND": [
    "36345",
    "AL"
  ],
  "JACK": [
    "36346",
    "AL"
  ],
  "MIDLAND CITY": [
    "36350",
    "AL"
  ],
  "NEW BROCKTON": [
    "36351",
    "AL"
  ],
  "OZARK": [
    "72949",
    "AR"
  ],
  "FORT RUCKER": [
    "36362",
    "AL"
  ],
  "PANSEY": [
    "36370",
    "AL"
  ],
  "PINCKARD": [
    "36371",
    "AL"
  ],
  "SHORTERVILLE": [
    "36373",
    "AL"
  ],
  "SKIPPERVILLE": [
    "36374",
    "AL"
  ],
  "SLOCOMB": [
    "36375",
    "AL"
  ],
  "WEBB": [
    "51366",
    "IA"
  ],
  "ANDALUSIA": [
    "61232",
    "IL"
  ],
  "BEATRICE": [
    "68310",
    "NE"
  ],
  "BREWTON": [
    "36427",
    "AL"
  ],
  "CASTLEBERRY": [
    "36432",
    "AL"
  ],
  "COY": [
    "72037",
    "AR"
  ],
  "DICKINSON": [
    "77539",
    "TX"
  ],
  "EXCEL": [
    "36439",
    "AL"
  ],
  "FLOMATON": [
    "36441",
    "AL"
  ],
  "FLORALA": [
    "36442",
    "AL"
  ],
  "FRISCO CITY": [
    "36445",
    "AL"
  ],
  "GROVE HILL": [
    "36451",
    "AL"
  ],
  "MC KENZIE": [
    "38201",
    "TN"
  ],
  "MEGARGEL": [
    "76370",
    "TX"
  ],
  "MEXIA": [
    "76667",
    "TX"
  ],
  "OPP": [
    "36467",
    "AL"
  ],
  "PERDUE HILL": [
    "36470",
    "AL"
  ],
  "PETERMAN": [
    "36471",
    "AL"
  ],
  "RANGE": [
    "36473",
    "AL"
  ],
  "RED LEVEL": [
    "36474",
    "AL"
  ],
  "REPTON": [
    "36475",
    "AL"
  ],
  "RIVER FALLS": [
    "54022",
    "WI"
  ],
  "SAMSON": [
    "36477",
    "AL"
  ],
  "URIAH": [
    "36480",
    "AL"
  ],
  "VREDENBURGH": [
    "36481",
    "AL"
  ],
  "WHATLEY": [
    "36482",
    "AL"
  ],
  "WING": [
    "58494",
    "ND"
  ],
  "ATMORE": [
    "36504",
    "AL"
  ],
  "AXIS": [
    "36505",
    "AL"
  ],
  "BAY MINETTE": [
    "36507",
    "AL"
  ],
  "BAYOU LA BATRE": [
    "36509",
    "AL"
  ],
  "BON SECOUR": [
    "36511",
    "AL"
  ],
  "BUCKS": [
    "36512",
    "AL"
  ],
  "CALVERT": [
    "77837",
    "TX"
  ],
  "CHATOM": [
    "36518",
    "AL"
  ],
  "CHUNCHULA": [
    "36521",
    "AL"
  ],
  "CITRONELLE": [
    "36522",
    "AL"
  ],
  "CODEN": [
    "36523",
    "AL"
  ],
  "COFFEEVILLE": [
    "38922",
    "MS"
  ],
  "CREOLA": [
    "45622",
    "OH"
  ],
  "DAPHNE": [
    "36526",
    "AL"
  ],
  "SPANISH FORT": [
    "36577",
    "AL"
  ],
  "DAUPHIN ISLAND": [
    "36528",
    "AL"
  ],
  "ELBERTA": [
    "84626",
    "UT"
  ],
  "FOLEY": [
    "63347",
    "MO"
  ],
  "FRANKVILLE": [
    "36538",
    "AL"
  ],
  "FRUITDALE": [
    "36539",
    "AL"
  ],
  "GAINESTOWN": [
    "36540",
    "AL"
  ],
  "GRAND BAY": [
    "36541",
    "AL"
  ],
  "GULF SHORES": [
    "36547",
    "AL"
  ],
  "HUXFORD": [
    "36543",
    "AL"
  ],
  "LEROY": [
    "76654",
    "TX"
  ],
  "LILLIAN": [
    "76061",
    "TX"
  ],
  "LOXLEY": [
    "36551",
    "AL"
  ],
  "MAGNOLIA SPRINGS": [
    "36555",
    "AL"
  ],
  "MALCOLM": [
    "68402",
    "NE"
  ],
  "MILLRY": [
    "36558",
    "AL"
  ],
  "ORANGE BEACH": [
    "36561",
    "AL"
  ],
  "PERDIDO": [
    "36562",
    "AL"
  ],
  "POINT CLEAR": [
    "36564",
    "AL"
  ],
  "SAINT ELMO": [
    "62458",
    "IL"
  ],
  "SAINT STEPHENS": [
    "82524",
    "WY"
  ],
  "SARALAND": [
    "36571",
    "AL"
  ],
  "SEMMES": [
    "36575",
    "AL"
  ],
  "SILVERHILL": [
    "36576",
    "AL"
  ],
  "SUNFLOWER": [
    "38778",
    "MS"
  ],
  "THEODORE": [
    "36590",
    "AL"
  ],
  "TIBBIE": [
    "36583",
    "AL"
  ],
  "VINEGAR BEND": [
    "36584",
    "AL"
  ],
  "WAGARVILLE": [
    "36585",
    "AL"
  ],
  "WILMER": [
    "75172",
    "TX"
  ],
  "MOBILE": [
    "36695",
    "AL"
  ],
  "EIGHT MILE": [
    "36613",
    "AL"
  ],
  "CATHERINE": [
    "36728",
    "AL"
  ],
  "DEMOPOLIS": [
    "36732",
    "AL"
  ],
  "DIXONS MILLS": [
    "36736",
    "AL"
  ],
  "FAUNSDALE": [
    "36738",
    "AL"
  ],
  "FORKLAND": [
    "36740",
    "AL"
  ],
  "GALLION": [
    "36742",
    "AL"
  ],
  "JONES": [
    "73049",
    "OK"
  ],
  "MAPLESVILLE": [
    "36750",
    "AL"
  ],
  "LOWER PEACH TREE": [
    "36751",
    "AL"
  ],
  "LOWNDESBORO": [
    "36752",
    "AL"
  ],
  "MC WILLIAMS": [
    "36753",
    "AL"
  ],
  "PLANTERSVILLE": [
    "77363",
    "TX"
  ],
  "MARION JUNCTION": [
    "36759",
    "AL"
  ],
  "MINTER": [
    "36761",
    "AL"
  ],
  "MORVIN": [
    "36762",
    "AL"
  ],
  "MYRTLEWOOD": [
    "36763",
    "AL"
  ],
  "NANAFALIA": [
    "36764",
    "AL"
  ],
  "ORRVILLE": [
    "44667",
    "OH"
  ],
  "PINE APPLE": [
    "36768",
    "AL"
  ],
  "SAFFORD": [
    "85548",
    "AZ"
  ],
  "SAWYERVILLE": [
    "36776",
    "AL"
  ],
  "SWEET WATER": [
    "36782",
    "AL"
  ],
  "TYLER": [
    "75799",
    "TX"
  ],
  "LAWLEY": [
    "36793",
    "AL"
  ],
  "OPELIKA": [
    "36804",
    "AL"
  ],
  "AUBURN UNIVERSITY": [
    "36849",
    "AL"
  ],
  "COTTONTON": [
    "36851",
    "AL"
  ],
  "DADEVILLE": [
    "65635",
    "MO"
  ],
  "VALLEY": [
    "99181",
    "WA"
  ],
  "FIVE POINTS": [
    "93624",
    "CA"
  ],
  "FORT MITCHELL": [
    "36856",
    "AL"
  ],
  "HATCHECHUBBEE": [
    "36858",
    "AL"
  ],
  "HOLY TRINITY": [
    "36859",
    "AL"
  ],
  "HURTSBORO": [
    "36860",
    "AL"
  ],
  "JACKSONS GAP": [
    "36861",
    "AL"
  ],
  "LANETT": [
    "36863",
    "AL"
  ],
  "LOACHAPOKA": [
    "36865",
    "AL"
  ],
  "NOTASULGA": [
    "36866",
    "AL"
  ],
  "PHENIX CITY": [
    "36870",
    "AL"
  ],
  "PITTSVIEW": [
    "36871",
    "AL"
  ],
  "SEALE": [
    "36875",
    "AL"
  ],
  "SMITHS STATION": [
    "36877",
    "AL"
  ],
  "BELLAMY": [
    "36901",
    "AL"
  ],
  "GILBERTOWN": [
    "36908",
    "AL"
  ],
  "JACHIN": [
    "36910",
    "AL"
  ],
  "LISMAN": [
    "36912",
    "AL"
  ],
  "MELVIN": [
    "76858",
    "TX"
  ],
  "SILAS": [
    "36919",
    "AL"
  ],
  "TOXEY": [
    "36921",
    "AL"
  ],
  "ANTIOCH": [
    "94531",
    "CA"
  ],
  "ASHLAND CITY": [
    "37015",
    "TN"
  ],
  "AUBURNTOWN": [
    "37016",
    "TN"
  ],
  "BEECHGROVE": [
    "37018",
    "TN"
  ],
  "BELL BUCKLE": [
    "37020",
    "TN"
  ],
  "BON AQUA": [
    "37025",
    "TN"
  ],
  "BRADYVILLE": [
    "37026",
    "TN"
  ],
  "BUMPUS MILLS": [
    "37028",
    "TN"
  ],
  "BURNS": [
    "97720",
    "OR"
  ],
  "CASTALIAN SPRINGS": [
    "37031",
    "TN"
  ],
  "CEDAR HILL": [
    "75106",
    "TX"
  ],
  "CHAPMANSBORO": [
    "37035",
    "TN"
  ],
  "COLLEGE GROVE": [
    "37046",
    "TN"
  ],
  "CORNERSVILLE": [
    "37047",
    "TN"
  ],
  "COTTONTOWN": [
    "37048",
    "TN"
  ],
  "CROSS PLAINS": [
    "76443",
    "TX"
  ],
  "CUMBERLAND CITY": [
    "37050",
    "TN"
  ],
  "CUMBERLAND FURNACE": [
    "37051",
    "TN"
  ],
  "CUNNINGHAM": [
    "75434",
    "TX"
  ],
  "DICKSON": [
    "37056",
    "TN"
  ],
  "DIXON SPRINGS": [
    "37057",
    "TN"
  ],
  "DOWELLTOWN": [
    "37059",
    "TN"
  ],
  "FOSTERVILLE": [
    "37063",
    "TN"
  ],
  "GALLATIN": [
    "75764",
    "TX"
  ],
  "GOODLETTSVILLE": [
    "37072",
    "TN"
  ],
  "GLADEVILLE": [
    "37071",
    "TN"
  ],
  "GREENBRIER": [
    "72058",
    "AR"
  ],
  "HURRICANE MILLS": [
    "37078",
    "TN"
  ],
  "INDIAN MOUND": [
    "37079",
    "TN"
  ],
  "JOELTON": [
    "37080",
    "TN"
  ],
  "KINGSTON SPRINGS": [
    "37082",
    "TN"
  ],
  "LASCASSAS": [
    "37085",
    "TN"
  ],
  "LA VERGNE": [
    "37089",
    "TN"
  ],
  "LOBELVILLE": [
    "37097",
    "TN"
  ],
  "LYLES": [
    "37098",
    "TN"
  ],
  "MC EWEN": [
    "37101",
    "TN"
  ],
  "MCMINNVILLE": [
    "97128",
    "OR"
  ],
  "MOUNT JULIET": [
    "37122",
    "TN"
  ],
  "NEW JOHNSONVILLE": [
    "37134",
    "TN"
  ],
  "NOLENSVILLE": [
    "37135",
    "TN"
  ],
  "NORENE": [
    "37136",
    "TN"
  ],
  "NUNNELLY": [
    "37137",
    "TN"
  ],
  "OLD HICKORY": [
    "37138",
    "TN"
  ],
  "ONLY": [
    "37140",
    "TN"
  ],
  "ORLINDA": [
    "37141",
    "TN"
  ],
  "PEGRAM": [
    "37143",
    "TN"
  ],
  "PLEASANT SHADE": [
    "37145",
    "TN"
  ],
  "PLEASANT VIEW": [
    "81331",
    "CO"
  ],
  "READYVILLE": [
    "37149",
    "TN"
  ],
  "RED BOILING SPRINGS": [
    "37150",
    "TN"
  ],
  "RIDDLETON": [
    "37151",
    "TN"
  ],
  "RIDGETOP": [
    "37152",
    "TN"
  ],
  "ROCKVALE": [
    "81244",
    "CO"
  ],
  "SHELBYVILLE": [
    "75973",
    "TX"
  ],
  "STEWART": [
    "55385",
    "MN"
  ],
  "TENNESSEE RIDGE": [
    "37178",
    "TN"
  ],
  "THOMPSONS STATION": [
    "37179",
    "TN"
  ],
  "VANLEER": [
    "37181",
    "TN"
  ],
  "WARTRACE": [
    "37183",
    "TN"
  ],
  "WHITE BLUFF": [
    "37187",
    "TN"
  ],
  "WHITE HOUSE": [
    "37188",
    "TN"
  ],
  "WHITES CREEK": [
    "37189",
    "TN"
  ],
  "APISON": [
    "37302",
    "TN"
  ],
  "BAKEWELL": [
    "37304",
    "TN"
  ],
  "BEERSHEBA SPRINGS": [
    "37305",
    "TN"
  ],
  "BIRCHWOOD": [
    "54817",
    "WI"
  ],
  "COALMONT": [
    "80430",
    "CO"
  ],
  "COKER CREEK": [
    "37314",
    "TN"
  ],
  "COLLEGEDALE": [
    "37315",
    "TN"
  ],
  "CONASAUGA": [
    "37316",
    "TN"
  ],
  "COPPERHILL": [
    "37317",
    "TN"
  ],
  "COWAN": [
    "37318",
    "TN"
  ],
  "DECHERD": [
    "37324",
    "TN"
  ],
  "DUCKTOWN": [
    "37326",
    "TN"
  ],
  "DUNLAP": [
    "93621",
    "CA"
  ],
  "ELORA": [
    "37328",
    "TN"
  ],
  "ESTILL SPRINGS": [
    "37330",
    "TN"
  ],
  "EVENSVILLE": [
    "37332",
    "TN"
  ],
  "FARNER": [
    "37333",
    "TN"
  ],
  "FLINTVILLE": [
    "37335",
    "TN"
  ],
  "GRANDVIEW": [
    "98930",
    "WA"
  ],
  "GRUETLI LAAGER": [
    "37339",
    "TN"
  ],
  "HIXSON": [
    "37343",
    "TN"
  ],
  "HUNTLAND": [
    "37345",
    "TN"
  ],
  "KELSO": [
    "98626",
    "WA"
  ],
  "MADISONVILLE": [
    "77864",
    "TX"
  ],
  "MONTEAGLE": [
    "37356",
    "TN"
  ],
  "MORRISON": [
    "80465",
    "CO"
  ],
  "NORMANDY": [
    "37360",
    "TN"
  ],
  "OOLTEWAH": [
    "37363",
    "TN"
  ],
  "RELIANCE": [
    "82943",
    "WY"
  ],
  "RICEVILLE": [
    "50466",
    "IA"
  ],
  "SALE CREEK": [
    "37373",
    "TN"
  ],
  "SEQUATCHIE": [
    "37374",
    "TN"
  ],
  "SEWANEE": [
    "37383",
    "TN"
  ],
  "SIGNAL MOUNTAIN": [
    "37377",
    "TN"
  ],
  "SMARTT": [
    "37378",
    "TN"
  ],
  "SODDY DAISY": [
    "37384",
    "TN"
  ],
  "SOUTH PITTSBURG": [
    "37380",
    "TN"
  ],
  "TELLICO PLAINS": [
    "37385",
    "TN"
  ],
  "TRACY CITY": [
    "37387",
    "TN"
  ],
  "TULLAHOMA": [
    "37388",
    "TN"
  ],
  "ARNOLD AFB": [
    "37389",
    "TN"
  ],
  "TURTLETOWN": [
    "37391",
    "TN"
  ],
  "WHITWELL": [
    "37397",
    "TN"
  ],
  "CHATTANOOGA": [
    "73528",
    "OK"
  ],
  "BLOUNTVILLE": [
    "37617",
    "TN"
  ],
  "BLUFF CITY": [
    "71722",
    "AR"
  ],
  "CHUCKEY": [
    "37641",
    "TN"
  ],
  "ELIZABETHTON": [
    "37644",
    "TN"
  ],
  "FALL BRANCH": [
    "37656",
    "TN"
  ],
  "FLAG POND": [
    "37657",
    "TN"
  ],
  "JONESBOROUGH": [
    "37659",
    "TN"
  ],
  "KINGSPORT": [
    "37665",
    "TN"
  ],
  "LAUREL BLOOMERY": [
    "37680",
    "TN"
  ],
  "MILLIGAN COLLEGE": [
    "37682",
    "TN"
  ],
  "PINEY FLATS": [
    "37686",
    "TN"
  ],
  "ROAN MOUNTAIN": [
    "37687",
    "TN"
  ],
  "SHADY VALLEY": [
    "37688",
    "TN"
  ],
  "TRADE": [
    "37691",
    "TN"
  ],
  "UNICOI": [
    "37692",
    "TN"
  ],
  "WATAUGA": [
    "57660",
    "SD"
  ],
  "ALCOA": [
    "37701",
    "TN"
  ],
  "ARTHUR": [
    "69121",
    "NE"
  ],
  "BEAN STATION": [
    "37708",
    "TN"
  ],
  "BRICEVILLE": [
    "37710",
    "TN"
  ],
  "BULLS GAP": [
    "37711",
    "TN"
  ],
  "BYBEE": [
    "37713",
    "TN"
  ],
  "CLAIRFIELD": [
    "37715",
    "TN"
  ],
  "COALFIELD": [
    "37719",
    "TN"
  ],
  "CORRYTON": [
    "37721",
    "TN"
  ],
  "COSBY": [
    "64436",
    "MO"
  ],
  "CUMBERLAND GAP": [
    "37724",
    "TN"
  ],
  "DANDRIDGE": [
    "37725",
    "TN"
  ],
  "DEER LODGE": [
    "59722",
    "MT"
  ],
  "DEL RIO": [
    "78842",
    "TX"
  ],
  "DUFF": [
    "37729",
    "TN"
  ],
  "EAGAN": [
    "37730",
    "TN"
  ],
  "EIDSON": [
    "37731",
    "TN"
  ],
  "RUGBY": [
    "58368",
    "ND"
  ],
  "GATLINBURG": [
    "37738",
    "TN"
  ],
  "GREENBACK": [
    "37742",
    "TN"
  ],
  "GREENEVILLE": [
    "37745",
    "TN"
  ],
  "HARROGATE": [
    "37752",
    "TN"
  ],
  "HEISKELL": [
    "37754",
    "TN"
  ],
  "HELENWOOD": [
    "37755",
    "TN"
  ],
  "JACKSBORO": [
    "76458",
    "TX"
  ],
  "JEFFERSON CITY": [
    "65110",
    "MO"
  ],
  "JELLICO": [
    "37762",
    "TN"
  ],
  "KODAK": [
    "37764",
    "TN"
  ],
  "LA FOLLETTE": [
    "37766",
    "TN"
  ],
  "LANCING": [
    "37770",
    "TN"
  ],
  "LENOIR CITY": [
    "37772",
    "TN"
  ],
  "LONE MOUNTAIN": [
    "37773",
    "TN"
  ],
  "LUTTRELL": [
    "37779",
    "TN"
  ],
  "MARYVILLE": [
    "64468",
    "MO"
  ],
  "MAYNARDVILLE": [
    "37807",
    "TN"
  ],
  "MOORESBURG": [
    "37811",
    "TN"
  ],
  "MOSHEIM": [
    "37818",
    "TN"
  ],
  "NEW TAZEWELL": [
    "37825",
    "TN"
  ],
  "NIOTA": [
    "62358",
    "IL"
  ],
  "OLIVER SPRINGS": [
    "37840",
    "TN"
  ],
  "PARROTTSVILLE": [
    "37843",
    "TN"
  ],
  "PETROS": [
    "37845",
    "TN"
  ],
  "PIONEER": [
    "95666",
    "CA"
  ],
  "POWELL": [
    "82435",
    "WY"
  ],
  "SEVIERVILLE": [
    "37876",
    "TN"
  ],
  "PIGEON FORGE": [
    "37868",
    "TN"
  ],
  "SHARPS CHAPEL": [
    "37866",
    "TN"
  ],
  "SHAWANEE": [
    "37867",
    "TN"
  ],
  "SNEEDVILLE": [
    "37869",
    "TN"
  ],
  "STRAWBERRY PLAINS": [
    "37871",
    "TN"
  ],
  "SUNBRIGHT": [
    "37872",
    "TN"
  ],
  "SURGOINSVILLE": [
    "37873",
    "TN"
  ],
  "SWEETWATER": [
    "79556",
    "TX"
  ],
  "TALBOTT": [
    "37877",
    "TN"
  ],
  "TEN MILE": [
    "37880",
    "TN"
  ],
  "THORN HILL": [
    "37881",
    "TN"
  ],
  "VONORE": [
    "37885",
    "TN"
  ],
  "WALLAND": [
    "37886",
    "TN"
  ],
  "WARTBURG": [
    "37887",
    "TN"
  ],
  "WHITE PINE": [
    "49971",
    "MI"
  ],
  "ATOKA": [
    "74525",
    "OK"
  ],
  "BELLS": [
    "75414",
    "TX"
  ],
  "BURLISON": [
    "38015",
    "TN"
  ],
  "COLLIERVILLE": [
    "38027",
    "TN"
  ],
  "CROCKETT MILLS": [
    "38021",
    "TN"
  ],
  "DRUMMONDS": [
    "38023",
    "TN"
  ],
  "DYERSBURG": [
    "38025",
    "TN"
  ],
  "EADS": [
    "81036",
    "CO"
  ],
  "FINLEY": [
    "95435",
    "CA"
  ],
  "GALLAWAY": [
    "38036",
    "TN"
  ],
  "GRAND JUNCTION": [
    "81507",
    "CO"
  ],
  "HALLS": [
    "38040",
    "TN"
  ],
  "HENNING": [
    "61848",
    "IL"
  ],
  "HICKORY VALLEY": [
    "38042",
    "TN"
  ],
  "HORNSBY": [
    "38044",
    "TN"
  ],
  "MAURY CITY": [
    "38050",
    "TN"
  ],
  "SAULSBURY": [
    "38067",
    "TN"
  ],
  "TIGRETT": [
    "38070",
    "TN"
  ],
  "WYNNBURG": [
    "38077",
    "TN"
  ],
  "TIPTONVILLE": [
    "38079",
    "TN"
  ],
  "ATWOOD": [
    "92811",
    "CA"
  ],
  "COTTAGE GROVE": [
    "97424",
    "OR"
  ],
  "DUKEDOM": [
    "38226",
    "TN"
  ],
  "GLEASON": [
    "54435",
    "WI"
  ],
  "HORNBEAK": [
    "38232",
    "TN"
  ],
  "MC LEMORESVILLE": [
    "38235",
    "TN"
  ],
  "OBION": [
    "38240",
    "TN"
  ],
  "PALMERSVILLE": [
    "38241",
    "TN"
  ],
  "PURYEAR": [
    "38251",
    "TN"
  ],
  "RIVES": [
    "38253",
    "TN"
  ],
  "SAMBURG": [
    "38254",
    "TN"
  ],
  "SOUTH FULTON": [
    "38257",
    "TN"
  ],
  "TREZEVANT": [
    "38258",
    "TN"
  ],
  "TRIMBLE": [
    "64492",
    "MO"
  ],
  "WOODLAND MILLS": [
    "38271",
    "TN"
  ],
  "BATH SPRINGS": [
    "38311",
    "TN"
  ],
  "BEECH BLUFF": [
    "38313",
    "TN"
  ],
  "BETHEL SPRINGS": [
    "38315",
    "TN"
  ],
  "BRUCETON": [
    "38317",
    "TN"
  ],
  "COUNCE": [
    "38326",
    "TN"
  ],
  "CRUMP": [
    "38327",
    "TN"
  ],
  "DARDEN": [
    "38328",
    "TN"
  ],
  "DECATURVILLE": [
    "38329",
    "TN"
  ],
  "DYER": [
    "89010",
    "NV"
  ],
  "ENVILLE": [
    "38332",
    "TN"
  ],
  "FINGER": [
    "38334",
    "TN"
  ],
  "GUYS": [
    "38339",
    "TN"
  ],
  "HOLLADAY": [
    "38341",
    "TN"
  ],
  "HOLLOW ROCK": [
    "38342",
    "TN"
  ],
  "HUMBOLDT": [
    "86329",
    "AZ"
  ],
  "HURON": [
    "93234",
    "CA"
  ],
  "IDLEWILD": [
    "49642",
    "MI"
  ],
  "JACKS CREEK": [
    "38347",
    "TN"
  ],
  "LAVINIA": [
    "38348",
    "TN"
  ],
  "MEDON": [
    "38356",
    "TN"
  ],
  "MICHIE": [
    "38357",
    "TN"
  ],
  "MORRIS CHAPEL": [
    "38361",
    "TN"
  ],
  "PICKWICK DAM": [
    "38365",
    "TN"
  ],
  "REAGAN": [
    "76680",
    "TX"
  ],
  "SCOTTS HILL": [
    "38374",
    "TN"
  ],
  "SELMER": [
    "38375",
    "TN"
  ],
  "STANTONVILLE": [
    "38379",
    "TN"
  ],
  "SUGAR TREE": [
    "38380",
    "TN"
  ],
  "TOONE": [
    "38381",
    "TN"
  ],
  "WILDERSVILLE": [
    "38388",
    "TN"
  ],
  "YUMA": [
    "85369",
    "AZ"
  ],
  "COLLINWOOD": [
    "38450",
    "TN"
  ],
  "CULLEOKA": [
    "38451",
    "TN"
  ],
  "CYPRESS INN": [
    "38452",
    "TN"
  ],
  "DELLROSE": [
    "38453",
    "TN"
  ],
  "DUCK RIVER": [
    "38454",
    "TN"
  ],
  "ETHRIDGE": [
    "59435",
    "MT"
  ],
  "FRANKEWING": [
    "38459",
    "TN"
  ],
  "GOODSPRING": [
    "38460",
    "TN"
  ],
  "HAMPSHIRE": [
    "60140",
    "IL"
  ],
  "HOHENWALD": [
    "38462",
    "TN"
  ],
  "IRON CITY": [
    "39859",
    "GA"
  ],
  "LAWRENCEBURG": [
    "47025",
    "IN"
  ],
  "LEOMA": [
    "38468",
    "TN"
  ],
  "LUTTS": [
    "38471",
    "TN"
  ],
  "LYNNVILLE": [
    "50153",
    "IA"
  ],
  "MINOR HILL": [
    "38473",
    "TN"
  ],
  "OLIVEHILL": [
    "38475",
    "TN"
  ],
  "PRIMM SPRINGS": [
    "38476",
    "TN"
  ],
  "SAINT JOSEPH": [
    "71366",
    "LA"
  ],
  "SANTA FE": [
    "87594",
    "NM"
  ],
  "SUMMERTOWN": [
    "38483",
    "TN"
  ],
  "WESTPOINT": [
    "47992",
    "IN"
  ],
  "TAFT": [
    "93268",
    "CA"
  ],
  "COOKEVILLE": [
    "38506",
    "TN"
  ],
  "ALLARDT": [
    "38504",
    "TN"
  ],
  "ALLONS": [
    "38541",
    "TN"
  ],
  "BLOOMINGTON SPRINGS": [
    "38545",
    "TN"
  ],
  "BRUSH CREEK": [
    "38547",
    "TN"
  ],
  "BUFFALO VALLEY": [
    "38548",
    "TN"
  ],
  "BYRDSTOWN": [
    "38549",
    "TN"
  ],
  "CAMPAIGN": [
    "38550",
    "TN"
  ],
  "CELINA": [
    "75009",
    "TX"
  ],
  "CHESTNUT MOUND": [
    "38552",
    "TN"
  ],
  "CLARKRANGE": [
    "38553",
    "TN"
  ],
  "DOYLE": [
    "96109",
    "CA"
  ],
  "GAINESBORO": [
    "38562",
    "TN"
  ],
  "GRIMSLEY": [
    "38565",
    "TN"
  ],
  "HICKMAN": [
    "95323",
    "CA"
  ],
  "HILHAM": [
    "38568",
    "TN"
  ],
  "MOSS": [
    "39460",
    "MS"
  ],
  "PALL MALL": [
    "38577",
    "TN"
  ],
  "QUEBECK": [
    "38579",
    "TN"
  ],
  "RICKMAN": [
    "38580",
    "TN"
  ],
  "ROCK ISLAND": [
    "98850",
    "WA"
  ],
  "SILVER POINT": [
    "38582",
    "TN"
  ],
  "WALLING": [
    "38587",
    "TN"
  ],
  "WHITLEYVILLE": [
    "38588",
    "TN"
  ],
  "MARKS": [
    "38646",
    "MS"
  ],
  "BLUE MOUNTAIN": [
    "38610",
    "MS"
  ],
  "BYHALIA": [
    "38611",
    "MS"
  ],
  "CLARKSDALE": [
    "64430",
    "MO"
  ],
  "COAHOMA": [
    "79511",
    "TX"
  ],
  "COLDWATER": [
    "67029",
    "KS"
  ],
  "CRENSHAW": [
    "38621",
    "MS"
  ],
  "CROWDER": [
    "74430",
    "OK"
  ],
  "DARLING": [
    "38623",
    "MS"
  ],
  "DUMAS": [
    "79029",
    "TX"
  ],
  "ETTA": [
    "38627",
    "MS"
  ],
  "FALKNER": [
    "38629",
    "MS"
  ],
  "FRIARS POINT": [
    "38631",
    "MS"
  ],
  "HICKORY FLAT": [
    "38633",
    "MS"
  ],
  "HORN LAKE": [
    "38637",
    "MS"
  ],
  "LAKE CORMORANT": [
    "38641",
    "MS"
  ],
  "LAMBERT": [
    "59243",
    "MT"
  ],
  "LYON": [
    "38645",
    "MS"
  ],
  "MICHIGAN CITY": [
    "46361",
    "IN"
  ],
  "MYRTLE": [
    "65778",
    "MO"
  ],
  "NESBIT": [
    "38651",
    "MS"
  ],
  "OLIVE BRANCH": [
    "62969",
    "IL"
  ],
  "POPE": [
    "38658",
    "MS"
  ],
  "POTTS CAMP": [
    "38659",
    "MS"
  ],
  "RED BANKS": [
    "38661",
    "MS"
  ],
  "ROBINSONVILLE": [
    "38664",
    "MS"
  ],
  "SARAH": [
    "38665",
    "MS"
  ],
  "SENATOBIA": [
    "38668",
    "MS"
  ],
  "SLEDGE": [
    "38670",
    "MS"
  ],
  "SOUTHAVEN": [
    "38672",
    "MS"
  ],
  "TIPLERSVILLE": [
    "38674",
    "MS"
  ],
  "TUNICA": [
    "70782",
    "LA"
  ],
  "UNIVERSITY": [
    "38677",
    "MS"
  ],
  "WALLS": [
    "38680",
    "MS"
  ],
  "WALNUT": [
    "91789",
    "CA"
  ],
  "ALLIGATOR": [
    "38720",
    "MS"
  ],
  "ANGUILLA": [
    "38721",
    "MS"
  ],
  "ARCOLA": [
    "65603",
    "MO"
  ],
  "BENOIT": [
    "54816",
    "WI"
  ],
  "BEULAH": [
    "82712",
    "WY"
  ],
  "BOYLE": [
    "38730",
    "MS"
  ],
  "DREW": [
    "38737",
    "MS"
  ],
  "PARCHMAN": [
    "38738",
    "MS"
  ],
  "GLEN ALLAN": [
    "38744",
    "MS"
  ],
  "GUNNISON": [
    "84634",
    "UT"
  ],
  "HOLLANDALE": [
    "56045",
    "MN"
  ],
  "ISOLA": [
    "38754",
    "MS"
  ],
  "MERIGOLD": [
    "38759",
    "MS"
  ],
  "METCALFE": [
    "38760",
    "MS"
  ],
  "MOORHEAD": [
    "56563",
    "MN"
  ],
  "MOUND BAYOU": [
    "38762",
    "MS"
  ],
  "PACE": [
    "38764",
    "MS"
  ],
  "PANTHER BURN": [
    "38765",
    "MS"
  ],
  "RENA LARA": [
    "38767",
    "MS"
  ],
  "RULEVILLE": [
    "38771",
    "MS"
  ],
  "SCOTT": [
    "72142",
    "AR"
  ],
  "SHAW": [
    "38773",
    "MS"
  ],
  "TUPELO": [
    "74572",
    "OK"
  ],
  "ALGOMA": [
    "54201",
    "WI"
  ],
  "AMORY": [
    "38821",
    "MS"
  ],
  "BALDWYN": [
    "38824",
    "MS"
  ],
  "BECKER": [
    "55308",
    "MN"
  ],
  "BELDEN": [
    "95915",
    "CA"
  ],
  "BLUE SPRINGS": [
    "68318",
    "NE"
  ],
  "BOONEVILLE": [
    "72927",
    "AR"
  ],
  "DERMA": [
    "38839",
    "MS"
  ],
  "ECRU": [
    "38841",
    "MS"
  ],
  "GATTMAN": [
    "38844",
    "MS"
  ],
  "GOLDEN": [
    "80419",
    "CO"
  ],
  "GREENWOOD SPRINGS": [
    "38848",
    "MS"
  ],
  "GUNTOWN": [
    "38849",
    "MS"
  ],
  "HOULKA": [
    "38850",
    "MS"
  ],
  "IUKA": [
    "67066",
    "KS"
  ],
  "MANTACHIE": [
    "38855",
    "MS"
  ],
  "MOOREVILLE": [
    "38857",
    "MS"
  ],
  "NETTLETON": [
    "38858",
    "MS"
  ],
  "NEW SITE": [
    "38859",
    "MS"
  ],
  "OKOLONA": [
    "71962",
    "AR"
  ],
  "PONTOTOC": [
    "76869",
    "TX"
  ],
  "RIENZI": [
    "38865",
    "MS"
  ],
  "TISHOMINGO": [
    "73460",
    "OK"
  ],
  "TOCCOPOLA": [
    "38874",
    "MS"
  ],
  "TREBLOC": [
    "38875",
    "MS"
  ],
  "VAN VLEET": [
    "38877",
    "MS"
  ],
  "VARDAMAN": [
    "38878",
    "MS"
  ],
  "WHEELER": [
    "97147",
    "OR"
  ],
  "GRENADA": [
    "96038",
    "CA"
  ],
  "BANNER": [
    "82832",
    "WY"
  ],
  "BRUCE": [
    "57220",
    "SD"
  ],
  "CALHOUN CITY": [
    "38916",
    "MS"
  ],
  "CASCILLA": [
    "38920",
    "MS"
  ],
  "COILA": [
    "38923",
    "MS"
  ],
  "CRUGER": [
    "38924",
    "MS"
  ],
  "DUCK HILL": [
    "38925",
    "MS"
  ],
  "ELLIOTT": [
    "60933",
    "IL"
  ],
  "ENID": [
    "73706",
    "OK"
  ],
  "GORE SPRINGS": [
    "38929",
    "MS"
  ],
  "HOLCOMB": [
    "67851",
    "KS"
  ],
  "ITTA BENA": [
    "38941",
    "MS"
  ],
  "MC CARLEY": [
    "38943",
    "MS"
  ],
  "MINTER CITY": [
    "38944",
    "MS"
  ],
  "MORGAN CITY": [
    "70381",
    "LA"
  ],
  "NORTH CARROLLTON": [
    "38947",
    "MS"
  ],
  "PHILIPP": [
    "38950",
    "MS"
  ],
  "SCHLATER": [
    "38952",
    "MS"
  ],
  "SCOBEY": [
    "59263",
    "MT"
  ],
  "SIDON": [
    "38954",
    "MS"
  ],
  "SLATE SPRING": [
    "38955",
    "MS"
  ],
  "TIE PLANT": [
    "38960",
    "MS"
  ],
  "TILLATOBA": [
    "38961",
    "MS"
  ],
  "TUTWILER": [
    "38963",
    "MS"
  ],
  "WATER VALLEY": [
    "76958",
    "TX"
  ],
  "BELZONI": [
    "39038",
    "MS"
  ],
  "BENTONIA": [
    "39040",
    "MS"
  ],
  "BRAXTON": [
    "39044",
    "MS"
  ],
  "CONEHATTA": [
    "39057",
    "MS"
  ],
  "DELTA CITY": [
    "39061",
    "MS"
  ],
  "D LO": [
    "39062",
    "MS"
  ],
  "FLORA": [
    "71428",
    "LA"
  ],
  "GALLMAN": [
    "39077",
    "MS"
  ],
  "GOODMAN": [
    "64843",
    "MO"
  ],
  "HARPERVILLE": [
    "39080",
    "MS"
  ],
  "HERMANVILLE": [
    "39086",
    "MS"
  ],
  "HOLLY BLUFF": [
    "39088",
    "MS"
  ],
  "KOSCIUSKO": [
    "39090",
    "MS"
  ],
  "LENA": [
    "71447",
    "LA"
  ],
  "LORMAN": [
    "39096",
    "MS"
  ],
  "LOUISE": [
    "77455",
    "TX"
  ],
  "MC COOL": [
    "39108",
    "MS"
  ],
  "MADDEN": [
    "39109",
    "MS"
  ],
  "MAGEE": [
    "39111",
    "MS"
  ],
  "MAYERSVILLE": [
    "39113",
    "MS"
  ],
  "MIDNIGHT": [
    "39115",
    "MS"
  ],
  "MIZE": [
    "41352",
    "KY"
  ],
  "NATCHEZ": [
    "71456",
    "LA"
  ],
  "NEWHEBRON": [
    "39140",
    "MS"
  ],
  "PATTISON": [
    "77466",
    "TX"
  ],
  "PELAHATCHIE": [
    "39145",
    "MS"
  ],
  "PINEY WOODS": [
    "39148",
    "MS"
  ],
  "PINOLA": [
    "39149",
    "MS"
  ],
  "PUCKETT": [
    "39151",
    "MS"
  ],
  "ROLLING FORK": [
    "39159",
    "MS"
  ],
  "SALLIS": [
    "39160",
    "MS"
  ],
  "SANDHILL": [
    "39161",
    "MS"
  ],
  "SATARTIA": [
    "39162",
    "MS"
  ],
  "SIBLEY": [
    "71073",
    "LA"
  ],
  "SILVER CITY": [
    "89428",
    "NV"
  ],
  "TCHULA": [
    "39169",
    "MS"
  ],
  "TERRY": [
    "59349",
    "MT"
  ],
  "THOMASTOWN": [
    "39171",
    "MS"
  ],
  "TINSLEY": [
    "39173",
    "MS"
  ],
  "TOUGALOO": [
    "39174",
    "MS"
  ],
  "VAIDEN": [
    "39176",
    "MS"
  ],
  "VALLEY PARK": [
    "63088",
    "MO"
  ],
  "WESSON": [
    "39191",
    "MS"
  ],
  "WEST": [
    "76691",
    "TX"
  ],
  "WHITFIELD": [
    "39193",
    "MS"
  ],
  "YAZOO CITY": [
    "39194",
    "MS"
  ],
  "PEARL": [
    "62361",
    "IL"
  ],
  "FLOWOOD": [
    "39232",
    "MS"
  ],
  "BYRAM": [
    "39272",
    "MS"
  ],
  "BUCKATUNNA": [
    "39322",
    "MS"
  ],
  "CHUNKY": [
    "39323",
    "MS"
  ],
  "CLARA": [
    "39324",
    "MS"
  ],
  "DE KALB": [
    "75559",
    "TX"
  ],
  "LAUDERDALE": [
    "39335",
    "MS"
  ],
  "LOUIN": [
    "39338",
    "MS"
  ],
  "NOXAPATER": [
    "39346",
    "MS"
  ],
  "PACHUTA": [
    "39347",
    "MS"
  ],
  "PAULDING": [
    "45879",
    "OH"
  ],
  "PORTERVILLE": [
    "93258",
    "CA"
  ],
  "SCOOBA": [
    "39358",
    "MS"
  ],
  "SEBASTOPOL": [
    "95473",
    "CA"
  ],
  "SHUBUTA": [
    "39360",
    "MS"
  ],
  "SHUQUALAK": [
    "39361",
    "MS"
  ],
  "TOOMSUBA": [
    "39364",
    "MS"
  ],
  "VOSSBURG": [
    "39366",
    "MS"
  ],
  "HATTIESBURG": [
    "39407",
    "MS"
  ],
  "BASSFIELD": [
    "39421",
    "MS"
  ],
  "BAY SPRINGS": [
    "39422",
    "MS"
  ],
  "BEAUMONT": [
    "92223",
    "CA"
  ],
  "CARRIERE": [
    "39426",
    "MS"
  ],
  "ELLISVILLE": [
    "61431",
    "IL"
  ],
  "HEIDELBERG": [
    "39439",
    "MS"
  ],
  "LEAKESVILLE": [
    "39451",
    "MS"
  ],
  "LUCEDALE": [
    "39452",
    "MS"
  ],
  "MC LAIN": [
    "39456",
    "MS"
  ],
  "MC NEILL": [
    "39457",
    "MS"
  ],
  "MOSELLE": [
    "39459",
    "MS"
  ],
  "NEELY": [
    "39461",
    "MS"
  ],
  "NEW AUGUSTA": [
    "39462",
    "MS"
  ],
  "OVETT": [
    "39464",
    "MS"
  ],
  "PETAL": [
    "39465",
    "MS"
  ],
  "PICAYUNE": [
    "39466",
    "MS"
  ],
  "POPLARVILLE": [
    "39470",
    "MS"
  ],
  "PRENTISS": [
    "39474",
    "MS"
  ],
  "PURVIS": [
    "39475",
    "MS"
  ],
  "RICHTON": [
    "39476",
    "MS"
  ],
  "SEMINARY": [
    "39479",
    "MS"
  ],
  "SOSO": [
    "39480",
    "MS"
  ],
  "STRINGER": [
    "39481",
    "MS"
  ],
  "SUMRALL": [
    "39482",
    "MS"
  ],
  "FOXWORTH": [
    "39483",
    "MS"
  ],
  "GULFPORT": [
    "39507",
    "MS"
  ],
  "BAY SAINT LOUIS": [
    "39521",
    "MS"
  ],
  "STENNIS SPACE CENTER": [
    "39529",
    "MS"
  ],
  "DIAMONDHEAD": [
    "39525",
    "MS"
  ],
  "BILOXI": [
    "39535",
    "MS"
  ],
  "DIBERVILLE": [
    "39540",
    "MS"
  ],
  "ESCATAWPA": [
    "39552",
    "MS"
  ],
  "GAUTIER": [
    "39553",
    "MS"
  ],
  "KILN": [
    "39556",
    "MS"
  ],
  "MOSS POINT": [
    "39563",
    "MS"
  ],
  "OCEAN SPRINGS": [
    "39566",
    "MS"
  ],
  "VANCLEAVE": [
    "39565",
    "MS"
  ],
  "PASCAGOULA": [
    "39595",
    "MS"
  ],
  "PASS CHRISTIAN": [
    "39571",
    "MS"
  ],
  "PEARLINGTON": [
    "39572",
    "MS"
  ],
  "PERKINSTON": [
    "39573",
    "MS"
  ],
  "SAUCIER": [
    "39574",
    "MS"
  ],
  "WAVELAND": [
    "47989",
    "IN"
  ],
  "WIGGINS": [
    "80654",
    "CO"
  ],
  "BOGUE CHITTO": [
    "39629",
    "MS"
  ],
  "BUDE": [
    "39630",
    "MS"
  ],
  "CHATAWA": [
    "39632",
    "MS"
  ],
  "FERNWOOD": [
    "83830",
    "ID"
  ],
  "GLOSTER": [
    "71030",
    "LA"
  ],
  "JAYESS": [
    "39641",
    "MS"
  ],
  "KOKOMO": [
    "46904",
    "IN"
  ],
  "MC CALL CREEK": [
    "39647",
    "MS"
  ],
  "MCCOMB": [
    "39649",
    "MS"
  ],
  "OAK VALE": [
    "39656",
    "MS"
  ],
  "OSYKA": [
    "39657",
    "MS"
  ],
  "ROXIE": [
    "39661",
    "MS"
  ],
  "RUTH": [
    "89319",
    "NV"
  ],
  "SMITHDALE": [
    "39664",
    "MS"
  ],
  "SONTAG": [
    "39665",
    "MS"
  ],
  "TYLERTOWN": [
    "39667",
    "MS"
  ],
  "UNION CHURCH": [
    "39668",
    "MS"
  ],
  "ACKERMAN": [
    "39735",
    "MS"
  ],
  "ARTESIA": [
    "90702",
    "CA"
  ],
  "BELLEFONTAINE": [
    "43311",
    "OH"
  ],
  "CEDARBLUFF": [
    "39741",
    "MS"
  ],
  "EUPORA": [
    "39744",
    "MS"
  ],
  "FRENCH CAMP": [
    "95231",
    "CA"
  ],
  "KILMICHAEL": [
    "39747",
    "MS"
  ],
  "MANTEE": [
    "39751",
    "MS"
  ],
  "MATHISTON": [
    "39752",
    "MS"
  ],
  "MAYHEW": [
    "39753",
    "MS"
  ],
  "PHEBA": [
    "39755",
    "MS"
  ],
  "PRAIRIE": [
    "39756",
    "MS"
  ],
  "STARKVILLE": [
    "39760",
    "MS"
  ],
  "MISSISSIPPI STATE": [
    "39762",
    "MS"
  ],
  "STEENS": [
    "39766",
    "MS"
  ],
  "STURGIS": [
    "57785",
    "SD"
  ],
  "WALTHALL": [
    "39771",
    "MS"
  ],
  "WEIR": [
    "78674",
    "TX"
  ],
  "ATTAPULGUS": [
    "39815",
    "GA"
  ],
  "BLAKELY": [
    "39823",
    "GA"
  ],
  "BRINSON": [
    "39825",
    "GA"
  ],
  "BRONWOOD": [
    "39826",
    "GA"
  ],
  "CALVARY": [
    "39829",
    "GA"
  ],
  "CEDAR SPRINGS": [
    "49319",
    "MI"
  ],
  "COLQUITT": [
    "39837",
    "GA"
  ],
  "CUTHBERT": [
    "39840",
    "GA"
  ],
  "DONALSONVILLE": [
    "39845",
    "GA"
  ],
  "FORT GAINES": [
    "39851",
    "GA"
  ],
  "JAKIN": [
    "39861",
    "GA"
  ],
  "LEARY": [
    "39862",
    "GA"
  ],
  "SASSER": [
    "39885",
    "GA"
  ],
  "SHELLMAN": [
    "39886",
    "GA"
  ],
  "WHIGHAM": [
    "39897",
    "GA"
  ],
  "BARDSTOWN": [
    "40004",
    "KY"
  ],
  "BRADFORDSVILLE": [
    "40009",
    "KY"
  ],
  "BUCKNER": [
    "71827",
    "AR"
  ],
  "CAMPBELLSBURG": [
    "47108",
    "IN"
  ],
  "COXS CREEK": [
    "40013",
    "KY"
  ],
  "CRESTWOOD": [
    "40014",
    "KY"
  ],
  "EASTWOOD": [
    "40018",
    "KY"
  ],
  "EMINENCE": [
    "65466",
    "MO"
  ],
  "FINCHVILLE": [
    "40022",
    "KY"
  ],
  "FISHERVILLE": [
    "40023",
    "KY"
  ],
  "GLENVIEW": [
    "60026",
    "IL"
  ],
  "HARRODS CREEK": [
    "40027",
    "KY"
  ],
  "MACKVILLE": [
    "40040",
    "KY"
  ],
  "MASONIC HOME": [
    "40041",
    "KY"
  ],
  "MOUNT EDEN": [
    "40046",
    "KY"
  ],
  "NERINX": [
    "40049",
    "KY"
  ],
  "PEWEE VALLEY": [
    "40056",
    "KY"
  ],
  "PLEASUREVILLE": [
    "40057",
    "KY"
  ],
  "RAYWICK": [
    "40060",
    "KY"
  ],
  "SAINT CATHARINE": [
    "40061",
    "KY"
  ],
  "SAINT MARY": [
    "63673",
    "MO"
  ],
  "SULPHUR": [
    "73086",
    "OK"
  ],
  "TURNERS STATION": [
    "40075",
    "KY"
  ],
  "WADDY": [
    "40076",
    "KY"
  ],
  "WILLISBURG": [
    "40078",
    "KY"
  ],
  "BATTLETOWN": [
    "40104",
    "KY"
  ],
  "BRANDENBURG": [
    "40108",
    "KY"
  ],
  "CLOVERPORT": [
    "40111",
    "KY"
  ],
  "CUSTER": [
    "98240",
    "WA"
  ],
  "EKRON": [
    "40117",
    "KY"
  ],
  "FALLS OF ROUGH": [
    "40119",
    "KY"
  ],
  "FORT KNOX": [
    "40122",
    "KY"
  ],
  "HILLVIEW": [
    "62050",
    "IL"
  ],
  "GUSTON": [
    "40142",
    "KY"
  ],
  "HARDINSBURG": [
    "47125",
    "IN"
  ],
  "HARNED": [
    "40144",
    "KY"
  ],
  "LEBANON JUNCTION": [
    "40150",
    "KY"
  ],
  "MC DANIELS": [
    "40152",
    "KY"
  ],
  "MC QUADY": [
    "40153",
    "KY"
  ],
  "MULDRAUGH": [
    "40155",
    "KY"
  ],
  "PAYNEVILLE": [
    "40157",
    "KY"
  ],
  "RADCLIFF": [
    "40160",
    "KY"
  ],
  "RHODELIA": [
    "40161",
    "KY"
  ],
  "RINEYVILLE": [
    "40162",
    "KY"
  ],
  "SHEPHERDSVILLE": [
    "40165",
    "KY"
  ],
  "STEPHENSPORT": [
    "40170",
    "KY"
  ],
  "UNION STAR": [
    "64494",
    "MO"
  ],
  "VINE GROVE": [
    "40175",
    "KY"
  ],
  "WESTVIEW": [
    "40178",
    "KY"
  ],
  "BURGIN": [
    "40310",
    "KY"
  ],
  "CLAY CITY": [
    "62824",
    "IL"
  ],
  "DENNISTON": [
    "40316",
    "KY"
  ],
  "FARMERS": [
    "40319",
    "KY"
  ],
  "FRENCHBURG": [
    "40322",
    "KY"
  ],
  "GRAVEL SWITCH": [
    "40328",
    "KY"
  ],
  "HARRODSBURG": [
    "47434",
    "IN"
  ],
  "NICHOLASVILLE": [
    "40356",
    "KY"
  ],
  "MEANS": [
    "40346",
    "KY"
  ],
  "MOREHEAD": [
    "40351",
    "KY"
  ],
  "MOUNT STERLING": [
    "65062",
    "MO"
  ],
  "NEW LIBERTY": [
    "52765",
    "IA"
  ],
  "NORTH MIDDLETOWN": [
    "40357",
    "KY"
  ],
  "OLYMPIA": [
    "98599",
    "WA"
  ],
  "OWENTON": [
    "40359",
    "KY"
  ],
  "OWINGSVILLE": [
    "40360",
    "KY"
  ],
  "PERRY PARK": [
    "40363",
    "KY"
  ],
  "SADIEVILLE": [
    "40370",
    "KY"
  ],
  "SALT LICK": [
    "40371",
    "KY"
  ],
  "SALVISA": [
    "40372",
    "KY"
  ],
  "SLADE": [
    "40376",
    "KY"
  ],
  "STAMPING GROUND": [
    "40379",
    "KY"
  ],
  "BIGHILL": [
    "40405",
    "KY"
  ],
  "BRODHEAD": [
    "53520",
    "WI"
  ],
  "BRYANTSVILLE": [
    "40410",
    "KY"
  ],
  "GRAY HAWK": [
    "40434",
    "KY"
  ],
  "HUSTONVILLE": [
    "40437",
    "KY"
  ],
  "MC KEE": [
    "40447",
    "KY"
  ],
  "MC KINNEY": [
    "40448",
    "KY"
  ],
  "PAINT LICK": [
    "40461",
    "KY"
  ],
  "RAVENNA": [
    "75476",
    "TX"
  ],
  "RENFRO VALLEY": [
    "40473",
    "KY"
  ],
  "SANDGAP": [
    "40481",
    "KY"
  ],
  "STANFORD": [
    "94305",
    "CA"
  ],
  "EAST BERNSTADT": [
    "40729",
    "KY"
  ],
  "KEAVY": [
    "40737",
    "KY"
  ],
  "LILY": [
    "40740",
    "KY"
  ],
  "ROCKHOLDS": [
    "40759",
    "KY"
  ],
  "SILER": [
    "40763",
    "KY"
  ],
  "AGES BROOKSIDE": [
    "40801",
    "KY"
  ],
  "ASHER": [
    "74826",
    "OK"
  ],
  "BENHAM": [
    "40807",
    "KY"
  ],
  "BIG LAUREL": [
    "40808",
    "KY"
  ],
  "BLEDSOE": [
    "79314",
    "TX"
  ],
  "CAWOOD": [
    "40815",
    "KY"
  ],
  "COLDIRON": [
    "40819",
    "KY"
  ],
  "CRANKS": [
    "40820",
    "KY"
  ],
  "DAYHOIT": [
    "40824",
    "KY"
  ],
  "ESSIE": [
    "40827",
    "KY"
  ],
  "EVARTS": [
    "40828",
    "KY"
  ],
  "GRAYS KNOB": [
    "40829",
    "KY"
  ],
  "HARLAN": [
    "51537",
    "IA"
  ],
  "HELTON": [
    "40840",
    "KY"
  ],
  "HOLMES MILL": [
    "40843",
    "KY"
  ],
  "HOSKINSTON": [
    "40844",
    "KY"
  ],
  "HULEN": [
    "40845",
    "KY"
  ],
  "KENVIR": [
    "40847",
    "KY"
  ],
  "LOYALL": [
    "40854",
    "KY"
  ],
  "LYNCH": [
    "68746",
    "NE"
  ],
  "MIRACLE": [
    "40856",
    "KY"
  ],
  "PARTRIDGE": [
    "67566",
    "KS"
  ],
  "PATHFORK": [
    "40863",
    "KY"
  ],
  "STINNETT": [
    "79083",
    "TX"
  ],
  "TOTZ": [
    "40870",
    "KY"
  ],
  "WALLINS CREEK": [
    "40873",
    "KY"
  ],
  "WARBRANCH": [
    "40874",
    "KY"
  ],
  "ARJAY": [
    "40902",
    "KY"
  ],
  "ARTEMUS": [
    "40903",
    "KY"
  ],
  "BARBOURVILLE": [
    "40906",
    "KY"
  ],
  "BIMBLE": [
    "40915",
    "KY"
  ],
  "BRYANTS STORE": [
    "40921",
    "KY"
  ],
  "CANNON": [
    "40923",
    "KY"
  ],
  "CLOSPLINT": [
    "40927",
    "KY"
  ],
  "FALL ROCK": [
    "40932",
    "KY"
  ],
  "FLAT LICK": [
    "40935",
    "KY"
  ],
  "FOURMILE": [
    "40939",
    "KY"
  ],
  "FRAKES": [
    "40940",
    "KY"
  ],
  "GARRARD": [
    "40941",
    "KY"
  ],
  "GIRDLER": [
    "40943",
    "KY"
  ],
  "GREEN ROAD": [
    "40946",
    "KY"
  ],
  "HEIDRICK": [
    "40949",
    "KY"
  ],
  "HIMA": [
    "40951",
    "KY"
  ],
  "HINKLE": [
    "40953",
    "KY"
  ],
  "INGRAM": [
    "78025",
    "TX"
  ],
  "KETTLE ISLAND": [
    "40958",
    "KY"
  ],
  "MARY ALICE": [
    "40964",
    "KY"
  ],
  "MIDDLESBORO": [
    "40965",
    "KY"
  ],
  "ROARK": [
    "40979",
    "KY"
  ],
  "SEXTONS CREEK": [
    "40983",
    "KY"
  ],
  "STONEY FORK": [
    "40988",
    "KY"
  ],
  "LATONIA": [
    "41015",
    "KY"
  ],
  "FT MITCHELL": [
    "41017",
    "KY"
  ],
  "ERLANGER": [
    "41025",
    "KY"
  ],
  "CYNTHIANA": [
    "47612",
    "IN"
  ],
  "DE MOSSVILLE": [
    "41033",
    "KY"
  ],
  "DRY RIDGE": [
    "41035",
    "KY"
  ],
  "FLEMINGSBURG": [
    "41041",
    "KY"
  ],
  "GLENCOE": [
    "88324",
    "NM"
  ],
  "MAYSLICK": [
    "41055",
    "KY"
  ],
  "MORNING VIEW": [
    "41063",
    "KY"
  ],
  "MOUNT OLIVET": [
    "41064",
    "KY"
  ],
  "MUSES MILLS": [
    "41065",
    "KY"
  ],
  "BELLEVUE": [
    "98015",
    "WA"
  ],
  "FORT THOMAS": [
    "85536",
    "AZ"
  ],
  "PLUMMERS LANDING": [
    "41081",
    "KY"
  ],
  "SANDERS": [
    "86512",
    "AZ"
  ],
  "SILVER GROVE": [
    "41085",
    "KY"
  ],
  "ARGILLITE": [
    "41121",
    "KY"
  ],
  "CARTER": [
    "73627",
    "OK"
  ],
  "CATLETTSBURG": [
    "41129",
    "KY"
  ],
  "GRAHN": [
    "41142",
    "KY"
  ],
  "GREENUP": [
    "62428",
    "IL"
  ],
  "HITCHINS": [
    "41146",
    "KY"
  ],
  "ISONVILLE": [
    "41149",
    "KY"
  ],
  "MARTHA": [
    "73556",
    "OK"
  ],
  "OLIVE HILL": [
    "41164",
    "KY"
  ],
  "SOLDIER": [
    "66540",
    "KS"
  ],
  "SOUTH PORTSMOUTH": [
    "41174",
    "KY"
  ],
  "SOUTH SHORE": [
    "57263",
    "SD"
  ],
  "VANCEBURG": [
    "41179",
    "KY"
  ],
  "WEBBVILLE": [
    "41180",
    "KY"
  ],
  "TOLLESBORO": [
    "41189",
    "KY"
  ],
  "BEAUTY": [
    "41203",
    "KY"
  ],
  "BOONS CAMP": [
    "41204",
    "KY"
  ],
  "DEBORD": [
    "41214",
    "KY"
  ],
  "EAST POINT": [
    "41216",
    "KY"
  ],
  "FLATGAP": [
    "41219",
    "KY"
  ],
  "HAGERHILL": [
    "41222",
    "KY"
  ],
  "INEZ": [
    "77968",
    "TX"
  ],
  "KEATON": [
    "41226",
    "KY"
  ],
  "LOVELY": [
    "41231",
    "KY"
  ],
  "LOWMANSVILLE": [
    "41232",
    "KY"
  ],
  "MEALLY": [
    "41234",
    "KY"
  ],
  "OIL SPRINGS": [
    "41238",
    "KY"
  ],
  "PAINTSVILLE": [
    "41240",
    "KY"
  ],
  "PILGRIM": [
    "41250",
    "KY"
  ],
  "RIVER": [
    "41254",
    "KY"
  ],
  "SITKA": [
    "99835",
    "AK"
  ],
  "STAFFORDSVILLE": [
    "41256",
    "KY"
  ],
  "STAMBAUGH": [
    "49964",
    "MI"
  ],
  "THELMA": [
    "41260",
    "KY"
  ],
  "TOMAHAWK": [
    "54487",
    "WI"
  ],
  "TUTOR KEY": [
    "41263",
    "KY"
  ],
  "VAN LEAR": [
    "41265",
    "KY"
  ],
  "WEST VAN LEAR": [
    "41268",
    "KY"
  ],
  "WITTENSVILLE": [
    "41274",
    "KY"
  ],
  "BEATTYVILLE": [
    "41311",
    "KY"
  ],
  "CLAYHOLE": [
    "41317",
    "KY"
  ],
  "LONE": [
    "41347",
    "KY"
  ],
  "PINE RIDGE": [
    "57770",
    "SD"
  ],
  "ROUSSEAU": [
    "41366",
    "KY"
  ],
  "VANCLEVE": [
    "41385",
    "KY"
  ],
  "WHICK": [
    "41390",
    "KY"
  ],
  "ZOE": [
    "41397",
    "KY"
  ],
  "EZEL": [
    "41425",
    "KY"
  ],
  "ROYALTON": [
    "62983",
    "IL"
  ],
  "SALYERSVILLE": [
    "41465",
    "KY"
  ],
  "WRIGLEY": [
    "41477",
    "KY"
  ],
  "SOUTH WILLIAMSON": [
    "41503",
    "KY"
  ],
  "ASHCAMP": [
    "41512",
    "KY"
  ],
  "BELCHER": [
    "71004",
    "LA"
  ],
  "BELFRY": [
    "59008",
    "MT"
  ],
  "BURDINE": [
    "41517",
    "KY"
  ],
  "CANADA": [
    "41519",
    "KY"
  ],
  "DORTON": [
    "41520",
    "KY"
  ],
  "ELKHORN CITY": [
    "41522",
    "KY"
  ],
  "FEDSCREEK": [
    "41524",
    "KY"
  ],
  "FREEBURN": [
    "41528",
    "KY"
  ],
  "HELLIER": [
    "41534",
    "KY"
  ],
  "JENKINS": [
    "56456",
    "MN"
  ],
  "JONANCY": [
    "41538",
    "KY"
  ],
  "KIMPER": [
    "41539",
    "KY"
  ],
  "MC ANDREWS": [
    "41543",
    "KY"
  ],
  "MC CARR": [
    "41544",
    "KY"
  ],
  "MAJESTIC": [
    "41547",
    "KY"
  ],
  "MOUTHCARD": [
    "41548",
    "KY"
  ],
  "MYRA": [
    "76253",
    "TX"
  ],
  "PHYLLIS": [
    "41554",
    "KY"
  ],
  "RACCOON": [
    "41557",
    "KY"
  ],
  "RANSOM": [
    "67572",
    "KS"
  ],
  "REGINA": [
    "87046",
    "NM"
  ],
  "ROBINSON CREEK": [
    "41560",
    "KY"
  ],
  "ROCKHOUSE": [
    "41561",
    "KY"
  ],
  "SHELBIANA": [
    "41562",
    "KY"
  ],
  "SHELBY GAP": [
    "41563",
    "KY"
  ],
  "STONE": [
    "41567",
    "KY"
  ],
  "STOPOVER": [
    "41568",
    "KY"
  ],
  "VIRGIE": [
    "41572",
    "KY"
  ],
  "AUXIER": [
    "41602",
    "KY"
  ],
  "BETSY LAYNE": [
    "41605",
    "KY"
  ],
  "BEVINSVILLE": [
    "41606",
    "KY"
  ],
  "BLUE RIVER": [
    "97413",
    "OR"
  ],
  "BYPRO": [
    "41612",
    "KY"
  ],
  "DAVID": [
    "41616",
    "KY"
  ],
  "DRIFT": [
    "41619",
    "KY"
  ],
  "DWALE": [
    "41621",
    "KY"
  ],
  "EASTERN": [
    "41622",
    "KY"
  ],
  "GRETHEL": [
    "41631",
    "KY"
  ],
  "GUNLOCK": [
    "84733",
    "UT"
  ],
  "HAROLD": [
    "41635",
    "KY"
  ],
  "HI HAT": [
    "41636",
    "KY"
  ],
  "HUEYSVILLE": [
    "41640",
    "KY"
  ],
  "IVEL": [
    "41642",
    "KY"
  ],
  "MINNIE": [
    "41651",
    "KY"
  ],
  "PRESTONSBURG": [
    "41653",
    "KY"
  ],
  "PRINTER": [
    "41655",
    "KY"
  ],
  "STANVILLE": [
    "41659",
    "KY"
  ],
  "TEABERRY": [
    "41660",
    "KY"
  ],
  "TRAM": [
    "41663",
    "KY"
  ],
  "WEEKSBURY": [
    "41667",
    "KY"
  ],
  "HAZARD": [
    "68844",
    "NE"
  ],
  "ARY": [
    "41712",
    "KY"
  ],
  "AVAWAM": [
    "41713",
    "KY"
  ],
  "BEAR BRANCH": [
    "41714",
    "KY"
  ],
  "BONNYMAN": [
    "41719",
    "KY"
  ],
  "BUCKHORN": [
    "88025",
    "NM"
  ],
  "BULAN": [
    "41722",
    "KY"
  ],
  "BUSY": [
    "41723",
    "KY"
  ],
  "CARRIE": [
    "41725",
    "KY"
  ],
  "CHAVIES": [
    "41727",
    "KY"
  ],
  "COMBS": [
    "72721",
    "AR"
  ],
  "CORNETTSVILLE": [
    "41731",
    "KY"
  ],
  "DELPHIA": [
    "41735",
    "KY"
  ],
  "DWARF": [
    "41739",
    "KY"
  ],
  "EMMALENA": [
    "41740",
    "KY"
  ],
  "FISTY": [
    "41743",
    "KY"
  ],
  "GAYS CREEK": [
    "41745",
    "KY"
  ],
  "HAPPY": [
    "79042",
    "TX"
  ],
  "HYDEN": [
    "41749",
    "KY"
  ],
  "JEFF": [
    "41751",
    "KY"
  ],
  "KRYPTON": [
    "41754",
    "KY"
  ],
  "SASSAFRAS": [
    "41759",
    "KY"
  ],
  "SCUDDY": [
    "41760",
    "KY"
  ],
  "SLEMP": [
    "41763",
    "KY"
  ],
  "THOUSANDSTICKS": [
    "41766",
    "KY"
  ],
  "VEST": [
    "41772",
    "KY"
  ],
  "VICCO": [
    "41773",
    "KY"
  ],
  "VIPER": [
    "41774",
    "KY"
  ],
  "WOOTON": [
    "41776",
    "KY"
  ],
  "YEADDISS": [
    "41777",
    "KY"
  ],
  "BLACKEY": [
    "41804",
    "KY"
  ],
  "CROMONA": [
    "41810",
    "KY"
  ],
  "DEANE": [
    "41812",
    "KY"
  ],
  "ERMINE": [
    "41815",
    "KY"
  ],
  "HALLIE": [
    "41821",
    "KY"
  ],
  "HINDMAN": [
    "41822",
    "KY"
  ],
  "ISOM": [
    "41824",
    "KY"
  ],
  "JEREMIAH": [
    "41826",
    "KY"
  ],
  "LEBURN": [
    "41831",
    "KY"
  ],
  "LINEFORK": [
    "41833",
    "KY"
  ],
  "LITTCARR": [
    "41834",
    "KY"
  ],
  "MC ROBERTS": [
    "41835",
    "KY"
  ],
  "MALLIE": [
    "41836",
    "KY"
  ],
  "MAYKING": [
    "41837",
    "KY"
  ],
  "MOUSIE": [
    "41839",
    "KY"
  ],
  "NEON": [
    "41840",
    "KY"
  ],
  "PINE TOP": [
    "41843",
    "KY"
  ],
  "PIPPA PASSES": [
    "41844",
    "KY"
  ],
  "PREMIUM": [
    "41845",
    "KY"
  ],
  "REDFOX": [
    "41847",
    "KY"
  ],
  "ROXANA": [
    "62084",
    "IL"
  ],
  "DEMA": [
    "41859",
    "KY"
  ],
  "TOPMOST": [
    "41862",
    "KY"
  ],
  "PADUCAH": [
    "79248",
    "TX"
  ],
  "ALMO": [
    "83312",
    "ID"
  ],
  "BANDANA": [
    "42022",
    "KY"
  ],
  "BARDWELL": [
    "75101",
    "TX"
  ],
  "BARLOW": [
    "45712",
    "OH"
  ],
  "BURNA": [
    "42028",
    "KY"
  ],
  "CALVERT CITY": [
    "42029",
    "KY"
  ],
  "CRAYNE": [
    "42033",
    "KY"
  ],
  "EDDYVILLE": [
    "97343",
    "OR"
  ],
  "FANCY FARM": [
    "42039",
    "KY"
  ],
  "GRAND RIVERS": [
    "42045",
    "KY"
  ],
  "HARDIN": [
    "77561",
    "TX"
  ],
  "HAZEL": [
    "57242",
    "SD"
  ],
  "KEVIL": [
    "42053",
    "KY"
  ],
  "KIRKSEY": [
    "42054",
    "KY"
  ],
  "KUTTAWA": [
    "42055",
    "KY"
  ],
  "LA CENTER": [
    "98629",
    "WA"
  ],
  "LEDBETTER": [
    "78946",
    "TX"
  ],
  "LOVELACEVILLE": [
    "42060",
    "KY"
  ],
  "LOWES": [
    "42061",
    "KY"
  ],
  "MELBER": [
    "42069",
    "KY"
  ],
  "MILBURN": [
    "73450",
    "OK"
  ],
  "MURRAY": [
    "83874",
    "ID"
  ],
  "NEW CONCORD": [
    "43762",
    "OH"
  ],
  "SMITHLAND": [
    "51056",
    "IA"
  ],
  "SYMSONIA": [
    "42082",
    "KY"
  ],
  "TILINE": [
    "42083",
    "KY"
  ],
  "WEST PADUCAH": [
    "42086",
    "KY"
  ],
  "WICKLIFFE": [
    "44092",
    "OH"
  ],
  "WINGO": [
    "42088",
    "KY"
  ],
  "ADOLPHUS": [
    "42120",
    "KY"
  ],
  "ALVATON": [
    "42122",
    "KY"
  ],
  "CAVE CITY": [
    "72521",
    "AR"
  ],
  "EDMONTON": [
    "42129",
    "KY"
  ],
  "ETOILE": [
    "75944",
    "TX"
  ],
  "FOUNTAIN RUN": [
    "42133",
    "KY"
  ],
  "GAMALIEL": [
    "72537",
    "AR"
  ],
  "HESTAND": [
    "42151",
    "KY"
  ],
  "HISEVILLE": [
    "42152",
    "KY"
  ],
  "KNOB LICK": [
    "63651",
    "MO"
  ],
  "LUCAS": [
    "67648",
    "KS"
  ],
  "MOUNT HERMON": [
    "95041",
    "CA"
  ],
  "PARK CITY": [
    "84098",
    "UT"
  ],
  "SUMMER SHADE": [
    "42166",
    "KY"
  ],
  "TOMPKINSVILLE": [
    "42167",
    "KY"
  ],
  "WOODBURN": [
    "97071",
    "OR"
  ],
  "SMITHS GROVE": [
    "42171",
    "KY"
  ],
  "ADAIRVILLE": [
    "42202",
    "KY"
  ],
  "BEE SPRING": [
    "42207",
    "KY"
  ],
  "CADIZ": [
    "43907",
    "OH"
  ],
  "CENTER": [
    "81125",
    "CO"
  ],
  "CERULEAN": [
    "42215",
    "KY"
  ],
  "CLIFTY": [
    "42216",
    "KY"
  ],
  "FORT CAMPBELL": [
    "42223",
    "KY"
  ],
  "GRACEY": [
    "42232",
    "KY"
  ],
  "GUTHRIE": [
    "73044",
    "OK"
  ],
  "HOPKINSVILLE": [
    "42241",
    "KY"
  ],
  "MAMMOTH CAVE": [
    "42259",
    "KY"
  ],
  "OAK GROVE": [
    "72660",
    "AR"
  ],
  "OLMSTEAD": [
    "42265",
    "KY"
  ],
  "ROCKFIELD": [
    "46977",
    "IN"
  ],
  "ROUNDHILL": [
    "42275",
    "KY"
  ],
  "SHARON GROVE": [
    "42280",
    "KY"
  ],
  "SWEEDEN": [
    "42285",
    "KY"
  ],
  "OWENSBORO": [
    "42304",
    "KY"
  ],
  "BEAVER DAM": [
    "53916",
    "WI"
  ],
  "BEECH GROVE": [
    "72412",
    "AR"
  ],
  "BEECHMONT": [
    "42323",
    "KY"
  ],
  "CENTERTOWN": [
    "65023",
    "MO"
  ],
  "CLEATON": [
    "42332",
    "KY"
  ],
  "DRAKESBORO": [
    "42337",
    "KY"
  ],
  "DUNMOR": [
    "42339",
    "KY"
  ],
  "FORDSVILLE": [
    "42343",
    "KY"
  ],
  "HAWESVILLE": [
    "42348",
    "KY"
  ],
  "HORSE BRANCH": [
    "42349",
    "KY"
  ],
  "ISLAND": [
    "42350",
    "KY"
  ],
  "LEWISPORT": [
    "42351",
    "KY"
  ],
  "MACEO": [
    "42355",
    "KY"
  ],
  "MAPLE MOUNT": [
    "42356",
    "KY"
  ],
  "OLATON": [
    "42361",
    "KY"
  ],
  "PHILPOT": [
    "42366",
    "KY"
  ],
  "POWDERLY": [
    "75473",
    "TX"
  ],
  "REYNOLDS STATION": [
    "42368",
    "KY"
  ],
  "RUMSEY": [
    "95679",
    "CA"
  ],
  "SOUTH CARROLLTON": [
    "42374",
    "KY"
  ],
  "CORYDON": [
    "50060",
    "IA"
  ],
  "DAWSON SPRINGS": [
    "42408",
    "KY"
  ],
  "DIXON": [
    "95620",
    "CA"
  ],
  "MANITOU": [
    "42436",
    "KY"
  ],
  "MORGANFIELD": [
    "42437",
    "KY"
  ],
  "MORTONS GAP": [
    "42440",
    "KY"
  ],
  "NORTONVILLE": [
    "66060",
    "KS"
  ],
  "POOLE": [
    "42444",
    "KY"
  ],
  "REED": [
    "42451",
    "KY"
  ],
  "ROBARDS": [
    "42452",
    "KY"
  ],
  "SEBREE": [
    "42455",
    "KY"
  ],
  "SLAUGHTERS": [
    "42456",
    "KY"
  ],
  "SMITH MILLS": [
    "42457",
    "KY"
  ],
  "SPOTTSVILLE": [
    "42458",
    "KY"
  ],
  "WHEATCROFT": [
    "42463",
    "KY"
  ],
  "BETHELRIDGE": [
    "42516",
    "KY"
  ],
  "BRONSTON": [
    "42518",
    "KY"
  ],
  "DUNNVILLE": [
    "42528",
    "KY"
  ],
  "NANCY": [
    "42544",
    "KY"
  ],
  "SCIENCE HILL": [
    "42553",
    "KY"
  ],
  "TATEVILLE": [
    "42558",
    "KY"
  ],
  "WEST SOMERSET": [
    "42564",
    "KY"
  ],
  "YOSEMITE": [
    "42566",
    "KY"
  ],
  "EUBANK": [
    "42567",
    "KY"
  ],
  "ALPHA": [
    "61413",
    "IL"
  ],
  "MARSHES SIDING": [
    "42631",
    "KY"
  ],
  "PARKERS LAKE": [
    "42634",
    "KY"
  ],
  "PINE KNOT": [
    "42635",
    "KY"
  ],
  "REVELO": [
    "42638",
    "KY"
  ],
  "RUSSELL SPRINGS": [
    "42642",
    "KY"
  ],
  "STEARNS": [
    "42647",
    "KY"
  ],
  "STRUNK": [
    "42649",
    "KY"
  ],
  "WHITLEY CITY": [
    "42653",
    "KY"
  ],
  "BIG CLIFTY": [
    "42712",
    "KY"
  ],
  "BONNIEVILLE": [
    "42713",
    "KY"
  ],
  "BREEDING": [
    "42715",
    "KY"
  ],
  "BURKESVILLE": [
    "42717",
    "KY"
  ],
  "CAMPBELLSVILLE": [
    "42719",
    "KY"
  ],
  "CANEYVILLE": [
    "42721",
    "KY"
  ],
  "CANMER": [
    "42722",
    "KY"
  ],
  "CECILIA": [
    "70521",
    "LA"
  ],
  "CUB RUN": [
    "42729",
    "KY"
  ],
  "EASTVIEW": [
    "42732",
    "KY"
  ],
  "ELK HORN": [
    "51531",
    "IA"
  ],
  "GLENS FORK": [
    "42741",
    "KY"
  ],
  "HODGENVILLE": [
    "42748",
    "KY"
  ],
  "HORSE CAVE": [
    "42749",
    "KY"
  ],
  "KNIFLEY": [
    "42753",
    "KY"
  ],
  "LEITCHFIELD": [
    "42755",
    "KY"
  ],
  "MARROWBONE": [
    "42759",
    "KY"
  ],
  "MOUNT SHERMAN": [
    "42764",
    "KY"
  ],
  "MUNFORDVILLE": [
    "42765",
    "KY"
  ],
  "SONORA": [
    "95370",
    "CA"
  ],
  "AMLIN": [
    "43002",
    "OH"
  ],
  "ASHLEY": [
    "62808",
    "IL"
  ],
  "BLACKLICK": [
    "43004",
    "OH"
  ],
  "BRINKHAVEN": [
    "43006",
    "OH"
  ],
  "BUCKEYE LAKE": [
    "43008",
    "OH"
  ],
  "CABLE": [
    "54821",
    "WI"
  ],
  "CENTERBURG": [
    "43011",
    "OH"
  ],
  "CROTON": [
    "43013",
    "OH"
  ],
  "GAMBIER": [
    "43022",
    "OH"
  ],
  "JACKSONTOWN": [
    "43030",
    "OH"
  ],
  "KILBOURNE": [
    "71253",
    "LA"
  ],
  "KIRKERSVILLE": [
    "43033",
    "OH"
  ],
  "LEWIS CENTER": [
    "43035",
    "OH"
  ],
  "MAGNETIC SPRINGS": [
    "43036",
    "OH"
  ],
  "MILFORD CENTER": [
    "43045",
    "OH"
  ],
  "MILLERSPORT": [
    "43046",
    "OH"
  ],
  "MINGO": [
    "50168",
    "IA"
  ],
  "MOUNT LIBERTY": [
    "43048",
    "OH"
  ],
  "NORTH LEWISBURG": [
    "43060",
    "OH"
  ],
  "OSTRANDER": [
    "55961",
    "MN"
  ],
  "PATASKALA": [
    "43062",
    "OH"
  ],
  "PLAIN CITY": [
    "43064",
    "OH"
  ],
  "RADNOR": [
    "43066",
    "OH"
  ],
  "REYNOLDSBURG": [
    "43068",
    "OH"
  ],
  "ROSEWOOD": [
    "43070",
    "OH"
  ],
  "SAINT LOUISVILLE": [
    "43071",
    "OH"
  ],
  "SAINT PARIS": [
    "43072",
    "OH"
  ],
  "THORNVILLE": [
    "43076",
    "OH"
  ],
  "UNIONVILLE CENTER": [
    "43077",
    "OH"
  ],
  "URBANA": [
    "65767",
    "MO"
  ],
  "WESTERVILLE": [
    "68881",
    "NE"
  ],
  "ADELPHI": [
    "43101",
    "OH"
  ],
  "AMANDA": [
    "43102",
    "OH"
  ],
  "BRICE": [
    "43109",
    "OH"
  ],
  "CANAL WINCHESTER": [
    "43110",
    "OH"
  ],
  "CARROLL": [
    "68723",
    "NE"
  ],
  "COMMERCIAL POINT": [
    "43116",
    "OH"
  ],
  "GROVEPORT": [
    "43125",
    "OH"
  ],
  "LAURELVILLE": [
    "43135",
    "OH"
  ],
  "LITHOPOLIS": [
    "43136",
    "OH"
  ],
  "LOCKBOURNE": [
    "43194",
    "OH"
  ],
  "MURRAY CITY": [
    "43144",
    "OH"
  ],
  "PICKERINGTON": [
    "43147",
    "OH"
  ],
  "ROCKBRIDGE": [
    "65741",
    "MO"
  ],
  "SOUTH BLOOMINGVILLE": [
    "43152",
    "OH"
  ],
  "SOUTH SOLON": [
    "43153",
    "OH"
  ],
  "STOUTSVILLE": [
    "65283",
    "MO"
  ],
  "TARLTON": [
    "43156",
    "OH"
  ],
  "THURSTON": [
    "68062",
    "NE"
  ],
  "UNION FURNACE": [
    "43158",
    "OH"
  ],
  "WASHINGTON COURT HOUSE": [
    "43160",
    "OH"
  ],
  "BELLE CENTER": [
    "43310",
    "OH"
  ],
  "CARDINGTON": [
    "43315",
    "OH"
  ],
  "CAREY": [
    "83320",
    "ID"
  ],
  "CHESTERVILLE": [
    "43317",
    "OH"
  ],
  "DE GRAFF": [
    "43318",
    "OH"
  ],
  "EAST LIBERTY": [
    "43319",
    "OH"
  ],
  "GREEN CAMP": [
    "43322",
    "OH"
  ],
  "HARPSTER": [
    "43323",
    "OH"
  ],
  "IBERIA": [
    "65486",
    "MO"
  ],
  "KIRBY": [
    "82430",
    "WY"
  ],
  "LA RUE": [
    "43332",
    "OH"
  ],
  "MARENGO": [
    "60152",
    "IL"
  ],
  "MARTEL": [
    "43335",
    "OH"
  ],
  "MORRAL": [
    "43337",
    "OH"
  ],
  "MOUNT VICTORY": [
    "43340",
    "OH"
  ],
  "NEW BLOOMINGTON": [
    "43341",
    "OH"
  ],
  "ROUNDHEAD": [
    "43346",
    "OH"
  ],
  "RUSHSYLVANIA": [
    "43347",
    "OH"
  ],
  "RUSSELLS POINT": [
    "43348",
    "OH"
  ],
  "SHAUCK": [
    "43349",
    "OH"
  ],
  "UPPER SANDUSKY": [
    "43351",
    "OH"
  ],
  "WEST MANSFIELD": [
    "43358",
    "OH"
  ],
  "ZANESFIELD": [
    "43360",
    "OH"
  ],
  "BRADNER": [
    "43406",
    "OH"
  ],
  "BURGOON": [
    "43407",
    "OH"
  ],
  "CLAY CENTER": [
    "68933",
    "NE"
  ],
  "CURTICE": [
    "43412",
    "OH"
  ],
  "CYGNET": [
    "43413",
    "OH"
  ],
  "DUNBRIDGE": [
    "43414",
    "OH"
  ],
  "GIBSONBURG": [
    "43431",
    "OH"
  ],
  "GRAYTOWN": [
    "43432",
    "OH"
  ],
  "GYPSUM": [
    "81637",
    "CO"
  ],
  "JERRY CITY": [
    "43437",
    "OH"
  ],
  "KELLEYS ISLAND": [
    "43438",
    "OH"
  ],
  "LACARNE": [
    "43439",
    "OH"
  ],
  "LAKESIDE MARBLEHEAD": [
    "43440",
    "OH"
  ],
  "LINDSEY": [
    "43442",
    "OH"
  ],
  "LUCKEY": [
    "43443",
    "OH"
  ],
  "MIDDLE BASS": [
    "43446",
    "OH"
  ],
  "OAK HARBOR": [
    "98278",
    "WA"
  ],
  "PEMBERVILLE": [
    "43450",
    "OH"
  ],
  "PUT IN BAY": [
    "43456",
    "OH"
  ],
  "RISINGSUN": [
    "43457",
    "OH"
  ],
  "ROSSFORD": [
    "43460",
    "OH"
  ],
  "RUDOLPH": [
    "54475",
    "WI"
  ],
  "STONY RIDGE": [
    "43463",
    "OH"
  ],
  "VICKERY": [
    "43464",
    "OH"
  ],
  "WALBRIDGE": [
    "43465",
    "OH"
  ],
  "ALVORDTON": [
    "43501",
    "OH"
  ],
  "ARCHBOLD": [
    "43502",
    "OH"
  ],
  "BERKEY": [
    "43504",
    "OH"
  ],
  "BRYAN": [
    "77808",
    "TX"
  ],
  "CUSTAR": [
    "43511",
    "OH"
  ],
  "DESHLER": [
    "68340",
    "NE"
  ],
  "EDGERTON": [
    "82635",
    "WY"
  ],
  "EDON": [
    "43518",
    "OH"
  ],
  "EVANSPORT": [
    "43519",
    "OH"
  ],
  "FARMER": [
    "43520",
    "OH"
  ],
  "GRAND RAPIDS": [
    "55744",
    "MN"
  ],
  "GRELTON": [
    "43523",
    "OH"
  ],
  "HAMLER": [
    "43524",
    "OH"
  ],
  "HASKINS": [
    "43525",
    "OH"
  ],
  "HOLGATE": [
    "43527",
    "OH"
  ],
  "HOYTVILLE": [
    "43529",
    "OH"
  ],
  "KUNKLE": [
    "43531",
    "OH"
  ],
  "LIBERTY CENTER": [
    "46766",
    "IN"
  ],
  "MALINTA": [
    "43535",
    "OH"
  ],
  "MARK CENTER": [
    "43536",
    "OH"
  ],
  "MAUMEE": [
    "43537",
    "OH"
  ],
  "METAMORA": [
    "61548",
    "IL"
  ],
  "MILTON CENTER": [
    "43541",
    "OH"
  ],
  "MONCLOVA": [
    "43542",
    "OH"
  ],
  "NAPOLEON": [
    "64074",
    "MO"
  ],
  "NEAPOLIS": [
    "43547",
    "OH"
  ],
  "NEW BAVARIA": [
    "43548",
    "OH"
  ],
  "NEY": [
    "43549",
    "OH"
  ],
  "PETTISVILLE": [
    "43553",
    "OH"
  ],
  "RIDGEVILLE CORNERS": [
    "43555",
    "OH"
  ],
  "STRYKER": [
    "59933",
    "MT"
  ],
  "TONTOGANY": [
    "43565",
    "OH"
  ],
  "WAUSEON": [
    "43567",
    "OH"
  ],
  "WEST UNITY": [
    "43570",
    "OH"
  ],
  "TOLEDO": [
    "98591",
    "WA"
  ],
  "OREGON": [
    "64473",
    "MO"
  ],
  "ZANESVILLE": [
    "46799",
    "IN"
  ],
  "BELLE VALLEY": [
    "43717",
    "OH"
  ],
  "BLUE ROCK": [
    "43720",
    "OH"
  ],
  "BYESVILLE": [
    "43723",
    "OH"
  ],
  "CHANDLERSVILLE": [
    "43727",
    "OH"
  ],
  "CHESTERHILL": [
    "43728",
    "OH"
  ],
  "CROOKSVILLE": [
    "43731",
    "OH"
  ],
  "DERWENT": [
    "43733",
    "OH"
  ],
  "DUNCAN FALLS": [
    "43734",
    "OH"
  ],
  "EAST FULTONHAM": [
    "43735",
    "OH"
  ],
  "GRATIOT": [
    "53541",
    "WI"
  ],
  "JERUSALEM": [
    "72080",
    "AR"
  ],
  "KIMBOLTON": [
    "43749",
    "OH"
  ],
  "LAINGS": [
    "43752",
    "OH"
  ],
  "LORE CITY": [
    "43755",
    "OH"
  ],
  "MCCONNELSVILLE": [
    "43756",
    "OH"
  ],
  "MALTA": [
    "83342",
    "ID"
  ],
  "MOUNT PERRY": [
    "43760",
    "OH"
  ],
  "MOXAHALA": [
    "43761",
    "OH"
  ],
  "NEW LEXINGTON": [
    "43764",
    "OH"
  ],
  "NEW STRAITSVILLE": [
    "43766",
    "OH"
  ],
  "OLD WASHINGTON": [
    "43768",
    "OH"
  ],
  "PHILO": [
    "95466",
    "CA"
  ],
  "PLEASANT CITY": [
    "43772",
    "OH"
  ],
  "QUAKER CITY": [
    "43773",
    "OH"
  ],
  "ROSEVILLE": [
    "95747",
    "CA"
  ],
  "SALESVILLE": [
    "43778",
    "OH"
  ],
  "SARAHSVILLE": [
    "43779",
    "OH"
  ],
  "SENECAVILLE": [
    "43780",
    "OH"
  ],
  "SHAWNEE": [
    "80475",
    "CO"
  ],
  "STOCKPORT": [
    "52651",
    "IA"
  ],
  "WHITE COTTAGE": [
    "43791",
    "OH"
  ],
  "WOODSFIELD": [
    "43793",
    "OH"
  ],
  "BLISSFIELD": [
    "49228",
    "MI"
  ],
  "CONESVILLE": [
    "52739",
    "IA"
  ],
  "COSHOCTON": [
    "43812",
    "OH"
  ],
  "FRAZEYSBURG": [
    "43822",
    "OH"
  ],
  "FRESNO": [
    "93888",
    "CA"
  ],
  "NASHPORT": [
    "43830",
    "OH"
  ],
  "NEWCOMERSTOWN": [
    "43832",
    "OH"
  ],
  "STONE CREEK": [
    "43840",
    "OH"
  ],
  "TRINWAY": [
    "43842",
    "OH"
  ],
  "WALHONDING": [
    "43843",
    "OH"
  ],
  "WEST LAFAYETTE": [
    "47996",
    "IN"
  ],
  "ADENA": [
    "43901",
    "OH"
  ],
  "ALLEDONIA": [
    "43902",
    "OH"
  ],
  "BELLAIRE": [
    "77402",
    "TX"
  ],
  "BERGHOLZ": [
    "43908",
    "OH"
  ],
  "DILLONVALE": [
    "43917",
    "OH"
  ],
  "EAST LIVERPOOL": [
    "43920",
    "OH"
  ],
  "FAIRPOINT": [
    "43927",
    "OH"
  ],
  "HAMMONDSVILLE": [
    "43930",
    "OH"
  ],
  "IRONDALE": [
    "63648",
    "MO"
  ],
  "JACOBSBURG": [
    "43933",
    "OH"
  ],
  "MARTINS FERRY": [
    "43935",
    "OH"
  ],
  "MINGO JUNCTION": [
    "43938",
    "OH"
  ],
  "POWHATAN POINT": [
    "43942",
    "OH"
  ],
  "RAYLAND": [
    "43943",
    "OH"
  ],
  "SALINEVILLE": [
    "43945",
    "OH"
  ],
  "SHADYSIDE": [
    "43947",
    "OH"
  ],
  "SAINT CLAIRSVILLE": [
    "43950",
    "OH"
  ],
  "LAFFERTY": [
    "43951",
    "OH"
  ],
  "STEUBENVILLE": [
    "43953",
    "OH"
  ],
  "TILTONSVILLE": [
    "43963",
    "OH"
  ],
  "TORONTO": [
    "66777",
    "KS"
  ],
  "WARNOCK": [
    "43967",
    "OH"
  ],
  "BANNOCK": [
    "43972",
    "OH"
  ],
  "NEW ATHENS": [
    "62264",
    "IL"
  ],
  "HOLLOWAY": [
    "56249",
    "MN"
  ],
  "ASHTABULA": [
    "44005",
    "OH"
  ],
  "AUSTINBURG": [
    "44010",
    "OH"
  ],
  "AVON LAKE": [
    "44012",
    "OH"
  ],
  "CHAGRIN FALLS": [
    "44023",
    "OH"
  ],
  "CHARDON": [
    "44024",
    "OH"
  ],
  "CHESTERLAND": [
    "44026",
    "OH"
  ],
  "COLUMBIA STATION": [
    "44028",
    "OH"
  ],
  "CONNEAUT": [
    "44030",
    "OH"
  ],
  "EAST CLARIDON": [
    "44033",
    "OH"
  ],
  "ELYRIA": [
    "68837",
    "NE"
  ],
  "NORTH RIDGEVILLE": [
    "44039",
    "OH"
  ],
  "GATES MILLS": [
    "44040",
    "OH"
  ],
  "GRAND RIVER": [
    "50108",
    "IA"
  ],
  "HUNTSBURG": [
    "44046",
    "OH"
  ],
  "KIPTON": [
    "44049",
    "OH"
  ],
  "LORAIN": [
    "44055",
    "OH"
  ],
  "SHEFFIELD LAKE": [
    "44054",
    "OH"
  ],
  "MACEDONIA": [
    "62860",
    "IL"
  ],
  "MENTOR": [
    "56736",
    "MN"
  ],
  "NORTH KINGSVILLE": [
    "44068",
    "OH"
  ],
  "NORTH OLMSTED": [
    "44070",
    "OH"
  ],
  "NOVELTY": [
    "63460",
    "MO"
  ],
  "OBERLIN": [
    "70655",
    "LA"
  ],
  "PAINESVILLE": [
    "44077",
    "OH"
  ],
  "PARKMAN": [
    "82838",
    "WY"
  ],
  "PIERPONT": [
    "57468",
    "SD"
  ],
  "ROCK CREEK": [
    "55067",
    "MN"
  ],
  "TWINSBURG": [
    "44087",
    "OH"
  ],
  "VERMILION": [
    "61955",
    "IL"
  ],
  "WILLIAMSFIELD": [
    "61489",
    "IL"
  ],
  "WILLOUGHBY": [
    "44096",
    "OH"
  ],
  "EASTLAKE": [
    "80614",
    "CO"
  ],
  "ROCKY RIVER": [
    "44116",
    "OH"
  ],
  "EUCLID": [
    "56722",
    "MN"
  ],
  "NORTH ROYALTON": [
    "44133",
    "OH"
  ],
  "STRONGSVILLE": [
    "44149",
    "OH"
  ],
  "MAPLE HEIGHTS": [
    "44137",
    "OH"
  ],
  "OLMSTED FALLS": [
    "44138",
    "OH"
  ],
  "BAY VILLAGE": [
    "44140",
    "OH"
  ],
  "BRECKSVILLE": [
    "44141",
    "OH"
  ],
  "BROOKPARK": [
    "44142",
    "OH"
  ],
  "WESTLAKE": [
    "97493",
    "OR"
  ],
  "BROADVIEW HEIGHTS": [
    "44147",
    "OH"
  ],
  "ATWATER": [
    "95301",
    "CA"
  ],
  "BARBERTON": [
    "44203",
    "OH"
  ],
  "BRADY LAKE": [
    "44211",
    "OH"
  ],
  "BURBANK": [
    "99323",
    "WA"
  ],
  "CHIPPEWA LAKE": [
    "49320",
    "MI"
  ],
  "CUYAHOGA FALLS": [
    "44223",
    "OH"
  ],
  "GARRETTSVILLE": [
    "44231",
    "OH"
  ],
  "GREEN": [
    "67447",
    "KS"
  ],
  "STREETSBORO": [
    "44241",
    "OH"
  ],
  "LAKEMORE": [
    "44250",
    "OH"
  ],
  "WESTFIELD CENTER": [
    "44251",
    "OH"
  ],
  "MOGADORE": [
    "44260",
    "OH"
  ],
  "MUNROE FALLS": [
    "44262",
    "OH"
  ],
  "PENINSULA": [
    "44264",
    "OH"
  ],
  "RITTMAN": [
    "44270",
    "OH"
  ],
  "ROOTSTOWN": [
    "44272",
    "OH"
  ],
  "SHARON CENTER": [
    "44274",
    "OH"
  ],
  "TALLMADGE": [
    "44278",
    "OH"
  ],
  "VALLEY CITY": [
    "58072",
    "ND"
  ],
  "WADSWORTH": [
    "89442",
    "NV"
  ],
  "WEST SALEM": [
    "62476",
    "IL"
  ],
  "FAIRLAWN": [
    "44334",
    "OH"
  ],
  "BERLIN CENTER": [
    "44401",
    "OH"
  ],
  "BRISTOLVILLE": [
    "44402",
    "OH"
  ],
  "BURGHILL": [
    "44404",
    "OH"
  ],
  "CANFIELD": [
    "44406",
    "OH"
  ],
  "DIAMOND": [
    "97722",
    "OR"
  ],
  "EAST PALESTINE": [
    "44413",
    "OH"
  ],
  "FARMDALE": [
    "44417",
    "OH"
  ],
  "FOWLER": [
    "93625",
    "CA"
  ],
  "GREENFORD": [
    "44422",
    "OH"
  ],
  "HANOVERTON": [
    "44423",
    "OH"
  ],
  "HUBBARD": [
    "97032",
    "OR"
  ],
  "KINSMAN": [
    "60437",
    "IL"
  ],
  "LAKE MILTON": [
    "44429",
    "OH"
  ],
  "LEAVITTSBURG": [
    "44430",
    "OH"
  ],
  "LEETONIA": [
    "44431",
    "OH"
  ],
  "LOWELLVILLE": [
    "44436",
    "OH"
  ],
  "MASURY": [
    "44438",
    "OH"
  ],
  "MESOPOTAMIA": [
    "44439",
    "OH"
  ],
  "MINERAL RIDGE": [
    "44440",
    "OH"
  ],
  "NEGLEY": [
    "44441",
    "OH"
  ],
  "NEW MIDDLETOWN": [
    "47160",
    "IN"
  ],
  "NEW SPRINGFIELD": [
    "44443",
    "OH"
  ],
  "NEW WATERFORD": [
    "44445",
    "OH"
  ],
  "NILES": [
    "60714",
    "IL"
  ],
  "NORTH BENTON": [
    "44449",
    "OH"
  ],
  "NORTH BLOOMFIELD": [
    "44450",
    "OH"
  ],
  "NORTH JACKSON": [
    "44451",
    "OH"
  ],
  "NORTH LIMA": [
    "44452",
    "OH"
  ],
  "STRUTHERS": [
    "44471",
    "OH"
  ],
  "APPLE CREEK": [
    "44606",
    "OH"
  ],
  "BEACH CITY": [
    "44608",
    "OH"
  ],
  "BELOIT": [
    "67420",
    "KS"
  ],
  "BIG PRAIRIE": [
    "44611",
    "OH"
  ],
  "CANAL FULTON": [
    "44614",
    "OH"
  ],
  "CHARM": [
    "44617",
    "OH"
  ],
  "DELLROY": [
    "44620",
    "OH"
  ],
  "DENNISON": [
    "62423",
    "IL"
  ],
  "EAST SPARTA": [
    "44626",
    "OH"
  ],
  "GNADENHUTTEN": [
    "44629",
    "OH"
  ],
  "HARTVILLE": [
    "82215",
    "WY"
  ],
  "HOLMESVILLE": [
    "44633",
    "OH"
  ],
  "HOMEWORTH": [
    "44634",
    "OH"
  ],
  "KIDRON": [
    "44636",
    "OH"
  ],
  "KILLBUCK": [
    "44637",
    "OH"
  ],
  "LIMAVILLE": [
    "44640",
    "OH"
  ],
  "MASSILLON": [
    "44648",
    "OH"
  ],
  "MAXIMO": [
    "44650",
    "OH"
  ],
  "MECHANICSTOWN": [
    "44651",
    "OH"
  ],
  "MIDDLEBRANCH": [
    "44652",
    "OH"
  ],
  "MIDVALE": [
    "84047",
    "UT"
  ],
  "MINERAL CITY": [
    "44656",
    "OH"
  ],
  "MOUNT EATON": [
    "44659",
    "OH"
  ],
  "NORTH GEORGETOWN": [
    "44665",
    "OH"
  ],
  "ROBERTSVILLE": [
    "63072",
    "MO"
  ],
  "SHERRODSVILLE": [
    "44675",
    "OH"
  ],
  "SHREVE": [
    "44676",
    "OH"
  ],
  "SUGARCREEK": [
    "44681",
    "OH"
  ],
  "TUSCARAWAS": [
    "44682",
    "OH"
  ],
  "UHRICHSVILLE": [
    "44683",
    "OH"
  ],
  "WALNUT CREEK": [
    "94598",
    "CA"
  ],
  "WINESBURG": [
    "44690",
    "OH"
  ],
  "WOOSTER": [
    "72181",
    "AR"
  ],
  "DEERSVILLE": [
    "44693",
    "OH"
  ],
  "BOWERSTON": [
    "44695",
    "OH"
  ],
  "ZOAR": [
    "44697",
    "OH"
  ],
  "TIPPECANOE": [
    "46570",
    "IN"
  ],
  "EAST CANTON": [
    "44730",
    "OH"
  ],
  "ALVADA": [
    "44802",
    "OH"
  ],
  "BERLIN HEIGHTS": [
    "44814",
    "OH"
  ],
  "BETTSVILLE": [
    "44815",
    "OH"
  ],
  "BLOOMDALE": [
    "44817",
    "OH"
  ],
  "BUCYRUS": [
    "66013",
    "KS"
  ],
  "CHATFIELD": [
    "75105",
    "TX"
  ],
  "CRESTLINE": [
    "92325",
    "CA"
  ],
  "FOSTORIA": [
    "51340",
    "IA"
  ],
  "GALION": [
    "44833",
    "OH"
  ],
  "GREEN SPRINGS": [
    "44836",
    "OH"
  ],
  "JEROMESVILLE": [
    "44840",
    "OH"
  ],
  "LOUDONVILLE": [
    "44842",
    "OH"
  ],
  "MC CUTCHENVILLE": [
    "44844",
    "OH"
  ],
  "MELMORE": [
    "44845",
    "OH"
  ],
  "NANKIN": [
    "44848",
    "OH"
  ],
  "NEVADA": [
    "75173",
    "TX"
  ],
  "NEW RIEGEL": [
    "44853",
    "OH"
  ],
  "NEW WASHINGTON": [
    "47162",
    "IN"
  ],
  "NORTH FAIRFIELD": [
    "44855",
    "OH"
  ],
  "NORTH ROBINSON": [
    "44856",
    "OH"
  ],
  "NOVA": [
    "44859",
    "OH"
  ],
  "PERRYSVILLE": [
    "47974",
    "IN"
  ],
  "SULPHUR SPRINGS": [
    "75483",
    "TX"
  ],
  "TIFFIN": [
    "52340",
    "IA"
  ],
  "TIRO": [
    "44887",
    "OH"
  ],
  "WAKEMAN": [
    "44889",
    "OH"
  ],
  "ADDYSTON": [
    "45001",
    "OH"
  ],
  "CLEVES": [
    "45002",
    "OH"
  ],
  "COLLEGE CORNER": [
    "45003",
    "OH"
  ],
  "HARVEYSBURG": [
    "45032",
    "OH"
  ],
  "HOOVEN": [
    "45033",
    "OH"
  ],
  "KINGS MILLS": [
    "45034",
    "OH"
  ],
  "MAINEVILLE": [
    "45039",
    "OH"
  ],
  "MIAMITOWN": [
    "45041",
    "OH"
  ],
  "MOUNT SAINT JOSEPH": [
    "45051",
    "OH"
  ],
  "OKEANA": [
    "45053",
    "OH"
  ],
  "OREGONIA": [
    "45054",
    "OH"
  ],
  "OVERPECK": [
    "45055",
    "OH"
  ],
  "ROSS": [
    "94957",
    "CA"
  ],
  "SEVEN MILE": [
    "45062",
    "OH"
  ],
  "SHANDON": [
    "93461",
    "CA"
  ],
  "SOUTH LEBANON": [
    "45065",
    "OH"
  ],
  "WEST ELKTON": [
    "45070",
    "OH"
  ],
  "AMELIA": [
    "70340",
    "LA"
  ],
  "BLANCHESTER": [
    "45107",
    "OH"
  ],
  "CAMP DENNISON": [
    "45111",
    "OH"
  ],
  "FEESBURG": [
    "45119",
    "OH"
  ],
  "FELICITY": [
    "45120",
    "OH"
  ],
  "HAMERSVILLE": [
    "45130",
    "OH"
  ],
  "HIGGINSPORT": [
    "45131",
    "OH"
  ],
  "LOVELAND": [
    "80539",
    "CO"
  ],
  "MIAMIVILLE": [
    "45147",
    "OH"
  ],
  "MOUNT ORAB": [
    "45154",
    "OH"
  ],
  "MOWRYSTOWN": [
    "45155",
    "OH"
  ],
  "NEWTONSVILLE": [
    "45158",
    "OH"
  ],
  "NEW VIENNA": [
    "52065",
    "IA"
  ],
  "OWENSVILLE": [
    "65066",
    "MO"
  ],
  "PLEASANT PLAIN": [
    "45162",
    "OH"
  ],
  "PORT WILLIAM": [
    "45164",
    "OH"
  ],
  "SABINA": [
    "45169",
    "OH"
  ],
  "SINKING SPRING": [
    "45172",
    "OH"
  ],
  "TERRACE PARK": [
    "45174",
    "OH"
  ],
  "CINCINNATI": [
    "52549",
    "IA"
  ],
  "ANNA": [
    "75409",
    "TX"
  ],
  "ARCANUM": [
    "45304",
    "OH"
  ],
  "BELLBROOK": [
    "45305",
    "OH"
  ],
  "BOTKINS": [
    "45306",
    "OH"
  ],
  "BURKETTSVILLE": [
    "45310",
    "OH"
  ],
  "CASSTOWN": [
    "45312",
    "OH"
  ],
  "DONNELSVILLE": [
    "45319",
    "OH"
  ],
  "ELDORADO": [
    "76936",
    "TX"
  ],
  "ENON": [
    "45323",
    "OH"
  ],
  "FAIRBORN": [
    "45324",
    "OH"
  ],
  "FARMERSVILLE": [
    "93223",
    "CA"
  ],
  "GRATIS": [
    "45330",
    "OH"
  ],
  "HOLLANSBURG": [
    "45332",
    "OH"
  ],
  "KETTLERSVILLE": [
    "45336",
    "OH"
  ],
  "LAURA": [
    "61451",
    "IL"
  ],
  "LUDLOW FALLS": [
    "45339",
    "OH"
  ],
  "MIAMISBURG": [
    "45343",
    "OH"
  ],
  "NEW CARLISLE": [
    "46552",
    "IN"
  ],
  "NEW MADISON": [
    "45346",
    "OH"
  ],
  "NEW WESTON": [
    "45348",
    "OH"
  ],
  "NORTH STAR": [
    "45350",
    "OH"
  ],
  "OSGOOD": [
    "47037",
    "IN"
  ],
  "PIQUA": [
    "66761",
    "KS"
  ],
  "PITSBURG": [
    "45358",
    "OH"
  ],
  "ROSSBURG": [
    "45362",
    "OH"
  ],
  "RUSSIA": [
    "45363",
    "OH"
  ],
  "SOUTH CHARLESTON": [
    "45368",
    "OH"
  ],
  "SOUTH VIENNA": [
    "45369",
    "OH"
  ],
  "TIPP CITY": [
    "45371",
    "OH"
  ],
  "TREMONT CITY": [
    "45372",
    "OH"
  ],
  "VANDALIA": [
    "63382",
    "MO"
  ],
  "WEST ALEXANDRIA": [
    "45381",
    "OH"
  ],
  "WEST MANCHESTER": [
    "45382",
    "OH"
  ],
  "WILBERFORCE": [
    "45384",
    "OH"
  ],
  "XENIA": [
    "62899",
    "IL"
  ],
  "YELLOW SPRINGS": [
    "45387",
    "OH"
  ],
  "CHILLICOTHE": [
    "79225",
    "TX"
  ],
  "BIDWELL": [
    "45614",
    "OH"
  ],
  "BOURNEVILLE": [
    "45617",
    "OH"
  ],
  "CHERRY FORK": [
    "45618",
    "OH"
  ],
  "CROWN CITY": [
    "45623",
    "OH"
  ],
  "FRANKLIN FURNACE": [
    "45629",
    "OH"
  ],
  "GALLIPOLIS": [
    "45631",
    "OH"
  ],
  "IRONTON": [
    "63650",
    "MO"
  ],
  "KITTS HILL": [
    "45645",
    "OH"
  ],
  "LUCASVILLE": [
    "45699",
    "OH"
  ],
  "LYNX": [
    "45650",
    "OH"
  ],
  "MC ARTHUR": [
    "45651",
    "OH"
  ],
  "MC DERMOTT": [
    "45652",
    "OH"
  ],
  "MINFORD": [
    "45653",
    "OH"
  ],
  "NEW PLYMOUTH": [
    "83655",
    "ID"
  ],
  "OTWAY": [
    "45657",
    "OH"
  ],
  "PATRIOT": [
    "47038",
    "IN"
  ],
  "PEDRO": [
    "45659",
    "OH"
  ],
  "PEEBLES": [
    "45660",
    "OH"
  ],
  "PIKETON": [
    "45661",
    "OH"
  ],
  "WEST PORTSMOUTH": [
    "45663",
    "OH"
  ],
  "RARDEN": [
    "45671",
    "OH"
  ],
  "RAY": [
    "58849",
    "ND"
  ],
  "RICHMOND DALE": [
    "45673",
    "OH"
  ],
  "SCOTTOWN": [
    "45678",
    "OH"
  ],
  "SEAMAN": [
    "45679",
    "OH"
  ],
  "SOUTH POINT": [
    "45680",
    "OH"
  ],
  "SOUTH WEBSTER": [
    "45682",
    "OH"
  ],
  "STOUT": [
    "50673",
    "IA"
  ],
  "THURMAN": [
    "51654",
    "IA"
  ],
  "WELLSTON": [
    "74881",
    "OK"
  ],
  "WHEELERSBURG": [
    "45694",
    "OH"
  ],
  "WILKESVILLE": [
    "45695",
    "OH"
  ],
  "WILLOW WOOD": [
    "45696",
    "OH"
  ],
  "ZALESKI": [
    "45698",
    "OH"
  ],
  "AMESVILLE": [
    "45711",
    "OH"
  ],
  "BELPRE": [
    "67519",
    "KS"
  ],
  "BUCHTEL": [
    "45716",
    "OH"
  ],
  "COAL RUN": [
    "45721",
    "OH"
  ],
  "COOLVILLE": [
    "45723",
    "OH"
  ],
  "DEXTER CITY": [
    "45727",
    "OH"
  ],
  "GLOUSTER": [
    "45732",
    "OH"
  ],
  "GUYSVILLE": [
    "45735",
    "OH"
  ],
  "HOCKINGPORT": [
    "45739",
    "OH"
  ],
  "LANGSVILLE": [
    "45741",
    "OH"
  ],
  "LITTLE HOCKING": [
    "45742",
    "OH"
  ],
  "LONG BOTTOM": [
    "45743",
    "OH"
  ],
  "LOWER SALEM": [
    "45745",
    "OH"
  ],
  "MACKSBURG": [
    "50155",
    "IA"
  ],
  "MILLFIELD": [
    "45761",
    "OH"
  ],
  "NELSONVILLE": [
    "54458",
    "WI"
  ],
  "NEW MARSHFIELD": [
    "45766",
    "OH"
  ],
  "NEW MATAMORAS": [
    "45767",
    "OH"
  ],
  "SHADE": [
    "45776",
    "OH"
  ],
  "TUPPERS PLAINS": [
    "45783",
    "OH"
  ],
  "WHIPPLE": [
    "45788",
    "OH"
  ],
  "WINGETT RUN": [
    "45789",
    "OH"
  ],
  "GOMER": [
    "45809",
    "OH"
  ],
  "ADA": [
    "74821",
    "OK"
  ],
  "ALGER": [
    "48610",
    "MI"
  ],
  "BELMORE": [
    "45815",
    "OH"
  ],
  "BENTON RIDGE": [
    "45816",
    "OH"
  ],
  "CHICKASAW": [
    "45826",
    "OH"
  ],
  "COLUMBUS GROVE": [
    "45830",
    "OH"
  ],
  "CONTINENTAL": [
    "45831",
    "OH"
  ],
  "CONVOY": [
    "45832",
    "OH"
  ],
  "DELPHOS": [
    "67436",
    "KS"
  ],
  "DOLA": [
    "45835",
    "OH"
  ],
  "DUPONT": [
    "98327",
    "WA"
  ],
  "FINDLAY": [
    "62534",
    "IL"
  ],
  "JENERA": [
    "45841",
    "OH"
  ],
  "FORT JENNINGS": [
    "45844",
    "OH"
  ],
  "FORT LORAMIE": [
    "45845",
    "OH"
  ],
  "FORT RECOVERY": [
    "45846",
    "OH"
  ],
  "GLANDORF": [
    "45848",
    "OH"
  ],
  "GROVER HILL": [
    "45849",
    "OH"
  ],
  "HARROD": [
    "45850",
    "OH"
  ],
  "HAVILAND": [
    "67059",
    "KS"
  ],
  "KALIDA": [
    "45853",
    "OH"
  ],
  "LATTY": [
    "45855",
    "OH"
  ],
  "LEIPSIC": [
    "45856",
    "OH"
  ],
  "MC COMB": [
    "45858",
    "OH"
  ],
  "MC GUFFEY": [
    "45859",
    "OH"
  ],
  "MARIA STEIN": [
    "45860",
    "OH"
  ],
  "MIDDLE POINT": [
    "45863",
    "OH"
  ],
  "MILLER CITY": [
    "45864",
    "OH"
  ],
  "MINSTER": [
    "45865",
    "OH"
  ],
  "MOUNT BLANCHARD": [
    "45867",
    "OH"
  ],
  "MOUNT CORY": [
    "45868",
    "OH"
  ],
  "NEW BREMEN": [
    "45869",
    "OH"
  ],
  "NEW HAMPSHIRE": [
    "45870",
    "OH"
  ],
  "NEW KNOXVILLE": [
    "45871",
    "OH"
  ],
  "NORTH BALTIMORE": [
    "45872",
    "OH"
  ],
  "OHIO CITY": [
    "81237",
    "CO"
  ],
  "OTTAWA": [
    "66067",
    "KS"
  ],
  "OTTOVILLE": [
    "45876",
    "OH"
  ],
  "PANDORA": [
    "78143",
    "TX"
  ],
  "PAYNE": [
    "45880",
    "OH"
  ],
  "RAWSON": [
    "45881",
    "OH"
  ],
  "SAINT HENRY": [
    "45883",
    "OH"
  ],
  "UNIOPOLIS": [
    "45888",
    "OH"
  ],
  "VANLUE": [
    "45890",
    "OH"
  ],
  "VAN WERT": [
    "50262",
    "IA"
  ],
  "VAUGHNSVILLE": [
    "45893",
    "OH"
  ],
  "VENEDOCIA": [
    "45894",
    "OH"
  ],
  "WAPAKONETA": [
    "45895",
    "OH"
  ],
  "WAYNESFIELD": [
    "45896",
    "OH"
  ],
  "WILLSHIRE": [
    "45898",
    "OH"
  ],
  "WREN": [
    "45899",
    "OH"
  ],
  "FORTVILLE": [
    "46040",
    "IN"
  ],
  "FRANKTON": [
    "46044",
    "IN"
  ],
  "GOLDSMITH": [
    "79741",
    "TX"
  ],
  "HOBBS": [
    "88244",
    "NM"
  ],
  "INGALLS": [
    "67853",
    "KS"
  ],
  "KIRKLIN": [
    "46050",
    "IN"
  ],
  "LAPEL": [
    "46051",
    "IN"
  ],
  "MCCORDSVILLE": [
    "46055",
    "IN"
  ],
  "MARKLEVILLE": [
    "46056",
    "IN"
  ],
  "MICHIGANTOWN": [
    "46057",
    "IN"
  ],
  "NOBLESVILLE": [
    "46062",
    "IN"
  ],
  "ORESTES": [
    "46063",
    "IN"
  ],
  "THORNTOWN": [
    "46071",
    "IN"
  ],
  "WHITESTOWN": [
    "46075",
    "IN"
  ],
  "WINDFALL": [
    "46076",
    "IN"
  ],
  "AMO": [
    "46103",
    "IN"
  ],
  "BARGERSVILLE": [
    "46106",
    "IN"
  ],
  "BOGGSTOWN": [
    "46110",
    "IN"
  ],
  "CAMBY": [
    "46113",
    "IN"
  ],
  "EDINBURGH": [
    "46124",
    "IN"
  ],
  "FAIRLAND": [
    "74343",
    "OK"
  ],
  "FINLY": [
    "46129",
    "IN"
  ],
  "FOUNTAINTOWN": [
    "46130",
    "IN"
  ],
  "GWYNNEVILLE": [
    "46144",
    "IN"
  ],
  "KNIGHTSTOWN": [
    "46148",
    "IN"
  ],
  "LIZTON": [
    "46149",
    "IN"
  ],
  "MANILLA": [
    "51454",
    "IA"
  ],
  "MAXWELL": [
    "95955",
    "CA"
  ],
  "MAYS": [
    "46155",
    "IN"
  ],
  "NEW PALESTINE": [
    "46163",
    "IN"
  ],
  "PARAGON": [
    "46166",
    "IN"
  ],
  "PUTNAMVILLE": [
    "46170",
    "IN"
  ],
  "REELSVILLE": [
    "46171",
    "IN"
  ],
  "ROACHDALE": [
    "46172",
    "IN"
  ],
  "STILESVILLE": [
    "46180",
    "IN"
  ],
  "TRAFALGAR": [
    "46181",
    "IN"
  ],
  "WALDRON": [
    "98297",
    "WA"
  ],
  "WHITELAND": [
    "46184",
    "IN"
  ],
  "INDIANAPOLIS": [
    "46290",
    "IN"
  ],
  "BEVERLY SHORES": [
    "46301",
    "IN"
  ],
  "BOONE GROVE": [
    "46302",
    "IN"
  ],
  "CEDAR LAKE": [
    "48812",
    "MI"
  ],
  "CHESTERTON": [
    "46304",
    "IN"
  ],
  "DEMOTTE": [
    "46310",
    "IN"
  ],
  "EAST CHICAGO": [
    "46312",
    "IN"
  ],
  "GRIFFITH": [
    "46319",
    "IN"
  ],
  "MUNSTER": [
    "46321",
    "IN"
  ],
  "HANNA": [
    "84031",
    "UT"
  ],
  "KINGSBURY": [
    "78638",
    "TX"
  ],
  "KINGSFORD HEIGHTS": [
    "46346",
    "IN"
  ],
  "KOUTS": [
    "46347",
    "IN"
  ],
  "LAKE VILLAGE": [
    "71653",
    "AR"
  ],
  "LA PORTE": [
    "77572",
    "TX"
  ],
  "NORTH JUDSON": [
    "46366",
    "IN"
  ],
  "ROLLING PRAIRIE": [
    "46371",
    "IN"
  ],
  "ROSELAWN": [
    "46372",
    "IN"
  ],
  "SAINT JOHN": [
    "99171",
    "WA"
  ],
  "SAN PIERRE": [
    "46374",
    "IN"
  ],
  "SCHERERVILLE": [
    "46375",
    "IN"
  ],
  "SCHNEIDER": [
    "46376",
    "IN"
  ],
  "SUMAVA RESORTS": [
    "46379",
    "IN"
  ],
  "THAYER": [
    "66776",
    "KS"
  ],
  "WANATAH": [
    "46390",
    "IN"
  ],
  "WHEATFIELD": [
    "46392",
    "IN"
  ],
  "LAKE STATION": [
    "46405",
    "IN"
  ],
  "MERRILLVILLE": [
    "46411",
    "IN"
  ],
  "ARGOS": [
    "46501",
    "IN"
  ],
  "BOURBON": [
    "65441",
    "MO"
  ],
  "BURKET": [
    "46508",
    "IN"
  ],
  "CLAYPOOL": [
    "85532",
    "AZ"
  ],
  "CULVER": [
    "97734",
    "OR"
  ],
  "DONALDSON": [
    "71941",
    "AR"
  ],
  "ELKHART": [
    "75839",
    "TX"
  ],
  "ETNA GREEN": [
    "46524",
    "IN"
  ],
  "GRANGER": [
    "98932",
    "WA"
  ],
  "GROVERTOWN": [
    "46531",
    "IN"
  ],
  "LAPAZ": [
    "46537",
    "IN"
  ],
  "MISHAWAKA": [
    "46546",
    "IN"
  ],
  "NAPPANEE": [
    "46550",
    "IN"
  ],
  "NORTH LIBERTY": [
    "52317",
    "IA"
  ],
  "NORTH WEBSTER": [
    "46555",
    "IN"
  ],
  "NOTRE DAME": [
    "46556",
    "IN"
  ],
  "PIERCETON": [
    "46562",
    "IN"
  ],
  "SHIPSHEWANA": [
    "46565",
    "IN"
  ],
  "TOPEKA": [
    "66683",
    "KS"
  ],
  "WAKARUSA": [
    "66546",
    "KS"
  ],
  "WINONA LAKE": [
    "46590",
    "IN"
  ],
  "WYATT": [
    "63882",
    "MO"
  ],
  "SOUTH BEND": [
    "98586",
    "WA"
  ],
  "AVILLA": [
    "64833",
    "MO"
  ],
  "BIPPUS": [
    "46713",
    "IN"
  ],
  "COLUMBIA CITY": [
    "97018",
    "OR"
  ],
  "CORUNNA": [
    "48817",
    "MI"
  ],
  "CRAIGVILLE": [
    "46731",
    "IN"
  ],
  "GRABILL": [
    "46741",
    "IN"
  ],
  "HOAGLAND": [
    "46745",
    "IN"
  ],
  "HOWE": [
    "83244",
    "ID"
  ],
  "HUNTERTOWN": [
    "46748",
    "IN"
  ],
  "KENDALLVILLE": [
    "46755",
    "IN"
  ],
  "KEYSTONE": [
    "69144",
    "NE"
  ],
  "KIMMELL": [
    "46760",
    "IN"
  ],
  "LAOTTO": [
    "46763",
    "IN"
  ],
  "LARWILL": [
    "46764",
    "IN"
  ],
  "LEO": [
    "46765",
    "IN"
  ],
  "LINN GROVE": [
    "51033",
    "IA"
  ],
  "MARKLE": [
    "46770",
    "IN"
  ],
  "MONGO": [
    "46771",
    "IN"
  ],
  "OSSIAN": [
    "52161",
    "IA"
  ],
  "PLEASANT LAKE": [
    "49272",
    "MI"
  ],
  "PLEASANT MILLS": [
    "46780",
    "IN"
  ],
  "PONETO": [
    "46781",
    "IN"
  ],
  "ROME CITY": [
    "46784",
    "IN"
  ],
  "SAINT JOE": [
    "72675",
    "AR"
  ],
  "SOUTH MILFORD": [
    "46786",
    "IN"
  ],
  "SOUTH WHITLEY": [
    "46787",
    "IN"
  ],
  "STROH": [
    "46789",
    "IN"
  ],
  "WAWAKA": [
    "46794",
    "IN"
  ],
  "WOLCOTTVILLE": [
    "46795",
    "IN"
  ],
  "WOLFLAKE": [
    "46796",
    "IN"
  ],
  "YODER": [
    "82244",
    "WY"
  ],
  "FORT WAYNE": [
    "46899",
    "IN"
  ],
  "AMBOY": [
    "98601",
    "WA"
  ],
  "BRINGHURST": [
    "46913",
    "IN"
  ],
  "BURROWS": [
    "46916",
    "IN"
  ],
  "DELONG": [
    "46922",
    "IN"
  ],
  "DELPHI": [
    "46923",
    "IN"
  ],
  "FOWLERTON": [
    "78021",
    "TX"
  ],
  "GALVESTON": [
    "77555",
    "TX"
  ],
  "GAS CITY": [
    "46933",
    "IN"
  ],
  "KEWANNA": [
    "46939",
    "IN"
  ],
  "LA FONTAINE": [
    "46940",
    "IN"
  ],
  "LAGRO": [
    "46941",
    "IN"
  ],
  "LAKE CICOTT": [
    "46942",
    "IN"
  ],
  "LAKETON": [
    "46943",
    "IN"
  ],
  "LEITERS FORD": [
    "46945",
    "IN"
  ],
  "LIBERTY MILLS": [
    "46946",
    "IN"
  ],
  "LOGANSPORT": [
    "71049",
    "LA"
  ],
  "LUCERNE": [
    "95458",
    "CA"
  ],
  "MACY": [
    "68039",
    "NE"
  ],
  "NEW WAVERLY": [
    "77358",
    "TX"
  ],
  "NORTH MANCHESTER": [
    "46962",
    "IN"
  ],
  "OAKFORD": [
    "62673",
    "IL"
  ],
  "ONWARD": [
    "46967",
    "IN"
  ],
  "GRISSOM ARB": [
    "46971",
    "IN"
  ],
  "ROANN": [
    "46974",
    "IN"
  ],
  "ROYAL CENTER": [
    "46978",
    "IN"
  ],
  "RUSSIAVILLE": [
    "46979",
    "IN"
  ],
  "SERVIA": [
    "46980",
    "IN"
  ],
  "STAR CITY": [
    "71667",
    "AR"
  ],
  "SWAYZEE": [
    "46986",
    "IN"
  ],
  "SWEETSER": [
    "46987",
    "IN"
  ],
  "TWELVE MILE": [
    "46988",
    "IN"
  ],
  "UPLAND": [
    "91786",
    "CA"
  ],
  "WABASH": [
    "72389",
    "AR"
  ],
  "WEST MIDDLETON": [
    "46995",
    "IN"
  ],
  "WINAMAC": [
    "46996",
    "IN"
  ],
  "WEST COLLEGE CORNER": [
    "47003",
    "IN"
  ],
  "EAST ENTERPRISE": [
    "47019",
    "IN"
  ],
  "HOLTON": [
    "66436",
    "KS"
  ],
  "MOORES HILL": [
    "47032",
    "IN"
  ],
  "NEW TRENTON": [
    "47035",
    "IN"
  ],
  "OLDENBURG": [
    "47036",
    "IN"
  ],
  "PIERCEVILLE": [
    "67868",
    "KS"
  ],
  "SUNMAN": [
    "47041",
    "IN"
  ],
  "VEVAY": [
    "47043",
    "IN"
  ],
  "BORDEN": [
    "47106",
    "IN"
  ],
  "DEPAUW": [
    "47115",
    "IN"
  ],
  "ECKERTY": [
    "47116",
    "IN"
  ],
  "ENGLISH": [
    "47118",
    "IN"
  ],
  "FLOYDS KNOBS": [
    "47119",
    "IN"
  ],
  "GRANTSBURG": [
    "62943",
    "IL"
  ],
  "LEAVENWORTH": [
    "98826",
    "WA"
  ],
  "MAUCKPORT": [
    "47142",
    "IN"
  ],
  "MOUNT SAINT FRANCIS": [
    "47146",
    "IN"
  ],
  "NABB": [
    "47147",
    "IN"
  ],
  "NEW SALISBURY": [
    "47161",
    "IN"
  ],
  "OTISCO": [
    "47163",
    "IN"
  ],
  "PEKIN": [
    "61558",
    "IL"
  ],
  "SELLERSBURG": [
    "47172",
    "IN"
  ],
  "TASWELL": [
    "47175",
    "IN"
  ],
  "UNDERWOOD": [
    "98651",
    "WA"
  ],
  "BUTLERVILLE": [
    "47223",
    "IN"
  ],
  "COMMISKEY": [
    "47227",
    "IN"
  ],
  "CROTHERSVILLE": [
    "47229",
    "IN"
  ],
  "DEPUTY": [
    "47230",
    "IN"
  ],
  "FREETOWN": [
    "47235",
    "IN"
  ],
  "GRAMMER": [
    "47236",
    "IN"
  ],
  "MEDORA": [
    "62063",
    "IL"
  ],
  "MILLHOUSEN": [
    "47261",
    "IN"
  ],
  "NORTH VERNON": [
    "47265",
    "IN"
  ],
  "SCIPIO": [
    "84656",
    "UT"
  ],
  "VALLONIA": [
    "47281",
    "IN"
  ],
  "MUNCIE": [
    "61857",
    "IL"
  ],
  "CAMBRIDGE CITY": [
    "47327",
    "IN"
  ],
  "CONNERSVILLE": [
    "47331",
    "IN"
  ],
  "DUNREITH": [
    "47337",
    "IN"
  ],
  "ECONOMY": [
    "47339",
    "IN"
  ],
  "FARMLAND": [
    "47340",
    "IN"
  ],
  "FOUNTAIN CITY": [
    "54629",
    "WI"
  ],
  "GREENS FORK": [
    "47345",
    "IN"
  ],
  "HARTFORD CITY": [
    "47348",
    "IN"
  ],
  "KENNARD": [
    "75847",
    "TX"
  ],
  "LOSANTVILLE": [
    "47354",
    "IN"
  ],
  "MOORELAND": [
    "73852",
    "OK"
  ],
  "MOUNT SUMMIT": [
    "47361",
    "IN"
  ],
  "PARKER CITY": [
    "47368",
    "IN"
  ],
  "PENNVILLE": [
    "47369",
    "IN"
  ],
  "PERSHING": [
    "47370",
    "IN"
  ],
  "REDKEY": [
    "47373",
    "IN"
  ],
  "SALAMONIA": [
    "47381",
    "IN"
  ],
  "SPICELAND": [
    "47385",
    "IN"
  ],
  "SPRINGPORT": [
    "49284",
    "MI"
  ],
  "STRAUGHN": [
    "47387",
    "IN"
  ],
  "ELLETTSVILLE": [
    "47429",
    "IN"
  ],
  "FRENCH LICK": [
    "47432",
    "IN"
  ],
  "GOSPORT": [
    "47433",
    "IN"
  ],
  "HELMSBURG": [
    "47435",
    "IN"
  ],
  "HELTONVILLE": [
    "47436",
    "IN"
  ],
  "JASONVILLE": [
    "47438",
    "IN"
  ],
  "LINTON": [
    "58552",
    "ND"
  ],
  "OOLITIC": [
    "47451",
    "IN"
  ],
  "OWENSBURG": [
    "47453",
    "IN"
  ],
  "SOLSBERRY": [
    "47459",
    "IN"
  ],
  "STINESVILLE": [
    "47464",
    "IN"
  ],
  "SWITZ CITY": [
    "47465",
    "IN"
  ],
  "WEST BADEN SPRINGS": [
    "47469",
    "IN"
  ],
  "BICKNELL": [
    "84715",
    "UT"
  ],
  "BIRDSEYE": [
    "47513",
    "IN"
  ],
  "BRUCEVILLE": [
    "76630",
    "TX"
  ],
  "CANNELBURG": [
    "47519",
    "IN"
  ],
  "CELESTINE": [
    "47521",
    "IN"
  ],
  "CRANE": [
    "97732",
    "OR"
  ],
  "DECKER": [
    "59025",
    "MT"
  ],
  "DUBOIS": [
    "83423",
    "ID"
  ],
  "EDWARDSPORT": [
    "47528",
    "IN"
  ],
  "ELNORA": [
    "47529",
    "IN"
  ],
  "EVANSTON": [
    "82931",
    "WY"
  ],
  "FERDINAND": [
    "83526",
    "ID"
  ],
  "FREELANDVILLE": [
    "47535",
    "IN"
  ],
  "FULDA": [
    "56131",
    "MN"
  ],
  "GENTRYVILLE": [
    "47537",
    "IN"
  ],
  "HUNTINGBURG": [
    "47542",
    "IN"
  ],
  "LEOPOLD": [
    "63760",
    "MO"
  ],
  "LINCOLN CITY": [
    "97367",
    "OR"
  ],
  "LOOGOOTEE": [
    "47553",
    "IN"
  ],
  "MARIAH HILL": [
    "47556",
    "IN"
  ],
  "MONROE CITY": [
    "63456",
    "MO"
  ],
  "OAKTOWN": [
    "47561",
    "IN"
  ],
  "ODON": [
    "47562",
    "IN"
  ],
  "OTWELL": [
    "47564",
    "IN"
  ],
  "SAINT ANTHONY": [
    "83445",
    "ID"
  ],
  "SAINT CROIX": [
    "47576",
    "IN"
  ],
  "SAINT MEINRAD": [
    "47577",
    "IN"
  ],
  "SANDBORN": [
    "47578",
    "IN"
  ],
  "SANTA CLAUS": [
    "47579",
    "IN"
  ],
  "SCHNELLVILLE": [
    "47580",
    "IN"
  ],
  "SHOALS": [
    "47581",
    "IN"
  ],
  "SPURGEON": [
    "47584",
    "IN"
  ],
  "STENDAL": [
    "47585",
    "IN"
  ],
  "TELL CITY": [
    "47586",
    "IN"
  ],
  "VELPEN": [
    "47590",
    "IN"
  ],
  "VINCENNES": [
    "47591",
    "IN"
  ],
  "WESTPHALIA": [
    "66093",
    "KS"
  ],
  "CHANDLER": [
    "85286",
    "AZ"
  ],
  "CHRISNEY": [
    "47611",
    "IN"
  ],
  "ELBERFELD": [
    "47613",
    "IN"
  ],
  "INGLEFIELD": [
    "47618",
    "IN"
  ],
  "NEW HARMONY": [
    "84757",
    "UT"
  ],
  "POSEYVILLE": [
    "47633",
    "IN"
  ],
  "TENNYSON": [
    "76953",
    "TX"
  ],
  "WADESVILLE": [
    "47638",
    "IN"
  ],
  "HAUBSTADT": [
    "47639",
    "IN"
  ],
  "BUCKSKIN": [
    "47647",
    "IN"
  ],
  "FORT BRANCH": [
    "47648",
    "IN"
  ],
  "FRANCISCO": [
    "47649",
    "IN"
  ],
  "MACKEY": [
    "47654",
    "IN"
  ],
  "OAKLAND CITY": [
    "47660",
    "IN"
  ],
  "PATOKA": [
    "62875",
    "IL"
  ],
  "EVANSVILLE": [
    "82636",
    "WY"
  ],
  "TERRE HAUTE": [
    "47809",
    "IN"
  ],
  "BLANFORD": [
    "47831",
    "IN"
  ],
  "BRAZIL": [
    "47834",
    "IN"
  ],
  "CARBON": [
    "76435",
    "TX"
  ],
  "CENTERPOINT": [
    "47840",
    "IN"
  ],
  "CORY": [
    "81414",
    "CO"
  ],
  "DUGGER": [
    "47848",
    "IN"
  ],
  "FAIRBANKS": [
    "99790",
    "AK"
  ],
  "FARMERSBURG": [
    "52047",
    "IA"
  ],
  "FONTANET": [
    "47851",
    "IN"
  ],
  "HYMERA": [
    "47855",
    "IN"
  ],
  "KNIGHTSVILLE": [
    "47857",
    "IN"
  ],
  "MECCA": [
    "92254",
    "CA"
  ],
  "MEROM": [
    "47861",
    "IN"
  ],
  "PIMENTO": [
    "47866",
    "IN"
  ],
  "PRAIRIE CREEK": [
    "47869",
    "IN"
  ],
  "PRAIRIETON": [
    "47870",
    "IN"
  ],
  "RILEY": [
    "97758",
    "OR"
  ],
  "SAINT BERNICE": [
    "47875",
    "IN"
  ],
  "SAINT MARY OF THE WOODS": [
    "47876",
    "IN"
  ],
  "SEELYVILLE": [
    "47878",
    "IN"
  ],
  "SHELBURN": [
    "47879",
    "IN"
  ],
  "UNIVERSAL": [
    "47884",
    "IN"
  ],
  "WEST TERRE HAUTE": [
    "47885",
    "IN"
  ],
  "AMBIA": [
    "47917",
    "IN"
  ],
  "BATTLE GROUND": [
    "98604",
    "WA"
  ],
  "BROOK": [
    "47922",
    "IN"
  ],
  "BROOKSTON": [
    "75421",
    "TX"
  ],
  "BUCK CREEK": [
    "47924",
    "IN"
  ],
  "BURNETTSVILLE": [
    "47926",
    "IN"
  ],
  "CHALMERS": [
    "47929",
    "IN"
  ],
  "CRAWFORDSVILLE": [
    "97336",
    "OR"
  ],
  "EARL PARK": [
    "47942",
    "IN"
  ],
  "FAIR OAKS": [
    "95628",
    "CA"
  ],
  "FRANCESVILLE": [
    "47946",
    "IN"
  ],
  "IDAVILLE": [
    "47950",
    "IN"
  ],
  "KENTLAND": [
    "47951",
    "IN"
  ],
  "LADOGA": [
    "47954",
    "IN"
  ],
  "MEDARYVILLE": [
    "47957",
    "IN"
  ],
  "MELLOTT": [
    "47958",
    "IN"
  ],
  "MONON": [
    "47959",
    "IN"
  ],
  "MOROCCO": [
    "47963",
    "IN"
  ],
  "NEW ROSS": [
    "47968",
    "IN"
  ],
  "OTTERBEIN": [
    "47970",
    "IN"
  ],
  "PINE VILLAGE": [
    "47975",
    "IN"
  ],
  "STOCKWELL": [
    "47983",
    "IN"
  ],
  "VEEDERSBURG": [
    "47987",
    "IN"
  ],
  "WAYNETOWN": [
    "47990",
    "IN"
  ],
  "YEOMAN": [
    "47997",
    "IN"
  ],
  "ALGONAC": [
    "48001",
    "MI"
  ],
  "ALLENTON": [
    "53002",
    "WI"
  ],
  "ALMONT": [
    "81210",
    "CO"
  ],
  "ANCHORVILLE": [
    "48004",
    "MI"
  ],
  "ARMADA": [
    "48005",
    "MI"
  ],
  "CAPAC": [
    "48014",
    "MI"
  ],
  "CENTER LINE": [
    "48015",
    "MI"
  ],
  "CLAWSON": [
    "48017",
    "MI"
  ],
  "EASTPOINTE": [
    "48021",
    "MI"
  ],
  "EMMETT": [
    "83617",
    "ID"
  ],
  "FRASER": [
    "80442",
    "CO"
  ],
  "GOODELLS": [
    "48027",
    "MI"
  ],
  "HARSENS ISLAND": [
    "48028",
    "MI"
  ],
  "HAZEL PARK": [
    "48030",
    "MI"
  ],
  "JEDDO": [
    "48032",
    "MI"
  ],
  "CLINTON TOWNSHIP": [
    "48038",
    "MI"
  ],
  "MARINE CITY": [
    "48039",
    "MI"
  ],
  "MACOMB": [
    "74852",
    "OK"
  ],
  "MOUNT CLEMENS": [
    "48046",
    "MI"
  ],
  "HARRISON TOWNSHIP": [
    "48045",
    "MI"
  ],
  "NORTH STREET": [
    "48049",
    "MI"
  ],
  "EAST CHINA": [
    "48054",
    "MI"
  ],
  "FORT GRATIOT": [
    "48059",
    "MI"
  ],
  "PORT HURON": [
    "48061",
    "MI"
  ],
  "ROMEO": [
    "81148",
    "CO"
  ],
  "PLEASANT RIDGE": [
    "48069",
    "MI"
  ],
  "HUNTINGTON WOODS": [
    "48070",
    "MI"
  ],
  "SMITHS CREEK": [
    "48074",
    "MI"
  ],
  "SAINT CLAIR SHORES": [
    "48082",
    "MI"
  ],
  "ALLEN PARK": [
    "48101",
    "MI"
  ],
  "ANN ARBOR": [
    "48113",
    "MI"
  ],
  "AZALIA": [
    "48110",
    "MI"
  ],
  "CARLETON": [
    "68326",
    "NE"
  ],
  "DEARBORN": [
    "64439",
    "MO"
  ],
  "MELVINDALE": [
    "48122",
    "MI"
  ],
  "DEARBORN HEIGHTS": [
    "48127",
    "MI"
  ],
  "GREGORY": [
    "78359",
    "TX"
  ],
  "GROSSE ILE": [
    "48138",
    "MI"
  ],
  "IDA": [
    "72546",
    "AR"
  ],
  "INKSTER": [
    "58244",
    "ND"
  ],
  "LA SALLE": [
    "80645",
    "CO"
  ],
  "LUNA PIER": [
    "48157",
    "MI"
  ],
  "MAYBEE": [
    "48159",
    "MI"
  ],
  "NEW HUDSON": [
    "48165",
    "MI"
  ],
  "PINCKNEY": [
    "48169",
    "MI"
  ],
  "SALINE": [
    "71070",
    "LA"
  ],
  "SAMARIA": [
    "48177",
    "MI"
  ],
  "SOUTH LYON": [
    "48178",
    "MI"
  ],
  "SOUTH ROCKWOOD": [
    "48179",
    "MI"
  ],
  "TEMPERANCE": [
    "48182",
    "MI"
  ],
  "WHITMORE LAKE": [
    "48189",
    "MI"
  ],
  "WHITTAKER": [
    "48190",
    "MI"
  ],
  "WYANDOTTE": [
    "74370",
    "OK"
  ],
  "SOUTHGATE": [
    "48195",
    "MI"
  ],
  "YPSILANTI": [
    "58497",
    "ND"
  ],
  "HAMTRAMCK": [
    "48212",
    "MI"
  ],
  "RIVER ROUGE": [
    "48218",
    "MI"
  ],
  "HARPER WOODS": [
    "48225",
    "MI"
  ],
  "ECORSE": [
    "48229",
    "MI"
  ],
  "GROSSE POINTE": [
    "48236",
    "MI"
  ],
  "OAK PARK": [
    "91377",
    "CA"
  ],
  "BLOOMFIELD HILLS": [
    "48304",
    "MI"
  ],
  "STERLING HEIGHTS": [
    "48314",
    "MI"
  ],
  "KEEGO HARBOR": [
    "48320",
    "MI"
  ],
  "AUBURN HILLS": [
    "48326",
    "MI"
  ],
  "DRAYTON PLAINS": [
    "48330",
    "MI"
  ],
  "PONTIAC": [
    "65729",
    "MO"
  ],
  "DAVISBURG": [
    "48350",
    "MI"
  ],
  "LAKE ORION": [
    "48362",
    "MI"
  ],
  "LEONARD": [
    "75452",
    "TX"
  ],
  "NOVI": [
    "48377",
    "MI"
  ],
  "COMMERCE TOWNSHIP": [
    "48382",
    "MI"
  ],
  "UNION LAKE": [
    "48387",
    "MI"
  ],
  "WALLED LAKE": [
    "48390",
    "MI"
  ],
  "WIXOM": [
    "48393",
    "MI"
  ],
  "APPLEGATE": [
    "95703",
    "CA"
  ],
  "ATLAS": [
    "48411",
    "MI"
  ],
  "BAD AXE": [
    "48413",
    "MI"
  ],
  "BIRCH RUN": [
    "48415",
    "MI"
  ],
  "BROWN CITY": [
    "48416",
    "MI"
  ],
  "CARSONVILLE": [
    "48419",
    "MI"
  ],
  "CROSWELL": [
    "48422",
    "MI"
  ],
  "DAVISON": [
    "48423",
    "MI"
  ],
  "DECKERVILLE": [
    "48427",
    "MI"
  ],
  "DURAND": [
    "61024",
    "IL"
  ],
  "FENTON": [
    "70640",
    "LA"
  ],
  "FILION": [
    "48432",
    "MI"
  ],
  "GOODRICH": [
    "77335",
    "TX"
  ],
  "GRAND BLANC": [
    "48480",
    "MI"
  ],
  "HARBOR BEACH": [
    "48441",
    "MI"
  ],
  "HOLLY": [
    "81047",
    "CO"
  ],
  "IMLAY CITY": [
    "48444",
    "MI"
  ],
  "KINDE": [
    "48445",
    "MI"
  ],
  "LAPEER": [
    "48446",
    "MI"
  ],
  "LENNON": [
    "48449",
    "MI"
  ],
  "MARLETTE": [
    "48453",
    "MI"
  ],
  "MINDEN CITY": [
    "48456",
    "MI"
  ],
  "NEW LOTHROP": [
    "48460",
    "MI"
  ],
  "ORTONVILLE": [
    "56278",
    "MN"
  ],
  "OTTER LAKE": [
    "48464",
    "MI"
  ],
  "PALMS": [
    "48465",
    "MI"
  ],
  "PECK": [
    "83545",
    "ID"
  ],
  "PORT AUSTIN": [
    "48467",
    "MI"
  ],
  "PORT HOPE": [
    "48468",
    "MI"
  ],
  "PORT SANILAC": [
    "48469",
    "MI"
  ],
  "SNOVER": [
    "48472",
    "MI"
  ],
  "SWARTZ CREEK": [
    "48473",
    "MI"
  ],
  "UBLY": [
    "48475",
    "MI"
  ],
  "FLINT": [
    "75762",
    "TX"
  ],
  "BENTLEY": [
    "71407",
    "LA"
  ],
  "BRECKENRIDGE": [
    "80424",
    "CO"
  ],
  "CHESANING": [
    "48616",
    "MI"
  ],
  "CLARE": [
    "60111",
    "IL"
  ],
  "COMINS": [
    "48619",
    "MI"
  ],
  "EDENVILLE": [
    "48620",
    "MI"
  ],
  "FARWELL": [
    "79325",
    "TX"
  ],
  "GLADWIN": [
    "48624",
    "MI"
  ],
  "HIGGINS LAKE": [
    "48627",
    "MI"
  ],
  "HOUGHTON LAKE": [
    "48629",
    "MI"
  ],
  "HOUGHTON LAKE HEIGHTS": [
    "48630",
    "MI"
  ],
  "KAWKAWLIN": [
    "48631",
    "MI"
  ],
  "LUPTON": [
    "86508",
    "AZ"
  ],
  "MERRILL": [
    "97633",
    "OR"
  ],
  "MIO": [
    "48647",
    "MI"
  ],
  "OAKLEY": [
    "94561",
    "CA"
  ],
  "PINCONNING": [
    "48650",
    "MI"
  ],
  "PRUDENVILLE": [
    "48651",
    "MI"
  ],
  "RHODES": [
    "50234",
    "IA"
  ],
  "ROSCOMMON": [
    "48653",
    "MI"
  ],
  "ROSE CITY": [
    "48654",
    "MI"
  ],
  "SAINT HELEN": [
    "48656",
    "MI"
  ],
  "WEST BRANCH": [
    "52358",
    "IA"
  ],
  "AU GRES": [
    "48703",
    "MI"
  ],
  "BARTON CITY": [
    "48705",
    "MI"
  ],
  "BAY CITY": [
    "97107",
    "OR"
  ],
  "UNIVERSITY CENTER": [
    "48710",
    "MI"
  ],
  "BAY PORT": [
    "48720",
    "MI"
  ],
  "CARO": [
    "48723",
    "MI"
  ],
  "CASEVILLE": [
    "48725",
    "MI"
  ],
  "CASS CITY": [
    "48726",
    "MI"
  ],
  "CURRAN": [
    "48728",
    "MI"
  ],
  "DEFORD": [
    "48729",
    "MI"
  ],
  "EAST TAWAS": [
    "48730",
    "MI"
  ],
  "ESSEXVILLE": [
    "48732",
    "MI"
  ],
  "FAIRGROVE": [
    "48733",
    "MI"
  ],
  "FRANKENMUTH": [
    "48787",
    "MI"
  ],
  "GAGETOWN": [
    "48735",
    "MI"
  ],
  "GLENNIE": [
    "48737",
    "MI"
  ],
  "HALE": [
    "64643",
    "MO"
  ],
  "MIKADO": [
    "48745",
    "MI"
  ],
  "MUNGER": [
    "48747",
    "MI"
  ],
  "NATIONAL CITY": [
    "91951",
    "CA"
  ],
  "OMER": [
    "48749",
    "MI"
  ],
  "OSCODA": [
    "48750",
    "MI"
  ],
  "OWENDALE": [
    "48754",
    "MI"
  ],
  "PIGEON": [
    "48755",
    "MI"
  ],
  "PRESCOTT": [
    "99348",
    "WA"
  ],
  "REESE": [
    "48757",
    "MI"
  ],
  "SEBEWAING": [
    "48759",
    "MI"
  ],
  "SILVERWOOD": [
    "48760",
    "MI"
  ],
  "SOUTH BRANCH": [
    "48761",
    "MI"
  ],
  "SPRUCE": [
    "48762",
    "MI"
  ],
  "TAWAS CITY": [
    "48764",
    "MI"
  ],
  "TWINING": [
    "48766",
    "MI"
  ],
  "VASSAR": [
    "66543",
    "KS"
  ],
  "WHITTEMORE": [
    "50598",
    "IA"
  ],
  "OKEMOS": [
    "48864",
    "MI"
  ],
  "BANNISTER": [
    "48807",
    "MI"
  ],
  "BELDING": [
    "48809",
    "MI"
  ],
  "CARSON CITY": [
    "89721",
    "NV"
  ],
  "COHOCTAH": [
    "48816",
    "MI"
  ],
  "CRYSTAL": [
    "58222",
    "ND"
  ],
  "DIMONDALE": [
    "48821",
    "MI"
  ],
  "EAGLE": [
    "99738",
    "AK"
  ],
  "EAST LANSING": [
    "48826",
    "MI"
  ],
  "EATON RAPIDS": [
    "48827",
    "MI"
  ],
  "EDMORE": [
    "58330",
    "ND"
  ],
  "ELM HALL": [
    "48830",
    "MI"
  ],
  "ELSIE": [
    "69134",
    "NE"
  ],
  "ELWELL": [
    "48832",
    "MI"
  ],
  "EUREKA": [
    "95503",
    "CA"
  ],
  "FOWLERVILLE": [
    "48836",
    "MI"
  ],
  "GRAND LEDGE": [
    "48837",
    "MI"
  ],
  "HASLETT": [
    "48840",
    "MI"
  ],
  "LAINGSBURG": [
    "48848",
    "MI"
  ],
  "LAKE ODESSA": [
    "48849",
    "MI"
  ],
  "MCBRIDES": [
    "48852",
    "MI"
  ],
  "MAPLE RAPIDS": [
    "48853",
    "MI"
  ],
  "MORRICE": [
    "48857",
    "MI"
  ],
  "MULLIKEN": [
    "48861",
    "MI"
  ],
  "OWOSSO": [
    "48867",
    "MI"
  ],
  "PALO": [
    "52324",
    "IA"
  ],
  "PERRINTON": [
    "48871",
    "MI"
  ],
  "PEWAMO": [
    "48873",
    "MI"
  ],
  "POMPEII": [
    "48874",
    "MI"
  ],
  "POTTERVILLE": [
    "48876",
    "MI"
  ],
  "ROSEBUSH": [
    "48878",
    "MI"
  ],
  "SAINT LOUIS": [
    "74866",
    "OK"
  ],
  "SHAFTSBURG": [
    "48882",
    "MI"
  ],
  "SHEPHERD": [
    "77371",
    "TX"
  ],
  "SIX LAKES": [
    "48886",
    "MI"
  ],
  "SUNFIELD": [
    "48890",
    "MI"
  ],
  "WEBBERVILLE": [
    "48892",
    "MI"
  ],
  "WEIDMAN": [
    "48893",
    "MI"
  ],
  "KALAMAZOO": [
    "49048",
    "MI"
  ],
  "ALLEGAN": [
    "49010",
    "MI"
  ],
  "BATTLE CREEK": [
    "68715",
    "NE"
  ],
  "BENTON HARBOR": [
    "49023",
    "MI"
  ],
  "BREEDSVILLE": [
    "49027",
    "MI"
  ],
  "BURR OAK": [
    "66936",
    "KS"
  ],
  "CASSOPOLIS": [
    "49031",
    "MI"
  ],
  "CERESCO": [
    "68017",
    "NE"
  ],
  "COLOMA": [
    "95613",
    "CA"
  ],
  "COLON": [
    "68018",
    "NE"
  ],
  "CONSTANTINE": [
    "49042",
    "MI"
  ],
  "COVERT": [
    "49043",
    "MI"
  ],
  "DELTON": [
    "49046",
    "MI"
  ],
  "DOWAGIAC": [
    "49047",
    "MI"
  ],
  "DOWLING": [
    "49050",
    "MI"
  ],
  "EAST LEROY": [
    "49051",
    "MI"
  ],
  "GALESBURG": [
    "66740",
    "KS"
  ],
  "GOBLES": [
    "49055",
    "MI"
  ],
  "HICKORY CORNERS": [
    "49060",
    "MI"
  ],
  "LEONIDAS": [
    "49066",
    "MI"
  ],
  "MATTAWAN": [
    "49071",
    "MI"
  ],
  "NOTTAWA": [
    "49075",
    "MI"
  ],
  "OLIVET": [
    "57052",
    "SD"
  ],
  "OSHTEMO": [
    "49077",
    "MI"
  ],
  "OTSEGO": [
    "49078",
    "MI"
  ],
  "PLAINWELL": [
    "49080",
    "MI"
  ],
  "SCHOOLCRAFT": [
    "49087",
    "MI"
  ],
  "SOUTH HAVEN": [
    "67140",
    "KS"
  ],
  "TEKONSHA": [
    "49092",
    "MI"
  ],
  "WHITE PIGEON": [
    "49099",
    "MI"
  ],
  "BARODA": [
    "49101",
    "MI"
  ],
  "BERRIEN CENTER": [
    "49102",
    "MI"
  ],
  "BERRIEN SPRINGS": [
    "49104",
    "MI"
  ],
  "BRIDGMAN": [
    "49106",
    "MI"
  ],
  "EDWARDSBURG": [
    "49112",
    "MI"
  ],
  "GALIEN": [
    "49113",
    "MI"
  ],
  "HARBERT": [
    "49115",
    "MI"
  ],
  "NEW TROY": [
    "49119",
    "MI"
  ],
  "SAWYER": [
    "74756",
    "OK"
  ],
  "THREE OAKS": [
    "49128",
    "MI"
  ],
  "UNION PIER": [
    "49129",
    "MI"
  ],
  "BRITTON": [
    "57430",
    "SD"
  ],
  "CEMENT CITY": [
    "49233",
    "MI"
  ],
  "CLARKLAKE": [
    "49234",
    "MI"
  ],
  "FRONTIER": [
    "83121",
    "WY"
  ],
  "GRASS LAKE": [
    "49240",
    "MI"
  ],
  "MANITOU BEACH": [
    "49253",
    "MI"
  ],
  "MICHIGAN CENTER": [
    "49254",
    "MI"
  ],
  "MORENCI": [
    "85540",
    "AZ"
  ],
  "MOSHERVILLE": [
    "49258",
    "MI"
  ],
  "MUNITH": [
    "49259",
    "MI"
  ],
  "ONONDAGA": [
    "49264",
    "MI"
  ],
  "ONSTED": [
    "49265",
    "MI"
  ],
  "OSSEO": [
    "55369",
    "MN"
  ],
  "OTTAWA LAKE": [
    "49267",
    "MI"
  ],
  "PARMA": [
    "83660",
    "ID"
  ],
  "RIGA": [
    "49276",
    "MI"
  ],
  "RIVES JUNCTION": [
    "49277",
    "MI"
  ],
  "SAND CREEK": [
    "54765",
    "WI"
  ],
  "SOMERSET CENTER": [
    "49282",
    "MI"
  ],
  "SPRING ARBOR": [
    "49283",
    "MI"
  ],
  "TECUMSEH": [
    "74873",
    "OK"
  ],
  "BARRYTON": [
    "49305",
    "MI"
  ],
  "BIG RAPIDS": [
    "49307",
    "MI"
  ],
  "BITELY": [
    "49309",
    "MI"
  ],
  "BROHMAN": [
    "49312",
    "MI"
  ],
  "BURNIPS": [
    "49314",
    "MI"
  ],
  "BYRON CENTER": [
    "49315",
    "MI"
  ],
  "CANNONSBURG": [
    "49317",
    "MI"
  ],
  "CASNOVIA": [
    "49318",
    "MI"
  ],
  "COMSTOCK PARK": [
    "49321",
    "MI"
  ],
  "DORR": [
    "49323",
    "MI"
  ],
  "GOWEN": [
    "74545",
    "OK"
  ],
  "HOWARD CITY": [
    "49329",
    "MI"
  ],
  "KENT CITY": [
    "49330",
    "MI"
  ],
  "MECOSTA": [
    "49332",
    "MI"
  ],
  "MOLINE": [
    "67353",
    "KS"
  ],
  "MORLEY": [
    "63767",
    "MO"
  ],
  "NEWAYGO": [
    "49337",
    "MI"
  ],
  "REMUS": [
    "49340",
    "MI"
  ],
  "RODNEY": [
    "51051",
    "IA"
  ],
  "STANWOOD": [
    "98292",
    "WA"
  ],
  "TRUFANT": [
    "49347",
    "MI"
  ],
  "WHITE CLOUD": [
    "66094",
    "KS"
  ],
  "BRANCH": [
    "72928",
    "AR"
  ],
  "COOPERSVILLE": [
    "49404",
    "MI"
  ],
  "FENNVILLE": [
    "49408",
    "MI"
  ],
  "FERRYSBURG": [
    "49409",
    "MI"
  ],
  "FREE SOIL": [
    "49411",
    "MI"
  ],
  "FRUITPORT": [
    "49415",
    "MI"
  ],
  "GLENN": [
    "95943",
    "CA"
  ],
  "GRAND HAVEN": [
    "49417",
    "MI"
  ],
  "GRANDVILLE": [
    "49468",
    "MI"
  ],
  "HART": [
    "79043",
    "TX"
  ],
  "HESPERIA": [
    "92345",
    "CA"
  ],
  "HUDSONVILLE": [
    "49426",
    "MI"
  ],
  "JENISON": [
    "49429",
    "MI"
  ],
  "LUDINGTON": [
    "49431",
    "MI"
  ],
  "MACATAWA": [
    "49434",
    "MI"
  ],
  "MARNE": [
    "51552",
    "IA"
  ],
  "MUSKEGON": [
    "49445",
    "MI"
  ],
  "NEW ERA": [
    "49446",
    "MI"
  ],
  "NUNICA": [
    "49448",
    "MI"
  ],
  "PENTWATER": [
    "49449",
    "MI"
  ],
  "ROTHBURY": [
    "49452",
    "MI"
  ],
  "SAUGATUCK": [
    "49453",
    "MI"
  ],
  "TWIN LAKE": [
    "49457",
    "MI"
  ],
  "WALKERVILLE": [
    "49459",
    "MI"
  ],
  "WEST OLIVE": [
    "49460",
    "MI"
  ],
  "ZEELAND": [
    "58581",
    "ND"
  ],
  "CADILLAC": [
    "49601",
    "MI"
  ],
  "ALBA": [
    "75410",
    "TX"
  ],
  "BENZONIA": [
    "49616",
    "MI"
  ],
  "BOON": [
    "49618",
    "MI"
  ],
  "BRETHREN": [
    "49619",
    "MI"
  ],
  "BUCKLEY": [
    "98321",
    "WA"
  ],
  "CEDAR": [
    "67628",
    "KS"
  ],
  "CENTRAL LAKE": [
    "49622",
    "MI"
  ],
  "COPEMISH": [
    "49625",
    "MI"
  ],
  "ELK RAPIDS": [
    "49629",
    "MI"
  ],
  "EVART": [
    "49631",
    "MI"
  ],
  "FIFE LAKE": [
    "49633",
    "MI"
  ],
  "FILER CITY": [
    "49634",
    "MI"
  ],
  "GLEN ARBOR": [
    "49636",
    "MI"
  ],
  "GRAWN": [
    "49637",
    "MI"
  ],
  "HARRIETTA": [
    "49638",
    "MI"
  ],
  "HERSEY": [
    "49639",
    "MI"
  ],
  "HONOR": [
    "49640",
    "MI"
  ],
  "INTERLOCHEN": [
    "49643",
    "MI"
  ],
  "IRONS": [
    "49644",
    "MI"
  ],
  "KALEVA": [
    "49645",
    "MI"
  ],
  "KALKASKA": [
    "49646",
    "MI"
  ],
  "KEWADIN": [
    "49648",
    "MI"
  ],
  "LAKE ANN": [
    "49650",
    "MI"
  ],
  "LAKE LEELANAU": [
    "49653",
    "MI"
  ],
  "LUTHER": [
    "73054",
    "OK"
  ],
  "MC BAIN": [
    "49657",
    "MI"
  ],
  "MANCELONA": [
    "49659",
    "MI"
  ],
  "MANISTEE": [
    "49660",
    "MI"
  ],
  "MANTON": [
    "96059",
    "CA"
  ],
  "MAPLE CITY": [
    "67102",
    "KS"
  ],
  "MESICK": [
    "49668",
    "MI"
  ],
  "OLD MISSION": [
    "49673",
    "MI"
  ],
  "OMENA": [
    "49674",
    "MI"
  ],
  "ONEKAMA": [
    "49675",
    "MI"
  ],
  "RAPID CITY": [
    "57709",
    "SD"
  ],
  "REED CITY": [
    "49677",
    "MI"
  ],
  "SEARS": [
    "49679",
    "MI"
  ],
  "SOUTH BOARDMAN": [
    "49680",
    "MI"
  ],
  "SUTTONS BAY": [
    "49682",
    "MI"
  ],
  "TRAVERSE CITY": [
    "49696",
    "MI"
  ],
  "TUSTIN": [
    "92782",
    "CA"
  ],
  "MACKINAW CITY": [
    "49701",
    "MI"
  ],
  "ALANSON": [
    "49706",
    "MI"
  ],
  "ALPENA": [
    "72611",
    "AR"
  ],
  "BARBEAU": [
    "49710",
    "MI"
  ],
  "BOYNE CITY": [
    "49712",
    "MI"
  ],
  "BOYNE FALLS": [
    "49713",
    "MI"
  ],
  "BRIMLEY": [
    "49715",
    "MI"
  ],
  "BRUTUS": [
    "49716",
    "MI"
  ],
  "BURT LAKE": [
    "49717",
    "MI"
  ],
  "CARP LAKE": [
    "49718",
    "MI"
  ],
  "CHARLEVOIX": [
    "49720",
    "MI"
  ],
  "CHEBOYGAN": [
    "49721",
    "MI"
  ],
  "CROSS VILLAGE": [
    "49723",
    "MI"
  ],
  "DAFTER": [
    "49724",
    "MI"
  ],
  "DE TOUR VILLAGE": [
    "49725",
    "MI"
  ],
  "DRUMMOND ISLAND": [
    "49726",
    "MI"
  ],
  "EAST JORDAN": [
    "49727",
    "MI"
  ],
  "ECKERMAN": [
    "49728",
    "MI"
  ],
  "FREDERIC": [
    "54837",
    "WI"
  ],
  "GAYLORD": [
    "67638",
    "KS"
  ],
  "GOETZVILLE": [
    "49736",
    "MI"
  ],
  "GOOD HART": [
    "49737",
    "MI"
  ],
  "GRAYLING": [
    "99590",
    "AK"
  ],
  "HARBOR SPRINGS": [
    "49740",
    "MI"
  ],
  "HAWKS": [
    "49743",
    "MI"
  ],
  "HERRON": [
    "49744",
    "MI"
  ],
  "HESSEL": [
    "49745",
    "MI"
  ],
  "HILLMAN": [
    "56338",
    "MN"
  ],
  "HUBBARD LAKE": [
    "49747",
    "MI"
  ],
  "HULBERT": [
    "74441",
    "OK"
  ],
  "INDIAN RIVER": [
    "49749",
    "MI"
  ],
  "JOHANNESBURG": [
    "49751",
    "MI"
  ],
  "KINROSS": [
    "49752",
    "MI"
  ],
  "LACHINE": [
    "49753",
    "MI"
  ],
  "LEVERING": [
    "49755",
    "MI"
  ],
  "MACKINAC ISLAND": [
    "49757",
    "MI"
  ],
  "MORAN": [
    "83013",
    "WY"
  ],
  "MULLETT LAKE": [
    "49761",
    "MI"
  ],
  "NAUBINWAY": [
    "49762",
    "MI"
  ],
  "ODEN": [
    "71961",
    "AR"
  ],
  "ONAWAY": [
    "49765",
    "MI"
  ],
  "OSSINEKE": [
    "49766",
    "MI"
  ],
  "PELLSTON": [
    "49769",
    "MI"
  ],
  "PETOSKEY": [
    "49770",
    "MI"
  ],
  "PICKFORD": [
    "49774",
    "MI"
  ],
  "POINTE AUX PINS": [
    "49775",
    "MI"
  ],
  "POSEN": [
    "60469",
    "IL"
  ],
  "ROGERS CITY": [
    "49779",
    "MI"
  ],
  "RUDYARD": [
    "59540",
    "MT"
  ],
  "SAINT IGNACE": [
    "49781",
    "MI"
  ],
  "BEAVER ISLAND": [
    "49782",
    "MI"
  ],
  "SAULT SAINTE MARIE": [
    "49783",
    "MI"
  ],
  "KINCHELOE": [
    "49788",
    "MI"
  ],
  "TOPINABEE": [
    "49791",
    "MI"
  ],
  "TOWER": [
    "55790",
    "MN"
  ],
  "TROUT LAKE": [
    "98650",
    "WA"
  ],
  "WALLOON LAKE": [
    "49796",
    "MI"
  ],
  "WATERS": [
    "49797",
    "MI"
  ],
  "WOLVERINE": [
    "49799",
    "MI"
  ],
  "IRON MOUNTAIN": [
    "49801",
    "MI"
  ],
  "KINGSFORD": [
    "49802",
    "MI"
  ],
  "ALLOUEZ": [
    "49805",
    "MI"
  ],
  "AU TRAIN": [
    "49806",
    "MI"
  ],
  "BARK RIVER": [
    "49807",
    "MI"
  ],
  "BIG BAY": [
    "49808",
    "MI"
  ],
  "CARNEY": [
    "74832",
    "OK"
  ],
  "CHANNING": [
    "79018",
    "TX"
  ],
  "COOKS": [
    "49817",
    "MI"
  ],
  "CORNELL": [
    "61319",
    "IL"
  ],
  "CURTIS": [
    "98538",
    "WA"
  ],
  "DAGGETT": [
    "92327",
    "CA"
  ],
  "DEERTON": [
    "49822",
    "MI"
  ],
  "EBEN JUNCTION": [
    "49825",
    "MI"
  ],
  "RUMELY": [
    "49826",
    "MI"
  ],
  "ENGADINE": [
    "49827",
    "MI"
  ],
  "ESCANABA": [
    "49829",
    "MI"
  ],
  "FELCH": [
    "49831",
    "MI"
  ],
  "LITTLE LAKE": [
    "93542",
    "CA"
  ],
  "FOSTER CITY": [
    "49834",
    "MI"
  ],
  "GARDEN": [
    "49835",
    "MI"
  ],
  "GERMFASK": [
    "49836",
    "MI"
  ],
  "GOULD CITY": [
    "49838",
    "MI"
  ],
  "GRAND MARAIS": [
    "55604",
    "MN"
  ],
  "GULLIVER": [
    "49840",
    "MI"
  ],
  "GWINN": [
    "49841",
    "MI"
  ],
  "HERMANSVILLE": [
    "49847",
    "MI"
  ],
  "ISHPEMING": [
    "49849",
    "MI"
  ],
  "MC MILLAN": [
    "49853",
    "MI"
  ],
  "MANISTIQUE": [
    "49854",
    "MI"
  ],
  "MARQUETTE": [
    "68854",
    "NE"
  ],
  "MENOMINEE": [
    "49858",
    "MI"
  ],
  "MICHIGAMME": [
    "49861",
    "MI"
  ],
  "MUNISING": [
    "49862",
    "MI"
  ],
  "NADEAU": [
    "49863",
    "MI"
  ],
  "NAHMA": [
    "49864",
    "MI"
  ],
  "NEGAUNEE": [
    "49866",
    "MI"
  ],
  "PERRONVILLE": [
    "49873",
    "MI"
  ],
  "POWERS": [
    "97466",
    "OR"
  ],
  "QUINNESEC": [
    "49876",
    "MI"
  ],
  "RAPID RIVER": [
    "49878",
    "MI"
  ],
  "SAGOLA": [
    "49881",
    "MI"
  ],
  "SENEY": [
    "49883",
    "MI"
  ],
  "SHINGLETON": [
    "49884",
    "MI"
  ],
  "SKANDIA": [
    "49885",
    "MI"
  ],
  "SPALDING": [
    "68665",
    "NE"
  ],
  "TRENARY": [
    "49891",
    "MI"
  ],
  "VULCAN": [
    "63675",
    "MO"
  ],
  "WETMORE": [
    "81253",
    "CO"
  ],
  "AHMEEK": [
    "49901",
    "MI"
  ],
  "AMASA": [
    "49903",
    "MI"
  ],
  "ATLANTIC MINE": [
    "49905",
    "MI"
  ],
  "BARAGA": [
    "49908",
    "MI"
  ],
  "BERGLAND": [
    "49910",
    "MI"
  ],
  "BRUCE CROSSING": [
    "49912",
    "MI"
  ],
  "CASPIAN": [
    "49915",
    "MI"
  ],
  "CHASSELL": [
    "49916",
    "MI"
  ],
  "COPPER CITY": [
    "49917",
    "MI"
  ],
  "COPPER HARBOR": [
    "49918",
    "MI"
  ],
  "CRYSTAL FALLS": [
    "49920",
    "MI"
  ],
  "DODGEVILLE": [
    "53595",
    "WI"
  ],
  "DOLLAR BAY": [
    "49922",
    "MI"
  ],
  "EWEN": [
    "49925",
    "MI"
  ],
  "GAASTRA": [
    "49927",
    "MI"
  ],
  "HUBBELL": [
    "68375",
    "NE"
  ],
  "IRON RIVER": [
    "54847",
    "WI"
  ],
  "IRONWOOD": [
    "49938",
    "MI"
  ],
  "LAKE LINDEN": [
    "49945",
    "MI"
  ],
  "MARENISCO": [
    "49947",
    "MI"
  ],
  "MASS CITY": [
    "49948",
    "MI"
  ],
  "NISULA": [
    "49952",
    "MI"
  ],
  "ONTONAGON": [
    "49953",
    "MI"
  ],
  "PAINESDALE": [
    "49955",
    "MI"
  ],
  "PELKIE": [
    "49958",
    "MI"
  ],
  "RAMSAY": [
    "59748",
    "MT"
  ],
  "SKANEE": [
    "49962",
    "MI"
  ],
  "SOUTH RANGE": [
    "54874",
    "WI"
  ],
  "TOIVOLA": [
    "49965",
    "MI"
  ],
  "WATERSMEET": [
    "49969",
    "MI"
  ],
  "WATTON": [
    "49970",
    "MI"
  ],
  "ACKWORTH": [
    "50001",
    "IA"
  ],
  "ADAIR": [
    "74330",
    "OK"
  ],
  "ALLEMAN": [
    "50007",
    "IA"
  ],
  "ALLERTON": [
    "61810",
    "IL"
  ],
  "AMES": [
    "73718",
    "OK"
  ],
  "ANKENY": [
    "50023",
    "IA"
  ],
  "BAGLEY": [
    "56621",
    "MN"
  ],
  "BARNES CITY": [
    "50027",
    "IA"
  ],
  "BEVINGTON": [
    "50033",
    "IA"
  ],
  "BLAIRSBURG": [
    "50034",
    "IA"
  ],
  "BONDURANT": [
    "82922",
    "WY"
  ],
  "BOUTON": [
    "50039",
    "IA"
  ],
  "BOXHOLM": [
    "50040",
    "IA"
  ],
  "BRAYTON": [
    "50042",
    "IA"
  ],
  "BUSSEY": [
    "50044",
    "IA"
  ],
  "CASEY": [
    "62420",
    "IL"
  ],
  "CHARITON": [
    "50049",
    "IA"
  ],
  "CHURDAN": [
    "50050",
    "IA"
  ],
  "COLO": [
    "50056",
    "IA"
  ],
  "COON RAPIDS": [
    "50058",
    "IA"
  ],
  "COOPER": [
    "75432",
    "TX"
  ],
  "MELCHER DALLAS": [
    "50163",
    "IA"
  ],
  "DALLAS CENTER": [
    "50063",
    "IA"
  ],
  "DAVIS CITY": [
    "50065",
    "IA"
  ],
  "DOWS": [
    "50071",
    "IA"
  ],
  "EARLHAM": [
    "50072",
    "IA"
  ],
  "ELLSTON": [
    "50074",
    "IA"
  ],
  "EXIRA": [
    "50076",
    "IA"
  ],
  "GALT": [
    "95632",
    "CA"
  ],
  "GARDEN GROVE": [
    "92846",
    "CA"
  ],
  "GRIMES": [
    "95950",
    "CA"
  ],
  "GRINNELL": [
    "67738",
    "KS"
  ],
  "GUTHRIE CENTER": [
    "50115",
    "IA"
  ],
  "HARVEY": [
    "72841",
    "AR"
  ],
  "HUMESTON": [
    "50123",
    "IA"
  ],
  "HUXLEY": [
    "50124",
    "IA"
  ],
  "IOWA FALLS": [
    "50126",
    "IA"
  ],
  "KAMRAR": [
    "50132",
    "IA"
  ],
  "KELLERTON": [
    "50133",
    "IA"
  ],
  "KELLEY": [
    "50134",
    "IA"
  ],
  "KELLOGG": [
    "83837",
    "ID"
  ],
  "KILLDUFF": [
    "50137",
    "IA"
  ],
  "LAMONI": [
    "50140",
    "IA"
  ],
  "LE GRAND": [
    "95333",
    "CA"
  ],
  "LISCOMB": [
    "50148",
    "IA"
  ],
  "LORIMOR": [
    "50149",
    "IA"
  ],
  "LOVILIA": [
    "50150",
    "IA"
  ],
  "MC CALLSBURG": [
    "50154",
    "IA"
  ],
  "MALCOM": [
    "50157",
    "IA"
  ],
  "MARSHALLTOWN": [
    "50158",
    "IA"
  ],
  "MARTENSDALE": [
    "50160",
    "IA"
  ],
  "MINBURN": [
    "50167",
    "IA"
  ],
  "MITCHELLVILLE": [
    "50169",
    "IA"
  ],
  "MONTOUR": [
    "50173",
    "IA"
  ],
  "NEW VIRGINIA": [
    "50210",
    "IA"
  ],
  "OGDEN": [
    "84415",
    "UT"
  ],
  "OTLEY": [
    "50214",
    "IA"
  ],
  "PANORA": [
    "50216",
    "IA"
  ],
  "PATON": [
    "50217",
    "IA"
  ],
  "PELLA": [
    "50219",
    "IA"
  ],
  "PILOT MOUND": [
    "50223",
    "IA"
  ],
  "PRAIRIE CITY": [
    "97869",
    "OR"
  ],
  "PROLE": [
    "50229",
    "IA"
  ],
  "RADCLIFFE": [
    "50230",
    "IA"
  ],
  "RANDALL": [
    "66963",
    "KS"
  ],
  "REASNOR": [
    "50232",
    "IA"
  ],
  "RIPPEY": [
    "50235",
    "IA"
  ],
  "ROLAND": [
    "74954",
    "OK"
  ],
  "RUNNELLS": [
    "50237",
    "IA"
  ],
  "SEARSBORO": [
    "50242",
    "IA"
  ],
  "SHELDAHL": [
    "50243",
    "IA"
  ],
  "STATE CENTER": [
    "50247",
    "IA"
  ],
  "STORY CITY": [
    "50248",
    "IA"
  ],
  "SULLY": [
    "50251",
    "IA"
  ],
  "SWAN": [
    "50252",
    "IA"
  ],
  "TRACY": [
    "95391",
    "CA"
  ],
  "VAN METER": [
    "50261",
    "IA"
  ],
  "WAUKEE": [
    "50263",
    "IA"
  ],
  "WEST DES MOINES": [
    "50266",
    "IA"
  ],
  "WHAT CHEER": [
    "50268",
    "IA"
  ],
  "WINTERSET": [
    "50273",
    "IA"
  ],
  "WIOTA": [
    "50274",
    "IA"
  ],
  "ZEARING": [
    "50278",
    "IA"
  ],
  "DES MOINES": [
    "88418",
    "NM"
  ],
  "URBANDALE": [
    "50398",
    "IA"
  ],
  "CLIVE": [
    "50325",
    "IA"
  ],
  "MASON CITY": [
    "68855",
    "NE"
  ],
  "BELMOND": [
    "50421",
    "IA"
  ],
  "BRITT": [
    "55710",
    "MN"
  ],
  "BUFFALO CENTER": [
    "50424",
    "IA"
  ],
  "CARPENTER": [
    "82054",
    "WY"
  ],
  "CLEAR LAKE": [
    "57226",
    "SD"
  ],
  "CORWITH": [
    "50430",
    "IA"
  ],
  "COULTER": [
    "50431",
    "IA"
  ],
  "CRYSTAL LAKE": [
    "60039",
    "IL"
  ],
  "DOUGHERTY": [
    "79231",
    "TX"
  ],
  "FERTILE": [
    "56540",
    "MN"
  ],
  "GOODELL": [
    "50439",
    "IA"
  ],
  "HANLONTOWN": [
    "50444",
    "IA"
  ],
  "JOICE": [
    "50446",
    "IA"
  ],
  "KANAWHA": [
    "50447",
    "IA"
  ],
  "KENSETT": [
    "72082",
    "AR"
  ],
  "KLEMME": [
    "50449",
    "IA"
  ],
  "LAKE MILLS": [
    "53551",
    "WI"
  ],
  "LAKOTA": [
    "58344",
    "ND"
  ],
  "LATIMER": [
    "50452",
    "IA"
  ],
  "LITTLE CEDAR": [
    "50454",
    "IA"
  ],
  "MC INTIRE": [
    "50455",
    "IA"
  ],
  "MANLY": [
    "50456",
    "IA"
  ],
  "MESERVEY": [
    "50457",
    "IA"
  ],
  "NORA SPRINGS": [
    "50458",
    "IA"
  ],
  "ORCHARD": [
    "80649",
    "CO"
  ],
  "RAKE": [
    "50465",
    "IA"
  ],
  "ROCK FALLS": [
    "61071",
    "IL"
  ],
  "ROWAN": [
    "50470",
    "IA"
  ],
  "RUDD": [
    "50471",
    "IA"
  ],
  "SAINT ANSGAR": [
    "50472",
    "IA"
  ],
  "SCARVILLE": [
    "50473",
    "IA"
  ],
  "SWALEDALE": [
    "50477",
    "IA"
  ],
  "TITONKA": [
    "50480",
    "IA"
  ],
  "TOETERVILLE": [
    "50481",
    "IA"
  ],
  "VENTURA": [
    "93009",
    "CA"
  ],
  "WODEN": [
    "75978",
    "TX"
  ],
  "FORT DODGE": [
    "50501",
    "IA"
  ],
  "ALBERT CITY": [
    "50510",
    "IA"
  ],
  "ALGONA": [
    "50511",
    "IA"
  ],
  "ARMSTRONG": [
    "78338",
    "TX"
  ],
  "AYRSHIRE": [
    "50515",
    "IA"
  ],
  "BADGER": [
    "93603",
    "CA"
  ],
  "BARNUM": [
    "55707",
    "MN"
  ],
  "BODE": [
    "50519",
    "IA"
  ],
  "BRADGATE": [
    "50520",
    "IA"
  ],
  "CALLENDER": [
    "50523",
    "IA"
  ],
  "CURLEW": [
    "99118",
    "WA"
  ],
  "CYLINDER": [
    "50528",
    "IA"
  ],
  "DAKOTA CITY": [
    "68731",
    "NE"
  ],
  "DOLLIVER": [
    "50531",
    "IA"
  ],
  "DUNCOMBE": [
    "50532",
    "IA"
  ],
  "EAGLE GROVE": [
    "50533",
    "IA"
  ],
  "EARLY": [
    "76803",
    "TX"
  ],
  "EMMETSBURG": [
    "50536",
    "IA"
  ],
  "FARNHAMVILLE": [
    "50538",
    "IA"
  ],
  "GILMORE CITY": [
    "50541",
    "IA"
  ],
  "GOLDFIELD": [
    "89013",
    "NV"
  ],
  "GOWRIE": [
    "50543",
    "IA"
  ],
  "HARCOURT": [
    "50544",
    "IA"
  ],
  "JOLLEY": [
    "50551",
    "IA"
  ],
  "KNIERIM": [
    "50552",
    "IA"
  ],
  "LEHIGH": [
    "74556",
    "OK"
  ],
  "LONE ROCK": [
    "53556",
    "WI"
  ],
  "LU VERNE": [
    "50560",
    "IA"
  ],
  "LYTTON": [
    "50561",
    "IA"
  ],
  "MALLARD": [
    "50562",
    "IA"
  ],
  "MOORLAND": [
    "50566",
    "IA"
  ],
  "NEMAHA": [
    "68414",
    "NE"
  ],
  "OTHO": [
    "50569",
    "IA"
  ],
  "OTTOSEN": [
    "50570",
    "IA"
  ],
  "PLOVER": [
    "54467",
    "WI"
  ],
  "REMBRANDT": [
    "50576",
    "IA"
  ],
  "RENWICK": [
    "50577",
    "IA"
  ],
  "RINGSTED": [
    "50578",
    "IA"
  ],
  "ROCKWELL CITY": [
    "50579",
    "IA"
  ],
  "ROLFE": [
    "50581",
    "IA"
  ],
  "SAC CITY": [
    "50583",
    "IA"
  ],
  "SIOUX RAPIDS": [
    "50585",
    "IA"
  ],
  "STORM LAKE": [
    "50588",
    "IA"
  ],
  "SWEA CITY": [
    "50590",
    "IA"
  ],
  "THOR": [
    "50591",
    "IA"
  ],
  "VARINA": [
    "50593",
    "IA"
  ],
  "WEBSTER CITY": [
    "50595",
    "IA"
  ],
  "WEST BEND": [
    "53095",
    "WI"
  ],
  "WOOLSTOCK": [
    "50599",
    "IA"
  ],
  "ACKLEY": [
    "50601",
    "IA"
  ],
  "ALTA VISTA": [
    "66834",
    "KS"
  ],
  "APLINGTON": [
    "50604",
    "IA"
  ],
  "AREDALE": [
    "50605",
    "IA"
  ],
  "BEAMAN": [
    "50609",
    "IA"
  ],
  "COLWELL": [
    "50620",
    "IA"
  ],
  "CONRAD": [
    "59425",
    "MT"
  ],
  "DEWAR": [
    "74431",
    "OK"
  ],
  "DIKE": [
    "75437",
    "TX"
  ],
  "DUNKERTON": [
    "50626",
    "IA"
  ],
  "ELDORA": [
    "50627",
    "IA"
  ],
  "FREDERIKA": [
    "50631",
    "IA"
  ],
  "GARWIN": [
    "50632",
    "IA"
  ],
  "GLADBROOK": [
    "50635",
    "IA"
  ],
  "GRUNDY CENTER": [
    "50638",
    "IA"
  ],
  "JANESVILLE": [
    "96114",
    "CA"
  ],
  "KESLEY": [
    "50649",
    "IA"
  ],
  "LA PORTE CITY": [
    "50651",
    "IA"
  ],
  "MARBLE ROCK": [
    "50653",
    "IA"
  ],
  "OELWEIN": [
    "50662",
    "IA"
  ],
  "ORAN": [
    "63771",
    "MO"
  ],
  "READLYN": [
    "50668",
    "IA"
  ],
  "REINBECK": [
    "50669",
    "IA"
  ],
  "SHELL ROCK": [
    "50670",
    "IA"
  ],
  "STEAMBOAT ROCK": [
    "50672",
    "IA"
  ],
  "TRAER": [
    "50675",
    "IA"
  ],
  "TRIPOLI": [
    "54564",
    "WI"
  ],
  "WESTGATE": [
    "50681",
    "IA"
  ],
  "EVANSDALE": [
    "50707",
    "IA"
  ],
  "ARISPE": [
    "50831",
    "IA"
  ],
  "BLOCKTON": [
    "50836",
    "IA"
  ],
  "DIAGONAL": [
    "50845",
    "IA"
  ],
  "FONTANELLE": [
    "50846",
    "IA"
  ],
  "GRAVITY": [
    "50848",
    "IA"
  ],
  "MOUNT AYR": [
    "50854",
    "IA"
  ],
  "NODAWAY": [
    "50857",
    "IA"
  ],
  "SHANNON CITY": [
    "50861",
    "IA"
  ],
  "TINGLEY": [
    "50863",
    "IA"
  ],
  "VILLISCA": [
    "50864",
    "IA"
  ],
  "ALTA": [
    "95701",
    "CA"
  ],
  "ANTHON": [
    "51004",
    "IA"
  ],
  "AURELIA": [
    "51005",
    "IA"
  ],
  "BRUNSVILLE": [
    "51008",
    "IA"
  ],
  "CASTANA": [
    "51010",
    "IA"
  ],
  "CLEGHORN": [
    "51014",
    "IA"
  ],
  "CLIMBING HILL": [
    "51015",
    "IA"
  ],
  "CORRECTIONVILLE": [
    "51016",
    "IA"
  ],
  "GALVA": [
    "67443",
    "KS"
  ],
  "HAWARDEN": [
    "51023",
    "IA"
  ],
  "HOLSTEIN": [
    "68950",
    "NE"
  ],
  "HORNICK": [
    "51026",
    "IA"
  ],
  "IRETON": [
    "51027",
    "IA"
  ],
  "LARRABEE": [
    "51029",
    "IA"
  ],
  "LE MARS": [
    "51031",
    "IA"
  ],
  "MARCUS": [
    "99151",
    "WA"
  ],
  "MAURICE": [
    "70555",
    "LA"
  ],
  "MOVILLE": [
    "51039",
    "IA"
  ],
  "ONAWA": [
    "51040",
    "IA"
  ],
  "OTO": [
    "51044",
    "IA"
  ],
  "OYENS": [
    "51045",
    "IA"
  ],
  "PAULLINA": [
    "51046",
    "IA"
  ],
  "QUIMBY": [
    "51049",
    "IA"
  ],
  "SCHALLER": [
    "51053",
    "IA"
  ],
  "SERGEANT BLUFF": [
    "51054",
    "IA"
  ],
  "SLOAN": [
    "89054",
    "NV"
  ],
  "UTE": [
    "51060",
    "IA"
  ],
  "WASHTA": [
    "51061",
    "IA"
  ],
  "SIOUX CITY": [
    "51111",
    "IA"
  ],
  "ALVORD": [
    "76225",
    "TX"
  ],
  "BOYDEN": [
    "51234",
    "IA"
  ],
  "DOON": [
    "51235",
    "IA"
  ],
  "GEORGE": [
    "98824",
    "WA"
  ],
  "HOSPERS": [
    "51238",
    "IA"
  ],
  "LARCHWOOD": [
    "51241",
    "IA"
  ],
  "MATLOCK": [
    "98560",
    "WA"
  ],
  "PRIMGHAR": [
    "51245",
    "IA"
  ],
  "ROCK RAPIDS": [
    "51246",
    "IA"
  ],
  "ROCK VALLEY": [
    "51247",
    "IA"
  ],
  "SIOUX CENTER": [
    "51250",
    "IA"
  ],
  "ARNOLDS PARK": [
    "51331",
    "IA"
  ],
  "DICKENS": [
    "79229",
    "TX"
  ],
  "ESTHERVILLE": [
    "51334",
    "IA"
  ],
  "EVERLY": [
    "51338",
    "IA"
  ],
  "GRAETTINGER": [
    "51342",
    "IA"
  ],
  "HARTLEY": [
    "79044",
    "TX"
  ],
  "OCHEYEDAN": [
    "51354",
    "IA"
  ],
  "OKOBOJI": [
    "51355",
    "IA"
  ],
  "ROYAL": [
    "71968",
    "AR"
  ],
  "RUTHVEN": [
    "51358",
    "IA"
  ],
  "SPIRIT LAKE": [
    "83869",
    "ID"
  ],
  "SUPERIOR": [
    "85173",
    "AZ"
  ],
  "TERRIL": [
    "51364",
    "IA"
  ],
  "ASPINWALL": [
    "51432",
    "IA"
  ],
  "BREDA": [
    "51436",
    "IA"
  ],
  "CHARTER OAK": [
    "51439",
    "IA"
  ],
  "DELOIT": [
    "51441",
    "IA"
  ],
  "DENISON": [
    "75021",
    "TX"
  ],
  "GLIDDEN": [
    "78943",
    "TX"
  ],
  "HALBUR": [
    "51444",
    "IA"
  ],
  "IDA GROVE": [
    "51445",
    "IA"
  ],
  "KIRKMAN": [
    "51447",
    "IA"
  ],
  "KIRON": [
    "51448",
    "IA"
  ],
  "LIDDERDALE": [
    "51452",
    "IA"
  ],
  "LOHRVILLE": [
    "51453",
    "IA"
  ],
  "ODEBOLT": [
    "51458",
    "IA"
  ],
  "SCHLESWIG": [
    "51461",
    "IA"
  ],
  "VAIL": [
    "85641",
    "AZ"
  ],
  "WALL LAKE": [
    "51466",
    "IA"
  ],
  "WESTSIDE": [
    "51467",
    "IA"
  ],
  "COUNCIL BLUFFS": [
    "51503",
    "IA"
  ],
  "CARTER LAKE": [
    "51510",
    "IA"
  ],
  "ARION": [
    "51520",
    "IA"
  ],
  "BLENCOE": [
    "51523",
    "IA"
  ],
  "DOW CITY": [
    "51528",
    "IA"
  ],
  "EARLING": [
    "51530",
    "IA"
  ],
  "GRISWOLD": [
    "51535",
    "IA"
  ],
  "HONEY CREEK": [
    "53138",
    "WI"
  ],
  "KIMBALLTON": [
    "51543",
    "IA"
  ],
  "LITTLE SIOUX": [
    "51545",
    "IA"
  ],
  "MC CLELLAND": [
    "51548",
    "IA"
  ],
  "MISSOURI VALLEY": [
    "51555",
    "IA"
  ],
  "MODALE": [
    "51556",
    "IA"
  ],
  "MONDAMIN": [
    "51557",
    "IA"
  ],
  "NEOLA": [
    "84053",
    "UT"
  ],
  "PACIFIC JUNCTION": [
    "51561",
    "IA"
  ],
  "PERSIA": [
    "51563",
    "IA"
  ],
  "TREYNOR": [
    "51575",
    "IA"
  ],
  "BRADDYVILLE": [
    "51631",
    "IA"
  ],
  "CLARINDA": [
    "51632",
    "IA"
  ],
  "COIN": [
    "51636",
    "IA"
  ],
  "COLLEGE SPRINGS": [
    "51637",
    "IA"
  ],
  "FARRAGUT": [
    "51639",
    "IA"
  ],
  "IMOGENE": [
    "51645",
    "IA"
  ],
  "NORTHBORO": [
    "51647",
    "IA"
  ],
  "PERCIVAL": [
    "51648",
    "IA"
  ],
  "SHAMBAUGH": [
    "51651",
    "IA"
  ],
  "TABOR": [
    "57063",
    "SD"
  ],
  "DUBUQUE": [
    "52004",
    "IA"
  ],
  "ANDREW": [
    "52030",
    "IA"
  ],
  "COLESBURG": [
    "52035",
    "IA"
  ],
  "DURANGO": [
    "81303",
    "CO"
  ],
  "DYERSVILLE": [
    "52040",
    "IA"
  ],
  "ELKADER": [
    "52043",
    "IA"
  ],
  "ELKPORT": [
    "52044",
    "IA"
  ],
  "FARLEY": [
    "64028",
    "MO"
  ],
  "GARBER": [
    "73738",
    "OK"
  ],
  "GARNAVILLO": [
    "52049",
    "IA"
  ],
  "GUTTENBERG": [
    "52052",
    "IA"
  ],
  "HOLY CROSS": [
    "99602",
    "AK"
  ],
  "LA MOTTE": [
    "52054",
    "IA"
  ],
  "LUXEMBURG": [
    "54217",
    "WI"
  ],
  "MAQUOKETA": [
    "52060",
    "IA"
  ],
  "MILES": [
    "76861",
    "TX"
  ],
  "NORTH BUENA VISTA": [
    "52066",
    "IA"
  ],
  "PEOSTA": [
    "52068",
    "IA"
  ],
  "SABULA": [
    "52070",
    "IA"
  ],
  "SAINT DONATUS": [
    "52071",
    "IA"
  ],
  "SAINT OLAF": [
    "52072",
    "IA"
  ],
  "SPRAGUEVILLE": [
    "52074",
    "IA"
  ],
  "SPRINGBROOK": [
    "54875",
    "WI"
  ],
  "STRAWBERRY POINT": [
    "52076",
    "IA"
  ],
  "ZWINGLE": [
    "52079",
    "IA"
  ],
  "DECORAH": [
    "52101",
    "IA"
  ],
  "CALMAR": [
    "52132",
    "IA"
  ],
  "FORT ATKINSON": [
    "53538",
    "WI"
  ],
  "HAWKEYE": [
    "52147",
    "IA"
  ],
  "HIGHLANDVILLE": [
    "65669",
    "MO"
  ],
  "LAWLER": [
    "52154",
    "IA"
  ],
  "LIME SPRINGS": [
    "52155",
    "IA"
  ],
  "LUANA": [
    "52156",
    "IA"
  ],
  "MC GREGOR": [
    "76657",
    "TX"
  ],
  "MONONA": [
    "52159",
    "IA"
  ],
  "NEW ALBIN": [
    "52160",
    "IA"
  ],
  "POSTVILLE": [
    "52162",
    "IA"
  ],
  "PROTIVIN": [
    "52163",
    "IA"
  ],
  "RANDALIA": [
    "52164",
    "IA"
  ],
  "SAINT LUCAS": [
    "52166",
    "IA"
  ],
  "SPILLVILLE": [
    "52168",
    "IA"
  ],
  "WADENA": [
    "56482",
    "MN"
  ],
  "WAUCOMA": [
    "52171",
    "IA"
  ],
  "WAUKON": [
    "52172",
    "IA"
  ],
  "AINSWORTH": [
    "69210",
    "NE"
  ],
  "ALBURNETT": [
    "52202",
    "IA"
  ],
  "AMANA": [
    "52204",
    "IA"
  ],
  "ANAMOSA": [
    "52205",
    "IA"
  ],
  "BELLE PLAINE": [
    "67013",
    "KS"
  ],
  "CENTER JUNCTION": [
    "52212",
    "IA"
  ],
  "CLUTIER": [
    "52217",
    "IA"
  ],
  "COGGON": [
    "52218",
    "IA"
  ],
  "PRAIRIEBURG": [
    "52219",
    "IA"
  ],
  "CONROY": [
    "52220",
    "IA"
  ],
  "GUERNSEY": [
    "82214",
    "WY"
  ],
  "ELY": [
    "89315",
    "NV"
  ],
  "HILLS": [
    "56138",
    "MN"
  ],
  "IOWA CITY": [
    "52246",
    "IA"
  ],
  "CORALVILLE": [
    "52241",
    "IA"
  ],
  "KALONA": [
    "52247",
    "IA"
  ],
  "KEOTA": [
    "74941",
    "OK"
  ],
  "LADORA": [
    "52251",
    "IA"
  ],
  "LOST NATION": [
    "52254",
    "IA"
  ],
  "LOWDEN": [
    "52255",
    "IA"
  ],
  "MARTELLE": [
    "52305",
    "IA"
  ],
  "MIDDLE AMANA": [
    "52307",
    "IA"
  ],
  "MOUNT AUBURN": [
    "62547",
    "IL"
  ],
  "NORTH ENGLISH": [
    "52316",
    "IA"
  ],
  "ONSLOW": [
    "52321",
    "IA"
  ],
  "OXFORD JUNCTION": [
    "52323",
    "IA"
  ],
  "PARNELL": [
    "64475",
    "MO"
  ],
  "QUASQUETON": [
    "52326",
    "IA"
  ],
  "ROBINS": [
    "52328",
    "IA"
  ],
  "RYAN": [
    "73565",
    "OK"
  ],
  "SHELLSBURG": [
    "52332",
    "IA"
  ],
  "SOUTH AMANA": [
    "52334",
    "IA"
  ],
  "SOUTH ENGLISH": [
    "52335",
    "IA"
  ],
  "SWISHER": [
    "52338",
    "IA"
  ],
  "TAMA": [
    "52339",
    "IA"
  ],
  "TROY MILLS": [
    "52344",
    "IA"
  ],
  "VAN HORNE": [
    "52346",
    "IA"
  ],
  "WALFORD": [
    "52351",
    "IA"
  ],
  "WATKINS": [
    "80137",
    "CO"
  ],
  "WELLMAN": [
    "79378",
    "TX"
  ],
  "CEDAR RAPIDS": [
    "68627",
    "NE"
  ],
  "OTTUMWA": [
    "52501",
    "IA"
  ],
  "AGENCY": [
    "64401",
    "MO"
  ],
  "ALBIA": [
    "52531",
    "IA"
  ],
  "BLAKESBURG": [
    "52536",
    "IA"
  ],
  "CANTRIL": [
    "52542",
    "IA"
  ],
  "DOUDS": [
    "52551",
    "IA"
  ],
  "DRAKESVILLE": [
    "52552",
    "IA"
  ],
  "ELDON": [
    "65026",
    "MO"
  ],
  "EXLINE": [
    "52555",
    "IA"
  ],
  "FLORIS": [
    "52560",
    "IA"
  ],
  "HEDRICK": [
    "52563",
    "IA"
  ],
  "KEOSAUQUA": [
    "52565",
    "IA"
  ],
  "LIBERTYVILLE": [
    "60048",
    "IL"
  ],
  "OLLIE": [
    "52576",
    "IA"
  ],
  "OSKALOOSA": [
    "66066",
    "KS"
  ],
  "PACKWOOD": [
    "98361",
    "WA"
  ],
  "PLANO": [
    "75094",
    "TX"
  ],
  "PROMISE CITY": [
    "52583",
    "IA"
  ],
  "SIGOURNEY": [
    "52591",
    "IA"
  ],
  "BONAPARTE": [
    "52620",
    "IA"
  ],
  "DONNELLSON": [
    "62019",
    "IL"
  ],
  "FORT MADISON": [
    "52627",
    "IA"
  ],
  "KEOKUK": [
    "52632",
    "IA"
  ],
  "LOCKRIDGE": [
    "52635",
    "IA"
  ],
  "MEDIAPOLIS": [
    "52637",
    "IA"
  ],
  "MORNING SUN": [
    "52640",
    "IA"
  ],
  "OLDS": [
    "52647",
    "IA"
  ],
  "PILOT GROVE": [
    "65276",
    "MO"
  ],
  "SPERRY": [
    "74073",
    "OK"
  ],
  "SWEDESBURG": [
    "52652",
    "IA"
  ],
  "WAPELLO": [
    "52653",
    "IA"
  ],
  "WEVER": [
    "52658",
    "IA"
  ],
  "ATALISSA": [
    "52720",
    "IA"
  ],
  "BETTENDORF": [
    "52722",
    "IA"
  ],
  "CALAMUS": [
    "52729",
    "IA"
  ],
  "CAMANCHE": [
    "52730",
    "IA"
  ],
  "COLUMBUS CITY": [
    "52737",
    "IA"
  ],
  "COLUMBUS JUNCTION": [
    "52738",
    "IA"
  ],
  "DE WITT": [
    "72042",
    "AR"
  ],
  "DONAHUE": [
    "52746",
    "IA"
  ],
  "GOOSE LAKE": [
    "52750",
    "IA"
  ],
  "GRAND MOUND": [
    "52751",
    "IA"
  ],
  "LE CLAIRE": [
    "52753",
    "IA"
  ],
  "LETTS": [
    "52754",
    "IA"
  ],
  "LONE TREE": [
    "80124",
    "CO"
  ],
  "LONG GROVE": [
    "52756",
    "IA"
  ],
  "MC CAUSLAND": [
    "52758",
    "IA"
  ],
  "MUSCATINE": [
    "52761",
    "IA"
  ],
  "WALCOTT": [
    "82335",
    "WY"
  ],
  "WELTON": [
    "52774",
    "IA"
  ],
  "ADELL": [
    "53001",
    "WI"
  ],
  "ASHIPPUN": [
    "53003",
    "WI"
  ],
  "BELGIUM": [
    "53004",
    "WI"
  ],
  "CAMPBELLSPORT": [
    "53010",
    "WI"
  ],
  "CEDARBURG": [
    "53012",
    "WI"
  ],
  "CHILTON": [
    "76632",
    "TX"
  ],
  "CLYMAN": [
    "53016",
    "WI"
  ],
  "COLGATE": [
    "53017",
    "WI"
  ],
  "DELAFIELD": [
    "53018",
    "WI"
  ],
  "ELKHART LAKE": [
    "53020",
    "WI"
  ],
  "GLENBEULAH": [
    "53023",
    "WI"
  ],
  "HORICON": [
    "53032",
    "WI"
  ],
  "HUBERTUS": [
    "53033",
    "WI"
  ],
  "HUSTISFORD": [
    "53034",
    "WI"
  ],
  "IRON RIDGE": [
    "53035",
    "WI"
  ],
  "IXONIA": [
    "53036",
    "WI"
  ],
  "JOHNSON CREEK": [
    "53038",
    "WI"
  ],
  "JUNEAU": [
    "99850",
    "AK"
  ],
  "KEWASKUM": [
    "53040",
    "WI"
  ],
  "KIEL": [
    "53042",
    "WI"
  ],
  "KOHLER": [
    "53044",
    "WI"
  ],
  "LANNON": [
    "53046",
    "WI"
  ],
  "LOMIRA": [
    "53048",
    "WI"
  ],
  "MENOMONEE FALLS": [
    "53052",
    "WI"
  ],
  "MERTON": [
    "53056",
    "WI"
  ],
  "MOUNT CALVARY": [
    "53057",
    "WI"
  ],
  "NASHOTAH": [
    "53058",
    "WI"
  ],
  "NEOSHO": [
    "64850",
    "MO"
  ],
  "NEW HOLSTEIN": [
    "53062",
    "WI"
  ],
  "NORTH LAKE": [
    "53064",
    "WI"
  ],
  "OCONOMOWOC": [
    "53066",
    "WI"
  ],
  "OKAUCHEE": [
    "53069",
    "WI"
  ],
  "OOSTBURG": [
    "53070",
    "WI"
  ],
  "PEWAUKEE": [
    "53072",
    "WI"
  ],
  "RANDOM LAKE": [
    "53075",
    "WI"
  ],
  "RUBICON": [
    "53078",
    "WI"
  ],
  "SAUKVILLE": [
    "53080",
    "WI"
  ],
  "SHEBOYGAN": [
    "53083",
    "WI"
  ],
  "SHEBOYGAN FALLS": [
    "53085",
    "WI"
  ],
  "SLINGER": [
    "53086",
    "WI"
  ],
  "MEQUON": [
    "53097",
    "WI"
  ],
  "BENET LAKE": [
    "53102",
    "WI"
  ],
  "CAMP LAKE": [
    "53109",
    "WI"
  ],
  "CUDAHY": [
    "53110",
    "WI"
  ],
  "DELAVAN": [
    "61734",
    "IL"
  ],
  "DOUSMAN": [
    "53118",
    "WI"
  ],
  "EAST TROY": [
    "53120",
    "WI"
  ],
  "ELM GROVE": [
    "71051",
    "LA"
  ],
  "FONTANA": [
    "92337",
    "CA"
  ],
  "FRANKSVILLE": [
    "53126",
    "WI"
  ],
  "GENESEE DEPOT": [
    "53127",
    "WI"
  ],
  "GENOA CITY": [
    "53128",
    "WI"
  ],
  "GREENDALE": [
    "53129",
    "WI"
  ],
  "HALES CORNERS": [
    "53130",
    "WI"
  ],
  "HELENVILLE": [
    "53137",
    "WI"
  ],
  "KANSASVILLE": [
    "53139",
    "WI"
  ],
  "KENOSHA": [
    "53144",
    "WI"
  ],
  "MUKWONAGO": [
    "53149",
    "WI"
  ],
  "MUSKEGO": [
    "53150",
    "WI"
  ],
  "NEW MUNSTER": [
    "53152",
    "WI"
  ],
  "NORTH PRAIRIE": [
    "53153",
    "WI"
  ],
  "OAK CREEK": [
    "80467",
    "CO"
  ],
  "PELL LAKE": [
    "53157",
    "WI"
  ],
  "PLEASANT PRAIRIE": [
    "53158",
    "WI"
  ],
  "POWERS LAKE": [
    "58773",
    "ND"
  ],
  "SOUTH MILWAUKEE": [
    "53172",
    "WI"
  ],
  "STURTEVANT": [
    "53177",
    "WI"
  ],
  "TREVOR": [
    "53179",
    "WI"
  ],
  "TWIN LAKES": [
    "81251",
    "CO"
  ],
  "WAUKESHA": [
    "53189",
    "WI"
  ],
  "WHITEWATER": [
    "92282",
    "CA"
  ],
  "WILLIAMS BAY": [
    "53191",
    "WI"
  ],
  "ZENDA": [
    "67159",
    "KS"
  ],
  "MILWAUKEE": [
    "53295",
    "WI"
  ],
  "ARENA": [
    "53503",
    "WI"
  ],
  "BLACK EARTH": [
    "53515",
    "WI"
  ],
  "BLANCHARDVILLE": [
    "53516",
    "WI"
  ],
  "BLUE MOUNDS": [
    "53517",
    "WI"
  ],
  "BROWNTOWN": [
    "53522",
    "WI"
  ],
  "DANE": [
    "53529",
    "WI"
  ],
  "DE FOREST": [
    "53532",
    "WI"
  ],
  "EDMUND": [
    "53535",
    "WI"
  ],
  "FOOTVILLE": [
    "53537",
    "WI"
  ],
  "GOTHAM": [
    "53540",
    "WI"
  ],
  "JUDA": [
    "53550",
    "WI"
  ],
  "MC FARLAND": [
    "93250",
    "CA"
  ],
  "MAZOMANIE": [
    "53560",
    "WI"
  ],
  "MONTFORT": [
    "53569",
    "WI"
  ],
  "MOUNT HOREB": [
    "53572",
    "WI"
  ],
  "MUSCODA": [
    "53573",
    "WI"
  ],
  "NEW GLARUS": [
    "53574",
    "WI"
  ],
  "ORFORDVILLE": [
    "53576",
    "WI"
  ],
  "PLAIN": [
    "53577",
    "WI"
  ],
  "PRAIRIE DU SAC": [
    "53578",
    "WI"
  ],
  "REESEVILLE": [
    "53579",
    "WI"
  ],
  "REWEY": [
    "53580",
    "WI"
  ],
  "RICHLAND CENTER": [
    "53581",
    "WI"
  ],
  "SAUK CITY": [
    "53583",
    "WI"
  ],
  "SHULLSBURG": [
    "53586",
    "WI"
  ],
  "SOUTH WAYNE": [
    "53587",
    "WI"
  ],
  "SPRING GREEN": [
    "53588",
    "WI"
  ],
  "SUN PRAIRIE": [
    "53596",
    "WI"
  ],
  "WAUNAKEE": [
    "53597",
    "WI"
  ],
  "BEETOWN": [
    "53802",
    "WI"
  ],
  "BOSCOBEL": [
    "53805",
    "WI"
  ],
  "CUBA CITY": [
    "53807",
    "WI"
  ],
  "DICKEYVILLE": [
    "53808",
    "WI"
  ],
  "FENNIMORE": [
    "53809",
    "WI"
  ],
  "GLEN HAVEN": [
    "80532",
    "CO"
  ],
  "KIELER": [
    "53812",
    "WI"
  ],
  "PATCH GROVE": [
    "53817",
    "WI"
  ],
  "PLATTEVILLE": [
    "80651",
    "CO"
  ],
  "POTOSI": [
    "63664",
    "MO"
  ],
  "PRAIRIE DU CHIEN": [
    "53821",
    "WI"
  ],
  "STITZER": [
    "53825",
    "WI"
  ],
  "WAUZEKA": [
    "53826",
    "WI"
  ],
  "WOODMAN": [
    "53827",
    "WI"
  ],
  "BARABOO": [
    "53913",
    "WI"
  ],
  "BRIGGSVILLE": [
    "72828",
    "AR"
  ],
  "BURNETT": [
    "53922",
    "WI"
  ],
  "CAMBRIA": [
    "93428",
    "CA"
  ],
  "DELLWOOD": [
    "53927",
    "WI"
  ],
  "ELROY": [
    "53929",
    "WI"
  ],
  "FAIRWATER": [
    "53931",
    "WI"
  ],
  "FOX LAKE": [
    "60020",
    "IL"
  ],
  "FRIESLAND": [
    "53935",
    "WI"
  ],
  "GRAND MARSH": [
    "53936",
    "WI"
  ],
  "HILLPOINT": [
    "53937",
    "WI"
  ],
  "LAKE DELTON": [
    "53940",
    "WI"
  ],
  "LA VALLE": [
    "53941",
    "WI"
  ],
  "LIME RIDGE": [
    "53942",
    "WI"
  ],
  "LYNDON STATION": [
    "53944",
    "WI"
  ],
  "MARKESAN": [
    "53946",
    "WI"
  ],
  "MAUSTON": [
    "53948",
    "WI"
  ],
  "MONTELLO": [
    "53949",
    "WI"
  ],
  "NORTH FREEDOM": [
    "53951",
    "WI"
  ],
  "PARDEEVILLE": [
    "53954",
    "WI"
  ],
  "POYNETTE": [
    "53955",
    "WI"
  ],
  "REEDSBURG": [
    "53959",
    "WI"
  ],
  "ROCK SPRINGS": [
    "82902",
    "WY"
  ],
  "UNION CENTER": [
    "57787",
    "SD"
  ],
  "WAUPUN": [
    "53963",
    "WI"
  ],
  "WISCONSIN DELLS": [
    "53965",
    "WI"
  ],
  "WONEWOC": [
    "53968",
    "WI"
  ],
  "WYOCENA": [
    "53969",
    "WI"
  ],
  "AMERY": [
    "54001",
    "WI"
  ],
  "BELDENVILLE": [
    "54003",
    "WI"
  ],
  "DRESSER": [
    "54009",
    "WI"
  ],
  "EAST ELLSWORTH": [
    "54010",
    "WI"
  ],
  "GLENWOOD CITY": [
    "54013",
    "WI"
  ],
  "HAGER CITY": [
    "54014",
    "WI"
  ],
  "ROBERTS": [
    "83444",
    "ID"
  ],
  "SAINT CROIX FALLS": [
    "54024",
    "WI"
  ],
  "STAR PRAIRIE": [
    "54026",
    "WI"
  ],
  "ABRAMS": [
    "54101",
    "WI"
  ],
  "AMBERG": [
    "54102",
    "WI"
  ],
  "ARMSTRONG CREEK": [
    "54103",
    "WI"
  ],
  "ATHELSTANE": [
    "54104",
    "WI"
  ],
  "BONDUEL": [
    "54107",
    "WI"
  ],
  "BRILLION": [
    "54110",
    "WI"
  ],
  "COMBINED LOCKS": [
    "54113",
    "WI"
  ],
  "CRIVITZ": [
    "54114",
    "WI"
  ],
  "DE PERE": [
    "54115",
    "WI"
  ],
  "FENCE": [
    "54120",
    "WI"
  ],
  "FOREST JUNCTION": [
    "54123",
    "WI"
  ],
  "GREENLEAF": [
    "83626",
    "ID"
  ],
  "GREEN VALLEY": [
    "85622",
    "AZ"
  ],
  "HILBERT": [
    "54129",
    "WI"
  ],
  "KAUKAUNA": [
    "54130",
    "WI"
  ],
  "KESHENA": [
    "54135",
    "WI"
  ],
  "KRAKOW": [
    "54137",
    "WI"
  ],
  "LITTLE CHUTE": [
    "54140",
    "WI"
  ],
  "LITTLE SUAMICO": [
    "54141",
    "WI"
  ],
  "MARINETTE": [
    "54143",
    "WI"
  ],
  "MOUNTAIN": [
    "58262",
    "ND"
  ],
  "NEOPIT": [
    "54150",
    "WI"
  ],
  "NIAGARA": [
    "58266",
    "ND"
  ],
  "OCONTO": [
    "68860",
    "NE"
  ],
  "OCONTO FALLS": [
    "54154",
    "WI"
  ],
  "PEMBINE": [
    "54156",
    "WI"
  ],
  "PESHTIGO": [
    "54157",
    "WI"
  ],
  "PORTERFIELD": [
    "54159",
    "WI"
  ],
  "POTTER": [
    "69156",
    "NE"
  ],
  "SHAWANO": [
    "54166",
    "WI"
  ],
  "SHIOCTON": [
    "54170",
    "WI"
  ],
  "SOBIESKI": [
    "54171",
    "WI"
  ],
  "SUAMICO": [
    "54173",
    "WI"
  ],
  "SURING": [
    "54174",
    "WI"
  ],
  "WAUSAUKEE": [
    "54177",
    "WI"
  ],
  "ZACHOW": [
    "54182",
    "WI"
  ],
  "BAILEYS HARBOR": [
    "54202",
    "WI"
  ],
  "BRUSSELS": [
    "62013",
    "IL"
  ],
  "EGG HARBOR": [
    "54209",
    "WI"
  ],
  "ELLISON BAY": [
    "54210",
    "WI"
  ],
  "EPHRAIM": [
    "84627",
    "UT"
  ],
  "FISH CREEK": [
    "54212",
    "WI"
  ],
  "FRANCIS CREEK": [
    "54214",
    "WI"
  ],
  "KELLNERSVILLE": [
    "54215",
    "WI"
  ],
  "KEWAUNEE": [
    "54216",
    "WI"
  ],
  "MANITOWOC": [
    "54221",
    "WI"
  ],
  "MARIBEL": [
    "54227",
    "WI"
  ],
  "MISHICOT": [
    "54228",
    "WI"
  ],
  "NEW FRANKEN": [
    "54229",
    "WI"
  ],
  "SAINT NAZIANZ": [
    "54232",
    "WI"
  ],
  "SISTER BAY": [
    "54234",
    "WI"
  ],
  "STURGEON BAY": [
    "54235",
    "WI"
  ],
  "TISCH MILLS": [
    "54240",
    "WI"
  ],
  "TWO RIVERS": [
    "99716",
    "AK"
  ],
  "VALDERS": [
    "54245",
    "WI"
  ],
  "WASHINGTON ISLAND": [
    "54246",
    "WI"
  ],
  "WHITELAW": [
    "54247",
    "WI"
  ],
  "ABBOTSFORD": [
    "54405",
    "WI"
  ],
  "AMHERST JUNCTION": [
    "54407",
    "WI"
  ],
  "ANIWA": [
    "54408",
    "WI"
  ],
  "ANTIGO": [
    "54409",
    "WI"
  ],
  "ARPIN": [
    "54410",
    "WI"
  ],
  "BABCOCK": [
    "54413",
    "WI"
  ],
  "BIRNAMWOOD": [
    "54414",
    "WI"
  ],
  "BLENKER": [
    "54415",
    "WI"
  ],
  "BOWLER": [
    "54416",
    "WI"
  ],
  "BROKAW": [
    "54417",
    "WI"
  ],
  "CHILI": [
    "54420",
    "WI"
  ],
  "COLBY": [
    "67701",
    "KS"
  ],
  "CURTISS": [
    "54422",
    "WI"
  ],
  "DEERBROOK": [
    "54424",
    "WI"
  ],
  "EDGAR": [
    "68935",
    "NE"
  ],
  "ELAND": [
    "54427",
    "WI"
  ],
  "ELCHO": [
    "54428",
    "WI"
  ],
  "ELDERON": [
    "54429",
    "WI"
  ],
  "JUMP RIVER": [
    "54434",
    "WI"
  ],
  "GRANTON": [
    "54436",
    "WI"
  ],
  "HATLEY": [
    "54440",
    "WI"
  ],
  "IRMA": [
    "54442",
    "WI"
  ],
  "LOYAL": [
    "73756",
    "OK"
  ],
  "LUBLIN": [
    "54447",
    "WI"
  ],
  "MATTOON": [
    "61938",
    "IL"
  ],
  "MILLADORE": [
    "54454",
    "WI"
  ],
  "MOSINEE": [
    "54455",
    "WI"
  ],
  "NEILLSVILLE": [
    "54456",
    "WI"
  ],
  "NEKOOSA": [
    "54457",
    "WI"
  ],
  "OGEMA": [
    "56569",
    "MN"
  ],
  "OWEN": [
    "54460",
    "WI"
  ],
  "PELICAN LAKE": [
    "54463",
    "WI"
  ],
  "PHLOX": [
    "54464",
    "WI"
  ],
  "PICKEREL": [
    "54465",
    "WI"
  ],
  "PORT EDWARDS": [
    "54469",
    "WI"
  ],
  "RIB LAKE": [
    "54470",
    "WI"
  ],
  "RINGLE": [
    "54471",
    "WI"
  ],
  "ROSHOLT": [
    "57260",
    "SD"
  ],
  "ROTHSCHILD": [
    "54474",
    "WI"
  ],
  "SCHOFIELD": [
    "54476",
    "WI"
  ],
  "STETSONVILLE": [
    "54480",
    "WI"
  ],
  "STEVENS POINT": [
    "54482",
    "WI"
  ],
  "SUMMIT LAKE": [
    "54485",
    "WI"
  ],
  "TIGERTON": [
    "54486",
    "WI"
  ],
  "VESPER": [
    "54489",
    "WI"
  ],
  "WESTBORO": [
    "64498",
    "MO"
  ],
  "WISCONSIN RAPIDS": [
    "54495",
    "WI"
  ],
  "WITHEE": [
    "54498",
    "WI"
  ],
  "WITTENBERG": [
    "54499",
    "WI"
  ],
  "RHINELANDER": [
    "54501",
    "WI"
  ],
  "ARGONNE": [
    "54511",
    "WI"
  ],
  "BOULDER JUNCTION": [
    "54512",
    "WI"
  ],
  "BRANTWOOD": [
    "54513",
    "WI"
  ],
  "BUTTERNUT": [
    "54514",
    "WI"
  ],
  "CLAM LAKE": [
    "54517",
    "WI"
  ],
  "CRANDON": [
    "54520",
    "WI"
  ],
  "EAGLE RIVER": [
    "99577",
    "AK"
  ],
  "FIFIELD": [
    "54524",
    "WI"
  ],
  "GILE": [
    "54525",
    "WI"
  ],
  "GLEN FLORA": [
    "77443",
    "TX"
  ],
  "HARSHAW": [
    "54529",
    "WI"
  ],
  "HAWKINS": [
    "75765",
    "TX"
  ],
  "HAZELHURST": [
    "54531",
    "WI"
  ],
  "HEAFFORD JUNCTION": [
    "54532",
    "WI"
  ],
  "IRON BELT": [
    "54536",
    "WI"
  ],
  "KENNAN": [
    "54537",
    "WI"
  ],
  "LAC DU FLAMBEAU": [
    "54538",
    "WI"
  ],
  "LAKE TOMAHAWK": [
    "54539",
    "WI"
  ],
  "LAONA": [
    "54541",
    "WI"
  ],
  "MC NAUGHTON": [
    "54543",
    "WI"
  ],
  "MANITOWISH WATERS": [
    "54545",
    "WI"
  ],
  "MELLEN": [
    "54546",
    "WI"
  ],
  "MINOCQUA": [
    "54548",
    "WI"
  ],
  "MONTREAL": [
    "65591",
    "MO"
  ],
  "PARK FALLS": [
    "54552",
    "WI"
  ],
  "PRENTICE": [
    "54556",
    "WI"
  ],
  "SAINT GERMAIN": [
    "54558",
    "WI"
  ],
  "SAXON": [
    "54559",
    "WI"
  ],
  "SAYNER": [
    "54560",
    "WI"
  ],
  "THREE LAKES": [
    "54562",
    "WI"
  ],
  "TONY": [
    "54563",
    "WI"
  ],
  "UPSON": [
    "54565",
    "WI"
  ],
  "WABENO": [
    "54566",
    "WI"
  ],
  "ALMA CENTER": [
    "54611",
    "WI"
  ],
  "ARKDALE": [
    "54613",
    "WI"
  ],
  "BLACK RIVER FALLS": [
    "54615",
    "WI"
  ],
  "CAMP DOUGLAS": [
    "54618",
    "WI"
  ],
  "CASHTON": [
    "54619",
    "WI"
  ],
  "CHASEBURG": [
    "54621",
    "WI"
  ],
  "COCHRANE": [
    "54622",
    "WI"
  ],
  "COON VALLEY": [
    "54623",
    "WI"
  ],
  "DODGE": [
    "77334",
    "TX"
  ],
  "ETTRICK": [
    "54627",
    "WI"
  ],
  "FERRYVILLE": [
    "54628",
    "WI"
  ],
  "GAYS MILLS": [
    "54631",
    "WI"
  ],
  "HIXTON": [
    "54635",
    "WI"
  ],
  "HOLMEN": [
    "54636",
    "WI"
  ],
  "HUSTLER": [
    "54637",
    "WI"
  ],
  "LA FARGE": [
    "54639",
    "WI"
  ],
  "MILLSTON": [
    "54643",
    "WI"
  ],
  "MINDORO": [
    "54644",
    "WI"
  ],
  "NECEDAH": [
    "54646",
    "WI"
  ],
  "ONALASKA": [
    "98570",
    "WA"
  ],
  "READSTOWN": [
    "54652",
    "WI"
  ],
  "SOLDIERS GROVE": [
    "54655",
    "WI"
  ],
  "TOMAH": [
    "54660",
    "WI"
  ],
  "TREMPEALEAU": [
    "54661",
    "WI"
  ],
  "VIROQUA": [
    "54665",
    "WI"
  ],
  "WARRENS": [
    "54666",
    "WI"
  ],
  "WESTBY": [
    "59275",
    "MT"
  ],
  "ARKANSAW": [
    "54721",
    "WI"
  ],
  "BLOOMER": [
    "54724",
    "WI"
  ],
  "BOYCEVILLE": [
    "54725",
    "WI"
  ],
  "BOYD": [
    "76023",
    "TX"
  ],
  "CADOTT": [
    "54727",
    "WI"
  ],
  "CHETEK": [
    "54728",
    "WI"
  ],
  "CHIPPEWA FALLS": [
    "54729",
    "WI"
  ],
  "CONRATH": [
    "54731",
    "WI"
  ],
  "DOWNING": [
    "63536",
    "MO"
  ],
  "EAU GALLE": [
    "54737",
    "WI"
  ],
  "ELEVA": [
    "54738",
    "WI"
  ],
  "ELK MOUND": [
    "54739",
    "WI"
  ],
  "FAIRCHILD": [
    "54741",
    "WI"
  ],
  "FALL CREEK": [
    "97438",
    "OR"
  ],
  "HOLCOMBE": [
    "54745",
    "WI"
  ],
  "JIM FALLS": [
    "54748",
    "WI"
  ],
  "KNAPP": [
    "54749",
    "WI"
  ],
  "MAIDEN ROCK": [
    "54750",
    "WI"
  ],
  "MENOMONIE": [
    "54751",
    "WI"
  ],
  "MERRILLAN": [
    "54754",
    "WI"
  ],
  "MONDOVI": [
    "54755",
    "WI"
  ],
  "NEW AUBURN": [
    "55366",
    "MN"
  ],
  "PEPIN": [
    "54759",
    "WI"
  ],
  "PIGEON FALLS": [
    "54760",
    "WI"
  ],
  "PLUM CITY": [
    "54761",
    "WI"
  ],
  "PRAIRIE FARM": [
    "54762",
    "WI"
  ],
  "STRUM": [
    "54770",
    "WI"
  ],
  "THORP": [
    "98946",
    "WA"
  ],
  "SPOONER": [
    "54801",
    "WI"
  ],
  "ALMENA": [
    "67622",
    "KS"
  ],
  "BALSAM LAKE": [
    "54810",
    "WI"
  ],
  "BARRON": [
    "54812",
    "WI"
  ],
  "BARRONETT": [
    "54813",
    "WI"
  ],
  "BAYFIELD": [
    "81122",
    "CO"
  ],
  "BRILL": [
    "54818",
    "WI"
  ],
  "BRULE": [
    "69127",
    "NE"
  ],
  "CENTURIA": [
    "54824",
    "WI"
  ],
  "CORNUCOPIA": [
    "54827",
    "WI"
  ],
  "COUDERAY": [
    "54828",
    "WI"
  ],
  "DRUMMOND": [
    "73735",
    "OK"
  ],
  "EXELAND": [
    "54835",
    "WI"
  ],
  "GRAND VIEW": [
    "83624",
    "ID"
  ],
  "HAUGEN": [
    "54841",
    "WI"
  ],
  "HAYWARD": [
    "94557",
    "CA"
  ],
  "HERBSTER": [
    "54844",
    "WI"
  ],
  "LAKE NEBAGAMON": [
    "54849",
    "WI"
  ],
  "LA POINTE": [
    "54850",
    "WI"
  ],
  "LUCK": [
    "54853",
    "WI"
  ],
  "MIKANA": [
    "54857",
    "WI"
  ],
  "MINONG": [
    "54859",
    "WI"
  ],
  "ODANAH": [
    "54861",
    "WI"
  ],
  "OJIBWA": [
    "54862",
    "WI"
  ],
  "POPLAR": [
    "59255",
    "MT"
  ],
  "PORT WING": [
    "54865",
    "WI"
  ],
  "RADISSON": [
    "54867",
    "WI"
  ],
  "RICE LAKE": [
    "54868",
    "WI"
  ],
  "SARONA": [
    "54870",
    "WI"
  ],
  "SHELL LAKE": [
    "54871",
    "WI"
  ],
  "SIREN": [
    "54872",
    "WI"
  ],
  "SOLON SPRINGS": [
    "54873",
    "WI"
  ],
  "STONE LAKE": [
    "54876",
    "WI"
  ],
  "TREGO": [
    "59934",
    "MT"
  ],
  "TURTLE LAKE": [
    "58575",
    "ND"
  ],
  "WASCOTT": [
    "54890",
    "WI"
  ],
  "WEYERHAEUSER": [
    "54895",
    "WI"
  ],
  "WINTER": [
    "54896",
    "WI"
  ],
  "OSHKOSH": [
    "69190",
    "NE"
  ],
  "BIG FALLS": [
    "56627",
    "MN"
  ],
  "BUTTE DES MORTS": [
    "54927",
    "WI"
  ],
  "CAROLINE": [
    "54928",
    "WI"
  ],
  "EMBARRASS": [
    "55732",
    "MN"
  ],
  "FOND DU LAC": [
    "54937",
    "WI"
  ],
  "GREEN LAKE": [
    "54941",
    "WI"
  ],
  "IOLA": [
    "77861",
    "TX"
  ],
  "LARSEN": [
    "54947",
    "WI"
  ],
  "LEOPOLIS": [
    "54948",
    "WI"
  ],
  "MANAWA": [
    "54949",
    "WI"
  ],
  "MENASHA": [
    "54952",
    "WI"
  ],
  "NEENAH": [
    "54957",
    "WI"
  ],
  "NESHKORO": [
    "54960",
    "WI"
  ],
  "OMRO": [
    "54963",
    "WI"
  ],
  "PICKETT": [
    "54964",
    "WI"
  ],
  "PINE RIVER": [
    "56474",
    "MN"
  ],
  "POY SIPPI": [
    "54967",
    "WI"
  ],
  "REDGRANITE": [
    "54970",
    "WI"
  ],
  "RIPON": [
    "95366",
    "CA"
  ],
  "SAXEVILLE": [
    "54976",
    "WI"
  ],
  "SCANDINAVIA": [
    "54977",
    "WI"
  ],
  "TILLEDA": [
    "54978",
    "WI"
  ],
  "VAN DYNE": [
    "54979",
    "WI"
  ],
  "WAUKAU": [
    "54980",
    "WI"
  ],
  "WAUPACA": [
    "54981",
    "WI"
  ],
  "WAUTOMA": [
    "54982",
    "WI"
  ],
  "WEYAUWEGA": [
    "54983",
    "WI"
  ],
  "WILD ROSE": [
    "54984",
    "WI"
  ],
  "WINNEBAGO": [
    "68071",
    "NE"
  ],
  "WINNECONNE": [
    "54986",
    "WI"
  ],
  "ALMELUND": [
    "55002",
    "MN"
  ],
  "BRAHAM": [
    "55006",
    "MN"
  ],
  "BROOK PARK": [
    "55007",
    "MN"
  ],
  "CANNON FALLS": [
    "55009",
    "MN"
  ],
  "CASTLE ROCK": [
    "98611",
    "WA"
  ],
  "CENTER CITY": [
    "55012",
    "MN"
  ],
  "CHISAGO CITY": [
    "55013",
    "MN"
  ],
  "CIRCLE PINES": [
    "55014",
    "MN"
  ],
  "DALBO": [
    "55017",
    "MN"
  ],
  "ELKO NEW MARKET": [
    "55054",
    "MN"
  ],
  "FARIBAULT": [
    "55021",
    "MN"
  ],
  "FOREST LAKE": [
    "55025",
    "MN"
  ],
  "FRONTENAC": [
    "66763",
    "KS"
  ],
  "GOODHUE": [
    "55027",
    "MN"
  ],
  "GRASSTON": [
    "55030",
    "MN"
  ],
  "HENRIETTE": [
    "55036",
    "MN"
  ],
  "HUGO": [
    "80821",
    "CO"
  ],
  "ISANTI": [
    "55040",
    "MN"
  ],
  "LAKE ELMO": [
    "55042",
    "MN"
  ],
  "LINDSTROM": [
    "55045",
    "MN"
  ],
  "LONSDALE": [
    "72087",
    "AR"
  ],
  "MARINE ON SAINT CROIX": [
    "55047",
    "MN"
  ],
  "MORA": [
    "87732",
    "NM"
  ],
  "NERSTRAND": [
    "55053",
    "MN"
  ],
  "OWATONNA": [
    "55060",
    "MN"
  ],
  "RED WING": [
    "55066",
    "MN"
  ],
  "ROSEMOUNT": [
    "55068",
    "MN"
  ],
  "RUSH CITY": [
    "55069",
    "MN"
  ],
  "SAINT PAUL PARK": [
    "55071",
    "MN"
  ],
  "SCANDIA": [
    "66966",
    "KS"
  ],
  "SHAFER": [
    "55074",
    "MN"
  ],
  "SOUTH SAINT PAUL": [
    "55075",
    "MN"
  ],
  "INVER GROVE HEIGHTS": [
    "55077",
    "MN"
  ],
  "STANCHFIELD": [
    "55080",
    "MN"
  ],
  "TAYLORS FALLS": [
    "55084",
    "MN"
  ],
  "VERMILLION": [
    "66544",
    "KS"
  ],
  "WILLERNIE": [
    "55090",
    "MN"
  ],
  "ANOKA": [
    "55303",
    "MN"
  ],
  "BIG LAKE": [
    "99652",
    "AK"
  ],
  "BIRD ISLAND": [
    "55310",
    "MN"
  ],
  "BROWNTON": [
    "55312",
    "MN"
  ],
  "BUFFALO LAKE": [
    "55314",
    "MN"
  ],
  "CHAMPLIN": [
    "55316",
    "MN"
  ],
  "CHANHASSEN": [
    "55317",
    "MN"
  ],
  "CHASKA": [
    "55318",
    "MN"
  ],
  "COKATO": [
    "55321",
    "MN"
  ],
  "CRYSTAL BAY": [
    "89402",
    "NV"
  ],
  "DARWIN": [
    "93522",
    "CA"
  ],
  "DASSEL": [
    "55325",
    "MN"
  ],
  "EDEN VALLEY": [
    "55329",
    "MN"
  ],
  "ELK RIVER": [
    "83827",
    "ID"
  ],
  "EXCELSIOR": [
    "55331",
    "MN"
  ],
  "GIBBON": [
    "68840",
    "NE"
  ],
  "GREEN ISLE": [
    "55338",
    "MN"
  ],
  "HAMEL": [
    "62046",
    "IL"
  ],
  "EDEN PRAIRIE": [
    "55347",
    "MN"
  ],
  "MINNETONKA": [
    "55345",
    "MN"
  ],
  "MAPLE PLAIN": [
    "55359",
    "MN"
  ],
  "HOWARD LAKE": [
    "55349",
    "MN"
  ],
  "HUTCHINSON": [
    "67504",
    "KS"
  ],
  "LESTER PRAIRIE": [
    "55354",
    "MN"
  ],
  "MAPLE LAKE": [
    "55358",
    "MN"
  ],
  "MAYER": [
    "86333",
    "AZ"
  ],
  "MINNETONKA BEACH": [
    "55361",
    "MN"
  ],
  "MOUND": [
    "76558",
    "TX"
  ],
  "NEW GERMANY": [
    "55367",
    "MN"
  ],
  "NORWOOD YOUNG AMERICA": [
    "55368",
    "MN"
  ],
  "PLATO": [
    "65552",
    "MO"
  ],
  "PRIOR LAKE": [
    "55372",
    "MN"
  ],
  "SAINT BONIFACIUS": [
    "55375",
    "MN"
  ],
  "SANTIAGO": [
    "55377",
    "MN"
  ],
  "SHAKOPEE": [
    "55379",
    "MN"
  ],
  "SPRING PARK": [
    "55384",
    "MN"
  ],
  "WACONIA": [
    "55387",
    "MN"
  ],
  "WAYZATA": [
    "55391",
    "MN"
  ],
  "YOUNG AMERICA": [
    "55397",
    "MN"
  ],
  "ZIMMERMAN": [
    "55398",
    "MN"
  ],
  "BEAVER BAY": [
    "55601",
    "MN"
  ],
  "BRIMSON": [
    "55602",
    "MN"
  ],
  "FINLAND": [
    "55603",
    "MN"
  ],
  "GRAND PORTAGE": [
    "55605",
    "MN"
  ],
  "HOVLAND": [
    "55606",
    "MN"
  ],
  "ISABELLA": [
    "73747",
    "OK"
  ],
  "KNIFE RIVER": [
    "55609",
    "MN"
  ],
  "LUTSEN": [
    "55612",
    "MN"
  ],
  "SCHROEDER": [
    "55613",
    "MN"
  ],
  "TOFTE": [
    "55615",
    "MN"
  ],
  "TWO HARBORS": [
    "55616",
    "MN"
  ],
  "ADOLPH": [
    "55701",
    "MN"
  ],
  "ALBORN": [
    "55702",
    "MN"
  ],
  "ANGORA": [
    "55703",
    "MN"
  ],
  "ASKOV": [
    "55704",
    "MN"
  ],
  "BABBITT": [
    "55706",
    "MN"
  ],
  "BIWABIK": [
    "55708",
    "MN"
  ],
  "BOVEY": [
    "55709",
    "MN"
  ],
  "CANYON": [
    "94516",
    "CA"
  ],
  "CHISHOLM": [
    "55719",
    "MN"
  ],
  "CLOQUET": [
    "55720",
    "MN"
  ],
  "COLERAINE": [
    "55722",
    "MN"
  ],
  "COOK": [
    "68329",
    "NE"
  ],
  "COTTON": [
    "55724",
    "MN"
  ],
  "CRANE LAKE": [
    "55725",
    "MN"
  ],
  "ESKO": [
    "55733",
    "MN"
  ],
  "EVELETH": [
    "55734",
    "MN"
  ],
  "FINLAYSON": [
    "55735",
    "MN"
  ],
  "FLOODWOOD": [
    "55736",
    "MN"
  ],
  "FORBES": [
    "58439",
    "ND"
  ],
  "HIBBING": [
    "55746",
    "MN"
  ],
  "HILL CITY": [
    "67642",
    "KS"
  ],
  "HOYT LAKES": [
    "55750",
    "MN"
  ],
  "IRON": [
    "55751",
    "MN"
  ],
  "JACOBSON": [
    "55752",
    "MN"
  ],
  "KEEWATIN": [
    "55753",
    "MN"
  ],
  "KERRICK": [
    "79051",
    "TX"
  ],
  "KETTLE RIVER": [
    "55757",
    "MN"
  ],
  "KINNEY": [
    "55758",
    "MN"
  ],
  "MCGREGOR": [
    "58755",
    "ND"
  ],
  "MAKINEN": [
    "55763",
    "MN"
  ],
  "MEADOWLANDS": [
    "55765",
    "MN"
  ],
  "MOOSE LAKE": [
    "55767",
    "MN"
  ],
  "MOUNTAIN IRON": [
    "55768",
    "MN"
  ],
  "NASHWAUK": [
    "55769",
    "MN"
  ],
  "ORR": [
    "55771",
    "MN"
  ],
  "NETT LAKE": [
    "55772",
    "MN"
  ],
  "PENGILLY": [
    "55775",
    "MN"
  ],
  "SIDE LAKE": [
    "55781",
    "MN"
  ],
  "SOUDAN": [
    "55782",
    "MN"
  ],
  "STURGEON LAKE": [
    "55783",
    "MN"
  ],
  "SWAN RIVER": [
    "55784",
    "MN"
  ],
  "SWATARA": [
    "55785",
    "MN"
  ],
  "TACONITE": [
    "55786",
    "MN"
  ],
  "TAMARACK": [
    "55787",
    "MN"
  ],
  "TWIG": [
    "55791",
    "MN"
  ],
  "VIRGINIA": [
    "68458",
    "NE"
  ],
  "WARBA": [
    "55793",
    "MN"
  ],
  "WILLOW RIVER": [
    "55795",
    "MN"
  ],
  "WRENSHALL": [
    "55797",
    "MN"
  ],
  "WRIGHT": [
    "82732",
    "WY"
  ],
  "ALTURA": [
    "55910",
    "MN"
  ],
  "BLOOMING PRAIRIE": [
    "55917",
    "MN"
  ],
  "BROWNSDALE": [
    "55918",
    "MN"
  ],
  "DAKOTA": [
    "61018",
    "IL"
  ],
  "DODGE CENTER": [
    "55927",
    "MN"
  ],
  "EITZEN": [
    "55931",
    "MN"
  ],
  "EYOTA": [
    "55934",
    "MN"
  ],
  "GRAND MEADOW": [
    "55936",
    "MN"
  ],
  "HAYFIELD": [
    "55940",
    "MN"
  ],
  "HOKAH": [
    "55941",
    "MN"
  ],
  "KASSON": [
    "55944",
    "MN"
  ],
  "LA CRESCENT": [
    "55947",
    "MN"
  ],
  "LYLE": [
    "98635",
    "WA"
  ],
  "MABEL": [
    "55954",
    "MN"
  ],
  "MANTORVILLE": [
    "55955",
    "MN"
  ],
  "MAZEPPA": [
    "55956",
    "MN"
  ],
  "MINNESOTA CITY": [
    "55959",
    "MN"
  ],
  "ORONOCO": [
    "55960",
    "MN"
  ],
  "READS LANDING": [
    "55968",
    "MN"
  ],
  "ROLLINGSTONE": [
    "55969",
    "MN"
  ],
  "ROSE CREEK": [
    "55970",
    "MN"
  ],
  "SARGEANT": [
    "55973",
    "MN"
  ],
  "STEWARTVILLE": [
    "55976",
    "MN"
  ],
  "TAOPI": [
    "55977",
    "MN"
  ],
  "WABASHA": [
    "55981",
    "MN"
  ],
  "WANAMINGO": [
    "55983",
    "MN"
  ],
  "WEST CONCORD": [
    "55985",
    "MN"
  ],
  "WYKOFF": [
    "55990",
    "MN"
  ],
  "ZUMBRO FALLS": [
    "55991",
    "MN"
  ],
  "ZUMBROTA": [
    "55992",
    "MN"
  ],
  "MANKATO": [
    "66956",
    "KS"
  ],
  "ALBERT LEA": [
    "56007",
    "MN"
  ],
  "BLUE EARTH": [
    "56013",
    "MN"
  ],
  "BRICELYN": [
    "56014",
    "MN"
  ],
  "CLARKS GROVE": [
    "56016",
    "MN"
  ],
  "COMFREY": [
    "56019",
    "MN"
  ],
  "CONGER": [
    "56020",
    "MN"
  ],
  "DARFUR": [
    "56022",
    "MN"
  ],
  "ELYSIAN": [
    "56028",
    "MN"
  ],
  "EMMONS": [
    "56029",
    "MN"
  ],
  "ESSIG": [
    "56030",
    "MN"
  ],
  "FREEBORN": [
    "56032",
    "MN"
  ],
  "FROST": [
    "76641",
    "TX"
  ],
  "GOOD THUNDER": [
    "56037",
    "MN"
  ],
  "GRANADA": [
    "81041",
    "CO"
  ],
  "HANSKA": [
    "56041",
    "MN"
  ],
  "HUNTLEY": [
    "60142",
    "IL"
  ],
  "KASOTA": [
    "56050",
    "MN"
  ],
  "KIESTER": [
    "56051",
    "MN"
  ],
  "KILKENNY": [
    "56052",
    "MN"
  ],
  "LAKE CRYSTAL": [
    "56055",
    "MN"
  ],
  "LE CENTER": [
    "56057",
    "MN"
  ],
  "LE SUEUR": [
    "56058",
    "MN"
  ],
  "MADELIA": [
    "56062",
    "MN"
  ],
  "MADISON LAKE": [
    "56063",
    "MN"
  ],
  "MINNESOTA LAKE": [
    "56068",
    "MN"
  ],
  "NEW PRAGUE": [
    "56071",
    "MN"
  ],
  "NEW RICHLAND": [
    "56072",
    "MN"
  ],
  "NEW ULM": [
    "78950",
    "TX"
  ],
  "NICOLLET": [
    "56074",
    "MN"
  ],
  "NORTHROP": [
    "56075",
    "MN"
  ],
  "SAINT PETER": [
    "62880",
    "IL"
  ],
  "SLEEPY EYE": [
    "56085",
    "MN"
  ],
  "TRUMAN": [
    "56088",
    "MN"
  ],
  "WASECA": [
    "56093",
    "MN"
  ],
  "WINDOM": [
    "75492",
    "TX"
  ],
  "ARCO": [
    "83213",
    "ID"
  ],
  "BALATON": [
    "56115",
    "MN"
  ],
  "BEAVER CREEK": [
    "56116",
    "MN"
  ],
  "BIGELOW": [
    "72016",
    "AR"
  ],
  "BINGHAM LAKE": [
    "56118",
    "MN"
  ],
  "BUTTERFIELD": [
    "65623",
    "MO"
  ],
  "CEYLON": [
    "56121",
    "MN"
  ],
  "DOVRAY": [
    "56125",
    "MN"
  ],
  "DUNNELL": [
    "56127",
    "MN"
  ],
  "GARVIN": [
    "74736",
    "OK"
  ],
  "HERON LAKE": [
    "56137",
    "MN"
  ],
  "IHLEN": [
    "56140",
    "MN"
  ],
  "IONA": [
    "83427",
    "ID"
  ],
  "JEFFERS": [
    "56145",
    "MN"
  ],
  "KANARANZI": [
    "56146",
    "MN"
  ],
  "KENNETH": [
    "56147",
    "MN"
  ],
  "LAKE BENTON": [
    "56149",
    "MN"
  ],
  "LAKEFIELD": [
    "56150",
    "MN"
  ],
  "LAKE WILSON": [
    "56151",
    "MN"
  ],
  "LAMBERTON": [
    "56152",
    "MN"
  ],
  "LEOTA": [
    "56153",
    "MN"
  ],
  "LISMORE": [
    "56155",
    "MN"
  ],
  "LYND": [
    "56157",
    "MN"
  ],
  "MOUNTAIN LAKE": [
    "56159",
    "MN"
  ],
  "ODIN": [
    "62870",
    "IL"
  ],
  "OKABENA": [
    "56161",
    "MN"
  ],
  "ORMSBY": [
    "56162",
    "MN"
  ],
  "PIPESTONE": [
    "56164",
    "MN"
  ],
  "RUSHMORE": [
    "56168",
    "MN"
  ],
  "RUTHTON": [
    "56170",
    "MN"
  ],
  "SHERBURN": [
    "56171",
    "MN"
  ],
  "SLAYTON": [
    "56172",
    "MN"
  ],
  "STEEN": [
    "56173",
    "MN"
  ],
  "STORDEN": [
    "56174",
    "MN"
  ],
  "TRIMONT": [
    "56176",
    "MN"
  ],
  "WILMONT": [
    "56185",
    "MN"
  ],
  "WILLMAR": [
    "56201",
    "MN"
  ],
  "BARRY": [
    "75102",
    "TX"
  ],
  "BEARDSLEY": [
    "56211",
    "MN"
  ],
  "BELVIEW": [
    "56214",
    "MN"
  ],
  "BLOMKEST": [
    "56216",
    "MN"
  ],
  "BROWNS VALLEY": [
    "95918",
    "CA"
  ],
  "CANBY": [
    "97013",
    "OR"
  ],
  "CHOKIO": [
    "56221",
    "MN"
  ],
  "CLARA CITY": [
    "56222",
    "MN"
  ],
  "CLARKFIELD": [
    "56223",
    "MN"
  ],
  "CLONTARF": [
    "56226",
    "MN"
  ],
  "CORRELL": [
    "56227",
    "MN"
  ],
  "COSMOS": [
    "56228",
    "MN"
  ],
  "DANUBE": [
    "56230",
    "MN"
  ],
  "DONNELLY": [
    "83615",
    "ID"
  ],
  "ECHO": [
    "97826",
    "OR"
  ],
  "HANLEY FALLS": [
    "56245",
    "MN"
  ],
  "KANDIYOHI": [
    "56251",
    "MN"
  ],
  "KERKHOVEN": [
    "56252",
    "MN"
  ],
  "LAKE LILLIAN": [
    "56253",
    "MN"
  ],
  "LUCAN": [
    "56255",
    "MN"
  ],
  "MINNEOTA": [
    "56264",
    "MN"
  ],
  "MONTEVIDEO": [
    "56265",
    "MN"
  ],
  "PENNOCK": [
    "56279",
    "MN"
  ],
  "PRINSBURG": [
    "56281",
    "MN"
  ],
  "REDWOOD FALLS": [
    "56283",
    "MN"
  ],
  "RENVILLE": [
    "56284",
    "MN"
  ],
  "SACRED HEART": [
    "56285",
    "MN"
  ],
  "SPICER": [
    "56288",
    "MN"
  ],
  "SUNBURG": [
    "56289",
    "MN"
  ],
  "WANDA": [
    "56294",
    "MN"
  ],
  "WATSON": [
    "74963",
    "OK"
  ],
  "WHEATON": [
    "64874",
    "MO"
  ],
  "WOOD LAKE": [
    "69221",
    "NE"
  ],
  "BARRETT": [
    "56311",
    "MN"
  ],
  "BOCK": [
    "56313",
    "MN"
  ],
  "BOWLUS": [
    "56314",
    "MN"
  ],
  "BROOTEN": [
    "56316",
    "MN"
  ],
  "BUCKMAN": [
    "56317",
    "MN"
  ],
  "BURTRUM": [
    "56318",
    "MN"
  ],
  "CARLOS": [
    "56319",
    "MN"
  ],
  "CYRUS": [
    "56323",
    "MN"
  ],
  "ELROSA": [
    "56325",
    "MN"
  ],
  "FLENSBURG": [
    "56328",
    "MN"
  ],
  "FORESTON": [
    "56330",
    "MN"
  ],
  "GREENWALD": [
    "56335",
    "MN"
  ],
  "GREY EAGLE": [
    "56336",
    "MN"
  ],
  "HOLDINGFORD": [
    "56340",
    "MN"
  ],
  "HOLMES CITY": [
    "56341",
    "MN"
  ],
  "ISLE": [
    "56342",
    "MN"
  ],
  "LASTRUP": [
    "56344",
    "MN"
  ],
  "LONG PRAIRIE": [
    "56347",
    "MN"
  ],
  "MC GRATH": [
    "99627",
    "AK"
  ],
  "MILACA": [
    "56353",
    "MN"
  ],
  "MILTONA": [
    "56354",
    "MN"
  ],
  "NEW MUNICH": [
    "56356",
    "MN"
  ],
  "OGILVIE": [
    "56358",
    "MN"
  ],
  "ONAMIA": [
    "56359",
    "MN"
  ],
  "OSAKIS": [
    "56360",
    "MN"
  ],
  "PARKERS PRAIRIE": [
    "56361",
    "MN"
  ],
  "PEASE": [
    "56363",
    "MN"
  ],
  "PIERZ": [
    "56364",
    "MN"
  ],
  "SAINT MARTIN": [
    "56376",
    "MN"
  ],
  "SARTELL": [
    "56377",
    "MN"
  ],
  "SAUK CENTRE": [
    "56378",
    "MN"
  ],
  "SAUK RAPIDS": [
    "56379",
    "MN"
  ],
  "STARBUCK": [
    "99359",
    "WA"
  ],
  "SWANVILLE": [
    "56382",
    "MN"
  ],
  "UPSALA": [
    "56384",
    "MN"
  ],
  "VILLARD": [
    "56385",
    "MN"
  ],
  "WAHKON": [
    "56386",
    "MN"
  ],
  "WAITE PARK": [
    "56387",
    "MN"
  ],
  "BRAINERD": [
    "56401",
    "MN"
  ],
  "AITKIN": [
    "56431",
    "MN"
  ],
  "AKELEY": [
    "56433",
    "MN"
  ],
  "ALDRICH": [
    "65601",
    "MO"
  ],
  "BACKUS": [
    "56435",
    "MN"
  ],
  "BERTHA": [
    "56437",
    "MN"
  ],
  "BROWERVILLE": [
    "56438",
    "MN"
  ],
  "CLARISSA": [
    "56440",
    "MN"
  ],
  "CROSSLAKE": [
    "56442",
    "MN"
  ],
  "DEERWOOD": [
    "56444",
    "MN"
  ],
  "EAGLE BEND": [
    "56446",
    "MN"
  ],
  "EMILY": [
    "56447",
    "MN"
  ],
  "FIFTY LAKES": [
    "56448",
    "MN"
  ],
  "FORT RIPLEY": [
    "56449",
    "MN"
  ],
  "LAKE HUBERT": [
    "56459",
    "MN"
  ],
  "MENAHGA": [
    "56464",
    "MN"
  ],
  "MOTLEY": [
    "56466",
    "MN"
  ],
  "NEVIS": [
    "56467",
    "MN"
  ],
  "NISSWA": [
    "56468",
    "MN"
  ],
  "PALISADE": [
    "81526",
    "CO"
  ],
  "PARK RAPIDS": [
    "56470",
    "MN"
  ],
  "PEQUOT LAKES": [
    "56472",
    "MN"
  ],
  "PILLAGER": [
    "56473",
    "MN"
  ],
  "SEBEKA": [
    "56477",
    "MN"
  ],
  "NIMROD": [
    "56478",
    "MN"
  ],
  "STAPLES": [
    "78670",
    "TX"
  ],
  "VERNDALE": [
    "56481",
    "MN"
  ],
  "DETROIT LAKES": [
    "56502",
    "MN"
  ],
  "BATTLE LAKE": [
    "56515",
    "MN"
  ],
  "BEJOU": [
    "56516",
    "MN"
  ],
  "BELTRAMI": [
    "56517",
    "MN"
  ],
  "BORUP": [
    "56519",
    "MN"
  ],
  "CLITHERALL": [
    "56524",
    "MN"
  ],
  "DEER CREEK": [
    "74636",
    "OK"
  ],
  "DENT": [
    "56528",
    "MN"
  ],
  "DILWORTH": [
    "56529",
    "MN"
  ],
  "ELBOW LAKE": [
    "56531",
    "MN"
  ],
  "ERHARD": [
    "56534",
    "MN"
  ],
  "ERSKINE": [
    "56535",
    "MN"
  ],
  "FERGUS FALLS": [
    "56538",
    "MN"
  ],
  "FLOM": [
    "56541",
    "MN"
  ],
  "FOSSTON": [
    "56542",
    "MN"
  ],
  "FOXHOME": [
    "56543",
    "MN"
  ],
  "FRAZEE": [
    "56544",
    "MN"
  ],
  "HALSTAD": [
    "56548",
    "MN"
  ],
  "HENDRUM": [
    "56550",
    "MN"
  ],
  "HITTERDAL": [
    "56552",
    "MN"
  ],
  "MCINTOSH": [
    "87032",
    "NM"
  ],
  "MAHNOMEN": [
    "56557",
    "MN"
  ],
  "NAYTAHWAUSH": [
    "56566",
    "MN"
  ],
  "NIELSVILLE": [
    "56568",
    "MN"
  ],
  "OTTERTAIL": [
    "56571",
    "MN"
  ],
  "PELICAN RAPIDS": [
    "56572",
    "MN"
  ],
  "PERLEY": [
    "56574",
    "MN"
  ],
  "PONSFORD": [
    "56575",
    "MN"
  ],
  "ROCHERT": [
    "56578",
    "MN"
  ],
  "ROTHSAY": [
    "56579",
    "MN"
  ],
  "SABIN": [
    "56580",
    "MN"
  ],
  "SHELLY": [
    "56581",
    "MN"
  ],
  "TINTAH": [
    "56583",
    "MN"
  ],
  "TWIN VALLEY": [
    "56584",
    "MN"
  ],
  "ULEN": [
    "56585",
    "MN"
  ],
  "VERGAS": [
    "56587",
    "MN"
  ],
  "VINING": [
    "56588",
    "MN"
  ],
  "WAUBUN": [
    "56589",
    "MN"
  ],
  "WHITE EARTH": [
    "58794",
    "ND"
  ],
  "WINGER": [
    "56592",
    "MN"
  ],
  "WOLF LAKE": [
    "62998",
    "IL"
  ],
  "WOLVERTON": [
    "56594",
    "MN"
  ],
  "BEMIDJI": [
    "56619",
    "MN"
  ],
  "BAUDETTE": [
    "56623",
    "MN"
  ],
  "BIGFORK": [
    "59911",
    "MT"
  ],
  "BIRCHDALE": [
    "56629",
    "MN"
  ],
  "BLACKDUCK": [
    "56630",
    "MN"
  ],
  "CASS LAKE": [
    "56633",
    "MN"
  ],
  "CLEARBROOK": [
    "56634",
    "MN"
  ],
  "TALMOON": [
    "56637",
    "MN"
  ],
  "EFFIE": [
    "71331",
    "LA"
  ],
  "FEDERAL DAM": [
    "56641",
    "MN"
  ],
  "GONVICK": [
    "56644",
    "MN"
  ],
  "GULLY": [
    "56646",
    "MN"
  ],
  "HINES": [
    "97738",
    "OR"
  ],
  "INTERNATIONAL FALLS": [
    "56649",
    "MN"
  ],
  "KELLIHER": [
    "56650",
    "MN"
  ],
  "LENGBY": [
    "56651",
    "MN"
  ],
  "LITTLEFORK": [
    "56653",
    "MN"
  ],
  "LOMAN": [
    "56654",
    "MN"
  ],
  "LONGVILLE": [
    "70652",
    "LA"
  ],
  "MARCELL": [
    "56657",
    "MN"
  ],
  "MAX": [
    "69037",
    "NE"
  ],
  "NORTHOME": [
    "56661",
    "MN"
  ],
  "OUTING": [
    "56662",
    "MN"
  ],
  "PUPOSKY": [
    "56667",
    "MN"
  ],
  "RANIER": [
    "56668",
    "MN"
  ],
  "KABETOGAMA": [
    "56669",
    "MN"
  ],
  "REDBY": [
    "56670",
    "MN"
  ],
  "REDLAKE": [
    "56671",
    "MN"
  ],
  "REMER": [
    "56672",
    "MN"
  ],
  "SHEVLIN": [
    "56676",
    "MN"
  ],
  "SOLWAY": [
    "56678",
    "MN"
  ],
  "SOUTH INTERNATIONAL FALLS": [
    "56679",
    "MN"
  ],
  "SQUAW LAKE": [
    "56681",
    "MN"
  ],
  "TENSTRIKE": [
    "56683",
    "MN"
  ],
  "TRAIL": [
    "97541",
    "OR"
  ],
  "WASKISH": [
    "56685",
    "MN"
  ],
  "THIEF RIVER FALLS": [
    "56701",
    "MN"
  ],
  "ALVARADO": [
    "76009",
    "TX"
  ],
  "ANGLE INLET": [
    "56711",
    "MN"
  ],
  "CROOKSTON": [
    "69212",
    "NE"
  ],
  "EAST GRAND FORKS": [
    "56721",
    "MN"
  ],
  "GATZKE": [
    "56724",
    "MN"
  ],
  "GOODRIDGE": [
    "56725",
    "MN"
  ],
  "GRYGLA": [
    "56727",
    "MN"
  ],
  "HALLOCK": [
    "56728",
    "MN"
  ],
  "HALMA": [
    "56729",
    "MN"
  ],
  "KARLSTAD": [
    "56732",
    "MN"
  ],
  "LAKE BRONSON": [
    "56734",
    "MN"
  ],
  "NEWFOLDEN": [
    "56738",
    "MN"
  ],
  "OKLEE": [
    "56742",
    "MN"
  ],
  "OSLO": [
    "56744",
    "MN"
  ],
  "PLUMMER": [
    "83851",
    "ID"
  ],
  "RED LAKE FALLS": [
    "56750",
    "MN"
  ],
  "ROSEAU": [
    "56751",
    "MN"
  ],
  "SAINT HILAIRE": [
    "56754",
    "MN"
  ],
  "SAINT VINCENT": [
    "56755",
    "MN"
  ],
  "SALOL": [
    "56756",
    "MN"
  ],
  "STEPHEN": [
    "56757",
    "MN"
  ],
  "STRANDQUIST": [
    "56758",
    "MN"
  ],
  "STRATHCONA": [
    "56759",
    "MN"
  ],
  "VIKING": [
    "56760",
    "MN"
  ],
  "WANNASKA": [
    "56761",
    "MN"
  ],
  "WARROAD": [
    "56763",
    "MN"
  ],
  "ALCESTER": [
    "57001",
    "SD"
  ],
  "BERESFORD": [
    "57004",
    "SD"
  ],
  "BROOKINGS": [
    "97415",
    "OR"
  ],
  "CANISTOTA": [
    "57012",
    "SD"
  ],
  "COLMAN": [
    "57017",
    "SD"
  ],
  "CROOKS": [
    "57020",
    "SD"
  ],
  "DELL RAPIDS": [
    "57022",
    "SD"
  ],
  "EGAN": [
    "70531",
    "LA"
  ],
  "ELK POINT": [
    "57025",
    "SD"
  ],
  "FLANDREAU": [
    "57028",
    "SD"
  ],
  "GARRETSON": [
    "57030",
    "SD"
  ],
  "GAYVILLE": [
    "57031",
    "SD"
  ],
  "IRENE": [
    "76650",
    "TX"
  ],
  "LENNOX": [
    "57039",
    "SD"
  ],
  "LESTERVILLE": [
    "63654",
    "MO"
  ],
  "MENNO": [
    "57045",
    "SD"
  ],
  "MISSION HILL": [
    "57046",
    "SD"
  ],
  "NORTH SIOUX CITY": [
    "57049",
    "SD"
  ],
  "OLDHAM": [
    "57051",
    "SD"
  ],
  "RAMONA": [
    "92065",
    "CA"
  ],
  "RENNER": [
    "57055",
    "SD"
  ],
  "SINAI": [
    "57061",
    "SD"
  ],
  "TEA": [
    "57064",
    "SD"
  ],
  "TRENT": [
    "79561",
    "TX"
  ],
  "TYNDALL": [
    "57066",
    "SD"
  ],
  "VALLEY SPRINGS": [
    "95252",
    "CA"
  ],
  "VIBORG": [
    "57070",
    "SD"
  ],
  "VOLIN": [
    "57072",
    "SD"
  ],
  "WAKONDA": [
    "57073",
    "SD"
  ],
  "WINFRED": [
    "57076",
    "SD"
  ],
  "WORTHING": [
    "57077",
    "SD"
  ],
  "YANKTON": [
    "57078",
    "SD"
  ],
  "SIOUX FALLS": [
    "57198",
    "SD"
  ],
  "BIG STONE CITY": [
    "57216",
    "SD"
  ],
  "BRANDT": [
    "57218",
    "SD"
  ],
  "CLAIRE CITY": [
    "57224",
    "SD"
  ],
  "DE SMET": [
    "57231",
    "SD"
  ],
  "ESTELLINE": [
    "79233",
    "TX"
  ],
  "GOODWIN": [
    "57238",
    "SD"
  ],
  "GRENVILLE": [
    "57239",
    "SD"
  ],
  "HAYTI": [
    "63851",
    "MO"
  ],
  "KRANZBURG": [
    "57245",
    "SD"
  ],
  "LABOLT": [
    "57246",
    "SD"
  ],
  "LAKE NORDEN": [
    "57248",
    "SD"
  ],
  "LAKE PRESTON": [
    "57249",
    "SD"
  ],
  "MARVIN": [
    "57251",
    "SD"
  ],
  "MILBANK": [
    "57252",
    "SD"
  ],
  "NEW EFFINGTON": [
    "57255",
    "SD"
  ],
  "PEEVER": [
    "57257",
    "SD"
  ],
  "REVILLO": [
    "57259",
    "SD"
  ],
  "SISSETON": [
    "57262",
    "SD"
  ],
  "STRANDBURG": [
    "57265",
    "SD"
  ],
  "TWIN BROOKS": [
    "57269",
    "SD"
  ],
  "VEBLEN": [
    "57270",
    "SD"
  ],
  "WAUBAY": [
    "57273",
    "SD"
  ],
  "WILLOW LAKE": [
    "57278",
    "SD"
  ],
  "ARMOUR": [
    "57313",
    "SD"
  ],
  "ARTESIAN": [
    "57314",
    "SD"
  ],
  "BONESTEEL": [
    "57317",
    "SD"
  ],
  "CANOVA": [
    "57321",
    "SD"
  ],
  "CAVOUR": [
    "57324",
    "SD"
  ],
  "EMERY": [
    "84522",
    "UT"
  ],
  "ETHAN": [
    "57334",
    "SD"
  ],
  "FEDORA": [
    "57337",
    "SD"
  ],
  "FORT THOMPSON": [
    "57339",
    "SD"
  ],
  "GANN VALLEY": [
    "57341",
    "SD"
  ],
  "GEDDES": [
    "57342",
    "SD"
  ],
  "HIGHMORE": [
    "57345",
    "SD"
  ],
  "STEPHAN": [
    "57346",
    "SD"
  ],
  "HITCHCOCK": [
    "77563",
    "TX"
  ],
  "IROQUOIS": [
    "60945",
    "IL"
  ],
  "KAYLOR": [
    "57354",
    "SD"
  ],
  "LAKE ANDES": [
    "57356",
    "SD"
  ],
  "LETCHER": [
    "57359",
    "SD"
  ],
  "MARTY": [
    "57361",
    "SD"
  ],
  "MILLER": [
    "68858",
    "NE"
  ],
  "OACOMA": [
    "57365",
    "SD"
  ],
  "PARKSTON": [
    "57366",
    "SD"
  ],
  "PICKSTOWN": [
    "57367",
    "SD"
  ],
  "PLANKINTON": [
    "57368",
    "SD"
  ],
  "PLATTE": [
    "57369",
    "SD"
  ],
  "PUKWANA": [
    "57370",
    "SD"
  ],
  "REE HEIGHTS": [
    "57371",
    "SD"
  ],
  "SAINT LAWRENCE": [
    "57373",
    "SD"
  ],
  "STICKNEY": [
    "57375",
    "SD"
  ],
  "TRIPP": [
    "57376",
    "SD"
  ],
  "VIRGIL": [
    "66870",
    "KS"
  ],
  "WAGNER": [
    "57380",
    "SD"
  ],
  "WESSINGTON": [
    "57381",
    "SD"
  ],
  "WESSINGTON SPRINGS": [
    "57382",
    "SD"
  ],
  "WOLSEY": [
    "57384",
    "SD"
  ],
  "AKASKA": [
    "57420",
    "SD"
  ],
  "BOWDLE": [
    "57428",
    "SD"
  ],
  "BRENTFORD": [
    "57429",
    "SD"
  ],
  "CONDE": [
    "57434",
    "SD"
  ],
  "CRESBARD": [
    "57435",
    "SD"
  ],
  "DOLAND": [
    "57436",
    "SD"
  ],
  "FAULKTON": [
    "57438",
    "SD"
  ],
  "FERNEY": [
    "57439",
    "SD"
  ],
  "HECLA": [
    "57446",
    "SD"
  ],
  "HOSMER": [
    "57448",
    "SD"
  ],
  "HOVEN": [
    "57450",
    "SD"
  ],
  "LANGFORD": [
    "57454",
    "SD"
  ],
  "MELLETTE": [
    "57461",
    "SD"
  ],
  "ONAKA": [
    "57466",
    "SD"
  ],
  "ROCKHAM": [
    "57470",
    "SD"
  ],
  "SELBY": [
    "57472",
    "SD"
  ],
  "TOLSTOY": [
    "57475",
    "SD"
  ],
  "TULARE": [
    "93275",
    "CA"
  ],
  "TURTON": [
    "57477",
    "SD"
  ],
  "PIERRE": [
    "57501",
    "SD"
  ],
  "AGAR": [
    "57520",
    "SD"
  ],
  "BLUNT": [
    "57522",
    "SD"
  ],
  "COLOME": [
    "57528",
    "SD"
  ],
  "FORT PIERRE": [
    "57532",
    "SD"
  ],
  "HARROLD": [
    "76364",
    "TX"
  ],
  "HERRICK": [
    "62431",
    "IL"
  ],
  "HOLABIRD": [
    "57540",
    "SD"
  ],
  "KADOKA": [
    "57543",
    "SD"
  ],
  "KENNEBEC": [
    "57544",
    "SD"
  ],
  "LOWER BRULE": [
    "57548",
    "SD"
  ],
  "MILESVILLE": [
    "57553",
    "SD"
  ],
  "MISSION": [
    "78574",
    "TX"
  ],
  "MURDO": [
    "57559",
    "SD"
  ],
  "OKATON": [
    "57562",
    "SD"
  ],
  "ONIDA": [
    "57564",
    "SD"
  ],
  "PHILIP": [
    "57567",
    "SD"
  ],
  "PRESHO": [
    "57568",
    "SD"
  ],
  "ROSEBUD": [
    "76570",
    "TX"
  ],
  "TUTHILL": [
    "57574",
    "SD"
  ],
  "VIVIAN": [
    "71082",
    "LA"
  ],
  "WANBLEE": [
    "57577",
    "SD"
  ],
  "WHITE RIVER": [
    "57579",
    "SD"
  ],
  "WINNER": [
    "57580",
    "SD"
  ],
  "WITTEN": [
    "57584",
    "SD"
  ],
  "WOOD": [
    "57585",
    "SD"
  ],
  "MOBRIDGE": [
    "57601",
    "SD"
  ],
  "BISON": [
    "73720",
    "OK"
  ],
  "BULLHEAD": [
    "57621",
    "SD"
  ],
  "DUPREE": [
    "57623",
    "SD"
  ],
  "EAGLE BUTTE": [
    "57625",
    "SD"
  ],
  "GLENCROSS": [
    "57630",
    "SD"
  ],
  "HERREID": [
    "57632",
    "SD"
  ],
  "ISABEL": [
    "67065",
    "KS"
  ],
  "KELDRON": [
    "57634",
    "SD"
  ],
  "LEMMON": [
    "57638",
    "SD"
  ],
  "LODGEPOLE": [
    "69149",
    "NE"
  ],
  "MC LAUGHLIN": [
    "57642",
    "SD"
  ],
  "MEADOW": [
    "84644",
    "UT"
  ],
  "MOUND CITY": [
    "66056",
    "KS"
  ],
  "POLLOCK": [
    "83547",
    "ID"
  ],
  "RIDGEVIEW": [
    "57652",
    "SD"
  ],
  "TIMBER LAKE": [
    "57656",
    "SD"
  ],
  "WAKPALA": [
    "57658",
    "SD"
  ],
  "ELLSWORTH AFB": [
    "57706",
    "SD"
  ],
  "BATESLAND": [
    "57716",
    "SD"
  ],
  "BELLE FOURCHE": [
    "57717",
    "SD"
  ],
  "BLACK HAWK": [
    "80422",
    "CO"
  ],
  "BOX ELDER": [
    "59521",
    "MT"
  ],
  "BUFFALO GAP": [
    "79508",
    "TX"
  ],
  "CAMP CROOK": [
    "57724",
    "SD"
  ],
  "CAPUTA": [
    "57725",
    "SD"
  ],
  "DEADWOOD": [
    "97430",
    "OR"
  ],
  "ENNING": [
    "57737",
    "SD"
  ],
  "HERMOSA": [
    "57744",
    "SD"
  ],
  "HOWES": [
    "57748",
    "SD"
  ],
  "INTERIOR": [
    "57750",
    "SD"
  ],
  "KYLE": [
    "78640",
    "TX"
  ],
  "LEAD": [
    "57754",
    "SD"
  ],
  "MANDERSON": [
    "82432",
    "WY"
  ],
  "MUD BUTTE": [
    "57758",
    "SD"
  ],
  "NEMO": [
    "76070",
    "TX"
  ],
  "NEW UNDERWOOD": [
    "57761",
    "SD"
  ],
  "NISLAND": [
    "57762",
    "SD"
  ],
  "OELRICHS": [
    "57763",
    "SD"
  ],
  "OGLALA": [
    "57764",
    "SD"
  ],
  "ORAL": [
    "57766",
    "SD"
  ],
  "OWANKA": [
    "57767",
    "SD"
  ],
  "PORCUPINE": [
    "57772",
    "SD"
  ],
  "PRINGLE": [
    "57773",
    "SD"
  ],
  "QUINN": [
    "57775",
    "SD"
  ],
  "SAINT ONGE": [
    "57779",
    "SD"
  ],
  "SCENIC": [
    "57780",
    "SD"
  ],
  "SPEARFISH": [
    "57799",
    "SD"
  ],
  "WALL": [
    "76957",
    "TX"
  ],
  "WASTA": [
    "57791",
    "SD"
  ],
  "WHITE OWL": [
    "57792",
    "SD"
  ],
  "ABERCROMBIE": [
    "58001",
    "ND"
  ],
  "ARGUSVILLE": [
    "58005",
    "ND"
  ],
  "CASSELTON": [
    "58012",
    "ND"
  ],
  "CHRISTINE": [
    "78012",
    "TX"
  ],
  "COGSWELL": [
    "58017",
    "ND"
  ],
  "ENDERLIN": [
    "58027",
    "ND"
  ],
  "FINGAL": [
    "58031",
    "ND"
  ],
  "FORMAN": [
    "58032",
    "ND"
  ],
  "FORT RANSOM": [
    "58033",
    "ND"
  ],
  "GWINNER": [
    "58040",
    "ND"
  ],
  "HANKINSON": [
    "58041",
    "ND"
  ],
  "HORACE": [
    "58047",
    "ND"
  ],
  "KATHRYN": [
    "58049",
    "ND"
  ],
  "KINDRED": [
    "58051",
    "ND"
  ],
  "LIDGERWOOD": [
    "58053",
    "ND"
  ],
  "MCLEOD": [
    "58057",
    "ND"
  ],
  "MANTADOR": [
    "58058",
    "ND"
  ],
  "MILNOR": [
    "58060",
    "ND"
  ],
  "MOORETON": [
    "58061",
    "ND"
  ],
  "NOME": [
    "99762",
    "AK"
  ],
  "ORISKA": [
    "58063",
    "ND"
  ],
  "PAGE": [
    "86040",
    "AZ"
  ],
  "PILLSBURY": [
    "58065",
    "ND"
  ],
  "WAHPETON": [
    "58076",
    "ND"
  ],
  "WEST FARGO": [
    "58078",
    "ND"
  ],
  "WYNDMERE": [
    "58081",
    "ND"
  ],
  "GRAND FORKS": [
    "58208",
    "ND"
  ],
  "GRAND FORKS AFB": [
    "58205",
    "ND"
  ],
  "ANETA": [
    "58212",
    "ND"
  ],
  "ARVILLA": [
    "58214",
    "ND"
  ],
  "BATHGATE": [
    "58216",
    "ND"
  ],
  "CAVALIER": [
    "58220",
    "ND"
  ],
  "CUMMINGS": [
    "58223",
    "ND"
  ],
  "DAHLEN": [
    "58224",
    "ND"
  ],
  "EMERADO": [
    "58228",
    "ND"
  ],
  "FORDVILLE": [
    "58231",
    "ND"
  ],
  "FOREST RIVER": [
    "58233",
    "ND"
  ],
  "GILBY": [
    "58235",
    "ND"
  ],
  "GLASSTON": [
    "58236",
    "ND"
  ],
  "HANNAH": [
    "58239",
    "ND"
  ],
  "HATTON": [
    "58240",
    "ND"
  ],
  "HENSEL": [
    "58241",
    "ND"
  ],
  "HOOPLE": [
    "58243",
    "ND"
  ],
  "LANGDON": [
    "58249",
    "ND"
  ],
  "LANKIN": [
    "58250",
    "ND"
  ],
  "LARIMORE": [
    "58251",
    "ND"
  ],
  "MCVILLE": [
    "58254",
    "ND"
  ],
  "MANVEL": [
    "77578",
    "TX"
  ],
  "MICHIGAN": [
    "58259",
    "ND"
  ],
  "MINTO": [
    "99758",
    "AK"
  ],
  "NECHE": [
    "58265",
    "ND"
  ],
  "OSNABROCK": [
    "58269",
    "ND"
  ],
  "PARK RIVER": [
    "58270",
    "ND"
  ],
  "PEMBINA": [
    "58271",
    "ND"
  ],
  "PISEK": [
    "58273",
    "ND"
  ],
  "DEVILS LAKE": [
    "58301",
    "ND"
  ],
  "ALSEN": [
    "58311",
    "ND"
  ],
  "BALTA": [
    "58313",
    "ND"
  ],
  "BELCOURT": [
    "58316",
    "ND"
  ],
  "BISBEE": [
    "85603",
    "AZ"
  ],
  "BOTTINEAU": [
    "58318",
    "ND"
  ],
  "BROCKET": [
    "58321",
    "ND"
  ],
  "CANDO": [
    "58324",
    "ND"
  ],
  "CHURCHS FERRY": [
    "58325",
    "ND"
  ],
  "CRARY": [
    "58327",
    "ND"
  ],
  "DUNSEITH": [
    "58329",
    "ND"
  ],
  "EGELAND": [
    "58331",
    "ND"
  ],
  "ESMOND": [
    "60129",
    "IL"
  ],
  "FORT TOTTEN": [
    "58335",
    "ND"
  ],
  "HANSBORO": [
    "58339",
    "ND"
  ],
  "MADDOCK": [
    "58348",
    "ND"
  ],
  "MINNEWAUKAN": [
    "58351",
    "ND"
  ],
  "MUNICH": [
    "58352",
    "ND"
  ],
  "MYLO": [
    "58353",
    "ND"
  ],
  "NEKOMA": [
    "58355",
    "ND"
  ],
  "NEW ROCKFORD": [
    "58356",
    "ND"
  ],
  "OBERON": [
    "58357",
    "ND"
  ],
  "PERTH": [
    "58363",
    "ND"
  ],
  "ROCKLAKE": [
    "58365",
    "ND"
  ],
  "ROLETTE": [
    "58366",
    "ND"
  ],
  "ROLLA": [
    "67954",
    "KS"
  ],
  "SARLES": [
    "58372",
    "ND"
  ],
  "SHEYENNE": [
    "58374",
    "ND"
  ],
  "STARKWEATHER": [
    "58377",
    "ND"
  ],
  "TOKIO": [
    "58379",
    "ND"
  ],
  "TOLNA": [
    "58380",
    "ND"
  ],
  "WILLOW CITY": [
    "78675",
    "TX"
  ],
  "WOLFORD": [
    "58385",
    "ND"
  ],
  "BINFORD": [
    "58416",
    "ND"
  ],
  "CARRINGTON": [
    "58421",
    "ND"
  ],
  "CATHAY": [
    "58422",
    "ND"
  ],
  "COURTENAY": [
    "58426",
    "ND"
  ],
  "DAZEY": [
    "58429",
    "ND"
  ],
  "DICKEY": [
    "58431",
    "ND"
  ],
  "EDGELEY": [
    "58433",
    "ND"
  ],
  "FESSENDEN": [
    "58438",
    "ND"
  ],
  "FULLERTON": [
    "92838",
    "CA"
  ],
  "GACKLE": [
    "58442",
    "ND"
  ],
  "GRACE CITY": [
    "58445",
    "ND"
  ],
  "HANNAFORD": [
    "58448",
    "ND"
  ],
  "HURDSFIELD": [
    "58451",
    "ND"
  ],
  "JUD": [
    "58454",
    "ND"
  ],
  "KENSAL": [
    "58455",
    "ND"
  ],
  "KULM": [
    "58456",
    "ND"
  ],
  "LAMOURE": [
    "58458",
    "ND"
  ],
  "LEHR": [
    "58460",
    "ND"
  ],
  "LITCHVILLE": [
    "58461",
    "ND"
  ],
  "MCCLUSKY": [
    "58463",
    "ND"
  ],
  "MCHENRY": [
    "60051",
    "IL"
  ],
  "OAKES": [
    "58474",
    "ND"
  ],
  "PETTIBONE": [
    "58475",
    "ND"
  ],
  "PINGREE": [
    "83262",
    "ID"
  ],
  "REGAN": [
    "58477",
    "ND"
  ],
  "SPIRITWOOD": [
    "58481",
    "ND"
  ],
  "STREETER": [
    "58483",
    "ND"
  ],
  "SYKESTON": [
    "58486",
    "ND"
  ],
  "TAPPEN": [
    "58487",
    "ND"
  ],
  "TUTTLE": [
    "73089",
    "OK"
  ],
  "WIMBLEDON": [
    "58492",
    "ND"
  ],
  "WISHEK": [
    "58495",
    "ND"
  ],
  "WOODWORTH": [
    "71485",
    "LA"
  ],
  "BISMARCK": [
    "71929",
    "AR"
  ],
  "CANNON BALL": [
    "58528",
    "ND"
  ],
  "COLEHARBOR": [
    "58531",
    "ND"
  ],
  "DRISCOLL": [
    "78351",
    "TX"
  ],
  "FLASHER": [
    "58535",
    "ND"
  ],
  "FORT YATES": [
    "58538",
    "ND"
  ],
  "GOLDEN VALLEY": [
    "86413",
    "AZ"
  ],
  "HAZELTON": [
    "83335",
    "ID"
  ],
  "HAZEN": [
    "72064",
    "AR"
  ],
  "KINTYRE": [
    "58549",
    "ND"
  ],
  "MANDAN": [
    "58554",
    "ND"
  ],
  "MENOKEN": [
    "58558",
    "ND"
  ],
  "MOFFIT": [
    "58560",
    "ND"
  ],
  "NEW LEIPZIG": [
    "58562",
    "ND"
  ],
  "SELFRIDGE": [
    "58568",
    "ND"
  ],
  "SHIELDS": [
    "58569",
    "ND"
  ],
  "SOLEN": [
    "58570",
    "ND"
  ],
  "ZAP": [
    "58580",
    "ND"
  ],
  "AMIDON": [
    "58620",
    "ND"
  ],
  "BEACH": [
    "58621",
    "ND"
  ],
  "BELFIELD": [
    "58622",
    "ND"
  ],
  "DUNN CENTER": [
    "58626",
    "ND"
  ],
  "GLEN ULLIN": [
    "58631",
    "ND"
  ],
  "GOLVA": [
    "58632",
    "ND"
  ],
  "GRASSY BUTTE": [
    "58634",
    "ND"
  ],
  "HALLIDAY": [
    "58636",
    "ND"
  ],
  "HETTINGER": [
    "58639",
    "ND"
  ],
  "KILLDEER": [
    "58640",
    "ND"
  ],
  "LEFOR": [
    "58641",
    "ND"
  ],
  "MARMARTH": [
    "58643",
    "ND"
  ],
  "MOTT": [
    "58646",
    "ND"
  ],
  "NEW ENGLAND": [
    "58647",
    "ND"
  ],
  "REEDER": [
    "58649",
    "ND"
  ],
  "REGENT": [
    "58650",
    "ND"
  ],
  "RHAME": [
    "58651",
    "ND"
  ],
  "RICHARDTON": [
    "58652",
    "ND"
  ],
  "SENTINEL BUTTE": [
    "58654",
    "ND"
  ],
  "SOUTH HEART": [
    "58655",
    "ND"
  ],
  "MINOT AFB": [
    "58705",
    "ND"
  ],
  "ANAMOOSE": [
    "58710",
    "ND"
  ],
  "ANTLER": [
    "58711",
    "ND"
  ],
  "BALFOUR": [
    "58712",
    "ND"
  ],
  "BERTHOLD": [
    "58718",
    "ND"
  ],
  "BOWBELLS": [
    "58721",
    "ND"
  ],
  "BUTTE": [
    "68722",
    "NE"
  ],
  "CARPIO": [
    "58725",
    "ND"
  ],
  "DEERING": [
    "63840",
    "MO"
  ],
  "DES LACS": [
    "58733",
    "ND"
  ],
  "DONNYBROOK": [
    "58734",
    "ND"
  ],
  "DRAKE": [
    "80515",
    "CO"
  ],
  "FLAXTON": [
    "58737",
    "ND"
  ],
  "GLENBURN": [
    "58740",
    "ND"
  ],
  "KARLSRUHE": [
    "58744",
    "ND"
  ],
  "KENMARE": [
    "58746",
    "ND"
  ],
  "KRAMER": [
    "58748",
    "ND"
  ],
  "LIGNITE": [
    "58752",
    "ND"
  ],
  "MAKOTI": [
    "58756",
    "ND"
  ],
  "MANDAREE": [
    "58757",
    "ND"
  ],
  "MAXBASS": [
    "58760",
    "ND"
  ],
  "MOHALL": [
    "58761",
    "ND"
  ],
  "NOONAN": [
    "58765",
    "ND"
  ],
  "PARSHALL": [
    "80468",
    "CO"
  ],
  "PLAZA": [
    "58771",
    "ND"
  ],
  "ROSEGLEN": [
    "58775",
    "ND"
  ],
  "RUSO": [
    "58778",
    "ND"
  ],
  "RYDER": [
    "58779",
    "ND"
  ],
  "SOURIS": [
    "58783",
    "ND"
  ],
  "SURREY": [
    "58785",
    "ND"
  ],
  "TOLLEY": [
    "58787",
    "ND"
  ],
  "TOWNER": [
    "58788",
    "ND"
  ],
  "UPHAM": [
    "58789",
    "ND"
  ],
  "VELVA": [
    "58790",
    "ND"
  ],
  "VOLTAIRE": [
    "58792",
    "ND"
  ],
  "WESTHOPE": [
    "58793",
    "ND"
  ],
  "WILDROSE": [
    "58795",
    "ND"
  ],
  "ARNEGARD": [
    "58835",
    "ND"
  ],
  "CARTWRIGHT": [
    "74731",
    "OK"
  ],
  "FORTUNA": [
    "95540",
    "CA"
  ],
  "GRENORA": [
    "58845",
    "ND"
  ],
  "WATFORD CITY": [
    "58854",
    "ND"
  ],
  "ZAHL": [
    "58856",
    "ND"
  ],
  "ABSAROKEE": [
    "59001",
    "MT"
  ],
  "BALLANTINE": [
    "59006",
    "MT"
  ],
  "BEARCREEK": [
    "59007",
    "MT"
  ],
  "BIGHORN": [
    "59010",
    "MT"
  ],
  "BIG TIMBER": [
    "59011",
    "MT"
  ],
  "BIRNEY": [
    "59012",
    "MT"
  ],
  "BRIDGER": [
    "59014",
    "MT"
  ],
  "BROADVIEW": [
    "88112",
    "NM"
  ],
  "BUSBY": [
    "59016",
    "MT"
  ],
  "CLYDE PARK": [
    "59018",
    "MT"
  ],
  "COOKE CITY": [
    "59020",
    "MT"
  ],
  "CROW AGENCY": [
    "59022",
    "MT"
  ],
  "EMIGRANT": [
    "59027",
    "MT"
  ],
  "FISHTAIL": [
    "59028",
    "MT"
  ],
  "FROMBERG": [
    "59029",
    "MT"
  ],
  "GARRYOWEN": [
    "59031",
    "MT"
  ],
  "GRASS RANGE": [
    "59032",
    "MT"
  ],
  "GREYCLIFF": [
    "59033",
    "MT"
  ],
  "FORT SMITH": [
    "72919",
    "AR"
  ],
  "HARLOWTON": [
    "59036",
    "MT"
  ],
  "HYSHAM": [
    "59038",
    "MT"
  ],
  "JOLIET": [
    "60436",
    "IL"
  ],
  "LAME DEER": [
    "59043",
    "MT"
  ],
  "LAVINA": [
    "59046",
    "MT"
  ],
  "LODGE GRASS": [
    "59050",
    "MT"
  ],
  "MC LEOD": [
    "75565",
    "TX"
  ],
  "MARTINSDALE": [
    "59053",
    "MT"
  ],
  "MELSTONE": [
    "59054",
    "MT"
  ],
  "MOLT": [
    "59057",
    "MT"
  ],
  "MOSBY": [
    "64073",
    "MO"
  ],
  "MUSSELSHELL": [
    "59059",
    "MT"
  ],
  "NYE": [
    "59061",
    "MT"
  ],
  "OTTER": [
    "59062",
    "MT"
  ],
  "POMPEYS PILLAR": [
    "59064",
    "MT"
  ],
  "PRAY": [
    "59065",
    "MT"
  ],
  "PRYOR": [
    "74362",
    "OK"
  ],
  "RAPELJE": [
    "59067",
    "MT"
  ],
  "RED LODGE": [
    "59068",
    "MT"
  ],
  "REED POINT": [
    "59069",
    "MT"
  ],
  "ROUNDUP": [
    "59072",
    "MT"
  ],
  "RYEGATE": [
    "59074",
    "MT"
  ],
  "SAINT XAVIER": [
    "59075",
    "MT"
  ],
  "SILVER GATE": [
    "59081",
    "MT"
  ],
  "TWO DOT": [
    "59085",
    "MT"
  ],
  "WILSALL": [
    "59086",
    "MT"
  ],
  "WINNETT": [
    "59087",
    "MT"
  ],
  "WORDEN": [
    "62097",
    "IL"
  ],
  "WOLF POINT": [
    "59201",
    "MT"
  ],
  "ANTELOPE": [
    "97001",
    "OR"
  ],
  "BAINVILLE": [
    "59212",
    "MT"
  ],
  "CIRCLE": [
    "59215",
    "MT"
  ],
  "CULBERTSON": [
    "69024",
    "NE"
  ],
  "DAGMAR": [
    "59219",
    "MT"
  ],
  "FLAXVILLE": [
    "59222",
    "MT"
  ],
  "FORT PECK": [
    "59223",
    "MT"
  ],
  "FRAZER": [
    "59225",
    "MT"
  ],
  "FROID": [
    "59226",
    "MT"
  ],
  "SAINT MARIE": [
    "59231",
    "MT"
  ],
  "LARSLAN": [
    "59244",
    "MT"
  ],
  "MEDICINE LAKE": [
    "59247",
    "MT"
  ],
  "OPHEIM": [
    "59250",
    "MT"
  ],
  "OUTLOOK": [
    "98938",
    "WA"
  ],
  "PEERLESS": [
    "59253",
    "MT"
  ],
  "PLENTYWOOD": [
    "59254",
    "MT"
  ],
  "REDSTONE": [
    "59257",
    "MT"
  ],
  "RESERVE": [
    "87830",
    "NM"
  ],
  "RICHEY": [
    "59259",
    "MT"
  ],
  "VIDA": [
    "97488",
    "OR"
  ],
  "WHITETAIL": [
    "59276",
    "MT"
  ],
  "MILES CITY": [
    "59301",
    "MT"
  ],
  "ALZADA": [
    "59311",
    "MT"
  ],
  "BIDDLE": [
    "59314",
    "MT"
  ],
  "BOYES": [
    "59316",
    "MT"
  ],
  "BROADUS": [
    "59317",
    "MT"
  ],
  "CAPITOL": [
    "59319",
    "MT"
  ],
  "COLSTRIP": [
    "59323",
    "MT"
  ],
  "EKALAKA": [
    "59324",
    "MT"
  ],
  "FALLON": [
    "89496",
    "NV"
  ],
  "GLENDIVE": [
    "59330",
    "MT"
  ],
  "HATHAWAY": [
    "59333",
    "MT"
  ],
  "ISMAY": [
    "59336",
    "MT"
  ],
  "KINSEY": [
    "59338",
    "MT"
  ],
  "LINDSAY": [
    "93247",
    "CA"
  ],
  "PLEVNA": [
    "67568",
    "KS"
  ],
  "POWDERVILLE": [
    "59345",
    "MT"
  ],
  "VOLBORG": [
    "59351",
    "MT"
  ],
  "WIBAUX": [
    "59353",
    "MT"
  ],
  "MALMSTROM AFB": [
    "59402",
    "MT"
  ],
  "BABB": [
    "59411",
    "MT"
  ],
  "BELT": [
    "59412",
    "MT"
  ],
  "BLACK EAGLE": [
    "59414",
    "MT"
  ],
  "BRADY": [
    "76825",
    "TX"
  ],
  "BROWNING": [
    "64630",
    "MO"
  ],
  "CHOTEAU": [
    "59422",
    "MT"
  ],
  "COFFEE CREEK": [
    "59424",
    "MT"
  ],
  "CUT BANK": [
    "59427",
    "MT"
  ],
  "DUPUYER": [
    "59432",
    "MT"
  ],
  "EAST GLACIER PARK": [
    "59434",
    "MT"
  ],
  "FLOWEREE": [
    "59440",
    "MT"
  ],
  "FORT BENTON": [
    "59442",
    "MT"
  ],
  "FORT SHAW": [
    "59443",
    "MT"
  ],
  "GALATA": [
    "59444",
    "MT"
  ],
  "GEYSER": [
    "59447",
    "MT"
  ],
  "HEART BUTTE": [
    "59448",
    "MT"
  ],
  "HIGHWOOD": [
    "60040",
    "IL"
  ],
  "HILGER": [
    "59451",
    "MT"
  ],
  "HOBSON": [
    "78117",
    "TX"
  ],
  "JUDITH GAP": [
    "59453",
    "MT"
  ],
  "KEVIN": [
    "59454",
    "MT"
  ],
  "LOMA": [
    "81524",
    "CO"
  ],
  "MOCCASIN": [
    "59462",
    "MT"
  ],
  "MONARCH": [
    "81227",
    "CO"
  ],
  "NEIHART": [
    "59465",
    "MT"
  ],
  "OILMONT": [
    "59466",
    "MT"
  ],
  "PENDROY": [
    "59467",
    "MT"
  ],
  "POWER": [
    "59468",
    "MT"
  ],
  "RAYNESFORD": [
    "59469",
    "MT"
  ],
  "ROY": [
    "98580",
    "WA"
  ],
  "SAND COULEE": [
    "59472",
    "MT"
  ],
  "SIMMS": [
    "75574",
    "TX"
  ],
  "STOCKETT": [
    "59480",
    "MT"
  ],
  "SUNBURST": [
    "59482",
    "MT"
  ],
  "SUN RIVER": [
    "59483",
    "MT"
  ],
  "SWEET GRASS": [
    "59484",
    "MT"
  ],
  "ULM": [
    "72170",
    "AR"
  ],
  "VAUGHN": [
    "98394",
    "WA"
  ],
  "WINIFRED": [
    "59489",
    "MT"
  ],
  "HAVRE": [
    "59501",
    "MT"
  ],
  "CHINOOK": [
    "98614",
    "WA"
  ],
  "DODSON": [
    "79230",
    "TX"
  ],
  "GILDFORD": [
    "59525",
    "MT"
  ],
  "HOGELAND": [
    "59529",
    "MT"
  ],
  "JOPLIN": [
    "64804",
    "MO"
  ],
  "KREMLIN": [
    "73753",
    "OK"
  ],
  "LORING": [
    "59537",
    "MT"
  ],
  "WHITLASH": [
    "59545",
    "MT"
  ],
  "ZORTMAN": [
    "59546",
    "MT"
  ],
  "ZURICH": [
    "59547",
    "MT"
  ],
  "BASIN": [
    "82410",
    "WY"
  ],
  "BOULDER": [
    "84716",
    "UT"
  ],
  "CANYON CREEK": [
    "59633",
    "MT"
  ],
  "CLANCY": [
    "59634",
    "MT"
  ],
  "EAST HELENA": [
    "59635",
    "MT"
  ],
  "FORT HARRISON": [
    "59636",
    "MT"
  ],
  "RINGLING": [
    "73456",
    "OK"
  ],
  "TOSTON": [
    "59643",
    "MT"
  ],
  "WOLF CREEK": [
    "97497",
    "OR"
  ],
  "ALDER": [
    "59710",
    "MT"
  ],
  "ANACONDA": [
    "59711",
    "MT"
  ],
  "BOZEMAN": [
    "59772",
    "MT"
  ],
  "BIG SKY": [
    "59716",
    "MT"
  ],
  "CARDWELL": [
    "63829",
    "MO"
  ],
  "DELL": [
    "72426",
    "AR"
  ],
  "DIVIDE": [
    "80814",
    "CO"
  ],
  "ENNIS": [
    "75120",
    "TX"
  ],
  "GALLATIN GATEWAY": [
    "59730",
    "MT"
  ],
  "GOLD CREEK": [
    "59733",
    "MT"
  ],
  "MC ALLISTER": [
    "59740",
    "MT"
  ],
  "MANHATTAN": [
    "89022",
    "NV"
  ],
  "POLARIS": [
    "59746",
    "MT"
  ],
  "PONY": [
    "59747",
    "MT"
  ],
  "SILVER STAR": [
    "59751",
    "MT"
  ],
  "THREE FORKS": [
    "59752",
    "MT"
  ],
  "TWIN BRIDGES": [
    "95735",
    "CA"
  ],
  "VIRGINIA CITY": [
    "89440",
    "NV"
  ],
  "WEST YELLOWSTONE": [
    "59758",
    "MT"
  ],
  "WILLOW CREEK": [
    "95573",
    "CA"
  ],
  "WISDOM": [
    "59761",
    "MT"
  ],
  "WISE RIVER": [
    "59762",
    "MT"
  ],
  "MISSOULA": [
    "59812",
    "MT"
  ],
  "ALBERTON": [
    "59820",
    "MT"
  ],
  "ARLEE": [
    "59821",
    "MT"
  ],
  "BONNER": [
    "59823",
    "MT"
  ],
  "CHARLO": [
    "59824",
    "MT"
  ],
  "CONDON": [
    "97823",
    "OR"
  ],
  "CONNER": [
    "59827",
    "MT"
  ],
  "CORVALLIS": [
    "97339",
    "OR"
  ],
  "DE BORGIA": [
    "59830",
    "MT"
  ],
  "PINESDALE": [
    "59841",
    "MT"
  ],
  "HAUGAN": [
    "59842",
    "MT"
  ],
  "HELMVILLE": [
    "59843",
    "MT"
  ],
  "HERON": [
    "59844",
    "MT"
  ],
  "HUSON": [
    "59846",
    "MT"
  ],
  "LOLO": [
    "59847",
    "MT"
  ],
  "LONEPINE": [
    "59848",
    "MT"
  ],
  "NOXON": [
    "59853",
    "MT"
  ],
  "OVANDO": [
    "59854",
    "MT"
  ],
  "PABLO": [
    "59855",
    "MT"
  ],
  "POLSON": [
    "59860",
    "MT"
  ],
  "RAVALLI": [
    "59863",
    "MT"
  ],
  "RONAN": [
    "59864",
    "MT"
  ],
  "SAINT IGNATIUS": [
    "59865",
    "MT"
  ],
  "SAINT REGIS": [
    "59866",
    "MT"
  ],
  "SALTESE": [
    "59867",
    "MT"
  ],
  "SEELEY LAKE": [
    "59868",
    "MT"
  ],
  "SULA": [
    "59871",
    "MT"
  ],
  "THOMPSON FALLS": [
    "59873",
    "MT"
  ],
  "KALISPELL": [
    "59904",
    "MT"
  ],
  "BIG ARM": [
    "59910",
    "MT"
  ],
  "ELMO": [
    "84521",
    "UT"
  ],
  "FORTINE": [
    "59918",
    "MT"
  ],
  "HUNGRY HORSE": [
    "59919",
    "MT"
  ],
  "KILA": [
    "59920",
    "MT"
  ],
  "LIBBY": [
    "59923",
    "MT"
  ],
  "MARTIN CITY": [
    "59926",
    "MT"
  ],
  "POLEBRIDGE": [
    "59928",
    "MT"
  ],
  "ROLLINS": [
    "59931",
    "MT"
  ],
  "WEST GLACIER": [
    "59936",
    "MT"
  ],
  "WHITEFISH": [
    "59937",
    "MT"
  ],
  "ELK GROVE VILLAGE": [
    "60009",
    "IL"
  ],
  "ROLLING MEADOWS": [
    "60008",
    "IL"
  ],
  "DES PLAINES": [
    "60019",
    "IL"
  ],
  "FOX RIVER GROVE": [
    "60021",
    "IL"
  ],
  "GOLF": [
    "60029",
    "IL"
  ],
  "GRAYSLAKE": [
    "60030",
    "IL"
  ],
  "GURNEE": [
    "60031",
    "IL"
  ],
  "FORT SHERIDAN": [
    "60037",
    "IL"
  ],
  "PALATINE": [
    "60095",
    "IL"
  ],
  "ISLAND LAKE": [
    "60042",
    "IL"
  ],
  "LAKE BLUFF": [
    "60044",
    "IL"
  ],
  "LAKE FOREST": [
    "92630",
    "CA"
  ],
  "LAKE VILLA": [
    "60046",
    "IL"
  ],
  "LAKE ZURICH": [
    "60047",
    "IL"
  ],
  "MORTON GROVE": [
    "60053",
    "IL"
  ],
  "MOUNT PROSPECT": [
    "60056",
    "IL"
  ],
  "MUNDELEIN": [
    "60060",
    "IL"
  ],
  "VERNON HILLS": [
    "60061",
    "IL"
  ],
  "NORTHBROOK": [
    "60065",
    "IL"
  ],
  "NORTH CHICAGO": [
    "60064",
    "IL"
  ],
  "LINCOLNSHIRE": [
    "60069",
    "IL"
  ],
  "PROSPECT HEIGHTS": [
    "60070",
    "IL"
  ],
  "SKOKIE": [
    "60077",
    "IL"
  ],
  "WAUKEGAN": [
    "60087",
    "IL"
  ],
  "TECHNY": [
    "60082",
    "IL"
  ],
  "WAUCONDA": [
    "98859",
    "WA"
  ],
  "GREAT LAKES": [
    "60088",
    "IL"
  ],
  "BUFFALO GROVE": [
    "60089",
    "IL"
  ],
  "WILMETTE": [
    "60091",
    "IL"
  ],
  "WINNETKA": [
    "91396",
    "CA"
  ],
  "WINTHROP HARBOR": [
    "60096",
    "IL"
  ],
  "WONDER LAKE": [
    "60097",
    "IL"
  ],
  "ZION": [
    "60099",
    "IL"
  ],
  "ALGONQUIN": [
    "60102",
    "IL"
  ],
  "BENSENVILLE": [
    "60106",
    "IL"
  ],
  "STREAMWOOD": [
    "60107",
    "IL"
  ],
  "CARPENTERSVILLE": [
    "60110",
    "IL"
  ],
  "DEKALB": [
    "60115",
    "IL"
  ],
  "CAROL STREAM": [
    "60199",
    "IL"
  ],
  "ELBURN": [
    "60119",
    "IL"
  ],
  "HANOVER PARK": [
    "60133",
    "IL"
  ],
  "GILBERTS": [
    "60136",
    "IL"
  ],
  "GLEN ELLYN": [
    "60138",
    "IL"
  ],
  "GLENDALE HEIGHTS": [
    "60139",
    "IL"
  ],
  "ITASCA": [
    "76055",
    "TX"
  ],
  "KANEVILLE": [
    "60144",
    "IL"
  ],
  "KIRKLAND": [
    "98083",
    "WA"
  ],
  "LAFOX": [
    "60147",
    "IL"
  ],
  "LOMBARD": [
    "60148",
    "IL"
  ],
  "MAPLE PARK": [
    "60151",
    "IL"
  ],
  "WESTCHESTER": [
    "60154",
    "IL"
  ],
  "LAKE IN THE HILLS": [
    "60156",
    "IL"
  ],
  "MEDINAH": [
    "60157",
    "IL"
  ],
  "SCHAUMBURG": [
    "60196",
    "IL"
  ],
  "MELROSE PARK": [
    "60164",
    "IL"
  ],
  "BERKELEY": [
    "94720",
    "CA"
  ],
  "STONE PARK": [
    "60165",
    "IL"
  ],
  "HOFFMAN ESTATES": [
    "60192",
    "IL"
  ],
  "PLATO CENTER": [
    "60170",
    "IL"
  ],
  "RIVER GROVE": [
    "60171",
    "IL"
  ],
  "SCHILLER PARK": [
    "60176",
    "IL"
  ],
  "SOUTH ELGIN": [
    "60177",
    "IL"
  ],
  "VILLA PARK": [
    "92861",
    "CA"
  ],
  "WASCO": [
    "97065",
    "OR"
  ],
  "WEST CHICAGO": [
    "60186",
    "IL"
  ],
  "WOOD DALE": [
    "60191",
    "IL"
  ],
  "CHICAGO": [
    "60701",
    "IL"
  ],
  "RIVER FOREST": [
    "60305",
    "IL"
  ],
  "BEECHER": [
    "60401",
    "IL"
  ],
  "CREST HILL": [
    "60403",
    "IL"
  ],
  "SHOREWOOD": [
    "60404",
    "IL"
  ],
  "BLUE ISLAND": [
    "60406",
    "IL"
  ],
  "BRACEVILLE": [
    "60407",
    "IL"
  ],
  "BRAIDWOOD": [
    "60408",
    "IL"
  ],
  "CALUMET CITY": [
    "60409",
    "IL"
  ],
  "CHANNAHON": [
    "60410",
    "IL"
  ],
  "CHICAGO HEIGHTS": [
    "60412",
    "IL"
  ],
  "CHICAGO RIDGE": [
    "60415",
    "IL"
  ],
  "CRETE": [
    "68333",
    "NE"
  ],
  "DOLTON": [
    "60419",
    "IL"
  ],
  "DWIGHT": [
    "68635",
    "NE"
  ],
  "FLOSSMOOR": [
    "60422",
    "IL"
  ],
  "HAZEL CREST": [
    "60429",
    "IL"
  ],
  "HOMEWOOD": [
    "96141",
    "CA"
  ],
  "BOLINGBROOK": [
    "60490",
    "IL"
  ],
  "MATTESON": [
    "60443",
    "IL"
  ],
  "MAZON": [
    "60444",
    "IL"
  ],
  "ROMEOVILLE": [
    "60446",
    "IL"
  ],
  "MINOOKA": [
    "60447",
    "IL"
  ],
  "MOKENA": [
    "60448",
    "IL"
  ],
  "MONEE": [
    "60449",
    "IL"
  ],
  "NEW LENOX": [
    "60451",
    "IL"
  ],
  "OAK FOREST": [
    "60452",
    "IL"
  ],
  "OAK LAWN": [
    "60454",
    "IL"
  ],
  "BRIDGEVIEW": [
    "60455",
    "IL"
  ],
  "HICKORY HILLS": [
    "60457",
    "IL"
  ],
  "ODELL": [
    "97044",
    "OR"
  ],
  "OLYMPIA FIELDS": [
    "60461",
    "IL"
  ],
  "ORLAND PARK": [
    "60467",
    "IL"
  ],
  "PALOS HEIGHTS": [
    "60463",
    "IL"
  ],
  "PALOS PARK": [
    "60464",
    "IL"
  ],
  "PALOS HILLS": [
    "60465",
    "IL"
  ],
  "PARK FOREST": [
    "60466",
    "IL"
  ],
  "PEOTONE": [
    "60468",
    "IL"
  ],
  "RICHTON PARK": [
    "60471",
    "IL"
  ],
  "SOUTH HOLLAND": [
    "60473",
    "IL"
  ],
  "SOUTH WILMINGTON": [
    "60474",
    "IL"
  ],
  "STEGER": [
    "60475",
    "IL"
  ],
  "TINLEY PARK": [
    "60487",
    "IL"
  ],
  "COUNTRY CLUB HILLS": [
    "60478",
    "IL"
  ],
  "WILLOW SPRINGS": [
    "65793",
    "MO"
  ],
  "WORTH": [
    "60482",
    "IL"
  ],
  "HOMER GLEN": [
    "60491",
    "IL"
  ],
  "BEDFORD PARK": [
    "60499",
    "IL"
  ],
  "SUMMIT ARGO": [
    "60501",
    "IL"
  ],
  "CLARENDON HILLS": [
    "60514",
    "IL"
  ],
  "DOWNERS GROVE": [
    "60516",
    "IL"
  ],
  "EOLA": [
    "76937",
    "TX"
  ],
  "OAK BROOK": [
    "60523",
    "IL"
  ],
  "LA GRANGE PARK": [
    "60526",
    "IL"
  ],
  "WILLOWBROOK": [
    "60527",
    "IL"
  ],
  "MOOSEHEART": [
    "60539",
    "IL"
  ],
  "NAPERVILLE": [
    "60567",
    "IL"
  ],
  "NORTH AURORA": [
    "60542",
    "IL"
  ],
  "SERENA": [
    "60549",
    "IL"
  ],
  "SHABBONA": [
    "60550",
    "IL"
  ],
  "SOMONAUK": [
    "60552",
    "IL"
  ],
  "STEWARD": [
    "60553",
    "IL"
  ],
  "WATERMAN": [
    "60556",
    "IL"
  ],
  "WEDRON": [
    "60557",
    "IL"
  ],
  "WESTERN SPRINGS": [
    "60558",
    "IL"
  ],
  "WESTMONT": [
    "60559",
    "IL"
  ],
  "HARWOOD HEIGHTS": [
    "60706",
    "IL"
  ],
  "LINCOLNWOOD": [
    "60712",
    "IL"
  ],
  "ALSIP": [
    "60803",
    "IL"
  ],
  "EVERGREEN PARK": [
    "60805",
    "IL"
  ],
  "KANKAKEE": [
    "60901",
    "IL"
  ],
  "AROMA PARK": [
    "60910",
    "IL"
  ],
  "ASHKUM": [
    "60911",
    "IL"
  ],
  "BEAVERVILLE": [
    "60912",
    "IL"
  ],
  "BONFIELD": [
    "60913",
    "IL"
  ],
  "BOURBONNAIS": [
    "60914",
    "IL"
  ],
  "CABERY": [
    "60919",
    "IL"
  ],
  "CAMPUS": [
    "60920",
    "IL"
  ],
  "CHEBANSE": [
    "60922",
    "IL"
  ],
  "CISSNA PARK": [
    "60924",
    "IL"
  ],
  "CULLOM": [
    "60929",
    "IL"
  ],
  "DONOVAN": [
    "60931",
    "IL"
  ],
  "EMINGTON": [
    "60934",
    "IL"
  ],
  "GIBSON CITY": [
    "60936",
    "IL"
  ],
  "GOODWINE": [
    "60939",
    "IL"
  ],
  "GRANT PARK": [
    "60940",
    "IL"
  ],
  "HERSCHER": [
    "60941",
    "IL"
  ],
  "HOOPESTON": [
    "60942",
    "IL"
  ],
  "HOPKINS PARK": [
    "60944",
    "IL"
  ],
  "LODA": [
    "60948",
    "IL"
  ],
  "MANTENO": [
    "60950",
    "IL"
  ],
  "MARTINTON": [
    "60951",
    "IL"
  ],
  "MOMENCE": [
    "60954",
    "IL"
  ],
  "ONARGA": [
    "60955",
    "IL"
  ],
  "PAPINEAU": [
    "60956",
    "IL"
  ],
  "PEMBROKE TOWNSHIP": [
    "60958",
    "IL"
  ],
  "PIPER CITY": [
    "60959",
    "IL"
  ],
  "RANKIN": [
    "79778",
    "TX"
  ],
  "SAINT ANNE": [
    "60964",
    "IL"
  ],
  "STOCKLAND": [
    "60967",
    "IL"
  ],
  "THAWVILLE": [
    "60968",
    "IL"
  ],
  "WATSEKA": [
    "60970",
    "IL"
  ],
  "APPLE RIVER": [
    "61001",
    "IL"
  ],
  "CHADWICK": [
    "65629",
    "MO"
  ],
  "CHANA": [
    "61015",
    "IL"
  ],
  "DAVIS JUNCTION": [
    "61020",
    "IL"
  ],
  "EAST DUBUQUE": [
    "61025",
    "IL"
  ],
  "ELEROY": [
    "61027",
    "IL"
  ],
  "FORRESTON": [
    "76041",
    "TX"
  ],
  "FRANKLIN GROVE": [
    "61031",
    "IL"
  ],
  "GARDEN PRAIRIE": [
    "61038",
    "IL"
  ],
  "GERMAN VALLEY": [
    "61039",
    "IL"
  ],
  "HARMON": [
    "61042",
    "IL"
  ],
  "LEAF RIVER": [
    "61047",
    "IL"
  ],
  "LINDENWOOD": [
    "61049",
    "IL"
  ],
  "MC CONNELL": [
    "61050",
    "IL"
  ],
  "MONROE CENTER": [
    "61052",
    "IL"
  ],
  "MOUNT CARROLL": [
    "61053",
    "IL"
  ],
  "NACHUSA": [
    "61057",
    "IL"
  ],
  "PEARL CITY": [
    "96782",
    "HI"
  ],
  "PECATONICA": [
    "61063",
    "IL"
  ],
  "POLO": [
    "64671",
    "MO"
  ],
  "POPLAR GROVE": [
    "72374",
    "AR"
  ],
  "RIDOTT": [
    "61067",
    "IL"
  ],
  "ROCK CITY": [
    "61070",
    "IL"
  ],
  "SAVANNA": [
    "74565",
    "OK"
  ],
  "SCALES MOUND": [
    "61075",
    "IL"
  ],
  "SHIRLAND": [
    "61079",
    "IL"
  ],
  "SOUTH BELOIT": [
    "61080",
    "IL"
  ],
  "STILLMAN VALLEY": [
    "61084",
    "IL"
  ],
  "WOOSUNG": [
    "61091",
    "IL"
  ],
  "LOVES PARK": [
    "61132",
    "IL"
  ],
  "MACHESNEY PARK": [
    "61115",
    "IL"
  ],
  "ALEDO": [
    "76008",
    "TX"
  ],
  "ANNAWAN": [
    "61234",
    "IL"
  ],
  "BUFFALO PRAIRIE": [
    "61237",
    "IL"
  ],
  "CARBON CLIFF": [
    "61239",
    "IL"
  ],
  "COAL VALLEY": [
    "61240",
    "IL"
  ],
  "COLONA": [
    "61241",
    "IL"
  ],
  "DEER GROVE": [
    "61243",
    "IL"
  ],
  "EAST MOLINE": [
    "61244",
    "IL"
  ],
  "HOOPPOLE": [
    "61258",
    "IL"
  ],
  "ILLINOIS CITY": [
    "61259",
    "IL"
  ],
  "JOY": [
    "61260",
    "IL"
  ],
  "LYNN CENTER": [
    "61262",
    "IL"
  ],
  "MATHERVILLE": [
    "61263",
    "IL"
  ],
  "ORION": [
    "61273",
    "IL"
  ],
  "OSCO": [
    "61274",
    "IL"
  ],
  "PREEMPTION": [
    "61276",
    "IL"
  ],
  "PROPHETSTOWN": [
    "61277",
    "IL"
  ],
  "RAPIDS CITY": [
    "61278",
    "IL"
  ],
  "SHERRARD": [
    "61281",
    "IL"
  ],
  "SILVIS": [
    "61282",
    "IL"
  ],
  "TAMPICO": [
    "61283",
    "IL"
  ],
  "TAYLOR RIDGE": [
    "61284",
    "IL"
  ],
  "ANCONA": [
    "61311",
    "IL"
  ],
  "BUDA": [
    "78610",
    "TX"
  ],
  "BUREAU": [
    "61315",
    "IL"
  ],
  "CHERRY": [
    "61317",
    "IL"
  ],
  "DEPUE": [
    "61322",
    "IL"
  ],
  "HENNEPIN": [
    "73444",
    "OK"
  ],
  "KASBEER": [
    "61328",
    "IL"
  ],
  "LADD": [
    "61329",
    "IL"
  ],
  "LA MOILLE": [
    "61330",
    "IL"
  ],
  "LEONORE": [
    "61332",
    "IL"
  ],
  "LONG POINT": [
    "61333",
    "IL"
  ],
  "LOSTANT": [
    "61334",
    "IL"
  ],
  "MC NABB": [
    "61335",
    "IL"
  ],
  "MARK": [
    "61340",
    "IL"
  ],
  "MARSEILLES": [
    "61341",
    "IL"
  ],
  "NEPONSET": [
    "61345",
    "IL"
  ],
  "OGLESBY": [
    "76561",
    "TX"
  ],
  "OHIO": [
    "61349",
    "IL"
  ],
  "SEATONVILLE": [
    "61359",
    "IL"
  ],
  "STANDARD": [
    "95373",
    "CA"
  ],
  "STREATOR": [
    "61364",
    "IL"
  ],
  "SUBLETTE": [
    "67877",
    "KS"
  ],
  "TISKILWA": [
    "61368",
    "IL"
  ],
  "TOLUCA": [
    "61369",
    "IL"
  ],
  "TONICA": [
    "61370",
    "IL"
  ],
  "TRIUMPH": [
    "61371",
    "IL"
  ],
  "TROY GROVE": [
    "61372",
    "IL"
  ],
  "VAN ORIN": [
    "61374",
    "IL"
  ],
  "VARNA": [
    "61375",
    "IL"
  ],
  "WENONA": [
    "61377",
    "IL"
  ],
  "WEST BROOKLYN": [
    "61378",
    "IL"
  ],
  "WYANET": [
    "61379",
    "IL"
  ],
  "BIGGSVILLE": [
    "61418",
    "IL"
  ],
  "BISHOP HILL": [
    "61419",
    "IL"
  ],
  "BLANDINSVILLE": [
    "61420",
    "IL"
  ],
  "CAMP GROVE": [
    "61424",
    "IL"
  ],
  "CARMAN": [
    "61425",
    "IL"
  ],
  "DAHINDA": [
    "61428",
    "IL"
  ],
  "EAST GALESBURG": [
    "61430",
    "IL"
  ],
  "FIATT": [
    "61433",
    "IL"
  ],
  "GILSON": [
    "61436",
    "IL"
  ],
  "IPAVA": [
    "61441",
    "IL"
  ],
  "KEITHSBURG": [
    "61442",
    "IL"
  ],
  "KEWANEE": [
    "63860",
    "MO"
  ],
  "LA HARPE": [
    "66751",
    "KS"
  ],
  "LOMAX": [
    "61454",
    "IL"
  ],
  "MAQUON": [
    "61458",
    "IL"
  ],
  "NORTH HENDERSON": [
    "61466",
    "IL"
  ],
  "OPHIEM": [
    "61468",
    "IL"
  ],
  "OQUAWKA": [
    "61469",
    "IL"
  ],
  "SEATON": [
    "61476",
    "IL"
  ],
  "SMITHSHIRE": [
    "61478",
    "IL"
  ],
  "SPEER": [
    "61479",
    "IL"
  ],
  "STRONGHURST": [
    "61480",
    "IL"
  ],
  "TABLE GROVE": [
    "61482",
    "IL"
  ],
  "TOULON": [
    "61483",
    "IL"
  ],
  "VERMONT": [
    "61484",
    "IL"
  ],
  "WATAGA": [
    "61488",
    "IL"
  ],
  "DUNFERMLINE": [
    "61524",
    "IL"
  ],
  "EDELSTEIN": [
    "61526",
    "IL"
  ],
  "GLASFORD": [
    "61533",
    "IL"
  ],
  "HANNA CITY": [
    "61536",
    "IL"
  ],
  "KINGSTON MINES": [
    "61539",
    "IL"
  ],
  "LACON": [
    "61540",
    "IL"
  ],
  "LA ROSE": [
    "61541",
    "IL"
  ],
  "LONDON MILLS": [
    "61544",
    "IL"
  ],
  "LOWPOINT": [
    "61545",
    "IL"
  ],
  "MANITO": [
    "61546",
    "IL"
  ],
  "MOSSVILLE": [
    "61552",
    "IL"
  ],
  "PRINCEVILLE": [
    "96722",
    "HI"
  ],
  "SOUTH PEKIN": [
    "61564",
    "IL"
  ],
  "SPARLAND": [
    "61565",
    "IL"
  ],
  "TRIVOLI": [
    "61569",
    "IL"
  ],
  "YATES CITY": [
    "61572",
    "IL"
  ],
  "PEORIA": [
    "85385",
    "AZ"
  ],
  "CREVE COEUR": [
    "61610",
    "IL"
  ],
  "EAST PEORIA": [
    "61635",
    "IL"
  ],
  "PEORIA HEIGHTS": [
    "61616",
    "IL"
  ],
  "ANCHOR": [
    "61720",
    "IL"
  ],
  "ARMINGTON": [
    "61721",
    "IL"
  ],
  "ARROWSMITH": [
    "61722",
    "IL"
  ],
  "BELLFLOWER": [
    "90707",
    "CA"
  ],
  "CARLOCK": [
    "61725",
    "IL"
  ],
  "CHENOA": [
    "61726",
    "IL"
  ],
  "CONGERVILLE": [
    "61729",
    "IL"
  ],
  "CROPSEY": [
    "61731",
    "IL"
  ],
  "DOWNS": [
    "67437",
    "KS"
  ],
  "EL PASO": [
    "79998",
    "TX"
  ],
  "FAIRBURY": [
    "68352",
    "NE"
  ],
  "FLANAGAN": [
    "61740",
    "IL"
  ],
  "FORREST": [
    "61741",
    "IL"
  ],
  "GOODFIELD": [
    "61742",
    "IL"
  ],
  "GRAYMONT": [
    "61743",
    "IL"
  ],
  "GRIDLEY": [
    "95948",
    "CA"
  ],
  "HEYWORTH": [
    "61745",
    "IL"
  ],
  "KENNEY": [
    "77452",
    "TX"
  ],
  "MACKINAW": [
    "61755",
    "IL"
  ],
  "MAROA": [
    "61756",
    "IL"
  ],
  "MERNA": [
    "68856",
    "NE"
  ],
  "MINIER": [
    "61759",
    "IL"
  ],
  "MINONK": [
    "61760",
    "IL"
  ],
  "SAUNEMIN": [
    "61769",
    "IL"
  ],
  "SAYBROOK": [
    "61770",
    "IL"
  ],
  "SECOR": [
    "61771",
    "IL"
  ],
  "STRAWN": [
    "76475",
    "TX"
  ],
  "WAPELLA": [
    "61777",
    "IL"
  ],
  "ALVIN": [
    "77512",
    "TX"
  ],
  "BEMENT": [
    "61813",
    "IL"
  ],
  "BROADLANDS": [
    "61816",
    "IL"
  ],
  "CATLIN": [
    "61817",
    "IL"
  ],
  "CHAMPAIGN": [
    "61826",
    "IL"
  ],
  "DE LAND": [
    "61839",
    "IL"
  ],
  "DEWEY": [
    "86327",
    "AZ"
  ],
  "FARMER CITY": [
    "61842",
    "IL"
  ],
  "FITHIAN": [
    "61844",
    "IL"
  ],
  "FOOSLAND": [
    "61845",
    "IL"
  ],
  "IVESDALE": [
    "61851",
    "IL"
  ],
  "LONGVIEW": [
    "98632",
    "WA"
  ],
  "MAHOMET": [
    "61853",
    "IL"
  ],
  "MILMINE": [
    "61855",
    "IL"
  ],
  "PESOTUM": [
    "61863",
    "IL"
  ],
  "RANTOUL": [
    "66079",
    "KS"
  ],
  "RIDGE FARM": [
    "61870",
    "IL"
  ],
  "SADORUS": [
    "61872",
    "IL"
  ],
  "SIDELL": [
    "61876",
    "IL"
  ],
  "THOMASBORO": [
    "61878",
    "IL"
  ],
  "TOLONO": [
    "61880",
    "IL"
  ],
  "WHITE HEATH": [
    "61884",
    "IL"
  ],
  "ASHMORE": [
    "61912",
    "IL"
  ],
  "CAMARGO": [
    "73835",
    "OK"
  ],
  "CHRISMAN": [
    "61924",
    "IL"
  ],
  "DALTON CITY": [
    "61925",
    "IL"
  ],
  "GAYS": [
    "61928",
    "IL"
  ],
  "HINDSBORO": [
    "61930",
    "IL"
  ],
  "LA PLACE": [
    "70069",
    "LA"
  ],
  "LOVINGTON": [
    "88260",
    "NM"
  ],
  "METCALF": [
    "61940",
    "IL"
  ],
  "NEWMAN": [
    "95360",
    "CA"
  ],
  "REDMON": [
    "61949",
    "IL"
  ],
  "TUSCOLA": [
    "79562",
    "TX"
  ],
  "VILLA GROVE": [
    "81155",
    "CO"
  ],
  "ALHAMBRA": [
    "91803",
    "CA"
  ],
  "BATCHTOWN": [
    "62006",
    "IL"
  ],
  "BENLD": [
    "62009",
    "IL"
  ],
  "BETHALTO": [
    "62010",
    "IL"
  ],
  "COFFEEN": [
    "62017",
    "IL"
  ],
  "COTTAGE HILLS": [
    "62018",
    "IL"
  ],
  "DORSEY": [
    "62021",
    "IL"
  ],
  "DOW": [
    "62022",
    "IL"
  ],
  "EAGARVILLE": [
    "62023",
    "IL"
  ],
  "EAST ALTON": [
    "62024",
    "IL"
  ],
  "ELSAH": [
    "62028",
    "IL"
  ],
  "FIELDON": [
    "62031",
    "IL"
  ],
  "GILLESPIE": [
    "62033",
    "IL"
  ],
  "GLEN CARBON": [
    "62034",
    "IL"
  ],
  "GODFREY": [
    "62035",
    "IL"
  ],
  "GOLDEN EAGLE": [
    "62036",
    "IL"
  ],
  "GRANITE CITY": [
    "62040",
    "IL"
  ],
  "JERSEYVILLE": [
    "62052",
    "IL"
  ],
  "KAMPSVILLE": [
    "62053",
    "IL"
  ],
  "MARINE": [
    "62061",
    "IL"
  ],
  "MICHAEL": [
    "62065",
    "IL"
  ],
  "MORO": [
    "97039",
    "OR"
  ],
  "MOZIER": [
    "62070",
    "IL"
  ],
  "NATIONAL STOCK YARDS": [
    "62071",
    "IL"
  ],
  "NEW DOUGLAS": [
    "62074",
    "IL"
  ],
  "OHLMAN": [
    "62076",
    "IL"
  ],
  "PIASA": [
    "62079",
    "IL"
  ],
  "ROODHOUSE": [
    "62082",
    "IL"
  ],
  "ROSAMOND": [
    "93560",
    "CA"
  ],
  "SORENTO": [
    "62086",
    "IL"
  ],
  "SOUTH ROXANA": [
    "62087",
    "IL"
  ],
  "TAYLOR SPRINGS": [
    "62089",
    "IL"
  ],
  "WALSHVILLE": [
    "62091",
    "IL"
  ],
  "WITT": [
    "62094",
    "IL"
  ],
  "WOOD RIVER": [
    "68883",
    "NE"
  ],
  "WRIGHTS": [
    "62098",
    "IL"
  ],
  "EAST SAINT LOUIS": [
    "62207",
    "IL"
  ],
  "FAIRVIEW HEIGHTS": [
    "62208",
    "IL"
  ],
  "ADDIEVILLE": [
    "62214",
    "IL"
  ],
  "ALBERS": [
    "62215",
    "IL"
  ],
  "AVISTON": [
    "62216",
    "IL"
  ],
  "BARTELSO": [
    "62218",
    "IL"
  ],
  "BECKEMEYER": [
    "62219",
    "IL"
  ],
  "SCOTT AIR FORCE BASE": [
    "62225",
    "IL"
  ],
  "BREESE": [
    "62230",
    "IL"
  ],
  "CARLYLE": [
    "62231",
    "IL"
  ],
  "CASEYVILLE": [
    "62232",
    "IL"
  ],
  "COULTERVILLE": [
    "95311",
    "CA"
  ],
  "DUPO": [
    "62239",
    "IL"
  ],
  "EAST CARONDELET": [
    "62240",
    "IL"
  ],
  "ELLIS GROVE": [
    "62241",
    "IL"
  ],
  "FULTS": [
    "62244",
    "IL"
  ],
  "HAGARSTOWN": [
    "62247",
    "IL"
  ],
  "HECKER": [
    "62248",
    "IL"
  ],
  "HUEY": [
    "62252",
    "IL"
  ],
  "KEYESPORT": [
    "62253",
    "IL"
  ],
  "LENZBURG": [
    "62255",
    "IL"
  ],
  "MAEYSTOWN": [
    "62256",
    "IL"
  ],
  "MARISSA": [
    "62257",
    "IL"
  ],
  "MASCOUTAH": [
    "62258",
    "IL"
  ],
  "MENARD": [
    "76859",
    "TX"
  ],
  "MILLSTADT": [
    "62260",
    "IL"
  ],
  "MULBERRY GROVE": [
    "62262",
    "IL"
  ],
  "NEW BADEN": [
    "77870",
    "TX"
  ],
  "NEW MEMPHIS": [
    "62266",
    "IL"
  ],
  "O FALLON": [
    "63368",
    "MO"
  ],
  "OKAWVILLE": [
    "62271",
    "IL"
  ],
  "PERCY": [
    "62272",
    "IL"
  ],
  "PIERRON": [
    "62273",
    "IL"
  ],
  "PINCKNEYVILLE": [
    "62274",
    "IL"
  ],
  "PRAIRIE DU ROCHER": [
    "62277",
    "IL"
  ],
  "RED BUD": [
    "62278",
    "IL"
  ],
  "RENAULT": [
    "62279",
    "IL"
  ],
  "SAINT JACOB": [
    "62281",
    "IL"
  ],
  "SAINT LIBORY": [
    "68872",
    "NE"
  ],
  "STEELEVILLE": [
    "62288",
    "IL"
  ],
  "TILDEN": [
    "78072",
    "TX"
  ],
  "VALMEYER": [
    "62295",
    "IL"
  ],
  "WALSH": [
    "81090",
    "CO"
  ],
  "BASCO": [
    "62313",
    "IL"
  ],
  "BAYLIS": [
    "62314",
    "IL"
  ],
  "BOWEN": [
    "62316",
    "IL"
  ],
  "CAMP POINT": [
    "62320",
    "IL"
  ],
  "COATSBURG": [
    "62325",
    "IL"
  ],
  "COLUSA": [
    "95932",
    "CA"
  ],
  "DALLAS CITY": [
    "62330",
    "IL"
  ],
  "ELVASTON": [
    "62334",
    "IL"
  ],
  "FERRIS": [
    "75125",
    "TX"
  ],
  "GRIGGSVILLE": [
    "62340",
    "IL"
  ],
  "LA PRAIRIE": [
    "62346",
    "IL"
  ],
  "LORAINE": [
    "79532",
    "TX"
  ],
  "PALOMA": [
    "62359",
    "IL"
  ],
  "PAYSON": [
    "85547",
    "AZ"
  ],
  "SUTTER": [
    "95982",
    "CA"
  ],
  "TENNESSEE": [
    "62374",
    "IL"
  ],
  "TIMEWELL": [
    "62375",
    "IL"
  ],
  "URSA": [
    "62376",
    "IL"
  ],
  "BEECHER CITY": [
    "62414",
    "IL"
  ],
  "COWDEN": [
    "62422",
    "IL"
  ],
  "DIETERICH": [
    "62424",
    "IL"
  ],
  "HIDALGO": [
    "78557",
    "TX"
  ],
  "HUTSONVILLE": [
    "62433",
    "IL"
  ],
  "INGRAHAM": [
    "62434",
    "IL"
  ],
  "LERNA": [
    "62440",
    "IL"
  ],
  "MODE": [
    "62444",
    "IL"
  ],
  "MOUNT ERIE": [
    "62446",
    "IL"
  ],
  "NEOGA": [
    "62447",
    "IL"
  ],
  "OBLONG": [
    "62449",
    "IL"
  ],
  "SAINTE MARIE": [
    "62459",
    "IL"
  ],
  "SAINT FRANCISVILLE": [
    "70775",
    "LA"
  ],
  "SHUMWAY": [
    "62461",
    "IL"
  ],
  "STEWARDSON": [
    "62463",
    "IL"
  ],
  "STOY": [
    "62464",
    "IL"
  ],
  "TEUTOPOLIS": [
    "62467",
    "IL"
  ],
  "TRILLA": [
    "62469",
    "IL"
  ],
  "WEST YORK": [
    "62478",
    "IL"
  ],
  "ARGENTA": [
    "62501",
    "IL"
  ],
  "ASSUMPTION": [
    "62510",
    "IL"
  ],
  "BEASON": [
    "62512",
    "IL"
  ],
  "BLUE MOUND": [
    "66010",
    "KS"
  ],
  "BOODY": [
    "62514",
    "IL"
  ],
  "BULPITT": [
    "62517",
    "IL"
  ],
  "CHESTNUT": [
    "62518",
    "IL"
  ],
  "CORNLAND": [
    "62519",
    "IL"
  ],
  "DIVERNON": [
    "62530",
    "IL"
  ],
  "ELWIN": [
    "62532",
    "IL"
  ],
  "GLENARM": [
    "62536",
    "IL"
  ],
  "HARRISTOWN": [
    "62537",
    "IL"
  ],
  "HARVEL": [
    "62538",
    "IL"
  ],
  "ILLIOPOLIS": [
    "62539",
    "IL"
  ],
  "LAKE FORK": [
    "83635",
    "ID"
  ],
  "MOUNT PULASKI": [
    "62548",
    "IL"
  ],
  "MT ZION": [
    "62549",
    "IL"
  ],
  "MOWEAQUA": [
    "62550",
    "IL"
  ],
  "OREANA": [
    "62554",
    "IL"
  ],
  "OWANECO": [
    "62555",
    "IL"
  ],
  "PANA": [
    "62557",
    "IL"
  ],
  "PAWNEE": [
    "78145",
    "TX"
  ],
  "TAYLORVILLE": [
    "62568",
    "IL"
  ],
  "TOVEY": [
    "62570",
    "IL"
  ],
  "TOWER HILL": [
    "62571",
    "IL"
  ],
  "WAGGONER": [
    "62572",
    "IL"
  ],
  "ALSEY": [
    "62610",
    "IL"
  ],
  "ARENZVILLE": [
    "62611",
    "IL"
  ],
  "BEARDSTOWN": [
    "62618",
    "IL"
  ],
  "BLUFFS": [
    "62621",
    "IL"
  ],
  "BLUFF SPRINGS": [
    "62622",
    "IL"
  ],
  "CANTRALL": [
    "62625",
    "IL"
  ],
  "CARLINVILLE": [
    "62626",
    "IL"
  ],
  "CHANDLERVILLE": [
    "62627",
    "IL"
  ],
  "EMDEN": [
    "62635",
    "IL"
  ],
  "GREENVIEW": [
    "96037",
    "CA"
  ],
  "HARTSBURG": [
    "65039",
    "MO"
  ],
  "HETTICK": [
    "62649",
    "IL"
  ],
  "LITERBERRY": [
    "62660",
    "IL"
  ],
  "LOAMI": [
    "62661",
    "IL"
  ],
  "MEREDOSIA": [
    "62665",
    "IL"
  ],
  "MODESTO": [
    "95397",
    "CA"
  ],
  "NILWOOD": [
    "62672",
    "IL"
  ],
  "PLEASANT PLAINS": [
    "72568",
    "AR"
  ],
  "SAN JOSE": [
    "95193",
    "CA"
  ],
  "TALLULA": [
    "62688",
    "IL"
  ],
  "VIRDEN": [
    "62690",
    "IL"
  ],
  "WOODSON": [
    "76491",
    "TX"
  ],
  "CENTRALIA": [
    "98531",
    "WA"
  ],
  "HOYLETON": [
    "62803",
    "IL"
  ],
  "BARNHILL": [
    "62809",
    "IL"
  ],
  "BELLE RIVE": [
    "62810",
    "IL"
  ],
  "BELLMONT": [
    "62811",
    "IL"
  ],
  "BLUFORD": [
    "62814",
    "IL"
  ],
  "BONE GAP": [
    "62815",
    "IL"
  ],
  "BONNIE": [
    "62816",
    "IL"
  ],
  "BROUGHTON": [
    "62817",
    "IL"
  ],
  "BROWNS": [
    "62818",
    "IL"
  ],
  "BURNT PRAIRIE": [
    "62820",
    "IL"
  ],
  "CARMI": [
    "62821",
    "IL"
  ],
  "CHRISTOPHER": [
    "62822",
    "IL"
  ],
  "CISNE": [
    "62823",
    "IL"
  ],
  "COELLO": [
    "62825",
    "IL"
  ],
  "DIX": [
    "69133",
    "NE"
  ],
  "DU QUOIN": [
    "62832",
    "IL"
  ],
  "ELLERY": [
    "62833",
    "IL"
  ],
  "FARINA": [
    "62838",
    "IL"
  ],
  "GEFF": [
    "62842",
    "IL"
  ],
  "GOLDEN GATE": [
    "62843",
    "IL"
  ],
  "GRAYVILLE": [
    "62844",
    "IL"
  ],
  "INA": [
    "62846",
    "IL"
  ],
  "KEENES": [
    "62851",
    "IL"
  ],
  "KEENSBURG": [
    "62852",
    "IL"
  ],
  "KELL": [
    "62853",
    "IL"
  ],
  "KINMUNDY": [
    "62854",
    "IL"
  ],
  "MC LEANSBORO": [
    "62859",
    "IL"
  ],
  "MILL SHOALS": [
    "62862",
    "IL"
  ],
  "MULKEYTOWN": [
    "62865",
    "IL"
  ],
  "NASON": [
    "62866",
    "IL"
  ],
  "NOBLE": [
    "73068",
    "OK"
  ],
  "NORRIS CITY": [
    "62869",
    "IL"
  ],
  "OPDYKE": [
    "62872",
    "IL"
  ],
  "RADOM": [
    "62876",
    "IL"
  ],
  "RICHVIEW": [
    "62877",
    "IL"
  ],
  "RINARD": [
    "62878",
    "IL"
  ],
  "SAILOR SPRINGS": [
    "62879",
    "IL"
  ],
  "SANDOVAL": [
    "62882",
    "IL"
  ],
  "SCHELLER": [
    "62883",
    "IL"
  ],
  "SESSER": [
    "62884",
    "IL"
  ],
  "SHOBONIER": [
    "62885",
    "IL"
  ],
  "SPRINGERTON": [
    "62887",
    "IL"
  ],
  "TAMAROA": [
    "62888",
    "IL"
  ],
  "TEXICO": [
    "88135",
    "NM"
  ],
  "WALNUT HILL": [
    "62893",
    "IL"
  ],
  "WALTONVILLE": [
    "62894",
    "IL"
  ],
  "WAYNE CITY": [
    "62895",
    "IL"
  ],
  "WEST FRANKFORT": [
    "62896",
    "IL"
  ],
  "WHITTINGTON": [
    "62897",
    "IL"
  ],
  "ALTO PASS": [
    "62905",
    "IL"
  ],
  "BELKNAP": [
    "62908",
    "IL"
  ],
  "BOLES": [
    "72926",
    "AR"
  ],
  "BROOKPORT": [
    "62910",
    "IL"
  ],
  "BUNCOMBE": [
    "62912",
    "IL"
  ],
  "CAMPBELL HILL": [
    "62916",
    "IL"
  ],
  "CARRIER MILLS": [
    "62917",
    "IL"
  ],
  "CARTERVILLE": [
    "64835",
    "MO"
  ],
  "CAVE IN ROCK": [
    "62919",
    "IL"
  ],
  "COBDEN": [
    "62920",
    "IL"
  ],
  "CREAL SPRINGS": [
    "62922",
    "IL"
  ],
  "CYPRESS": [
    "90630",
    "CA"
  ],
  "DONGOLA": [
    "62926",
    "IL"
  ],
  "ELKVILLE": [
    "62932",
    "IL"
  ],
  "ENERGY": [
    "76452",
    "TX"
  ],
  "GALATIA": [
    "62935",
    "IL"
  ],
  "GOLCONDA": [
    "89414",
    "NV"
  ],
  "GOREVILLE": [
    "62939",
    "IL"
  ],
  "GRAND CHAIN": [
    "62941",
    "IL"
  ],
  "GRAND TOWER": [
    "62942",
    "IL"
  ],
  "HEROD": [
    "62947",
    "IL"
  ],
  "HERRIN": [
    "62948",
    "IL"
  ],
  "HURST": [
    "76054",
    "TX"
  ],
  "JACOB": [
    "62950",
    "IL"
  ],
  "JOHNSTON CITY": [
    "62951",
    "IL"
  ],
  "JUNCTION": [
    "84740",
    "UT"
  ],
  "KARNAK": [
    "62956",
    "IL"
  ],
  "MAKANDA": [
    "62958",
    "IL"
  ],
  "METROPOLIS": [
    "62960",
    "IL"
  ],
  "MOUNDS": [
    "74047",
    "OK"
  ],
  "MUDDY": [
    "62965",
    "IL"
  ],
  "MURPHYSBORO": [
    "62966",
    "IL"
  ],
  "OLMSTED": [
    "62970",
    "IL"
  ],
  "PERKS": [
    "62973",
    "IL"
  ],
  "ROSICLARE": [
    "62982",
    "IL"
  ],
  "SHAWNEETOWN": [
    "62984",
    "IL"
  ],
  "STONEFORT": [
    "62987",
    "IL"
  ],
  "TAMMS": [
    "62988",
    "IL"
  ],
  "THEBES": [
    "62990",
    "IL"
  ],
  "ULLIN": [
    "62992",
    "IL"
  ],
  "VILLA RIDGE": [
    "63089",
    "MO"
  ],
  "WILLISVILLE": [
    "71864",
    "AR"
  ],
  "ZEIGLER": [
    "62999",
    "IL"
  ],
  "BALLWIN": [
    "63024",
    "MO"
  ],
  "BARNHART": [
    "76930",
    "TX"
  ],
  "BERGER": [
    "63014",
    "MO"
  ],
  "CRYSTAL CITY": [
    "78839",
    "TX"
  ],
  "DITTMER": [
    "63023",
    "MO"
  ],
  "FESTUS": [
    "63028",
    "MO"
  ],
  "FLORISSANT": [
    "80816",
    "CO"
  ],
  "FRENCH VILLAGE": [
    "63036",
    "MO"
  ],
  "GERALD": [
    "63037",
    "MO"
  ],
  "GRAY SUMMIT": [
    "63039",
    "MO"
  ],
  "GRUBVILLE": [
    "63041",
    "MO"
  ],
  "MARYLAND HEIGHTS": [
    "63043",
    "MO"
  ],
  "EARTH CITY": [
    "63045",
    "MO"
  ],
  "HEMATITE": [
    "63047",
    "MO"
  ],
  "HERCULANEUM": [
    "63048",
    "MO"
  ],
  "HIGH RIDGE": [
    "63049",
    "MO"
  ],
  "HOUSE SPRINGS": [
    "63051",
    "MO"
  ],
  "KIMMSWICK": [
    "63053",
    "MO"
  ],
  "LABADIE": [
    "63055",
    "MO"
  ],
  "LIGUORI": [
    "63057",
    "MO"
  ],
  "LONEDELL": [
    "63060",
    "MO"
  ],
  "LUEBBERING": [
    "63061",
    "MO"
  ],
  "MAPAVILLE": [
    "63065",
    "MO"
  ],
  "MORSE MILL": [
    "63066",
    "MO"
  ],
  "PACIFIC": [
    "98047",
    "WA"
  ],
  "PEVELY": [
    "63070",
    "MO"
  ],
  "RICHWOODS": [
    "63071",
    "MO"
  ],
  "SAINT ANN": [
    "63074",
    "MO"
  ],
  "VALLES MINES": [
    "63087",
    "MO"
  ],
  "ANNADA": [
    "63330",
    "MO"
  ],
  "COTTLEVILLE": [
    "63338",
    "MO"
  ],
  "DUTZOW": [
    "63342",
    "MO"
  ],
  "ELSBERRY": [
    "63343",
    "MO"
  ],
  "EOLIA": [
    "63344",
    "MO"
  ],
  "FARBER": [
    "63345",
    "MO"
  ],
  "FLINTHILL": [
    "63346",
    "MO"
  ],
  "FORISTELL": [
    "63348",
    "MO"
  ],
  "HAWK POINT": [
    "63349",
    "MO"
  ],
  "HIGH HILL": [
    "63350",
    "MO"
  ],
  "JONESBURG": [
    "63351",
    "MO"
  ],
  "LADDONIA": [
    "63352",
    "MO"
  ],
  "LOUISIANA": [
    "63353",
    "MO"
  ],
  "MARTHASVILLE": [
    "63357",
    "MO"
  ],
  "MONTGOMERY CITY": [
    "63361",
    "MO"
  ],
  "MOSCOW MILLS": [
    "63362",
    "MO"
  ],
  "NEW MELLE": [
    "63365",
    "MO"
  ],
  "LAKE SAINT LOUIS": [
    "63367",
    "MO"
  ],
  "OLD MONROE": [
    "63369",
    "MO"
  ],
  "PORTAGE DES SIOUX": [
    "63373",
    "MO"
  ],
  "SILEX": [
    "63377",
    "MO"
  ],
  "WENTZVILLE": [
    "63385",
    "MO"
  ],
  "WEST ALTON": [
    "63386",
    "MO"
  ],
  "WHITESIDE": [
    "63387",
    "MO"
  ],
  "WRIGHT CITY": [
    "74766",
    "OK"
  ],
  "ANABEL": [
    "63431",
    "MO"
  ],
  "ARBELA": [
    "63432",
    "MO"
  ],
  "HUNNEWELL": [
    "63443",
    "MO"
  ],
  "KAHOKA": [
    "63445",
    "MO"
  ],
  "KNOX CITY": [
    "79529",
    "TX"
  ],
  "SAVERTON": [
    "63467",
    "MO"
  ],
  "SHELBINA": [
    "63468",
    "MO"
  ],
  "WYACONDA": [
    "63474",
    "MO"
  ],
  "KIRKSVILLE": [
    "63501",
    "MO"
  ],
  "BARING": [
    "98224",
    "WA"
  ],
  "BEVIER": [
    "63532",
    "MO"
  ],
  "BRASHEAR": [
    "75420",
    "TX"
  ],
  "COATSVILLE": [
    "63535",
    "MO"
  ],
  "EDINA": [
    "63537",
    "MO"
  ],
  "GORIN": [
    "63543",
    "MO"
  ],
  "GREEN CASTLE": [
    "63544",
    "MO"
  ],
  "GREEN CITY": [
    "63545",
    "MO"
  ],
  "GREENTOP": [
    "63546",
    "MO"
  ],
  "HURDLAND": [
    "63547",
    "MO"
  ],
  "NEW CAMBRIA": [
    "67470",
    "KS"
  ],
  "NOVINGER": [
    "63559",
    "MO"
  ],
  "QUEEN CITY": [
    "75572",
    "TX"
  ],
  "WINIGAN": [
    "63566",
    "MO"
  ],
  "PARK HILLS": [
    "63601",
    "MO"
  ],
  "BLACKWELL": [
    "79506",
    "TX"
  ],
  "BLOOMSDALE": [
    "63627",
    "MO"
  ],
  "BONNE TERRE": [
    "63628",
    "MO"
  ],
  "BUNKER": [
    "63629",
    "MO"
  ],
  "CADET": [
    "63630",
    "MO"
  ],
  "DES ARC": [
    "72040",
    "AR"
  ],
  "DOE RUN": [
    "63637",
    "MO"
  ],
  "LEADWOOD": [
    "63653",
    "MO"
  ],
  "MARQUAND": [
    "63655",
    "MO"
  ],
  "MIDDLE BROOK": [
    "63656",
    "MO"
  ],
  "PILOT KNOB": [
    "63663",
    "MO"
  ],
  "SAINTE GENEVIEVE": [
    "63670",
    "MO"
  ],
  "TIFF": [
    "63674",
    "MO"
  ],
  "CAPE GIRARDEAU": [
    "63703",
    "MO"
  ],
  "ALTENBURG": [
    "63732",
    "MO"
  ],
  "BELL CITY": [
    "70630",
    "LA"
  ],
  "BURFORDVILLE": [
    "63739",
    "MO"
  ],
  "DUTCHTOWN": [
    "63745",
    "MO"
  ],
  "FARRAR": [
    "63746",
    "MO"
  ],
  "FRIEDHEIM": [
    "63747",
    "MO"
  ],
  "FROHNA": [
    "63748",
    "MO"
  ],
  "GLENALLEN": [
    "63751",
    "MO"
  ],
  "OLD APPLETON": [
    "63770",
    "MO"
  ],
  "MC BRIDE": [
    "63776",
    "MO"
  ],
  "SCOTT CITY": [
    "67871",
    "KS"
  ],
  "SEDGEWICKVILLE": [
    "63781",
    "MO"
  ],
  "STURDIVANT": [
    "63782",
    "MO"
  ],
  "VANDUSER": [
    "63784",
    "MO"
  ],
  "ZALMA": [
    "63787",
    "MO"
  ],
  "SIKESTON": [
    "63801",
    "MO"
  ],
  "ARBYRD": [
    "63821",
    "MO"
  ],
  "BERNIE": [
    "63822",
    "MO"
  ],
  "BERTRAND": [
    "68927",
    "NE"
  ],
  "BRAGGADOCIO": [
    "63826",
    "MO"
  ],
  "BRAGG CITY": [
    "63827",
    "MO"
  ],
  "CARUTHERSVILLE": [
    "63830",
    "MO"
  ],
  "CATRON": [
    "63833",
    "MO"
  ],
  "COOTER": [
    "63839",
    "MO"
  ],
  "EAST PRAIRIE": [
    "63845",
    "MO"
  ],
  "GIDEON": [
    "63848",
    "MO"
  ],
  "GOBLER": [
    "63849",
    "MO"
  ],
  "HORNERSVILLE": [
    "63855",
    "MO"
  ],
  "KENNETT": [
    "63857",
    "MO"
  ],
  "LILBOURN": [
    "63862",
    "MO"
  ],
  "MOREHOUSE": [
    "63868",
    "MO"
  ],
  "NEW MADRID": [
    "63869",
    "MO"
  ],
  "RISCO": [
    "63874",
    "MO"
  ],
  "SENATH": [
    "63876",
    "MO"
  ],
  "WARDELL": [
    "63879",
    "MO"
  ],
  "WHITEOAK": [
    "63880",
    "MO"
  ],
  "POPLAR BLUFF": [
    "63902",
    "MO"
  ],
  "BROSELEY": [
    "63932",
    "MO"
  ],
  "CLUBB": [
    "63934",
    "MO"
  ],
  "DONIPHAN": [
    "68832",
    "NE"
  ],
  "ELLSINORE": [
    "63937",
    "MO"
  ],
  "FAGUS": [
    "63938",
    "MO"
  ],
  "FAIRDEALING": [
    "63939",
    "MO"
  ],
  "FISK": [
    "63940",
    "MO"
  ],
  "GATEWOOD": [
    "63942",
    "MO"
  ],
  "HARVIELL": [
    "63945",
    "MO"
  ],
  "LOWNDES": [
    "63951",
    "MO"
  ],
  "NEELYVILLE": [
    "63954",
    "MO"
  ],
  "OXLY": [
    "63955",
    "MO"
  ],
  "PUXICO": [
    "63960",
    "MO"
  ],
  "QULIN": [
    "63961",
    "MO"
  ],
  "SILVA": [
    "63964",
    "MO"
  ],
  "WAPPAPELLO": [
    "63966",
    "MO"
  ],
  "BATES CITY": [
    "64011",
    "MO"
  ],
  "CAMDEN POINT": [
    "64018",
    "MO"
  ],
  "CENTERVIEW": [
    "64019",
    "MO"
  ],
  "CONCORDIA": [
    "66901",
    "KS"
  ],
  "CORDER": [
    "64021",
    "MO"
  ],
  "EXCELSIOR SPRINGS": [
    "64024",
    "MO"
  ],
  "GRAIN VALLEY": [
    "64029",
    "MO"
  ],
  "HIGGINSVILLE": [
    "64037",
    "MO"
  ],
  "KEARNEY": [
    "68849",
    "NE"
  ],
  "LAWSON": [
    "71750",
    "AR"
  ],
  "LEES SUMMIT": [
    "64086",
    "MO"
  ],
  "LEVASY": [
    "64066",
    "MO"
  ],
  "LONE JACK": [
    "64070",
    "MO"
  ],
  "MAYVIEW": [
    "64071",
    "MO"
  ],
  "MISSOURI CITY": [
    "77489",
    "TX"
  ],
  "ORRICK": [
    "64077",
    "MO"
  ],
  "PECULIAR": [
    "64078",
    "MO"
  ],
  "PLATTE CITY": [
    "64079",
    "MO"
  ],
  "RAYMORE": [
    "64083",
    "MO"
  ],
  "RAYVILLE": [
    "71269",
    "LA"
  ],
  "KANSAS CITY": [
    "66160",
    "KS"
  ],
  "AMAZONIA": [
    "64421",
    "MO"
  ],
  "BLYTHEDALE": [
    "64426",
    "MO"
  ],
  "BOLCKOW": [
    "64427",
    "MO"
  ],
  "BURLINGTON JUNCTION": [
    "64428",
    "MO"
  ],
  "CLEARMONT": [
    "82835",
    "WY"
  ],
  "CONCEPTION": [
    "64433",
    "MO"
  ],
  "CONCEPTION JUNCTION": [
    "64434",
    "MO"
  ],
  "CRAIG": [
    "99921",
    "AK"
  ],
  "FAUCETT": [
    "64448",
    "MO"
  ],
  "GENTRY": [
    "72734",
    "AR"
  ],
  "GOWER": [
    "64454",
    "MO"
  ],
  "GRANT CITY": [
    "64456",
    "MO"
  ],
  "KING CITY": [
    "93930",
    "CA"
  ],
  "LATHROP": [
    "95330",
    "CA"
  ],
  "OSBORN": [
    "64474",
    "MO"
  ],
  "PICKERING": [
    "64476",
    "MO"
  ],
  "PLATTSBURG": [
    "64477",
    "MO"
  ],
  "RAVENWOOD": [
    "64479",
    "MO"
  ],
  "REA": [
    "64480",
    "MO"
  ],
  "ROCK PORT": [
    "64482",
    "MO"
  ],
  "SKIDMORE": [
    "78389",
    "TX"
  ],
  "STANBERRY": [
    "64489",
    "MO"
  ],
  "TARKIO": [
    "64491",
    "MO"
  ],
  "TURNEY": [
    "64493",
    "MO"
  ],
  "WEATHERBY": [
    "64497",
    "MO"
  ],
  "BOGARD": [
    "64622",
    "MO"
  ],
  "BOSWORTH": [
    "64623",
    "MO"
  ],
  "BRAYMER": [
    "64624",
    "MO"
  ],
  "BUCKLIN": [
    "67834",
    "KS"
  ],
  "CAINSVILLE": [
    "64632",
    "MO"
  ],
  "COFFEY": [
    "64636",
    "MO"
  ],
  "COWGILL": [
    "64637",
    "MO"
  ],
  "DAWN": [
    "79025",
    "TX"
  ],
  "GILMAN CITY": [
    "64642",
    "MO"
  ],
  "HUMPHREYS": [
    "64646",
    "MO"
  ],
  "JAMESON": [
    "64647",
    "MO"
  ],
  "KIDDER": [
    "64649",
    "MO"
  ],
  "LACLEDE": [
    "83841",
    "ID"
  ],
  "LAREDO": [
    "78049",
    "TX"
  ],
  "LINNEUS": [
    "64653",
    "MO"
  ],
  "MC FALL": [
    "64657",
    "MO"
  ],
  "MARCELINE": [
    "64658",
    "MO"
  ],
  "NORBORNE": [
    "64668",
    "MO"
  ],
  "PATTONSBURG": [
    "64670",
    "MO"
  ],
  "POWERSVILLE": [
    "64672",
    "MO"
  ],
  "PURDIN": [
    "64674",
    "MO"
  ],
  "ROTHVILLE": [
    "64676",
    "MO"
  ],
  "SPICKARD": [
    "64679",
    "MO"
  ],
  "TINA": [
    "64682",
    "MO"
  ],
  "AMORET": [
    "64722",
    "MO"
  ],
  "APPLETON CITY": [
    "64724",
    "MO"
  ],
  "ARCHIE": [
    "64725",
    "MO"
  ],
  "BRONAUGH": [
    "64728",
    "MO"
  ],
  "CHILHOWEE": [
    "64733",
    "MO"
  ],
  "EAST LYNNE": [
    "64743",
    "MO"
  ],
  "EL DORADO SPRINGS": [
    "64744",
    "MO"
  ],
  "GOLDEN CITY": [
    "64748",
    "MO"
  ],
  "JERICO SPRINGS": [
    "64756",
    "MO"
  ],
  "LEETON": [
    "64761",
    "MO"
  ],
  "LIBERAL": [
    "67905",
    "KS"
  ],
  "LOWRY CITY": [
    "64763",
    "MO"
  ],
  "MINDENMINES": [
    "64769",
    "MO"
  ],
  "RICHARDS": [
    "77873",
    "TX"
  ],
  "RICH HILL": [
    "64779",
    "MO"
  ],
  "SCHELL CITY": [
    "64783",
    "MO"
  ],
  "URICH": [
    "64788",
    "MO"
  ],
  "CARL JUNCTION": [
    "64834",
    "MO"
  ],
  "DUENWEG": [
    "64841",
    "MO"
  ],
  "LANAGAN": [
    "64847",
    "MO"
  ],
  "LA RUSSELL": [
    "64848",
    "MO"
  ],
  "NEWTONIA": [
    "64853",
    "MO"
  ],
  "NOEL": [
    "64854",
    "MO"
  ],
  "ORONOGO": [
    "64855",
    "MO"
  ],
  "PURCELL": [
    "73080",
    "OK"
  ],
  "REEDS": [
    "64859",
    "MO"
  ],
  "ROCKY COMFORT": [
    "64861",
    "MO"
  ],
  "SARCOXIE": [
    "64862",
    "MO"
  ],
  "SOUTH WEST CITY": [
    "64863",
    "MO"
  ],
  "STARK CITY": [
    "64866",
    "MO"
  ],
  "TIFF CITY": [
    "64868",
    "MO"
  ],
  "WEBB CITY": [
    "64870",
    "MO"
  ],
  "BARNETT": [
    "65011",
    "MO"
  ],
  "BONNOTS MILL": [
    "65016",
    "MO"
  ],
  "BRUMLEY": [
    "65017",
    "MO"
  ],
  "CAMDENTON": [
    "65020",
    "MO"
  ],
  "CHAMOIS": [
    "65024",
    "MO"
  ],
  "EUGENE": [
    "97440",
    "OR"
  ],
  "GRAVOIS MILLS": [
    "65037",
    "MO"
  ],
  "LAURIE": [
    "65038",
    "MO"
  ],
  "HENLEY": [
    "65040",
    "MO"
  ],
  "HERMANN": [
    "65041",
    "MO"
  ],
  "HOLTS SUMMIT": [
    "65043",
    "MO"
  ],
  "KAISER": [
    "65047",
    "MO"
  ],
  "KOELTZTOWN": [
    "65048",
    "MO"
  ],
  "LAKE OZARK": [
    "65049",
    "MO"
  ],
  "LINN CREEK": [
    "65052",
    "MO"
  ],
  "LOHMAN": [
    "65053",
    "MO"
  ],
  "LOOSE CREEK": [
    "65054",
    "MO"
  ],
  "MC GIRK": [
    "65055",
    "MO"
  ],
  "META": [
    "65058",
    "MO"
  ],
  "MOKANE": [
    "65059",
    "MO"
  ],
  "OSAGE BEACH": [
    "65065",
    "MO"
  ],
  "PRAIRIE HOME": [
    "65068",
    "MO"
  ],
  "RHINELAND": [
    "65069",
    "MO"
  ],
  "SAINT ELIZABETH": [
    "65075",
    "MO"
  ],
  "STEEDMAN": [
    "65077",
    "MO"
  ],
  "STOVER": [
    "65078",
    "MO"
  ],
  "SUNRISE BEACH": [
    "65079",
    "MO"
  ],
  "TEBBETTS": [
    "65080",
    "MO"
  ],
  "ULMAN": [
    "65083",
    "MO"
  ],
  "AUXVASSE": [
    "65231",
    "MO"
  ],
  "BENTON CITY": [
    "99320",
    "WA"
  ],
  "BUNCETON": [
    "65237",
    "MO"
  ],
  "CLIFTON HILL": [
    "65244",
    "MO"
  ],
  "EXCELLO": [
    "65247",
    "MO"
  ],
  "HALLSVILLE": [
    "75650",
    "TX"
  ],
  "HIGBEE": [
    "65257",
    "MO"
  ],
  "HOLLIDAY": [
    "76366",
    "TX"
  ],
  "KEYTESVILLE": [
    "65261",
    "MO"
  ],
  "KINGDOM CITY": [
    "65262",
    "MO"
  ],
  "MOBERLY": [
    "65270",
    "MO"
  ],
  "NEW FRANKLIN": [
    "65274",
    "MO"
  ],
  "ROCHEPORT": [
    "65279",
    "MO"
  ],
  "RUSH HILL": [
    "65280",
    "MO"
  ],
  "TRIPLETT": [
    "65286",
    "MO"
  ],
  "WOOLDRIDGE": [
    "65287",
    "MO"
  ],
  "WHITEMAN AIR FORCE BASE": [
    "65305",
    "MO"
  ],
  "ARROW ROCK": [
    "65320",
    "MO"
  ],
  "BLACKBURN": [
    "65321",
    "MO"
  ],
  "CLIMAX SPRINGS": [
    "65324",
    "MO"
  ],
  "COLE CAMP": [
    "65325",
    "MO"
  ],
  "EMMA": [
    "65327",
    "MO"
  ],
  "GILLIAM": [
    "71029",
    "LA"
  ],
  "GREEN RIDGE": [
    "65332",
    "MO"
  ],
  "HOUSTONIA": [
    "65333",
    "MO"
  ],
  "KNOB NOSTER": [
    "65336",
    "MO"
  ],
  "LA MONTE": [
    "65337",
    "MO"
  ],
  "MALTA BEND": [
    "65339",
    "MO"
  ],
  "OTTERVILLE": [
    "65348",
    "MO"
  ],
  "SWEET SPRINGS": [
    "65351",
    "MO"
  ],
  "BIRCH TREE": [
    "65438",
    "MO"
  ],
  "BIXBY": [
    "74008",
    "OK"
  ],
  "BOSS": [
    "65440",
    "MO"
  ],
  "BRINKTOWN": [
    "65443",
    "MO"
  ],
  "COOK STA": [
    "65449",
    "MO"
  ],
  "CROCKER": [
    "65452",
    "MO"
  ],
  "DEVILS ELBOW": [
    "65457",
    "MO"
  ],
  "DUKE": [
    "73532",
    "OK"
  ],
  "EDGAR SPRINGS": [
    "65462",
    "MO"
  ],
  "FORT LEONARD WOOD": [
    "65473",
    "MO"
  ],
  "JADWIN": [
    "65501",
    "MO"
  ],
  "LAKE SPRING": [
    "65532",
    "MO"
  ],
  "LAQUEY": [
    "65534",
    "MO"
  ],
  "LICKING": [
    "65542",
    "MO"
  ],
  "MOUNTAIN VIEW": [
    "96771",
    "HI"
  ],
  "ROBY": [
    "79543",
    "TX"
  ],
  "STEELVILLE": [
    "65565",
    "MO"
  ],
  "VIBURNUM": [
    "65566",
    "MO"
  ],
  "STOUTLAND": [
    "65567",
    "MO"
  ],
  "SUCCESS": [
    "72470",
    "AR"
  ],
  "VICHY": [
    "65580",
    "MO"
  ],
  "SAINT ROBERT": [
    "65584",
    "MO"
  ],
  "LONG LANE": [
    "65590",
    "MO"
  ],
  "ASH GROVE": [
    "65604",
    "MO"
  ],
  "BLUE EYE": [
    "65611",
    "MO"
  ],
  "BOIS D ARC": [
    "65612",
    "MO"
  ],
  "BRADLEYVILLE": [
    "65614",
    "MO"
  ],
  "BRANSON": [
    "81027",
    "CO"
  ],
  "BRIXEY": [
    "65618",
    "MO"
  ],
  "BRUNER": [
    "65620",
    "MO"
  ],
  "CAPE FAIR": [
    "65624",
    "MO"
  ],
  "CAULFIELD": [
    "65626",
    "MO"
  ],
  "CEDARCREEK": [
    "65627",
    "MO"
  ],
  "CHESTNUTRIDGE": [
    "65630",
    "MO"
  ],
  "CLEVER": [
    "65631",
    "MO"
  ],
  "CROSS TIMBERS": [
    "65634",
    "MO"
  ],
  "DIGGINS": [
    "65636",
    "MO"
  ],
  "DUNNEGAN": [
    "65640",
    "MO"
  ],
  "EVERTON": [
    "72633",
    "AR"
  ],
  "FAIR GROVE": [
    "65648",
    "MO"
  ],
  "FORDLAND": [
    "65652",
    "MO"
  ],
  "FREISTATT": [
    "65654",
    "MO"
  ],
  "GRAFF": [
    "65660",
    "MO"
  ],
  "GROVESPRING": [
    "65662",
    "MO"
  ],
  "HALF WAY": [
    "65663",
    "MO"
  ],
  "HARDENVILLE": [
    "65666",
    "MO"
  ],
  "HUMANSVILLE": [
    "65674",
    "MO"
  ],
  "KIRBYVILLE": [
    "75956",
    "TX"
  ],
  "KISSEE MILLS": [
    "65680",
    "MO"
  ],
  "LAMPE": [
    "65681",
    "MO"
  ],
  "KIMBERLING CITY": [
    "65686",
    "MO"
  ],
  "BRANDSVILLE": [
    "65688",
    "MO"
  ],
  "CABOOL": [
    "65689",
    "MO"
  ],
  "COUCH": [
    "65690",
    "MO"
  ],
  "KOSHKONONG": [
    "65692",
    "MO"
  ],
  "MONETT": [
    "65708",
    "MO"
  ],
  "MOUNTAIN GROVE": [
    "65711",
    "MO"
  ],
  "NIANGUA": [
    "65713",
    "MO"
  ],
  "NIXA": [
    "65714",
    "MO"
  ],
  "OLDFIELD": [
    "65720",
    "MO"
  ],
  "PIERCE CITY": [
    "65723",
    "MO"
  ],
  "PLEASANT HOPE": [
    "65725",
    "MO"
  ],
  "POWERSITE": [
    "65731",
    "MO"
  ],
  "PROTEM": [
    "65733",
    "MO"
  ],
  "PURDY": [
    "65734",
    "MO"
  ],
  "REEDS SPRING": [
    "65737",
    "MO"
  ],
  "RIDGEDALE": [
    "65739",
    "MO"
  ],
  "ROCKAWAY BEACH": [
    "97136",
    "OR"
  ],
  "RUETER": [
    "65744",
    "MO"
  ],
  "SELIGMAN": [
    "86337",
    "AZ"
  ],
  "SHELL KNOB": [
    "65747",
    "MO"
  ],
  "SOUTH GREENFIELD": [
    "65752",
    "MO"
  ],
  "SPOKANE": [
    "99260",
    "WA"
  ],
  "SQUIRES": [
    "65755",
    "MO"
  ],
  "STOTTS CITY": [
    "65756",
    "MO"
  ],
  "TANEYVILLE": [
    "65759",
    "MO"
  ],
  "THEODOSIA": [
    "65761",
    "MO"
  ],
  "THORNFIELD": [
    "65762",
    "MO"
  ],
  "TUNAS": [
    "65764",
    "MO"
  ],
  "TURNERS": [
    "65765",
    "MO"
  ],
  "UDALL": [
    "67146",
    "KS"
  ],
  "VANZANT": [
    "65768",
    "MO"
  ],
  "WALNUT SHADE": [
    "65771",
    "MO"
  ],
  "WASOLA": [
    "65773",
    "MO"
  ],
  "WEAUBLEAU": [
    "65774",
    "MO"
  ],
  "WEST PLAINS": [
    "65775",
    "MO"
  ],
  "WINDYVILLE": [
    "65783",
    "MO"
  ],
  "ZANONI": [
    "65784",
    "MO"
  ],
  "MACKS CREEK": [
    "65786",
    "MO"
  ],
  "ROACH": [
    "65787",
    "MO"
  ],
  "PEACE VALLEY": [
    "65788",
    "MO"
  ],
  "ATCHISON": [
    "66002",
    "KS"
  ],
  "BALDWIN CITY": [
    "66006",
    "KS"
  ],
  "BASEHOR": [
    "66007",
    "KS"
  ],
  "BENDENA": [
    "66008",
    "KS"
  ],
  "BONNER SPRINGS": [
    "66012",
    "KS"
  ],
  "COLONY": [
    "73021",
    "OK"
  ],
  "CLEARVIEW CITY": [
    "66019",
    "KS"
  ],
  "EUDORA": [
    "71640",
    "AR"
  ],
  "FORT LEAVENWORTH": [
    "66027",
    "KS"
  ],
  "NEW CENTURY": [
    "66031",
    "KS"
  ],
  "LACYGNE": [
    "66040",
    "KS"
  ],
  "LECOMPTON": [
    "66050",
    "KS"
  ],
  "OLATHE": [
    "81425",
    "CO"
  ],
  "MC LOUTH": [
    "66054",
    "KS"
  ],
  "MUSCOTAH": [
    "66058",
    "KS"
  ],
  "OSAWATOMIE": [
    "66064",
    "KS"
  ],
  "OZAWKIE": [
    "66070",
    "KS"
  ],
  "PAOLA": [
    "66071",
    "KS"
  ],
  "PLEASANTON": [
    "94588",
    "CA"
  ],
  "STILWELL": [
    "74960",
    "OK"
  ],
  "TONGANOXIE": [
    "66086",
    "KS"
  ],
  "WATHENA": [
    "66090",
    "KS"
  ],
  "WELDA": [
    "66091",
    "KS"
  ],
  "OVERLAND PARK": [
    "66283",
    "KS"
  ],
  "LEAWOOD": [
    "66211",
    "KS"
  ],
  "PRAIRIE VILLAGE": [
    "66208",
    "KS"
  ],
  "LENEXA": [
    "66285",
    "KS"
  ],
  "AXTELL": [
    "84621",
    "UT"
  ],
  "BEATTIE": [
    "66406",
    "KS"
  ],
  "BELVUE": [
    "66407",
    "KS"
  ],
  "BERN": [
    "83220",
    "ID"
  ],
  "BERRYTON": [
    "66409",
    "KS"
  ],
  "BLUE RAPIDS": [
    "66411",
    "KS"
  ],
  "BURLINGAME": [
    "94011",
    "CA"
  ],
  "DELIA": [
    "66418",
    "KS"
  ],
  "ESKRIDGE": [
    "66423",
    "KS"
  ],
  "EVEREST": [
    "66424",
    "KS"
  ],
  "GOFF": [
    "66428",
    "KS"
  ],
  "HARVEYVILLE": [
    "66431",
    "KS"
  ],
  "HAVENSVILLE": [
    "66432",
    "KS"
  ],
  "HOYT": [
    "66440",
    "KS"
  ],
  "FORT RILEY": [
    "66442",
    "KS"
  ],
  "LEONARDVILLE": [
    "66449",
    "KS"
  ],
  "MAYETTA": [
    "66509",
    "KS"
  ],
  "MELVERN": [
    "66510",
    "KS"
  ],
  "NETAWAKA": [
    "66516",
    "KS"
  ],
  "OKETO": [
    "66518",
    "KS"
  ],
  "OLSBURG": [
    "66520",
    "KS"
  ],
  "ONAGA": [
    "66521",
    "KS"
  ],
  "OSAGE CITY": [
    "66523",
    "KS"
  ],
  "OVERBROOK": [
    "73453",
    "OK"
  ],
  "PAXICO": [
    "66526",
    "KS"
  ],
  "POWHATTAN": [
    "66527",
    "KS"
  ],
  "QUENEMO": [
    "66528",
    "KS"
  ],
  "SABETHA": [
    "66534",
    "KS"
  ],
  "WAMEGO": [
    "66547",
    "KS"
  ],
  "FORT SCOTT": [
    "66701",
    "KS"
  ],
  "ARMA": [
    "66712",
    "KS"
  ],
  "BAXTER SPRINGS": [
    "66713",
    "KS"
  ],
  "CHANUTE": [
    "66720",
    "KS"
  ],
  "ELSMORE": [
    "66732",
    "KS"
  ],
  "FARLINGTON": [
    "66734",
    "KS"
  ],
  "GAS": [
    "66742",
    "KS"
  ],
  "HEPLER": [
    "66746",
    "KS"
  ],
  "MC CUNE": [
    "66753",
    "KS"
  ],
  "NEODESHA": [
    "66757",
    "KS"
  ],
  "NEOSHO FALLS": [
    "66758",
    "KS"
  ],
  "OPOLIS": [
    "66760",
    "KS"
  ],
  "SAVONBURG": [
    "66772",
    "KS"
  ],
  "SCAMMON": [
    "66773",
    "KS"
  ],
  "STARK": [
    "66775",
    "KS"
  ],
  "TREECE": [
    "66778",
    "KS"
  ],
  "WEST MINERAL": [
    "66782",
    "KS"
  ],
  "YATES CENTER": [
    "66783",
    "KS"
  ],
  "ADMIRE": [
    "66830",
    "KS"
  ],
  "BURDICK": [
    "66838",
    "KS"
  ],
  "CASSODAY": [
    "66842",
    "KS"
  ],
  "CEDAR POINT": [
    "66843",
    "KS"
  ],
  "COTTONWOOD FALLS": [
    "66845",
    "KS"
  ],
  "COUNCIL GROVE": [
    "66846",
    "KS"
  ],
  "ELMDALE": [
    "66850",
    "KS"
  ],
  "LEBO": [
    "66856",
    "KS"
  ],
  "LOST SPRINGS": [
    "82224",
    "WY"
  ],
  "MATFIELD GREEN": [
    "66862",
    "KS"
  ],
  "NEOSHO RAPIDS": [
    "66864",
    "KS"
  ],
  "OLPE": [
    "66865",
    "KS"
  ],
  "STRONG CITY": [
    "66869",
    "KS"
  ],
  "WHITE CITY": [
    "97503",
    "OR"
  ],
  "WILSEY": [
    "66873",
    "KS"
  ],
  "AGENDA": [
    "66930",
    "KS"
  ],
  "BARNES": [
    "66933",
    "KS"
  ],
  "ESBON": [
    "66941",
    "KS"
  ],
  "FORMOSO": [
    "66942",
    "KS"
  ],
  "HOLLENBERG": [
    "66946",
    "KS"
  ],
  "MAHASKA": [
    "66955",
    "KS"
  ],
  "MORROWVILLE": [
    "66958",
    "KS"
  ],
  "MUNDEN": [
    "66959",
    "KS"
  ],
  "NARKA": [
    "66960",
    "KS"
  ],
  "SMITH CENTER": [
    "66967",
    "KS"
  ],
  "WEBBER": [
    "66970",
    "KS"
  ],
  "ANDALE": [
    "67001",
    "KS"
  ],
  "ARGONIA": [
    "67004",
    "KS"
  ],
  "ARKANSAS CITY": [
    "71630",
    "AR"
  ],
  "BURDEN": [
    "67019",
    "KS"
  ],
  "BURRTON": [
    "67020",
    "KS"
  ],
  "BYERS": [
    "80103",
    "CO"
  ],
  "CEDAR VALE": [
    "67024",
    "KS"
  ],
  "CHENEY": [
    "99004",
    "WA"
  ],
  "COLWICH": [
    "67030",
    "KS"
  ],
  "CONWAY SPRINGS": [
    "67031",
    "KS"
  ],
  "DOUGLASS": [
    "75943",
    "TX"
  ],
  "ELBING": [
    "67041",
    "KS"
  ],
  "EL DORADO": [
    "95623",
    "CA"
  ],
  "GARDEN PLAIN": [
    "67050",
    "KS"
  ],
  "GEUDA SPRINGS": [
    "67051",
    "KS"
  ],
  "GODDARD": [
    "67052",
    "KS"
  ],
  "GOESSEL": [
    "67053",
    "KS"
  ],
  "HALSTEAD": [
    "67056",
    "KS"
  ],
  "HARDTNER": [
    "67057",
    "KS"
  ],
  "HAYSVILLE": [
    "67060",
    "KS"
  ],
  "KECHI": [
    "67067",
    "KS"
  ],
  "KIOWA": [
    "80117",
    "CO"
  ],
  "MAIZE": [
    "67101",
    "KS"
  ],
  "MEDICINE LODGE": [
    "67104",
    "KS"
  ],
  "MOUNDRIDGE": [
    "67107",
    "KS"
  ],
  "MULLINVILLE": [
    "67109",
    "KS"
  ],
  "MULVANE": [
    "67110",
    "KS"
  ],
  "NORTH NEWTON": [
    "67117",
    "KS"
  ],
  "POTWIN": [
    "67123",
    "KS"
  ],
  "PROTECTION": [
    "67127",
    "KS"
  ],
  "ROSALIA": [
    "99170",
    "WA"
  ],
  "SEVERY": [
    "67137",
    "KS"
  ],
  "SPIVEY": [
    "67142",
    "KS"
  ],
  "VALLEY CENTER": [
    "92082",
    "CA"
  ],
  "WICHITA": [
    "67278",
    "KS"
  ],
  "MCCONNELL AFB": [
    "67221",
    "KS"
  ],
  "CANEY": [
    "74533",
    "OK"
  ],
  "CHERRYVALE": [
    "67335",
    "KS"
  ],
  "CHETOPA": [
    "67336",
    "KS"
  ],
  "COFFEYVILLE": [
    "67337",
    "KS"
  ],
  "EDNA": [
    "77957",
    "TX"
  ],
  "ELK CITY": [
    "83525",
    "ID"
  ],
  "ELK FALLS": [
    "67345",
    "KS"
  ],
  "GRENOLA": [
    "67346",
    "KS"
  ],
  "LONGTON": [
    "67352",
    "KS"
  ],
  "MOUND VALLEY": [
    "67354",
    "KS"
  ],
  "NIOTAZE": [
    "67355",
    "KS"
  ],
  "SEDAN": [
    "88436",
    "NM"
  ],
  "ABILENE": [
    "79699",
    "TX"
  ],
  "ASSARIA": [
    "67416",
    "KS"
  ],
  "BUSHTON": [
    "67427",
    "KS"
  ],
  "CAWKER CITY": [
    "67430",
    "KS"
  ],
  "FALUN": [
    "67442",
    "KS"
  ],
  "GLEN ELDER": [
    "67446",
    "KS"
  ],
  "HERINGTON": [
    "67449",
    "KS"
  ],
  "HOLYROOD": [
    "67450",
    "KS"
  ],
  "KANOPOLIS": [
    "67454",
    "KS"
  ],
  "LINDSBORG": [
    "67456",
    "KS"
  ],
  "LONGFORD": [
    "67458",
    "KS"
  ],
  "MCPHERSON": [
    "67460",
    "KS"
  ],
  "MILTONVALE": [
    "67466",
    "KS"
  ],
  "OSBORNE": [
    "67473",
    "KS"
  ],
  "PORTIS": [
    "67474",
    "KS"
  ],
  "SOLOMON": [
    "85551",
    "AZ"
  ],
  "SYLVAN GROVE": [
    "67481",
    "KS"
  ],
  "TESCOTT": [
    "67484",
    "KS"
  ],
  "SOUTH HUTCHINSON": [
    "67505",
    "KS"
  ],
  "ABBYVILLE": [
    "67510",
    "KS"
  ],
  "ALBERT": [
    "73001",
    "OK"
  ],
  "BAZINE": [
    "67516",
    "KS"
  ],
  "BEELER": [
    "67518",
    "KS"
  ],
  "BROWNELL": [
    "67521",
    "KS"
  ],
  "BUHLER": [
    "67522",
    "KS"
  ],
  "CLAFLIN": [
    "67525",
    "KS"
  ],
  "ELLINWOOD": [
    "67526",
    "KS"
  ],
  "HAVEN": [
    "67543",
    "KS"
  ],
  "HOISINGTON": [
    "67544",
    "KS"
  ],
  "KINSLEY": [
    "67547",
    "KS"
  ],
  "LARNED": [
    "67550",
    "KS"
  ],
  "LIEBENTHAL": [
    "67553",
    "KS"
  ],
  "MC CRACKEN": [
    "67556",
    "KS"
  ],
  "MACKSVILLE": [
    "67557",
    "KS"
  ],
  "NESS CITY": [
    "67560",
    "KS"
  ],
  "NICKERSON": [
    "68044",
    "NE"
  ],
  "OFFERLE": [
    "67563",
    "KS"
  ],
  "OLMITZ": [
    "67564",
    "KS"
  ],
  "PAWNEE ROCK": [
    "67567",
    "KS"
  ],
  "PRETTY PRAIRIE": [
    "67570",
    "KS"
  ],
  "ROZEL": [
    "67574",
    "KS"
  ],
  "RUSH CENTER": [
    "67575",
    "KS"
  ],
  "SYLVIA": [
    "67581",
    "KS"
  ],
  "TURON": [
    "67583",
    "KS"
  ],
  "AGRA": [
    "74824",
    "OK"
  ],
  "BOGUE": [
    "67625",
    "KS"
  ],
  "CATHARINE": [
    "67627",
    "KS"
  ],
  "COLLYER": [
    "67631",
    "KS"
  ],
  "DAMAR": [
    "67632",
    "KS"
  ],
  "DORRANCE": [
    "67634",
    "KS"
  ],
  "ELLIS": [
    "83235",
    "ID"
  ],
  "GLADE": [
    "67639",
    "KS"
  ],
  "KIRWIN": [
    "67644",
    "KS"
  ],
  "LENORA": [
    "67645",
    "KS"
  ],
  "MORLAND": [
    "67650",
    "KS"
  ],
  "NATOMA": [
    "67651",
    "KS"
  ],
  "NORCATUR": [
    "67653",
    "KS"
  ],
  "OGALLAH": [
    "67656",
    "KS"
  ],
  "PALCO": [
    "67657",
    "KS"
  ],
  "PENOKEE": [
    "67659",
    "KS"
  ],
  "PFEIFER": [
    "67660",
    "KS"
  ],
  "PRAIRIE VIEW": [
    "77446",
    "TX"
  ],
  "SCHOENCHEN": [
    "67667",
    "KS"
  ],
  "WAKEENEY": [
    "67672",
    "KS"
  ],
  "WOODSTON": [
    "67675",
    "KS"
  ],
  "BIRD CITY": [
    "67731",
    "KS"
  ],
  "EDSON": [
    "67733",
    "KS"
  ],
  "GEM": [
    "67734",
    "KS"
  ],
  "GOVE": [
    "67736",
    "KS"
  ],
  "GRAINFIELD": [
    "67737",
    "KS"
  ],
  "HOXIE": [
    "72433",
    "AR"
  ],
  "KANORADO": [
    "67741",
    "KS"
  ],
  "LUDELL": [
    "67744",
    "KS"
  ],
  "MONUMENT": [
    "97864",
    "OR"
  ],
  "PARK": [
    "67751",
    "KS"
  ],
  "QUINTER": [
    "67752",
    "KS"
  ],
  "WESKAN": [
    "67762",
    "KS"
  ],
  "DODGE CITY": [
    "67801",
    "KS"
  ],
  "CIMARRON": [
    "87714",
    "NM"
  ],
  "ENSIGN": [
    "67841",
    "KS"
  ],
  "HANSTON": [
    "67849",
    "KS"
  ],
  "HEALY": [
    "99743",
    "AK"
  ],
  "JETMORE": [
    "67854",
    "KS"
  ],
  "KISMET": [
    "67859",
    "KS"
  ],
  "LAKIN": [
    "67860",
    "KS"
  ],
  "LEOTI": [
    "67861",
    "KS"
  ],
  "MANTER": [
    "67862",
    "KS"
  ],
  "MARIENTHAL": [
    "67863",
    "KS"
  ],
  "MEADE": [
    "67864",
    "KS"
  ],
  "SATANTA": [
    "67870",
    "KS"
  ],
  "SPEARVILLE": [
    "67876",
    "KS"
  ],
  "TRIBUNE": [
    "67879",
    "KS"
  ],
  "HUGOTON": [
    "67951",
    "KS"
  ],
  "ABIE": [
    "68001",
    "NE"
  ],
  "BOYS TOWN": [
    "68010",
    "NE"
  ],
  "CEDAR BLUFFS": [
    "68015",
    "NE"
  ],
  "CEDAR CREEK": [
    "78612",
    "TX"
  ],
  "FORT CALHOUN": [
    "68023",
    "NE"
  ],
  "HOOPER": [
    "84315",
    "UT"
  ],
  "MALMO": [
    "68040",
    "NE"
  ],
  "MEAD": [
    "99021",
    "WA"
  ],
  "PAPILLION": [
    "68133",
    "NE"
  ],
  "PENDER": [
    "68047",
    "NE"
  ],
  "PLATTSMOUTH": [
    "68048",
    "NE"
  ],
  "PRAGUE": [
    "74864",
    "OK"
  ],
  "ST COLUMBANS": [
    "68056",
    "NE"
  ],
  "SCRIBNER": [
    "68057",
    "NE"
  ],
  "TEKAMAH": [
    "68061",
    "NE"
  ],
  "UEHLING": [
    "68063",
    "NE"
  ],
  "WAHOO": [
    "68066",
    "NE"
  ],
  "WALTHILL": [
    "68067",
    "NE"
  ],
  "YUTAN": [
    "68073",
    "NE"
  ],
  "OFFUTT AFB": [
    "68113",
    "NE"
  ],
  "LA VISTA": [
    "68128",
    "NE"
  ],
  "ALVO": [
    "68304",
    "NE"
  ],
  "BARNESTON": [
    "68309",
    "NE"
  ],
  "BEAVER CROSSING": [
    "68313",
    "NE"
  ],
  "BENNET": [
    "68317",
    "NE"
  ],
  "BROCK": [
    "68320",
    "NE"
  ],
  "BRUNING": [
    "68322",
    "NE"
  ],
  "BURCHARD": [
    "68323",
    "NE"
  ],
  "BURR": [
    "68324",
    "NE"
  ],
  "CLATONIA": [
    "68328",
    "NE"
  ],
  "DAVEY": [
    "68336",
    "NE"
  ],
  "DAYKIN": [
    "68338",
    "NE"
  ],
  "DILLER": [
    "68342",
    "NE"
  ],
  "FALLS CITY": [
    "97344",
    "OR"
  ],
  "FILLEY": [
    "68357",
    "NE"
  ],
  "FIRTH": [
    "83236",
    "ID"
  ],
  "FRIEND": [
    "68359",
    "NE"
  ],
  "GILEAD": [
    "68362",
    "NE"
  ],
  "GOEHNER": [
    "68364",
    "NE"
  ],
  "HALLAM": [
    "68368",
    "NE"
  ],
  "JANSEN": [
    "68377",
    "NE"
  ],
  "MC COOL JUNCTION": [
    "68401",
    "NE"
  ],
  "MANLEY": [
    "68403",
    "NE"
  ],
  "MARTELL": [
    "95654",
    "CA"
  ],
  "NEBRASKA CITY": [
    "68410",
    "NE"
  ],
  "NEHAWKA": [
    "68413",
    "NE"
  ],
  "OHIOWA": [
    "68416",
    "NE"
  ],
  "OTOE": [
    "68417",
    "NE"
  ],
  "PAWNEE CITY": [
    "68420",
    "NE"
  ],
  "PICKRELL": [
    "68422",
    "NE"
  ],
  "PLEASANT DALE": [
    "68423",
    "NE"
  ],
  "ROCA": [
    "68430",
    "NE"
  ],
  "RULO": [
    "68431",
    "NE"
  ],
  "SHICKLEY": [
    "68436",
    "NE"
  ],
  "SHUBERT": [
    "68437",
    "NE"
  ],
  "SPRAGUE": [
    "99032",
    "WA"
  ],
  "STAPLEHURST": [
    "68439",
    "NE"
  ],
  "STEELE CITY": [
    "68440",
    "NE"
  ],
  "STEINAUER": [
    "68441",
    "NE"
  ],
  "STRANG": [
    "74367",
    "OK"
  ],
  "TABLE ROCK": [
    "68447",
    "NE"
  ],
  "ONG": [
    "68452",
    "NE"
  ],
  "TOBIAS": [
    "68453",
    "NE"
  ],
  "VERDON": [
    "68457",
    "NE"
  ],
  "WEEPING WATER": [
    "68463",
    "NE"
  ],
  "WESTERN": [
    "68464",
    "NE"
  ],
  "WILBER": [
    "68465",
    "NE"
  ],
  "WYMORE": [
    "68466",
    "NE"
  ],
  "CLARKS": [
    "71415",
    "LA"
  ],
  "DAVID CITY": [
    "68632",
    "NE"
  ],
  "ERICSON": [
    "68637",
    "NE"
  ],
  "HUMPHREY": [
    "72073",
    "AR"
  ],
  "LEIGH": [
    "68643",
    "NE"
  ],
  "MORSE BLUFF": [
    "68648",
    "NE"
  ],
  "PLATTE CENTER": [
    "68653",
    "NE"
  ],
  "PRIMROSE": [
    "68655",
    "NE"
  ],
  "RISING CITY": [
    "68658",
    "NE"
  ],
  "SAINT EDWARD": [
    "68660",
    "NE"
  ],
  "SNYDER": [
    "80750",
    "CO"
  ],
  "STROMSBURG": [
    "68666",
    "NE"
  ],
  "BEEMER": [
    "68716",
    "NE"
  ],
  "CHAMBERS": [
    "86502",
    "AZ"
  ],
  "COLERIDGE": [
    "68727",
    "NE"
  ],
  "EMMET": [
    "71835",
    "AR"
  ],
  "FORDYCE": [
    "71742",
    "AR"
  ],
  "HADAR": [
    "68738",
    "NE"
  ],
  "HARTINGTON": [
    "68739",
    "NE"
  ],
  "HOSKINS": [
    "68740",
    "NE"
  ],
  "MCLEAN": [
    "79057",
    "TX"
  ],
  "MAGNET": [
    "68749",
    "NE"
  ],
  "MEADOW GROVE": [
    "68752",
    "NE"
  ],
  "NAPER": [
    "68755",
    "NE"
  ],
  "NELIGH": [
    "68756",
    "NE"
  ],
  "NEWMAN GROVE": [
    "68758",
    "NE"
  ],
  "NIOBRARA": [
    "68760",
    "NE"
  ],
  "ONEILL": [
    "68763",
    "NE"
  ],
  "OSMOND": [
    "68765",
    "NE"
  ],
  "PIERCE": [
    "83546",
    "ID"
  ],
  "PILGER": [
    "68768",
    "NE"
  ],
  "PONCA": [
    "72670",
    "AR"
  ],
  "SAINT HELENA": [
    "94574",
    "CA"
  ],
  "SOUTH SIOUX CITY": [
    "68776",
    "NE"
  ],
  "SPRINGVIEW": [
    "68778",
    "NE"
  ],
  "VERDIGRE": [
    "68783",
    "NE"
  ],
  "WAUSA": [
    "68786",
    "NE"
  ],
  "WINNETOON": [
    "68789",
    "NE"
  ],
  "WINSIDE": [
    "68790",
    "NE"
  ],
  "WISNER": [
    "71378",
    "LA"
  ],
  "WYNOT": [
    "68792",
    "NE"
  ],
  "ALDA": [
    "68810",
    "NE"
  ],
  "ANSELMO": [
    "68813",
    "NE"
  ],
  "ANSLEY": [
    "68814",
    "NE"
  ],
  "BOELUS": [
    "68820",
    "NE"
  ],
  "BROKEN BOW": [
    "74728",
    "OK"
  ],
  "BURWELL": [
    "68823",
    "NE"
  ],
  "DANNEBROG": [
    "68831",
    "NE"
  ],
  "DUNNING": [
    "68833",
    "NE"
  ],
  "ELM CREEK": [
    "68836",
    "NE"
  ],
  "GILTNER": [
    "68841",
    "NE"
  ],
  "HORDVILLE": [
    "68846",
    "NE"
  ],
  "LOUP CITY": [
    "68853",
    "NE"
  ],
  "NORTH LOUP": [
    "68859",
    "NE"
  ],
  "ORD": [
    "68862",
    "NE"
  ],
  "OVERTON": [
    "89040",
    "NV"
  ],
  "WOLBACH": [
    "68882",
    "NE"
  ],
  "AYR": [
    "68925",
    "NE"
  ],
  "BEAVER CITY": [
    "68926",
    "NE"
  ],
  "BLADEN": [
    "68928",
    "NE"
  ],
  "DEWEESE": [
    "68934",
    "NE"
  ],
  "FUNK": [
    "68940",
    "NE"
  ],
  "GLENVIL": [
    "68941",
    "NE"
  ],
  "GUIDE ROCK": [
    "68942",
    "NE"
  ],
  "HEARTWELL": [
    "68945",
    "NE"
  ],
  "HENDLEY": [
    "68946",
    "NE"
  ],
  "HILDRETH": [
    "68947",
    "NE"
  ],
  "HOLDREGE": [
    "68949",
    "NE"
  ],
  "INAVALE": [
    "68952",
    "NE"
  ],
  "INLAND": [
    "68954",
    "NE"
  ],
  "JUNIATA": [
    "68955",
    "NE"
  ],
  "KENESAW": [
    "68956",
    "NE"
  ],
  "LOOMIS": [
    "98827",
    "WA"
  ],
  "NAPONEE": [
    "68960",
    "NE"
  ],
  "RAGAN": [
    "68969",
    "NE"
  ],
  "RED CLOUD": [
    "68970",
    "NE"
  ],
  "REPUBLICAN CITY": [
    "68971",
    "NE"
  ],
  "SARONVILLE": [
    "68975",
    "NE"
  ],
  "MC COOK": [
    "69001",
    "NE"
  ],
  "BENKELMAN": [
    "69021",
    "NE"
  ],
  "ENDERS": [
    "69027",
    "NE"
  ],
  "FARNAM": [
    "69029",
    "NE"
  ],
  "HAIGLER": [
    "69030",
    "NE"
  ],
  "HAYES CENTER": [
    "69032",
    "NE"
  ],
  "WAUNETA": [
    "69045",
    "NE"
  ],
  "NORTH PLATTE": [
    "69103",
    "NE"
  ],
  "BROADWATER": [
    "69125",
    "NE"
  ],
  "CHAPPELL": [
    "69129",
    "NE"
  ],
  "COZAD": [
    "69130",
    "NE"
  ],
  "GOTHENBURG": [
    "69138",
    "NE"
  ],
  "HALSEY": [
    "97348",
    "OR"
  ],
  "LEWELLEN": [
    "69147",
    "NE"
  ],
  "LISCO": [
    "69148",
    "NE"
  ],
  "MULLEN": [
    "69152",
    "NE"
  ],
  "OGALLALA": [
    "69153",
    "NE"
  ],
  "PURDUM": [
    "69157",
    "NE"
  ],
  "THEDFORD": [
    "69166",
    "NE"
  ],
  "WILLOW ISLAND": [
    "69171",
    "NE"
  ],
  "VALENTINE": [
    "86437",
    "AZ"
  ],
  "CODY": [
    "82414",
    "WY"
  ],
  "KILGORE": [
    "75663",
    "TX"
  ],
  "LONG PINE": [
    "69217",
    "NE"
  ],
  "MERRIMAN": [
    "69218",
    "NE"
  ],
  "NENZEL": [
    "69219",
    "NE"
  ],
  "CHADRON": [
    "69337",
    "NE"
  ],
  "GERING": [
    "69341",
    "NE"
  ],
  "HAY SPRINGS": [
    "69347",
    "NE"
  ],
  "HEMINGFORD": [
    "69348",
    "NE"
  ],
  "MCGREW": [
    "69353",
    "NE"
  ],
  "MELBETA": [
    "69355",
    "NE"
  ],
  "MINATARE": [
    "69356",
    "NE"
  ],
  "SCOTTSBLUFF": [
    "69363",
    "NE"
  ],
  "WHITECLAY": [
    "69365",
    "NE"
  ],
  "METAIRIE": [
    "70060",
    "LA"
  ],
  "DES ALLEMANDS": [
    "70030",
    "LA"
  ],
  "AMA": [
    "70031",
    "LA"
  ],
  "BARATARIA": [
    "70036",
    "LA"
  ],
  "BELLE CHASSE": [
    "70093",
    "LA"
  ],
  "BOOTHVILLE": [
    "70038",
    "LA"
  ],
  "BOUTTE": [
    "70039",
    "LA"
  ],
  "BRAITHWAITE": [
    "70040",
    "LA"
  ],
  "BURAS": [
    "70041",
    "LA"
  ],
  "CHALMETTE": [
    "70044",
    "LA"
  ],
  "DESTREHAN": [
    "70047",
    "LA"
  ],
  "EDGARD": [
    "70049",
    "LA"
  ],
  "GARYVILLE": [
    "70051",
    "LA"
  ],
  "GRAMERCY": [
    "70052",
    "LA"
  ],
  "HAHNVILLE": [
    "70057",
    "LA"
  ],
  "KENNER": [
    "70065",
    "LA"
  ],
  "LAFITTE": [
    "70067",
    "LA"
  ],
  "LULING": [
    "78648",
    "TX"
  ],
  "LUTCHER": [
    "70071",
    "LA"
  ],
  "MARRERO": [
    "70073",
    "LA"
  ],
  "MERAUX": [
    "70075",
    "LA"
  ],
  "NEW SARPY": [
    "70078",
    "LA"
  ],
  "NORCO": [
    "92860",
    "CA"
  ],
  "PARADIS": [
    "70080",
    "LA"
  ],
  "POINTE A LA HACHE": [
    "70082",
    "LA"
  ],
  "PORT SULPHUR": [
    "70083",
    "LA"
  ],
  "SAINT BERNARD": [
    "70085",
    "LA"
  ],
  "SAINT ROSE": [
    "70087",
    "LA"
  ],
  "VACHERIE": [
    "70090",
    "LA"
  ],
  "VIOLET": [
    "70092",
    "LA"
  ],
  "WESTWEGO": [
    "70096",
    "LA"
  ],
  "NEW ORLEANS": [
    "70190",
    "LA"
  ],
  "THIBODAUX": [
    "70310",
    "LA"
  ],
  "PIERRE PART": [
    "70339",
    "LA"
  ],
  "BELLE ROSE": [
    "70341",
    "LA"
  ],
  "BOURG": [
    "70343",
    "LA"
  ],
  "CHAUVIN": [
    "70344",
    "LA"
  ],
  "CUT OFF": [
    "70345",
    "LA"
  ],
  "DONALDSONVILLE": [
    "70346",
    "LA"
  ],
  "DONNER": [
    "70352",
    "LA"
  ],
  "DULAC": [
    "70353",
    "LA"
  ],
  "GALLIANO": [
    "70354",
    "LA"
  ],
  "GHEENS": [
    "70355",
    "LA"
  ],
  "GOLDEN MEADOW": [
    "70357",
    "LA"
  ],
  "HOUMA": [
    "70364",
    "LA"
  ],
  "LABADIEVILLE": [
    "70372",
    "LA"
  ],
  "LAROSE": [
    "70373",
    "LA"
  ],
  "MONTEGUT": [
    "70377",
    "LA"
  ],
  "NAPOLEONVILLE": [
    "70390",
    "LA"
  ],
  "PAINCOURTVILLE": [
    "70391",
    "LA"
  ],
  "PLATTENVILLE": [
    "70393",
    "LA"
  ],
  "RACELAND": [
    "70394",
    "LA"
  ],
  "SCHRIEVER": [
    "70395",
    "LA"
  ],
  "THERIOT": [
    "70397",
    "LA"
  ],
  "ABITA SPRINGS": [
    "70420",
    "LA"
  ],
  "AKERS": [
    "70421",
    "LA"
  ],
  "AMITE": [
    "70422",
    "LA"
  ],
  "ANGIE": [
    "70426",
    "LA"
  ],
  "BOGALUSA": [
    "70429",
    "LA"
  ],
  "BUSH": [
    "70431",
    "LA"
  ],
  "FLUKER": [
    "70436",
    "LA"
  ],
  "HUSSER": [
    "70442",
    "LA"
  ],
  "KENTWOOD": [
    "70444",
    "LA"
  ],
  "LACOMBE": [
    "70445",
    "LA"
  ],
  "LORANGER": [
    "70446",
    "LA"
  ],
  "MANDEVILLE": [
    "70471",
    "LA"
  ],
  "MAUREPAS": [
    "70449",
    "LA"
  ],
  "NATALBANY": [
    "70451",
    "LA"
  ],
  "PONCHATOULA": [
    "70454",
    "LA"
  ],
  "ROBERT": [
    "70455",
    "LA"
  ],
  "SLIDELL": [
    "76267",
    "TX"
  ],
  "SUN": [
    "70463",
    "LA"
  ],
  "TANGIPAHOA": [
    "70465",
    "LA"
  ],
  "TICKFAW": [
    "70466",
    "LA"
  ],
  "ARNAUDVILLE": [
    "70512",
    "LA"
  ],
  "AVERY ISLAND": [
    "70513",
    "LA"
  ],
  "BASILE": [
    "70515",
    "LA"
  ],
  "BREAUX BRIDGE": [
    "70517",
    "LA"
  ],
  "BROUSSARD": [
    "70518",
    "LA"
  ],
  "CADE": [
    "70519",
    "LA"
  ],
  "CARENCRO": [
    "70520",
    "LA"
  ],
  "CHARENTON": [
    "70523",
    "LA"
  ],
  "CHATAIGNIER": [
    "70524",
    "LA"
  ],
  "CHURCH POINT": [
    "70525",
    "LA"
  ],
  "CROWLEY": [
    "81033",
    "CO"
  ],
  "DELCAMBRE": [
    "70528",
    "LA"
  ],
  "DUSON": [
    "70529",
    "LA"
  ],
  "ERATH": [
    "70533",
    "LA"
  ],
  "ESTHERWOOD": [
    "70534",
    "LA"
  ],
  "EUNICE": [
    "88231",
    "NM"
  ],
  "EVANGELINE": [
    "70537",
    "LA"
  ],
  "GRAND COTEAU": [
    "70541",
    "LA"
  ],
  "GUEYDAN": [
    "70542",
    "LA"
  ],
  "IOTA": [
    "70543",
    "LA"
  ],
  "JEANERETTE": [
    "70544",
    "LA"
  ],
  "KAPLAN": [
    "70548",
    "LA"
  ],
  "LAKE ARTHUR": [
    "88253",
    "NM"
  ],
  "LAWTELL": [
    "70550",
    "LA"
  ],
  "LEONVILLE": [
    "70551",
    "LA"
  ],
  "LOREAUVILLE": [
    "70552",
    "LA"
  ],
  "MAMOU": [
    "70554",
    "LA"
  ],
  "MERMENTAU": [
    "70556",
    "LA"
  ],
  "MORSE": [
    "79062",
    "TX"
  ],
  "NEW IBERIA": [
    "70563",
    "LA"
  ],
  "OPELOUSAS": [
    "70571",
    "LA"
  ],
  "PINE PRAIRIE": [
    "70576",
    "LA"
  ],
  "PORT BARRE": [
    "70577",
    "LA"
  ],
  "RAYNE": [
    "70578",
    "LA"
  ],
  "REDDELL": [
    "70580",
    "LA"
  ],
  "SAINT MARTINVILLE": [
    "70582",
    "LA"
  ],
  "TURKEY CREEK": [
    "70585",
    "LA"
  ],
  "VILLE PLATTE": [
    "70586",
    "LA"
  ],
  "WELSH": [
    "70591",
    "LA"
  ],
  "LAKE CHARLES": [
    "70629",
    "LA"
  ],
  "CREOLE": [
    "70632",
    "LA"
  ],
  "DEQUINCY": [
    "70633",
    "LA"
  ],
  "DERIDDER": [
    "70634",
    "LA"
  ],
  "GRAND CHENIER": [
    "70643",
    "LA"
  ],
  "HACKBERRY": [
    "70645",
    "LA"
  ],
  "IOWA": [
    "70647",
    "LA"
  ],
  "KINDER": [
    "70648",
    "LA"
  ],
  "LACASSINE": [
    "70650",
    "LA"
  ],
  "LEBLANC": [
    "70651",
    "LA"
  ],
  "MERRYVILLE": [
    "70653",
    "LA"
  ],
  "MITTIE": [
    "70654",
    "LA"
  ],
  "PITKIN": [
    "81241",
    "CO"
  ],
  "RAGLEY": [
    "70657",
    "LA"
  ],
  "REEVES": [
    "70658",
    "LA"
  ],
  "ROSEPINE": [
    "70659",
    "LA"
  ],
  "SINGER": [
    "70660",
    "LA"
  ],
  "STARKS": [
    "70661",
    "LA"
  ],
  "SUGARTOWN": [
    "70662",
    "LA"
  ],
  "DENHAM SPRINGS": [
    "70727",
    "LA"
  ],
  "GONZALES": [
    "93926",
    "CA"
  ],
  "ADDIS": [
    "70710",
    "LA"
  ],
  "BATCHELOR": [
    "70715",
    "LA"
  ],
  "BRITTANY": [
    "70718",
    "LA"
  ],
  "BRUSLY": [
    "70719",
    "LA"
  ],
  "CARVILLE": [
    "70721",
    "LA"
  ],
  "CONVENT": [
    "70723",
    "LA"
  ],
  "DARROW": [
    "70725",
    "LA"
  ],
  "DUPLESSIS": [
    "70728",
    "LA"
  ],
  "ERWINVILLE": [
    "70729",
    "LA"
  ],
  "FORDOCHE": [
    "70732",
    "LA"
  ],
  "FRENCH SETTLEMENT": [
    "70733",
    "LA"
  ],
  "GEISMAR": [
    "70734",
    "LA"
  ],
  "GLYNN": [
    "70736",
    "LA"
  ],
  "GREENWELL SPRINGS": [
    "70739",
    "LA"
  ],
  "GROSSE TETE": [
    "70740",
    "LA"
  ],
  "HESTER": [
    "70743",
    "LA"
  ],
  "INNIS": [
    "70747",
    "LA"
  ],
  "JARREAU": [
    "70749",
    "LA"
  ],
  "KROTZ SPRINGS": [
    "70750",
    "LA"
  ],
  "LETTSWORTH": [
    "70753",
    "LA"
  ],
  "LOTTIE": [
    "70756",
    "LA"
  ],
  "MARINGOUIN": [
    "70757",
    "LA"
  ],
  "NEW ROADS": [
    "70760",
    "LA"
  ],
  "OSCAR": [
    "73561",
    "OK"
  ],
  "PAULINA": [
    "70763",
    "LA"
  ],
  "PLAQUEMINE": [
    "70765",
    "LA"
  ],
  "PORT ALLEN": [
    "70767",
    "LA"
  ],
  "PRAIRIEVILLE": [
    "70769",
    "LA"
  ],
  "PRIDE": [
    "70770",
    "LA"
  ],
  "ROUGON": [
    "70773",
    "LA"
  ],
  "SAINT AMANT": [
    "70774",
    "LA"
  ],
  "SAINT GABRIEL": [
    "70776",
    "LA"
  ],
  "SLAUGHTER": [
    "70777",
    "LA"
  ],
  "SUNSHINE": [
    "70780",
    "LA"
  ],
  "VENTRESS": [
    "70783",
    "LA"
  ],
  "WEYANOKE": [
    "70787",
    "LA"
  ],
  "WHITE CASTLE": [
    "70788",
    "LA"
  ],
  "ZACHARY": [
    "70791",
    "LA"
  ],
  "UNCLE SAM": [
    "70792",
    "LA"
  ],
  "BATON ROUGE": [
    "70898",
    "LA"
  ],
  "BIENVILLE": [
    "71008",
    "LA"
  ],
  "CASTOR": [
    "71016",
    "LA"
  ],
  "COTTON VALLEY": [
    "71018",
    "LA"
  ],
  "COUSHATTA": [
    "71019",
    "LA"
  ],
  "DOYLINE": [
    "71023",
    "LA"
  ],
  "DUBBERLY": [
    "71024",
    "LA"
  ],
  "FRIERSON": [
    "71027",
    "LA"
  ],
  "GIBSLAND": [
    "71028",
    "LA"
  ],
  "GOLDONNA": [
    "71031",
    "LA"
  ],
  "GRAND CANE": [
    "71032",
    "LA"
  ],
  "HALL SUMMIT": [
    "71034",
    "LA"
  ],
  "HAUGHTON": [
    "71037",
    "LA"
  ],
  "HOSSTON": [
    "71043",
    "LA"
  ],
  "KEATCHIE": [
    "71046",
    "LA"
  ],
  "KEITHVILLE": [
    "71047",
    "LA"
  ],
  "MOORINGSPORT": [
    "71060",
    "LA"
  ],
  "PELICAN": [
    "99832",
    "AK"
  ],
  "PLAIN DEALING": [
    "71064",
    "LA"
  ],
  "RODESSA": [
    "71069",
    "LA"
  ],
  "SAREPTA": [
    "71071",
    "LA"
  ],
  "SHONGALOO": [
    "71072",
    "LA"
  ],
  "SPRINGHILL": [
    "71075",
    "LA"
  ],
  "SHREVEPORT": [
    "71166",
    "LA"
  ],
  "BARKSDALE AFB": [
    "71110",
    "LA"
  ],
  "BOSSIER CITY": [
    "71172",
    "LA"
  ],
  "ARCHIBALD": [
    "71218",
    "LA"
  ],
  "BASKIN": [
    "71219",
    "LA"
  ],
  "BASTROP": [
    "78602",
    "TX"
  ],
  "BERNICE": [
    "71222",
    "LA"
  ],
  "BONITA": [
    "91908",
    "CA"
  ],
  "CHOUDRANT": [
    "71227",
    "LA"
  ],
  "COLLINSTON": [
    "84306",
    "UT"
  ],
  "CROWVILLE": [
    "71230",
    "LA"
  ],
  "DUBACH": [
    "71235",
    "LA"
  ],
  "EPPS": [
    "71237",
    "LA"
  ],
  "EROS": [
    "71238",
    "LA"
  ],
  "FARMERVILLE": [
    "71241",
    "LA"
  ],
  "FORT NECESSITY": [
    "71243",
    "LA"
  ],
  "GRAMBLING": [
    "71245",
    "LA"
  ],
  "HODGE": [
    "71247",
    "LA"
  ],
  "JIGGER": [
    "71249",
    "LA"
  ],
  "LAKE PROVIDENCE": [
    "71254",
    "LA"
  ],
  "LILLIE": [
    "71256",
    "LA"
  ],
  "MANGHAM": [
    "71259",
    "LA"
  ],
  "MER ROUGE": [
    "71261",
    "LA"
  ],
  "RUSTON": [
    "71273",
    "LA"
  ],
  "SIMSBORO": [
    "71275",
    "LA"
  ],
  "SONDHEIMER": [
    "71276",
    "LA"
  ],
  "SPEARSVILLE": [
    "71277",
    "LA"
  ],
  "START": [
    "71279",
    "LA"
  ],
  "STERLINGTON": [
    "71280",
    "LA"
  ],
  "SWARTZ": [
    "71281",
    "LA"
  ],
  "TALLULAH": [
    "71284",
    "LA"
  ],
  "TRANSYLVANIA": [
    "71286",
    "LA"
  ],
  "BORDELONVILLE": [
    "71320",
    "LA"
  ],
  "BUNKIE": [
    "71322",
    "LA"
  ],
  "CHENEYVILLE": [
    "71325",
    "LA"
  ],
  "COTTONPORT": [
    "71327",
    "LA"
  ],
  "DEVILLE": [
    "71328",
    "LA"
  ],
  "FERRIDAY": [
    "71334",
    "LA"
  ],
  "HESSMER": [
    "71341",
    "LA"
  ],
  "JENA": [
    "71342",
    "LA"
  ],
  "LEBEAU": [
    "71345",
    "LA"
  ],
  "LECOMPTE": [
    "71346",
    "LA"
  ],
  "LIBUSE": [
    "71348",
    "LA"
  ],
  "MANSURA": [
    "71350",
    "LA"
  ],
  "MARKSVILLE": [
    "71351",
    "LA"
  ],
  "MOREAUVILLE": [
    "71355",
    "LA"
  ],
  "NEWELLTON": [
    "71357",
    "LA"
  ],
  "PLAUCHEVILLE": [
    "71362",
    "LA"
  ],
  "RHINEHART": [
    "71363",
    "LA"
  ],
  "SAINT LANDRY": [
    "71367",
    "LA"
  ],
  "SICILY ISLAND": [
    "71368",
    "LA"
  ],
  "SIMMESPORT": [
    "71369",
    "LA"
  ],
  "TROUT": [
    "71371",
    "LA"
  ],
  "WATERPROOF": [
    "71375",
    "LA"
  ],
  "AIMWELL": [
    "71401",
    "LA"
  ],
  "ANACOCO": [
    "71403",
    "LA"
  ],
  "BALL": [
    "71405",
    "LA"
  ],
  "CAMPTI": [
    "71411",
    "LA"
  ],
  "CLOUTIERVILLE": [
    "71416",
    "LA"
  ],
  "DRY PRONG": [
    "71423",
    "LA"
  ],
  "FLORIEN": [
    "71429",
    "LA"
  ],
  "GLENMORA": [
    "71433",
    "LA"
  ],
  "HINESTON": [
    "71438",
    "LA"
  ],
  "HORNBECK": [
    "71439",
    "LA"
  ],
  "JOYCE": [
    "98343",
    "WA"
  ],
  "KURTHWOOD": [
    "71443",
    "LA"
  ],
  "LONGLEAF": [
    "71448",
    "LA"
  ],
  "MANY": [
    "71449",
    "LA"
  ],
  "MARTHAVILLE": [
    "71450",
    "LA"
  ],
  "NATCHITOCHES": [
    "71497",
    "LA"
  ],
  "FORT POLK": [
    "71459",
    "LA"
  ],
  "NEGREET": [
    "71460",
    "LA"
  ],
  "NEW LLANO": [
    "71461",
    "LA"
  ],
  "OLLA": [
    "71465",
    "LA"
  ],
  "PROVENCAL": [
    "71468",
    "LA"
  ],
  "ROBELINE": [
    "71469",
    "LA"
  ],
  "SIEPER": [
    "71472",
    "LA"
  ],
  "SIKES": [
    "71473",
    "LA"
  ],
  "SLAGLE": [
    "71475",
    "LA"
  ],
  "TULLOS": [
    "71479",
    "LA"
  ],
  "URANIA": [
    "71480",
    "LA"
  ],
  "WINNFIELD": [
    "71483",
    "LA"
  ],
  "ZWOLLE": [
    "71486",
    "LA"
  ],
  "PINE BLUFF": [
    "71613",
    "AR"
  ],
  "CROSSETT": [
    "71635",
    "AR"
  ],
  "DERMOTT": [
    "71638",
    "AR"
  ],
  "FOUNTAIN HILL": [
    "71642",
    "AR"
  ],
  "GOULD": [
    "73544",
    "OK"
  ],
  "MC GEHEE": [
    "71654",
    "AR"
  ],
  "NEW EDINBURG": [
    "71660",
    "AR"
  ],
  "PARKDALE": [
    "71661",
    "AR"
  ],
  "RISON": [
    "71665",
    "AR"
  ],
  "ROHWER": [
    "71666",
    "AR"
  ],
  "TILLAR": [
    "71670",
    "AR"
  ],
  "WILMAR": [
    "71675",
    "AR"
  ],
  "BEARDEN": [
    "71720",
    "AR"
  ],
  "BEIRNE": [
    "71721",
    "AR"
  ],
  "CALION": [
    "71724",
    "AR"
  ],
  "CHIDESTER": [
    "71726",
    "AR"
  ],
  "GURDON": [
    "71743",
    "AR"
  ],
  "HARRELL": [
    "71745",
    "AR"
  ],
  "HUTTIG": [
    "71747",
    "AR"
  ],
  "IVAN": [
    "71748",
    "AR"
  ],
  "LOUANN": [
    "71751",
    "AR"
  ],
  "MC NEIL": [
    "71752",
    "AR"
  ],
  "NORPHLET": [
    "71759",
    "AR"
  ],
  "SMACKOVER": [
    "71762",
    "AR"
  ],
  "SPARKMAN": [
    "71763",
    "AR"
  ],
  "WHELEN SPRINGS": [
    "71772",
    "AR"
  ],
  "ASHDOWN": [
    "71822",
    "AR"
  ],
  "BEN LOMOND": [
    "95005",
    "CA"
  ],
  "BLEVINS": [
    "71825",
    "AR"
  ],
  "DE QUEEN": [
    "71832",
    "AR"
  ],
  "DIERKS": [
    "71833",
    "AR"
  ],
  "DODDRIDGE": [
    "71834",
    "AR"
  ],
  "FOREMAN": [
    "71836",
    "AR"
  ],
  "FOUKE": [
    "71837",
    "AR"
  ],
  "GARLAND CITY": [
    "71839",
    "AR"
  ],
  "GILLHAM": [
    "71841",
    "AR"
  ],
  "LOCKESBURG": [
    "71846",
    "AR"
  ],
  "MC CASKILL": [
    "71847",
    "AR"
  ],
  "TEXARKANA": [
    "75507",
    "TX"
  ],
  "OZAN": [
    "71855",
    "AR"
  ],
  "ROSSTON": [
    "76263",
    "TX"
  ],
  "STAMPS": [
    "71860",
    "AR"
  ],
  "HOT SPRINGS NATIONAL PARK": [
    "71914",
    "AR"
  ],
  "HOT SPRINGS VILLAGE": [
    "71910",
    "AR"
  ],
  "ANTOINE": [
    "71922",
    "AR"
  ],
  "ARKADELPHIA": [
    "71999",
    "AR"
  ],
  "BONNERDALE": [
    "71933",
    "AR"
  ],
  "CADDO GAP": [
    "71935",
    "AR"
  ],
  "COVE": [
    "97824",
    "OR"
  ],
  "DELIGHT": [
    "71940",
    "AR"
  ],
  "GRANNIS": [
    "71944",
    "AR"
  ],
  "JESSIEVILLE": [
    "71949",
    "AR"
  ],
  "MENA": [
    "71953",
    "AR"
  ],
  "MOUNTAIN PINE": [
    "71956",
    "AR"
  ],
  "MOUNT IDA": [
    "71957",
    "AR"
  ],
  "NEWHOPE": [
    "71959",
    "AR"
  ],
  "PEARCY": [
    "71964",
    "AR"
  ],
  "PENCIL BLUFF": [
    "71965",
    "AR"
  ],
  "STORY": [
    "82842",
    "WY"
  ],
  "UMPIRE": [
    "71971",
    "AR"
  ],
  "VANDERVOORT": [
    "71972",
    "AR"
  ],
  "WICKES": [
    "71973",
    "AR"
  ],
  "ADONA": [
    "72001",
    "AR"
  ],
  "ALMYRA": [
    "72003",
    "AR"
  ],
  "ALTHEIMER": [
    "72004",
    "AR"
  ],
  "BALD KNOB": [
    "72010",
    "AR"
  ],
  "BAUXITE": [
    "72011",
    "AR"
  ],
  "BEEBE": [
    "72012",
    "AR"
  ],
  "BEE BRANCH": [
    "72013",
    "AR"
  ],
  "BEEDEVILLE": [
    "72014",
    "AR"
  ],
  "BRINKLEY": [
    "72021",
    "AR"
  ],
  "CASA": [
    "72025",
    "AR"
  ],
  "CASSCOE": [
    "72026",
    "AR"
  ],
  "CENTER RIDGE": [
    "72027",
    "AR"
  ],
  "CHOCTAW": [
    "73020",
    "OK"
  ],
  "COTTON PLANT": [
    "72036",
    "AR"
  ],
  "CROCKETTS BLUFF": [
    "72038",
    "AR"
  ],
  "DE VALLS BLUFF": [
    "72041",
    "AR"
  ],
  "DIAZ": [
    "72043",
    "AR"
  ],
  "ENGLAND": [
    "72046",
    "AR"
  ],
  "FOX": [
    "73435",
    "OK"
  ],
  "COLLEGE STATION": [
    "77845",
    "TX"
  ],
  "GRAPEVINE": [
    "76099",
    "TX"
  ],
  "GRIFFITHVILLE": [
    "72060",
    "AR"
  ],
  "GUY": [
    "77444",
    "TX"
  ],
  "HATTIEVILLE": [
    "72063",
    "AR"
  ],
  "HENSLEY": [
    "72065",
    "AR"
  ],
  "HICKORY PLAINS": [
    "72066",
    "AR"
  ],
  "HIGDEN": [
    "72067",
    "AR"
  ],
  "HIGGINSON": [
    "72068",
    "AR"
  ],
  "HOLLY GROVE": [
    "72069",
    "AR"
  ],
  "HUMNOKE": [
    "72072",
    "AR"
  ],
  "JUDSONIA": [
    "72081",
    "AR"
  ],
  "KEO": [
    "72083",
    "AR"
  ],
  "LONOKE": [
    "72086",
    "AR"
  ],
  "FAIRFIELD BAY": [
    "72088",
    "AR"
  ],
  "LITTLE ROCK AIR FORCE BASE": [
    "72099",
    "AR"
  ],
  "MC CRORY": [
    "72101",
    "AR"
  ],
  "MABELVALE": [
    "72103",
    "AR"
  ],
  "JONES MILL": [
    "72105",
    "AR"
  ],
  "MAYFLOWER": [
    "72106",
    "AR"
  ],
  "MENIFEE": [
    "92584",
    "CA"
  ],
  "MORRILTON": [
    "72110",
    "AR"
  ],
  "MAUMELLE": [
    "72113",
    "AR"
  ],
  "NORTH LITTLE ROCK": [
    "72199",
    "AR"
  ],
  "PANGBURN": [
    "72121",
    "AR"
  ],
  "PARON": [
    "72122",
    "AR"
  ],
  "PLUMERVILLE": [
    "72127",
    "AR"
  ],
  "POYEN": [
    "72128",
    "AR"
  ],
  "PRIM": [
    "72130",
    "AR"
  ],
  "ROE": [
    "72134",
    "AR"
  ],
  "ROMANCE": [
    "72136",
    "AR"
  ],
  "ROSE BUD": [
    "72137",
    "AR"
  ],
  "SEARCY": [
    "72149",
    "AR"
  ],
  "SOLGOHACHIA": [
    "72156",
    "AR"
  ],
  "STUTTGART": [
    "72160",
    "AR"
  ],
  "SWEET HOME": [
    "97386",
    "OR"
  ],
  "TICHNOR": [
    "72166",
    "AR"
  ],
  "TRASKWOOD": [
    "72167",
    "AR"
  ],
  "VILONIA": [
    "72173",
    "AR"
  ],
  "WILBURN": [
    "72179",
    "AR"
  ],
  "WEST MEMPHIS": [
    "72303",
    "AR"
  ],
  "ARMOREL": [
    "72310",
    "AR"
  ],
  "AUBREY": [
    "76227",
    "TX"
  ],
  "BLYTHEVILLE": [
    "72316",
    "AR"
  ],
  "GOSNELL": [
    "72319",
    "AR"
  ],
  "BRICKEYS": [
    "72320",
    "AR"
  ],
  "BURDETTE": [
    "72321",
    "AR"
  ],
  "CLARKEDALE": [
    "72325",
    "AR"
  ],
  "COLT": [
    "72326",
    "AR"
  ],
  "CRUMROD": [
    "72328",
    "AR"
  ],
  "DYESS": [
    "72330",
    "AR"
  ],
  "EARLE": [
    "72331",
    "AR"
  ],
  "EDMONDSON": [
    "72332",
    "AR"
  ],
  "ELAINE": [
    "72333",
    "AR"
  ],
  "FORREST CITY": [
    "72336",
    "AR"
  ],
  "FRENCHMANS BAYOU": [
    "72338",
    "AR"
  ],
  "HETH": [
    "72346",
    "AR"
  ],
  "HICKORY RIDGE": [
    "72347",
    "AR"
  ],
  "HUGHES": [
    "99745",
    "AK"
  ],
  "JOINER": [
    "72350",
    "AR"
  ],
  "KEISER": [
    "72351",
    "AR"
  ],
  "LEPANTO": [
    "72354",
    "AR"
  ],
  "LEXA": [
    "72355",
    "AR"
  ],
  "LUXORA": [
    "72358",
    "AR"
  ],
  "MARKED TREE": [
    "72365",
    "AR"
  ],
  "MARVELL": [
    "72366",
    "AR"
  ],
  "MELLWOOD": [
    "72367",
    "AR"
  ],
  "PARKIN": [
    "72373",
    "AR"
  ],
  "TURRELL": [
    "72384",
    "AR"
  ],
  "TYRONZA": [
    "72386",
    "AR"
  ],
  "WEST HELENA": [
    "72390",
    "AR"
  ],
  "WHEATLEY": [
    "72392",
    "AR"
  ],
  "WIDENER": [
    "72394",
    "AR"
  ],
  "WYNNE": [
    "72396",
    "AR"
  ],
  "ALICIA": [
    "72410",
    "AR"
  ],
  "BAY": [
    "72411",
    "AR"
  ],
  "BIGGERS": [
    "72413",
    "AR"
  ],
  "BLACK OAK": [
    "72414",
    "AR"
  ],
  "BLACK ROCK": [
    "72415",
    "AR"
  ],
  "BONO": [
    "72416",
    "AR"
  ],
  "BROOKLAND": [
    "72417",
    "AR"
  ],
  "CARAWAY": [
    "72419",
    "AR"
  ],
  "CASH": [
    "72421",
    "AR"
  ],
  "DELAPLAINE": [
    "72425",
    "AR"
  ],
  "GREENWAY": [
    "72430",
    "AR"
  ],
  "GRUBBS": [
    "72431",
    "AR"
  ],
  "IMBODEN": [
    "72434",
    "AR"
  ],
  "KNOBEL": [
    "72435",
    "AR"
  ],
  "LAFE": [
    "72436",
    "AR"
  ],
  "LEACHVILLE": [
    "72438",
    "AR"
  ],
  "MC DOUGAL": [
    "72441",
    "AR"
  ],
  "MANILA": [
    "84046",
    "UT"
  ],
  "MARMADUKE": [
    "72443",
    "AR"
  ],
  "MINTURN": [
    "81645",
    "CO"
  ],
  "MONETTE": [
    "72447",
    "AR"
  ],
  "PARAGOULD": [
    "72451",
    "AR"
  ],
  "PEACH ORCHARD": [
    "72453",
    "AR"
  ],
  "PIGGOTT": [
    "72454",
    "AR"
  ],
  "POLLARD": [
    "72456",
    "AR"
  ],
  "PORTIA": [
    "72457",
    "AR"
  ],
  "RAVENDEN": [
    "72459",
    "AR"
  ],
  "RAVENDEN SPRINGS": [
    "72460",
    "AR"
  ],
  "REYNO": [
    "72462",
    "AR"
  ],
  "STATE UNIVERSITY": [
    "72467",
    "AR"
  ],
  "STRAWBERRY": [
    "95375",
    "CA"
  ],
  "SWIFTON": [
    "72471",
    "AR"
  ],
  "TRUMANN": [
    "72472",
    "AR"
  ],
  "TUCKERMAN": [
    "72473",
    "AR"
  ],
  "WALDENBURG": [
    "72475",
    "AR"
  ],
  "WALNUT RIDGE": [
    "72476",
    "AR"
  ],
  "WEINER": [
    "72479",
    "AR"
  ],
  "WILLIFORD": [
    "72482",
    "AR"
  ],
  "HORSESHOE BEND": [
    "83629",
    "ID"
  ],
  "ASH FLAT": [
    "72513",
    "AR"
  ],
  "BROCKWELL": [
    "72517",
    "AR"
  ],
  "CALICO ROCK": [
    "72519",
    "AR"
  ],
  "CAMP": [
    "72520",
    "AR"
  ],
  "CORD": [
    "72524",
    "AR"
  ],
  "CHEROKEE VILLAGE": [
    "72529",
    "AR"
  ],
  "CUSHMAN": [
    "72526",
    "AR"
  ],
  "DESHA": [
    "72527",
    "AR"
  ],
  "DOLPH": [
    "72528",
    "AR"
  ],
  "DRASCO": [
    "72530",
    "AR"
  ],
  "EVENING SHADE": [
    "72532",
    "AR"
  ],
  "FIFTY SIX": [
    "72533",
    "AR"
  ],
  "FLORAL": [
    "72534",
    "AR"
  ],
  "GEPP": [
    "72538",
    "AR"
  ],
  "GUION": [
    "72540",
    "AR"
  ],
  "HEBER SPRINGS": [
    "72543",
    "AR"
  ],
  "MAGNESS": [
    "72553",
    "AR"
  ],
  "MAMMOTH SPRING": [
    "72554",
    "AR"
  ],
  "MARCELLA": [
    "72555",
    "AR"
  ],
  "OIL TROUGH": [
    "72564",
    "AR"
  ],
  "ROSIE": [
    "72571",
    "AR"
  ],
  "SAFFELL": [
    "72572",
    "AR"
  ],
  "SAGE": [
    "72573",
    "AR"
  ],
  "STURKIE": [
    "72578",
    "AR"
  ],
  "SULPHUR ROCK": [
    "72579",
    "AR"
  ],
  "TUMBLING SHOALS": [
    "72581",
    "AR"
  ],
  "VIOLET HILL": [
    "72584",
    "AR"
  ],
  "WIDEMAN": [
    "72585",
    "AR"
  ],
  "BERGMAN": [
    "72615",
    "AR"
  ],
  "BIG FLAT": [
    "72617",
    "AR"
  ],
  "BULL SHOALS": [
    "72619",
    "AR"
  ],
  "CLARKRIDGE": [
    "72623",
    "AR"
  ],
  "COTTER": [
    "72626",
    "AR"
  ],
  "DEER": [
    "72628",
    "AR"
  ],
  "DENNARD": [
    "72629",
    "AR"
  ],
  "DIAMOND CITY": [
    "72630",
    "AR"
  ],
  "EUREKA SPRINGS": [
    "72632",
    "AR"
  ],
  "FLIPPIN": [
    "72634",
    "AR"
  ],
  "GASSVILLE": [
    "72635",
    "AR"
  ],
  "GREEN FOREST": [
    "72638",
    "AR"
  ],
  "HARRIET": [
    "72639",
    "AR"
  ],
  "HASTY": [
    "81044",
    "CO"
  ],
  "LEAD HILL": [
    "72644",
    "AR"
  ],
  "MARBLE FALLS": [
    "78654",
    "TX"
  ],
  "MOUNT JUDEA": [
    "72655",
    "AR"
  ],
  "TIMBO": [
    "72680",
    "AR"
  ],
  "NORFORK": [
    "72658",
    "AR"
  ],
  "ONIA": [
    "72663",
    "AR"
  ],
  "PARTHENON": [
    "72666",
    "AR"
  ],
  "PEEL": [
    "72668",
    "AR"
  ],
  "PINDALL": [
    "72669",
    "AR"
  ],
  "PYATT": [
    "72672",
    "AR"
  ],
  "TILLY": [
    "72679",
    "AR"
  ],
  "VENDOR": [
    "72683",
    "AR"
  ],
  "WESTERN GROVE": [
    "72685",
    "AR"
  ],
  "YELLVILLE": [
    "72687",
    "AR"
  ],
  "BELLA VISTA": [
    "96008",
    "CA"
  ],
  "CANEHILL": [
    "72717",
    "AR"
  ],
  "CAVE SPRINGS": [
    "72718",
    "AR"
  ],
  "CENTERTON": [
    "72719",
    "AR"
  ],
  "ELM SPRINGS": [
    "72728",
    "AR"
  ],
  "GATEWAY": [
    "81522",
    "CO"
  ],
  "GRAVETTE": [
    "72736",
    "AR"
  ],
  "HINDSVILLE": [
    "72738",
    "AR"
  ],
  "HIWASSE": [
    "72739",
    "AR"
  ],
  "PEA RIDGE": [
    "72751",
    "AR"
  ],
  "PETTIGREW": [
    "72752",
    "AR"
  ],
  "PRAIRIE GROVE": [
    "72753",
    "AR"
  ],
  "SILOAM SPRINGS": [
    "72761",
    "AR"
  ],
  "SUMMERS": [
    "72769",
    "AR"
  ],
  "TONTITOWN": [
    "72770",
    "AR"
  ],
  "WEST FORK": [
    "72774",
    "AR"
  ],
  "WITTER": [
    "72776",
    "AR"
  ],
  "ALIX": [
    "72820",
    "AR"
  ],
  "ALTUS": [
    "73522",
    "OK"
  ],
  "COAL HILL": [
    "72832",
    "AR"
  ],
  "DARDANELLE": [
    "72834",
    "AR"
  ],
  "HAGARVILLE": [
    "72839",
    "AR"
  ],
  "HARTMAN": [
    "72840",
    "AR"
  ],
  "NEW BLAINE": [
    "72851",
    "AR"
  ],
  "OARK": [
    "72852",
    "AR"
  ],
  "OLA": [
    "83657",
    "ID"
  ],
  "OZONE": [
    "72854",
    "AR"
  ],
  "PELSOR": [
    "72856",
    "AR"
  ],
  "ROVER": [
    "72860",
    "AR"
  ],
  "SUBIACO": [
    "72865",
    "AR"
  ],
  "BARLING": [
    "72923",
    "AR"
  ],
  "HACKETT": [
    "72937",
    "AR"
  ],
  "LAVACA": [
    "72941",
    "AR"
  ],
  "MAGAZINE": [
    "72943",
    "AR"
  ],
  "MOUNTAINBURG": [
    "72946",
    "AR"
  ],
  "NATURAL DAM": [
    "72948",
    "AR"
  ],
  "PARKS": [
    "86018",
    "AZ"
  ],
  "RATCLIFF": [
    "75858",
    "TX"
  ],
  "RUDY": [
    "72952",
    "AR"
  ],
  "ALEX": [
    "73002",
    "OK"
  ],
  "AMBER": [
    "73004",
    "OK"
  ],
  "ANADARKO": [
    "73005",
    "OK"
  ],
  "APACHE": [
    "73006",
    "OK"
  ],
  "BINGER": [
    "73009",
    "OK"
  ],
  "CASHION": [
    "85329",
    "AZ"
  ],
  "CEMENT": [
    "73017",
    "OK"
  ],
  "CHICKASHA": [
    "73023",
    "OK"
  ],
  "CONCHO": [
    "85924",
    "AZ"
  ],
  "CORN": [
    "73024",
    "OK"
  ],
  "COYLE": [
    "73027",
    "OK"
  ],
  "CYRIL": [
    "73029",
    "OK"
  ],
  "DIBBLE": [
    "73031",
    "OK"
  ],
  "EAKLY": [
    "73033",
    "OK"
  ],
  "EL RENO": [
    "73036",
    "OK"
  ],
  "FORT COBB": [
    "73038",
    "OK"
  ],
  "GEARY": [
    "73040",
    "OK"
  ],
  "GOTEBO": [
    "73041",
    "OK"
  ],
  "GRACEMONT": [
    "73042",
    "OK"
  ],
  "HARRAH": [
    "98933",
    "WA"
  ],
  "HYDRO": [
    "73048",
    "OK"
  ],
  "LOOKEBA": [
    "73053",
    "OK"
  ],
  "MINCO": [
    "73059",
    "OK"
  ],
  "MULHALL": [
    "73063",
    "OK"
  ],
  "MUSTANG": [
    "73064",
    "OK"
  ],
  "NICOMA PARK": [
    "73066",
    "OK"
  ],
  "NINNEKAH": [
    "73067",
    "OK"
  ],
  "PAULS VALLEY": [
    "73075",
    "OK"
  ],
  "RUSH SPRINGS": [
    "73082",
    "OK"
  ],
  "VERDEN": [
    "73092",
    "OK"
  ],
  "WEATHERFORD": [
    "76088",
    "TX"
  ],
  "OKLAHOMA CITY": [
    "73195",
    "OK"
  ],
  "COUNTYLINE": [
    "73425",
    "OK"
  ],
  "BURNEYVILLE": [
    "73430",
    "OK"
  ],
  "ELMORE CITY": [
    "73433",
    "OK"
  ],
  "GENE AUTRY": [
    "73436",
    "OK"
  ],
  "HEALDTON": [
    "73438",
    "OK"
  ],
  "LOCO": [
    "73442",
    "OK"
  ],
  "LONE GROVE": [
    "73443",
    "OK"
  ],
  "MADILL": [
    "73446",
    "OK"
  ],
  "RAVIA": [
    "73455",
    "OK"
  ],
  "SPRINGER": [
    "87747",
    "NM"
  ],
  "THACKERVILLE": [
    "73459",
    "OK"
  ],
  "WAPANUCKA": [
    "73461",
    "OK"
  ],
  "RATLIFF CITY": [
    "73481",
    "OK"
  ],
  "TUSSY": [
    "73488",
    "OK"
  ],
  "VELMA": [
    "73491",
    "OK"
  ],
  "FORT SILL": [
    "73503",
    "OK"
  ],
  "ADDINGTON": [
    "73520",
    "OK"
  ],
  "ALTUS AFB": [
    "73523",
    "OK"
  ],
  "CACHE": [
    "73527",
    "OK"
  ],
  "COMANCHE": [
    "76442",
    "TX"
  ],
  "DEVOL": [
    "73531",
    "OK"
  ],
  "FAXON": [
    "73540",
    "OK"
  ],
  "GERONIMO": [
    "78115",
    "TX"
  ],
  "GRANDFIELD": [
    "73546",
    "OK"
  ],
  "GRANITE": [
    "73547",
    "OK"
  ],
  "HEADRICK": [
    "73549",
    "OK"
  ],
  "INDIAHOMA": [
    "73552",
    "OK"
  ],
  "MANGUM": [
    "73554",
    "OK"
  ],
  "MEDICINE PARK": [
    "73557",
    "OK"
  ],
  "MOUNTAIN PARK": [
    "73559",
    "OK"
  ],
  "RANDLETT": [
    "84063",
    "UT"
  ],
  "TERRAL": [
    "73569",
    "OK"
  ],
  "VINSON": [
    "73571",
    "OK"
  ],
  "WALTERS": [
    "73572",
    "OK"
  ],
  "WAURIKA": [
    "73573",
    "OK"
  ],
  "ARAPAHO": [
    "73620",
    "OK"
  ],
  "BESSIE": [
    "73622",
    "OK"
  ],
  "BURNS FLAT": [
    "73624",
    "OK"
  ],
  "CANUTE": [
    "73626",
    "OK"
  ],
  "CHEYENNE": [
    "82009",
    "WY"
  ],
  "CORDELL": [
    "73632",
    "OK"
  ],
  "DILL CITY": [
    "73641",
    "OK"
  ],
  "ERICK": [
    "73645",
    "OK"
  ],
  "FAY": [
    "73646",
    "OK"
  ],
  "FOSS": [
    "73647",
    "OK"
  ],
  "HAMMON": [
    "73650",
    "OK"
  ],
  "LEEDEY": [
    "73654",
    "OK"
  ],
  "LONE WOLF": [
    "73655",
    "OK"
  ],
  "REYDON": [
    "73660",
    "OK"
  ],
  "ROCKY": [
    "73661",
    "OK"
  ],
  "SEILING": [
    "73663",
    "OK"
  ],
  "SENTINEL": [
    "73664",
    "OK"
  ],
  "TALOGA": [
    "73667",
    "OK"
  ],
  "TEXOLA": [
    "73668",
    "OK"
  ],
  "ALINE": [
    "73716",
    "OK"
  ],
  "AMORITA": [
    "73719",
    "OK"
  ],
  "CARMEN": [
    "83462",
    "ID"
  ],
  "CARRIER": [
    "73727",
    "OK"
  ],
  "CLEO SPRINGS": [
    "73729",
    "OK"
  ],
  "DACOMA": [
    "73731",
    "OK"
  ],
  "GOLTRY": [
    "73739",
    "OK"
  ],
  "HENNESSEY": [
    "73742",
    "OK"
  ],
  "HOPETON": [
    "73746",
    "OK"
  ],
  "JET": [
    "73749",
    "OK"
  ],
  "KINGFISHER": [
    "73750",
    "OK"
  ],
  "LAHOMA": [
    "73754",
    "OK"
  ],
  "LONGDALE": [
    "73755",
    "OK"
  ],
  "LUCIEN": [
    "73757",
    "OK"
  ],
  "MENO": [
    "73760",
    "OK"
  ],
  "NASH": [
    "75569",
    "TX"
  ],
  "OKARCHE": [
    "73762",
    "OK"
  ],
  "OKEENE": [
    "73763",
    "OK"
  ],
  "POND CREEK": [
    "73766",
    "OK"
  ],
  "SOUTHARD": [
    "73770",
    "OK"
  ],
  "WAKITA": [
    "73771",
    "OK"
  ],
  "WATONGA": [
    "73772",
    "OK"
  ],
  "WAUKOMIS": [
    "73773",
    "OK"
  ],
  "ARNETT": [
    "73832",
    "OK"
  ],
  "FORT SUPPLY": [
    "73841",
    "OK"
  ],
  "GAGE": [
    "73843",
    "OK"
  ],
  "GATE": [
    "73844",
    "OK"
  ],
  "LAVERNE": [
    "73848",
    "OK"
  ],
  "MAY": [
    "83253",
    "ID"
  ],
  "MUTUAL": [
    "73853",
    "OK"
  ],
  "SHATTUCK": [
    "73858",
    "OK"
  ],
  "VICI": [
    "73859",
    "OK"
  ],
  "WAYNOKA": [
    "73860",
    "OK"
  ],
  "BALKO": [
    "73931",
    "OK"
  ],
  "BOISE CITY": [
    "73933",
    "OK"
  ],
  "FELT": [
    "83424",
    "ID"
  ],
  "FORGAN": [
    "73938",
    "OK"
  ],
  "GOODWELL": [
    "73939",
    "OK"
  ],
  "GUYMON": [
    "73942",
    "OK"
  ],
  "HARDESTY": [
    "73944",
    "OK"
  ],
  "HOOKER": [
    "73945",
    "OK"
  ],
  "KEYES": [
    "95328",
    "CA"
  ],
  "TEXHOMA": [
    "73949",
    "OK"
  ],
  "TURPIN": [
    "73950",
    "OK"
  ],
  "AVANT": [
    "74001",
    "OK"
  ],
  "BARNSDALL": [
    "74002",
    "OK"
  ],
  "BARTLESVILLE": [
    "74006",
    "OK"
  ],
  "BROKEN ARROW": [
    "74014",
    "OK"
  ],
  "CATOOSA": [
    "74015",
    "OK"
  ],
  "CLAREMORE": [
    "74019",
    "OK"
  ],
  "COPAN": [
    "74022",
    "OK"
  ],
  "DRUMRIGHT": [
    "74030",
    "OK"
  ],
  "FOYIL": [
    "74031",
    "OK"
  ],
  "GLENPOOL": [
    "74033",
    "OK"
  ],
  "HALLETT": [
    "74034",
    "OK"
  ],
  "HOMINY": [
    "74035",
    "OK"
  ],
  "INOLA": [
    "74036",
    "OK"
  ],
  "JENKS": [
    "74037",
    "OK"
  ],
  "KELLYVILLE": [
    "74039",
    "OK"
  ],
  "KIEFER": [
    "74041",
    "OK"
  ],
  "LENAPAH": [
    "74042",
    "OK"
  ],
  "MANNFORD": [
    "74044",
    "OK"
  ],
  "MARAMEC": [
    "74045",
    "OK"
  ],
  "MILFAY": [
    "74046",
    "OK"
  ],
  "NOWATA": [
    "74048",
    "OK"
  ],
  "OCHELATA": [
    "74051",
    "OK"
  ],
  "OILTON": [
    "78371",
    "TX"
  ],
  "OOLOGAH": [
    "74053",
    "OK"
  ],
  "OWASSO": [
    "74055",
    "OK"
  ],
  "PAWHUSKA": [
    "74056",
    "OK"
  ],
  "PRUE": [
    "74060",
    "OK"
  ],
  "SAND SPRINGS": [
    "74063",
    "OK"
  ],
  "SAPULPA": [
    "74067",
    "OK"
  ],
  "SHAMROCK": [
    "79079",
    "TX"
  ],
  "SKIATOOK": [
    "74070",
    "OK"
  ],
  "SLICK": [
    "74071",
    "OK"
  ],
  "S COFFEYVILLE": [
    "74072",
    "OK"
  ],
  "STROUD": [
    "74079",
    "OK"
  ],
  "TALALA": [
    "74080",
    "OK"
  ],
  "TERLTON": [
    "74081",
    "OK"
  ],
  "VERA": [
    "74082",
    "OK"
  ],
  "WANN": [
    "74083",
    "OK"
  ],
  "WYNONA": [
    "74084",
    "OK"
  ],
  "TULSA": [
    "74172",
    "OK"
  ],
  "VINITA": [
    "74301",
    "OK"
  ],
  "BIG CABIN": [
    "74332",
    "OK"
  ],
  "BLUEJACKET": [
    "74333",
    "OK"
  ],
  "CARDIN": [
    "74335",
    "OK"
  ],
  "CHOUTEAU": [
    "74337",
    "OK"
  ],
  "DISNEY": [
    "74340",
    "OK"
  ],
  "EUCHA": [
    "74342",
    "OK"
  ],
  "GROVE": [
    "74345",
    "OK"
  ],
  "KETCHUM": [
    "83340",
    "ID"
  ],
  "NORTH MIAMI": [
    "74358",
    "OK"
  ],
  "PICHER": [
    "74360",
    "OK"
  ],
  "QUAPAW": [
    "74363",
    "OK"
  ],
  "SPAVINAW": [
    "74366",
    "OK"
  ],
  "TWIN OAKS": [
    "74368",
    "OK"
  ],
  "MUSKOGEE": [
    "74403",
    "OK"
  ],
  "BEGGS": [
    "74421",
    "OK"
  ],
  "BRAGGS": [
    "74423",
    "OK"
  ],
  "CANADIAN": [
    "79014",
    "TX"
  ],
  "CHECOTAH": [
    "74426",
    "OK"
  ],
  "COOKSON": [
    "74427",
    "OK"
  ],
  "COUNCIL HILL": [
    "74428",
    "OK"
  ],
  "COWETA": [
    "74429",
    "OK"
  ],
  "FORT GIBSON": [
    "74434",
    "OK"
  ],
  "HENRYETTA": [
    "74437",
    "OK"
  ],
  "MOODYS": [
    "74444",
    "OK"
  ],
  "OKAY": [
    "74446",
    "OK"
  ],
  "OKMULGEE": [
    "74447",
    "OK"
  ],
  "OKTAHA": [
    "74450",
    "OK"
  ],
  "PARK HILL": [
    "74451",
    "OK"
  ],
  "PEGGS": [
    "74452",
    "OK"
  ],
  "PORUM": [
    "74455",
    "OK"
  ],
  "REDBIRD": [
    "74458",
    "OK"
  ],
  "SCHULTER": [
    "74460",
    "OK"
  ],
  "STIGLER": [
    "74462",
    "OK"
  ],
  "TAHLEQUAH": [
    "74465",
    "OK"
  ],
  "WAGONER": [
    "74477",
    "OK"
  ],
  "WAINWRIGHT": [
    "99782",
    "AK"
  ],
  "WEBBERS FALLS": [
    "74470",
    "OK"
  ],
  "WELLING": [
    "74471",
    "OK"
  ],
  "MCALESTER": [
    "74502",
    "OK"
  ],
  "ANTLERS": [
    "74523",
    "OK"
  ],
  "BLANCO": [
    "87412",
    "NM"
  ],
  "CENTRAHOMA": [
    "74534",
    "OK"
  ],
  "CLARITA": [
    "74535",
    "OK"
  ],
  "COALGATE": [
    "74538",
    "OK"
  ],
  "HAILEYVILLE": [
    "74546",
    "OK"
  ],
  "HARTSHORNE": [
    "74547",
    "OK"
  ],
  "HONOBIA": [
    "74549",
    "OK"
  ],
  "KINTA": [
    "74552",
    "OK"
  ],
  "KREBS": [
    "74554",
    "OK"
  ],
  "MOYERS": [
    "74557",
    "OK"
  ],
  "NASHOBA": [
    "74558",
    "OK"
  ],
  "RATTAN": [
    "74562",
    "OK"
  ],
  "STRINGTOWN": [
    "74569",
    "OK"
  ],
  "TALIHINA": [
    "74571",
    "OK"
  ],
  "TUSKAHOMA": [
    "74574",
    "OK"
  ],
  "WARDVILLE": [
    "74576",
    "OK"
  ],
  "PONCA CITY": [
    "74604",
    "OK"
  ],
  "BRAMAN": [
    "74632",
    "OK"
  ],
  "KAW CITY": [
    "74641",
    "OK"
  ],
  "MARLAND": [
    "74644",
    "OK"
  ],
  "NARDIN": [
    "74646",
    "OK"
  ],
  "NEWKIRK": [
    "74647",
    "OK"
  ],
  "RED ROCK": [
    "85145",
    "AZ"
  ],
  "SHIDLER": [
    "74652",
    "OK"
  ],
  "TONKAWA": [
    "74653",
    "OK"
  ],
  "ACHILLE": [
    "74720",
    "OK"
  ],
  "BATTIEST": [
    "74722",
    "OK"
  ],
  "BOKCHITO": [
    "74726",
    "OK"
  ],
  "CADDO": [
    "76429",
    "TX"
  ],
  "EAGLETOWN": [
    "74734",
    "OK"
  ],
  "FORT TOWSON": [
    "74735",
    "OK"
  ],
  "HENDRIX": [
    "74741",
    "OK"
  ],
  "IDABEL": [
    "74745",
    "OK"
  ],
  "KENEFIC": [
    "74748",
    "OK"
  ],
  "PLATTER": [
    "74753",
    "OK"
  ],
  "RINGOLD": [
    "74754",
    "OK"
  ],
  "RUFE": [
    "74755",
    "OK"
  ],
  "SOPER": [
    "74759",
    "OK"
  ],
  "VALLIANT": [
    "74764",
    "OK"
  ],
  "BOLEY": [
    "74829",
    "OK"
  ],
  "BOWLEGS": [
    "74830",
    "OK"
  ],
  "BYARS": [
    "74831",
    "OK"
  ],
  "CASTLE": [
    "74833",
    "OK"
  ],
  "DUSTIN": [
    "74839",
    "OK"
  ],
  "EARLSBORO": [
    "74840",
    "OK"
  ],
  "FITTSTOWN": [
    "74842",
    "OK"
  ],
  "FITZHUGH": [
    "74843",
    "OK"
  ],
  "FRANCIS": [
    "74844",
    "OK"
  ],
  "HOLDENVILLE": [
    "74848",
    "OK"
  ],
  "KONAWA": [
    "74849",
    "OK"
  ],
  "MCLOUD": [
    "74851",
    "OK"
  ],
  "MAUD": [
    "75567",
    "TX"
  ],
  "MEEKER": [
    "81641",
    "CO"
  ],
  "NEWALLA": [
    "74857",
    "OK"
  ],
  "OKEMAH": [
    "74859",
    "OK"
  ],
  "PADEN": [
    "74860",
    "OK"
  ],
  "ROFF": [
    "74865",
    "OK"
  ],
  "SASAKWA": [
    "74867",
    "OK"
  ],
  "WANETTE": [
    "74878",
    "OK"
  ],
  "WELEETKA": [
    "74880",
    "OK"
  ],
  "WETUMKA": [
    "74883",
    "OK"
  ],
  "WEWOKA": [
    "74884",
    "OK"
  ],
  "ARKOMA": [
    "74901",
    "OK"
  ],
  "POCOLA": [
    "74902",
    "OK"
  ],
  "BOKOSHE": [
    "74930",
    "OK"
  ],
  "BUNCH": [
    "74931",
    "OK"
  ],
  "GANS": [
    "74936",
    "OK"
  ],
  "HEAVENER": [
    "74937",
    "OK"
  ],
  "HODGEN": [
    "74939",
    "OK"
  ],
  "LEFLORE": [
    "74942",
    "OK"
  ],
  "LEQUIRE": [
    "74943",
    "OK"
  ],
  "MCCURTAIN": [
    "74944",
    "OK"
  ],
  "MARBLE CITY": [
    "74945",
    "OK"
  ],
  "MOFFETT": [
    "74946",
    "OK"
  ],
  "MULDROW": [
    "74948",
    "OK"
  ],
  "POTEAU": [
    "74953",
    "OK"
  ],
  "SALLISAW": [
    "74955",
    "OK"
  ],
  "SHADY POINT": [
    "74956",
    "OK"
  ],
  "SPIRO": [
    "74959",
    "OK"
  ],
  "VIAN": [
    "74962",
    "OK"
  ],
  "WATTS": [
    "74964",
    "OK"
  ],
  "WISTER": [
    "74966",
    "OK"
  ],
  "COPPELL": [
    "75099",
    "TX"
  ],
  "FLOWER MOUND": [
    "75028",
    "TX"
  ],
  "ROWLETT": [
    "75089",
    "TX"
  ],
  "ROCKWALL": [
    "75087",
    "TX"
  ],
  "SACHSE": [
    "75048",
    "TX"
  ],
  "GRAND PRAIRIE": [
    "75054",
    "TX"
  ],
  "THE COLONY": [
    "75056",
    "TX"
  ],
  "GUNTER": [
    "75058",
    "TX"
  ],
  "LAKE DALLAS": [
    "75065",
    "TX"
  ],
  "LITTLE ELM": [
    "75068",
    "TX"
  ],
  "MCKINNEY": [
    "75071",
    "TX"
  ],
  "POTTSBORO": [
    "75076",
    "TX"
  ],
  "PROSPER": [
    "75078",
    "TX"
  ],
  "RICHARDSON": [
    "75085",
    "TX"
  ],
  "WYLIE": [
    "75098",
    "TX"
  ],
  "CORSICANA": [
    "75151",
    "TX"
  ],
  "DESOTO": [
    "75123",
    "TX"
  ],
  "COPEVILLE": [
    "75121",
    "TX"
  ],
  "EUSTACE": [
    "75124",
    "TX"
  ],
  "FORNEY": [
    "75126",
    "TX"
  ],
  "FRUITVALE": [
    "75127",
    "TX"
  ],
  "FATE": [
    "75132",
    "TX"
  ],
  "CADDO MILLS": [
    "75135",
    "TX"
  ],
  "GRAND SALINE": [
    "75140",
    "TX"
  ],
  "HUTCHINS": [
    "75141",
    "TX"
  ],
  "KAUFMAN": [
    "75142",
    "TX"
  ],
  "KEMP": [
    "75143",
    "TX"
  ],
  "MABANK": [
    "75156",
    "TX"
  ],
  "MALAKOFF": [
    "75148",
    "TX"
  ],
  "MESQUITE": [
    "89034",
    "NV"
  ],
  "ROSSER": [
    "75157",
    "TX"
  ],
  "SCURRY": [
    "75158",
    "TX"
  ],
  "SEAGOVILLE": [
    "75159",
    "TX"
  ],
  "TRINIDAD": [
    "95570",
    "CA"
  ],
  "WAXAHACHIE": [
    "75168",
    "TX"
  ],
  "LAVON": [
    "75166",
    "TX"
  ],
  "WILLS POINT": [
    "75169",
    "TX"
  ],
  "BALCH SPRINGS": [
    "75180",
    "TX"
  ],
  "SUNNYVALE": [
    "94089",
    "CA"
  ],
  "ROYSE CITY": [
    "75189",
    "TX"
  ],
  "ARTHUR CITY": [
    "75411",
    "TX"
  ],
  "BLOSSOM": [
    "75416",
    "TX"
  ],
  "BOGATA": [
    "75417",
    "TX"
  ],
  "BONHAM": [
    "75418",
    "TX"
  ],
  "CELESTE": [
    "75423",
    "TX"
  ],
  "CHICOTA": [
    "75425",
    "TX"
  ],
  "CUMBY": [
    "75433",
    "TX"
  ],
  "DEPORT": [
    "75435",
    "TX"
  ],
  "DODD CITY": [
    "75438",
    "TX"
  ],
  "ECTOR": [
    "75439",
    "TX"
  ],
  "ENLOE": [
    "75441",
    "TX"
  ],
  "GOBER": [
    "75443",
    "TX"
  ],
  "KLONDIKE": [
    "75448",
    "TX"
  ],
  "LADONIA": [
    "75449",
    "TX"
  ],
  "LAKE CREEK": [
    "75450",
    "TX"
  ],
  "LONE OAK": [
    "75453",
    "TX"
  ],
  "MELISSA": [
    "75454",
    "TX"
  ],
  "MERIT": [
    "75458",
    "TX"
  ],
  "PATTONVILLE": [
    "75468",
    "TX"
  ],
  "PECAN GAP": [
    "75469",
    "TX"
  ],
  "PETTY": [
    "75470",
    "TX"
  ],
  "PICKTON": [
    "75471",
    "TX"
  ],
  "POINT": [
    "75472",
    "TX"
  ],
  "QUINLAN": [
    "75474",
    "TX"
  ],
  "ROXTON": [
    "75477",
    "TX"
  ],
  "SCROGGINS": [
    "75480",
    "TX"
  ],
  "SULPHUR BLUFF": [
    "75481",
    "TX"
  ],
  "TALCO": [
    "75487",
    "TX"
  ],
  "TELEPHONE": [
    "75488",
    "TX"
  ],
  "TOM BEAN": [
    "75489",
    "TX"
  ],
  "WHITEWRIGHT": [
    "75491",
    "TX"
  ],
  "VAN ALSTYNE": [
    "75495",
    "TX"
  ],
  "WOLFE CITY": [
    "75496",
    "TX"
  ],
  "YANTIS": [
    "75497",
    "TX"
  ],
  "ANNONA": [
    "75550",
    "TX"
  ],
  "AVERY": [
    "95224",
    "CA"
  ],
  "BIVINS": [
    "75555",
    "TX"
  ],
  "BLOOMBURG": [
    "75556",
    "TX"
  ],
  "COOKVILLE": [
    "75558",
    "TX"
  ],
  "HOOKS": [
    "75561",
    "TX"
  ],
  "REDWATER": [
    "75573",
    "TX"
  ],
  "AVINGER": [
    "75630",
    "TX"
  ],
  "BECKVILLE": [
    "75631",
    "TX"
  ],
  "CASON": [
    "75636",
    "TX"
  ],
  "DAINGERFIELD": [
    "75638",
    "TX"
  ],
  "DE BERRY": [
    "75639",
    "TX"
  ],
  "ELYSIAN FIELDS": [
    "75642",
    "TX"
  ],
  "GILMER": [
    "75645",
    "TX"
  ],
  "GLADEWATER": [
    "75647",
    "TX"
  ],
  "HARLETON": [
    "75651",
    "TX"
  ],
  "HUGHES SPRINGS": [
    "75656",
    "TX"
  ],
  "JUDSON": [
    "75660",
    "TX"
  ],
  "KARNACK": [
    "75661",
    "TX"
  ],
  "LAIRD HILL": [
    "75666",
    "TX"
  ],
  "LANEVILLE": [
    "75667",
    "TX"
  ],
  "LONE STAR": [
    "75668",
    "TX"
  ],
  "MOUNT ENTERPRISE": [
    "75681",
    "TX"
  ],
  "ORE CITY": [
    "75683",
    "TX"
  ],
  "PRICE": [
    "84501",
    "UT"
  ],
  "SELMAN CITY": [
    "75689",
    "TX"
  ],
  "WASKOM": [
    "75692",
    "TX"
  ],
  "ARP": [
    "75750",
    "TX"
  ],
  "BEN WHEELER": [
    "75754",
    "TX"
  ],
  "BULLARD": [
    "75757",
    "TX"
  ],
  "CUNEY": [
    "75759",
    "TX"
  ],
  "FRANKSTON": [
    "75763",
    "TX"
  ],
  "LARUE": [
    "75770",
    "TX"
  ],
  "MAYDELLE": [
    "75772",
    "TX"
  ],
  "MURCHISON": [
    "75778",
    "TX"
  ],
  "NECHES": [
    "75779",
    "TX"
  ],
  "NEW SUMMERFIELD": [
    "75780",
    "TX"
  ],
  "POYNOR": [
    "75782",
    "TX"
  ],
  "REKLAW": [
    "75784",
    "TX"
  ],
  "RUSK": [
    "75785",
    "TX"
  ],
  "TROUP": [
    "75789",
    "TX"
  ],
  "DONIE": [
    "75838",
    "TX"
  ],
  "GRAPELAND": [
    "75844",
    "TX"
  ],
  "KIRVIN": [
    "75848",
    "TX"
  ],
  "LATEXO": [
    "75849",
    "TX"
  ],
  "LEONA": [
    "75850",
    "TX"
  ],
  "LOVELADY": [
    "75851",
    "TX"
  ],
  "MONTALBA": [
    "75853",
    "TX"
  ],
  "STREETMAN": [
    "75859",
    "TX"
  ],
  "TEAGUE": [
    "75860",
    "TX"
  ],
  "TENNESSEE COLONY": [
    "75861",
    "TX"
  ],
  "WOODLAKE": [
    "93286",
    "CA"
  ],
  "LUFKIN": [
    "75915",
    "TX"
  ],
  "APPLE SPRINGS": [
    "75926",
    "TX"
  ],
  "BON WIER": [
    "75928",
    "TX"
  ],
  "BROADDUS": [
    "75929",
    "TX"
  ],
  "BROOKELAND": [
    "75931",
    "TX"
  ],
  "CALL": [
    "75933",
    "TX"
  ],
  "CHIRENO": [
    "75937",
    "TX"
  ],
  "COLMESNEIL": [
    "75938",
    "TX"
  ],
  "CORRIGAN": [
    "75939",
    "TX"
  ],
  "DIBOLL": [
    "75941",
    "TX"
  ],
  "DOUCETTE": [
    "75942",
    "TX"
  ],
  "HEMPHILL": [
    "75948",
    "TX"
  ],
  "JOAQUIN": [
    "75954",
    "TX"
  ],
  "MILAM": [
    "75959",
    "TX"
  ],
  "NACOGDOCHES": [
    "75965",
    "TX"
  ],
  "POLLOK": [
    "75969",
    "TX"
  ],
  "SAN AUGUSTINE": [
    "75972",
    "TX"
  ],
  "TENAHA": [
    "75974",
    "TX"
  ],
  "TIMPSON": [
    "75975",
    "TX"
  ],
  "WIERGATE": [
    "75977",
    "TX"
  ],
  "ZAVALLA": [
    "75980",
    "TX"
  ],
  "AZLE": [
    "76098",
    "TX"
  ],
  "BURLESON": [
    "76097",
    "TX"
  ],
  "CLEBURNE": [
    "76033",
    "TX"
  ],
  "COLLEYVILLE": [
    "76034",
    "TX"
  ],
  "EULESS": [
    "76040",
    "TX"
  ],
  "GLEN ROSE": [
    "76043",
    "TX"
  ],
  "GODLEY": [
    "76044",
    "TX"
  ],
  "GRANBURY": [
    "76049",
    "TX"
  ],
  "HASLET": [
    "76052",
    "TX"
  ],
  "JOSHUA": [
    "76058",
    "TX"
  ],
  "KENNEDALE": [
    "76060",
    "TX"
  ],
  "MAYPEARL": [
    "76064",
    "TX"
  ],
  "MILLSAP": [
    "76066",
    "TX"
  ],
  "RAINBOW": [
    "76077",
    "TX"
  ],
  "RHOME": [
    "76078",
    "TX"
  ],
  "SOUTHLAKE": [
    "76092",
    "TX"
  ],
  "RIO VISTA": [
    "94571",
    "CA"
  ],
  "FORT WORTH": [
    "76199",
    "TX"
  ],
  "HALTOM CITY": [
    "76117",
    "TX"
  ],
  "NAVAL AIR STATION/ JRB": [
    "76127",
    "TX"
  ],
  "NORTH RICHLAND HILLS": [
    "76182",
    "TX"
  ],
  "ERA": [
    "76238",
    "TX"
  ],
  "FORESTBURG": [
    "76239",
    "TX"
  ],
  "JUSTIN": [
    "76247",
    "TX"
  ],
  "KRUM": [
    "76249",
    "TX"
  ],
  "MUENSTER": [
    "76252",
    "TX"
  ],
  "NOCONA": [
    "76255",
    "TX"
  ],
  "PILOT POINT": [
    "99649",
    "AK"
  ],
  "PONDER": [
    "76259",
    "TX"
  ],
  "SADLER": [
    "76264",
    "TX"
  ],
  "SAINT JO": [
    "76265",
    "TX"
  ],
  "SANGER": [
    "93657",
    "CA"
  ],
  "SOUTHMAYD": [
    "76268",
    "TX"
  ],
  "WICHITA FALLS": [
    "76310",
    "TX"
  ],
  "SHEPPARD AFB": [
    "76311",
    "TX"
  ],
  "ARCHER CITY": [
    "76351",
    "TX"
  ],
  "BURKBURNETT": [
    "76354",
    "TX"
  ],
  "ELECTRA": [
    "76360",
    "TX"
  ],
  "GOREE": [
    "76363",
    "TX"
  ],
  "IOWA PARK": [
    "76367",
    "TX"
  ],
  "KAMAY": [
    "76369",
    "TX"
  ],
  "OKLAUNION": [
    "76373",
    "TX"
  ],
  "WEINERT": [
    "76388",
    "TX"
  ],
  "WINDTHORST": [
    "76389",
    "TX"
  ],
  "STEPHENVILLE": [
    "76402",
    "TX"
  ],
  "BRYSON": [
    "76427",
    "TX"
  ],
  "CHICO": [
    "95976",
    "CA"
  ],
  "BLANKET": [
    "76432",
    "TX"
  ],
  "BLUFF DALE": [
    "76433",
    "TX"
  ],
  "DE LEON": [
    "76444",
    "TX"
  ],
  "DESDEMONA": [
    "76445",
    "TX"
  ],
  "EASTLAND": [
    "76448",
    "TX"
  ],
  "GRAFORD": [
    "76449",
    "TX"
  ],
  "GORMAN": [
    "76454",
    "TX"
  ],
  "GUSTINE": [
    "95322",
    "CA"
  ],
  "LOVING": [
    "88256",
    "NM"
  ],
  "LINGLEVILLE": [
    "76461",
    "TX"
  ],
  "LIPAN": [
    "76462",
    "TX"
  ],
  "MINGUS": [
    "76463",
    "TX"
  ],
  "MORGAN MILL": [
    "76465",
    "TX"
  ],
  "OLDEN": [
    "76466",
    "TX"
  ],
  "RISING STAR": [
    "76471",
    "TX"
  ],
  "SANTO": [
    "76472",
    "TX"
  ],
  "TOLAR": [
    "76476",
    "TX"
  ],
  "THROCKMORTON": [
    "76483",
    "TX"
  ],
  "PALO PINTO": [
    "76484",
    "TX"
  ],
  "PEASTER": [
    "76485",
    "TX"
  ],
  "PERRIN": [
    "76486",
    "TX"
  ],
  "POOLVILLE": [
    "76487",
    "TX"
  ],
  "BUCKHOLTS": [
    "76518",
    "TX"
  ],
  "COPPERAS COVE": [
    "76522",
    "TX"
  ],
  "DAVILLA": [
    "76523",
    "TX"
  ],
  "EDDY": [
    "76524",
    "TX"
  ],
  "EVANT": [
    "76525",
    "TX"
  ],
  "FLAT": [
    "76526",
    "TX"
  ],
  "HEIDENHEIMER": [
    "76533",
    "TX"
  ],
  "JARRELL": [
    "76537",
    "TX"
  ],
  "KEMPNER": [
    "76539",
    "TX"
  ],
  "KILLEEN": [
    "76549",
    "TX"
  ],
  "FORT HOOD": [
    "76544",
    "TX"
  ],
  "HARKER HEIGHTS": [
    "76548",
    "TX"
  ],
  "LAMPASAS": [
    "76550",
    "TX"
  ],
  "LITTLE RIVER ACADEMY": [
    "76554",
    "TX"
  ],
  "MILANO": [
    "76556",
    "TX"
  ],
  "NOLANVILLE": [
    "76559",
    "TX"
  ],
  "PURMELA": [
    "76566",
    "TX"
  ],
  "ROCKDALE": [
    "76567",
    "TX"
  ],
  "SALADO": [
    "76571",
    "TX"
  ],
  "SCHWERTNER": [
    "76573",
    "TX"
  ],
  "THRALL": [
    "76578",
    "TX"
  ],
  "ABBOTT": [
    "76621",
    "TX"
  ],
  "AQUILLA": [
    "76622",
    "TX"
  ],
  "BLUM": [
    "76627",
    "TX"
  ],
  "BREMOND": [
    "76629",
    "TX"
  ],
  "CHINA SPRING": [
    "76633",
    "TX"
  ],
  "CRANFILLS GAP": [
    "76637",
    "TX"
  ],
  "ELM MOTT": [
    "76640",
    "TX"
  ],
  "GROESBECK": [
    "76642",
    "TX"
  ],
  "LAGUNA PARK": [
    "76644",
    "TX"
  ],
  "IREDELL": [
    "76649",
    "TX"
  ],
  "ITALY": [
    "76651",
    "TX"
  ],
  "KOPPERL": [
    "76652",
    "TX"
  ],
  "KOSSE": [
    "76653",
    "TX"
  ],
  "LORENA": [
    "76655",
    "TX"
  ],
  "LOTT": [
    "76656",
    "TX"
  ],
  "MARLIN": [
    "98832",
    "WA"
  ],
  "MART": [
    "76664",
    "TX"
  ],
  "MERTENS": [
    "76666",
    "TX"
  ],
  "MOUNT CALM": [
    "76673",
    "TX"
  ],
  "PENELOPE": [
    "76676",
    "TX"
  ],
  "PRAIRIE HILL": [
    "76678",
    "TX"
  ],
  "PURDON": [
    "76679",
    "TX"
  ],
  "RIESEL": [
    "76682",
    "TX"
  ],
  "SATIN": [
    "76685",
    "TX"
  ],
  "TEHUACANA": [
    "76686",
    "TX"
  ],
  "VALLEY MILLS": [
    "76689",
    "TX"
  ],
  "WALNUT SPRINGS": [
    "76690",
    "TX"
  ],
  "WORTHAM": [
    "76693",
    "TX"
  ],
  "WOODWAY": [
    "76712",
    "TX"
  ],
  "BROWNWOOD": [
    "76804",
    "TX"
  ],
  "BALLINGER": [
    "76821",
    "TX"
  ],
  "BANGS": [
    "76823",
    "TX"
  ],
  "BEND": [
    "97709",
    "OR"
  ],
  "BROOKESMITH": [
    "76827",
    "TX"
  ],
  "CASTELL": [
    "76831",
    "TX"
  ],
  "GOLDTHWAITE": [
    "76844",
    "TX"
  ],
  "GOULDBUSK": [
    "76845",
    "TX"
  ],
  "LOHN": [
    "76852",
    "TX"
  ],
  "LOMETA": [
    "76853",
    "TX"
  ],
  "LOWAKE": [
    "76855",
    "TX"
  ],
  "MILLERSVIEW": [
    "76862",
    "TX"
  ],
  "MULLIN": [
    "76864",
    "TX"
  ],
  "PRIDDY": [
    "76870",
    "TX"
  ],
  "RICHLAND SPRINGS": [
    "76871",
    "TX"
  ],
  "ROWENA": [
    "76875",
    "TX"
  ],
  "SAN SABA": [
    "76877",
    "TX"
  ],
  "SANTA ANNA": [
    "76878",
    "TX"
  ],
  "TALPA": [
    "76882",
    "TX"
  ],
  "VALERA": [
    "76884",
    "TX"
  ],
  "VALLEY SPRING": [
    "76885",
    "TX"
  ],
  "VERIBEST": [
    "76886",
    "TX"
  ],
  "VOCA": [
    "76887",
    "TX"
  ],
  "VOSS": [
    "76888",
    "TX"
  ],
  "ZEPHYR": [
    "76890",
    "TX"
  ],
  "SAN ANGELO": [
    "76909",
    "TX"
  ],
  "GOODFELLOW AFB": [
    "76908",
    "TX"
  ],
  "BRONTE": [
    "76933",
    "TX"
  ],
  "CARLSBAD": [
    "92018",
    "CA"
  ],
  "CHRISTOVAL": [
    "76935",
    "TX"
  ],
  "MERETA": [
    "76940",
    "TX"
  ],
  "MERTZON": [
    "76941",
    "TX"
  ],
  "ROBERT LEE": [
    "76945",
    "TX"
  ],
  "SILVER": [
    "76949",
    "TX"
  ],
  "STERLING CITY": [
    "76951",
    "TX"
  ],
  "VANCOURT": [
    "76955",
    "TX"
  ],
  "CONROE": [
    "77385",
    "TX"
  ],
  "ACE": [
    "77326",
    "TX"
  ],
  "COLDSPRING": [
    "77331",
    "TX"
  ],
  "DALLARDSVILLE": [
    "77332",
    "TX"
  ],
  "DOBBIN": [
    "77333",
    "TX"
  ],
  "HUFFMAN": [
    "77336",
    "TX"
  ],
  "HUFSMITH": [
    "77337",
    "TX"
  ],
  "HUMBLE": [
    "77396",
    "TX"
  ],
  "LEGGETT": [
    "95585",
    "CA"
  ],
  "NEW CANEY": [
    "77357",
    "TX"
  ],
  "POINTBLANK": [
    "77364",
    "TX"
  ],
  "ROMAYOR": [
    "77368",
    "TX"
  ],
  "SPLENDORA": [
    "77372",
    "TX"
  ],
  "SPRING": [
    "77393",
    "TX"
  ],
  "THICKET": [
    "77374",
    "TX"
  ],
  "TOMBALL": [
    "77377",
    "TX"
  ],
  "VOTAW": [
    "77376",
    "TX"
  ],
  "ALIEF": [
    "77411",
    "TX"
  ],
  "ALTAIR": [
    "77412",
    "TX"
  ],
  "CEDAR LANE": [
    "77415",
    "TX"
  ],
  "BEASLEY": [
    "77417",
    "TX"
  ],
  "BLESSING": [
    "77419",
    "TX"
  ],
  "BOLING": [
    "77420",
    "TX"
  ],
  "BRAZORIA": [
    "77422",
    "TX"
  ],
  "BROOKSHIRE": [
    "77423",
    "TX"
  ],
  "CHAPPELL HILL": [
    "77426",
    "TX"
  ],
  "DAMON": [
    "77430",
    "TX"
  ],
  "DANCIGER": [
    "77431",
    "TX"
  ],
  "DANEVANG": [
    "77432",
    "TX"
  ],
  "EAST BERNARD": [
    "77435",
    "TX"
  ],
  "EGYPT": [
    "77436",
    "TX"
  ],
  "EL CAMPO": [
    "77437",
    "TX"
  ],
  "ELMATON": [
    "77440",
    "TX"
  ],
  "FULSHEAR": [
    "77441",
    "TX"
  ],
  "HOCKLEY": [
    "77447",
    "TX"
  ],
  "HUNGERFORD": [
    "77448",
    "TX"
  ],
  "KATY": [
    "77494",
    "TX"
  ],
  "KENDLETON": [
    "77451",
    "TX"
  ],
  "LANE CITY": [
    "77453",
    "TX"
  ],
  "LISSIE": [
    "77454",
    "TX"
  ],
  "MATAGORDA": [
    "77457",
    "TX"
  ],
  "MIDFIELD": [
    "77458",
    "TX"
  ],
  "NADA": [
    "77460",
    "TX"
  ],
  "NEEDVILLE": [
    "77461",
    "TX"
  ],
  "OLD OCEAN": [
    "77463",
    "TX"
  ],
  "PALACIOS": [
    "77465",
    "TX"
  ],
  "PLEDGER": [
    "77468",
    "TX"
  ],
  "ROSENBERG": [
    "77471",
    "TX"
  ],
  "SAN FELIPE": [
    "77473",
    "TX"
  ],
  "SEALY": [
    "77474",
    "TX"
  ],
  "SIMONTON": [
    "77476",
    "TX"
  ],
  "SUGAR LAND": [
    "77498",
    "TX"
  ],
  "SWEENY": [
    "77480",
    "TX"
  ],
  "THOMPSONS": [
    "77481",
    "TX"
  ],
  "VAN VLECK": [
    "77482",
    "TX"
  ],
  "WALLER": [
    "77484",
    "TX"
  ],
  "WALLIS": [
    "77485",
    "TX"
  ],
  "ANAHUAC": [
    "77514",
    "TX"
  ],
  "ANGLETON": [
    "77516",
    "TX"
  ],
  "BACLIFF": [
    "77518",
    "TX"
  ],
  "BATSON": [
    "77519",
    "TX"
  ],
  "BAYTOWN": [
    "77523",
    "TX"
  ],
  "CHANNELVIEW": [
    "77530",
    "TX"
  ],
  "CLUTE": [
    "77531",
    "TX"
  ],
  "DAISETTA": [
    "77533",
    "TX"
  ],
  "DEVERS": [
    "77538",
    "TX"
  ],
  "FRIENDSWOOD": [
    "77549",
    "TX"
  ],
  "GALENA PARK": [
    "77547",
    "TX"
  ],
  "HANKAMER": [
    "77560",
    "TX"
  ],
  "KEMAH": [
    "77565",
    "TX"
  ],
  "LAKE JACKSON": [
    "77566",
    "TX"
  ],
  "LA MARQUE": [
    "77568",
    "TX"
  ],
  "LEAGUE CITY": [
    "77574",
    "TX"
  ],
  "MONT BELVIEU": [
    "77580",
    "TX"
  ],
  "PEARLAND": [
    "77588",
    "TX"
  ],
  "RAYWOOD": [
    "77582",
    "TX"
  ],
  "ROSHARON": [
    "77583",
    "TX"
  ],
  "SOUTH HOUSTON": [
    "77587",
    "TX"
  ],
  "TEXAS CITY": [
    "77592",
    "TX"
  ],
  "WALLISVILLE": [
    "77597",
    "TX"
  ],
  "BRIDGE CITY": [
    "77611",
    "TX"
  ],
  "BUNA": [
    "77612",
    "TX"
  ],
  "CHINA": [
    "77613",
    "TX"
  ],
  "DEWEYVILLE": [
    "84309",
    "UT"
  ],
  "EVADALE": [
    "77615",
    "TX"
  ],
  "FRED": [
    "77616",
    "TX"
  ],
  "GILCHRIST": [
    "97737",
    "OR"
  ],
  "GROVES": [
    "77619",
    "TX"
  ],
  "HAMSHIRE": [
    "77622",
    "TX"
  ],
  "HIGH ISLAND": [
    "77623",
    "TX"
  ],
  "HILLISTER": [
    "77624",
    "TX"
  ],
  "KOUNTZE": [
    "77625",
    "TX"
  ],
  "MAURICEVILLE": [
    "77626",
    "TX"
  ],
  "NEDERLAND": [
    "80466",
    "CO"
  ],
  "ORANGEFIELD": [
    "77639",
    "TX"
  ],
  "PORT ARTHUR": [
    "77643",
    "TX"
  ],
  "PORT BOLIVAR": [
    "77650",
    "TX"
  ],
  "PORT NECHES": [
    "77651",
    "TX"
  ],
  "SABINE PASS": [
    "77655",
    "TX"
  ],
  "SILSBEE": [
    "77656",
    "TX"
  ],
  "SOUR LAKE": [
    "77659",
    "TX"
  ],
  "SPURGER": [
    "77660",
    "TX"
  ],
  "STOWELL": [
    "77661",
    "TX"
  ],
  "VIDOR": [
    "77670",
    "TX"
  ],
  "VILLAGE MILLS": [
    "77663",
    "TX"
  ],
  "WINNIE": [
    "77665",
    "TX"
  ],
  "BEDIAS": [
    "77831",
    "TX"
  ],
  "BRENHAM": [
    "77834",
    "TX"
  ],
  "CHRIESMAN": [
    "77838",
    "TX"
  ],
  "DEANVILLE": [
    "77852",
    "TX"
  ],
  "DIME BOX": [
    "77853",
    "TX"
  ],
  "FLYNN": [
    "77855",
    "TX"
  ],
  "GAUSE": [
    "77857",
    "TX"
  ],
  "HEARNE": [
    "77859",
    "TX"
  ],
  "KURTEN": [
    "77862",
    "TX"
  ],
  "MARQUEZ": [
    "77865",
    "TX"
  ],
  "MILLICAN": [
    "77866",
    "TX"
  ],
  "NAVASOTA": [
    "77868",
    "TX"
  ],
  "NORMANGEE": [
    "77871",
    "TX"
  ],
  "NORTH ZULCH": [
    "77872",
    "TX"
  ],
  "ROANS PRAIRIE": [
    "77875",
    "TX"
  ],
  "SHIRO": [
    "77876",
    "TX"
  ],
  "SNOOK": [
    "77878",
    "TX"
  ],
  "WHEELOCK": [
    "77882",
    "TX"
  ],
  "AUSTWELL": [
    "77950",
    "TX"
  ],
  "CUERO": [
    "77954",
    "TX"
  ],
  "FANNIN": [
    "77960",
    "TX"
  ],
  "FRANCITAS": [
    "77961",
    "TX"
  ],
  "GANADO": [
    "86505",
    "AZ"
  ],
  "GOLIAD": [
    "77963",
    "TX"
  ],
  "HALLETTSVILLE": [
    "77964",
    "TX"
  ],
  "LA WARD": [
    "77970",
    "TX"
  ],
  "LOLITA": [
    "77971",
    "TX"
  ],
  "MEYERSVILLE": [
    "77974",
    "TX"
  ],
  "NURSERY": [
    "77976",
    "TX"
  ],
  "PLACEDO": [
    "77977",
    "TX"
  ],
  "POINT COMFORT": [
    "77978",
    "TX"
  ],
  "PORT LAVACA": [
    "77979",
    "TX"
  ],
  "PORT O CONNOR": [
    "77982",
    "TX"
  ],
  "SEADRIFT": [
    "77983",
    "TX"
  ],
  "SHINER": [
    "77984",
    "TX"
  ],
  "SUBLIME": [
    "77986",
    "TX"
  ],
  "TELFERNER": [
    "77988",
    "TX"
  ],
  "WEESATCHE": [
    "77993",
    "TX"
  ],
  "WESTHOFF": [
    "77994",
    "TX"
  ],
  "YOAKUM": [
    "77995",
    "TX"
  ],
  "ARTESIA WELLS": [
    "78001",
    "TX"
  ],
  "ATASCOSA": [
    "78002",
    "TX"
  ],
  "BANDERA": [
    "78003",
    "TX"
  ],
  "BERGHEIM": [
    "78004",
    "TX"
  ],
  "BIGFOOT": [
    "78005",
    "TX"
  ],
  "BOERNE": [
    "78015",
    "TX"
  ],
  "CALLIHAM": [
    "78007",
    "TX"
  ],
  "CASTROVILLE": [
    "95012",
    "CA"
  ],
  "COTULLA": [
    "78014",
    "TX"
  ],
  "DEVINE": [
    "78016",
    "TX"
  ],
  "DILLEY": [
    "78017",
    "TX"
  ],
  "ENCINAL": [
    "78019",
    "TX"
  ],
  "GEORGE WEST": [
    "78022",
    "TX"
  ],
  "HELOTES": [
    "78023",
    "TX"
  ],
  "JOURDANTON": [
    "78026",
    "TX"
  ],
  "KENDALIA": [
    "78027",
    "TX"
  ],
  "KERRVILLE": [
    "78029",
    "TX"
  ],
  "LA COSTE": [
    "78039",
    "TX"
  ],
  "LEMING": [
    "78050",
    "TX"
  ],
  "LYTLE": [
    "78052",
    "TX"
  ],
  "MACDONA": [
    "78054",
    "TX"
  ],
  "MICO": [
    "78056",
    "TX"
  ],
  "NATALIA": [
    "78059",
    "TX"
  ],
  "PEARSALL": [
    "78061",
    "TX"
  ],
  "PEGGY": [
    "78062",
    "TX"
  ],
  "PIPE CREEK": [
    "78063",
    "TX"
  ],
  "POTEET": [
    "78065",
    "TX"
  ],
  "RIO MEDINA": [
    "78066",
    "TX"
  ],
  "SAN YGNACIO": [
    "78067",
    "TX"
  ],
  "SPRING BRANCH": [
    "78070",
    "TX"
  ],
  "VON ORMY": [
    "78073",
    "TX"
  ],
  "WARING": [
    "78074",
    "TX"
  ],
  "ZAPATA": [
    "78076",
    "TX"
  ],
  "ADKINS": [
    "78101",
    "TX"
  ],
  "BEEVILLE": [
    "78104",
    "TX"
  ],
  "BERCLAIR": [
    "78107",
    "TX"
  ],
  "CIBOLO": [
    "78108",
    "TX"
  ],
  "ECLETO": [
    "78111",
    "TX"
  ],
  "ELMENDORF": [
    "78112",
    "TX"
  ],
  "FLORESVILLE": [
    "78114",
    "TX"
  ],
  "KARNES CITY": [
    "78118",
    "TX"
  ],
  "KENEDY": [
    "78119",
    "TX"
  ],
  "LA VERNIA": [
    "78121",
    "TX"
  ],
  "MC QUEENEY": [
    "78123",
    "TX"
  ],
  "NEW BRAUNFELS": [
    "78135",
    "TX"
  ],
  "CANYON LAKE": [
    "78133",
    "TX"
  ],
  "NIXON": [
    "89424",
    "NV"
  ],
  "NORDHEIM": [
    "78141",
    "TX"
  ],
  "NORMANNA": [
    "78142",
    "TX"
  ],
  "PANNA MARIA": [
    "78144",
    "TX"
  ],
  "PETTUS": [
    "78146",
    "TX"
  ],
  "POTH": [
    "78147",
    "TX"
  ],
  "UNIVERSAL CITY": [
    "91608",
    "CA"
  ],
  "RANDOLPH AFB": [
    "78150",
    "TX"
  ],
  "RUNGE": [
    "78151",
    "TX"
  ],
  "SAINT HEDWIG": [
    "78152",
    "TX"
  ],
  "SCHERTZ": [
    "78154",
    "TX"
  ],
  "SEGUIN": [
    "78156",
    "TX"
  ],
  "SMILEY": [
    "78159",
    "TX"
  ],
  "SUTHERLAND SPRINGS": [
    "78161",
    "TX"
  ],
  "TULETA": [
    "78162",
    "TX"
  ],
  "BULVERDE": [
    "78163",
    "TX"
  ],
  "LACKLAND AFB": [
    "78236",
    "TX"
  ],
  "AGUA DULCE": [
    "78330",
    "TX"
  ],
  "ALICE": [
    "78333",
    "TX"
  ],
  "ARANSAS PASS": [
    "78336",
    "TX"
  ],
  "BANQUETE": [
    "78339",
    "TX"
  ],
  "BENAVIDES": [
    "78341",
    "TX"
  ],
  "BEN BOLT": [
    "78342",
    "TX"
  ],
  "BRUNI": [
    "78344",
    "TX"
  ],
  "DINERO": [
    "78350",
    "TX"
  ],
  "EDROY": [
    "78352",
    "TX"
  ],
  "ENCINO": [
    "91436",
    "CA"
  ],
  "FALFURRIAS": [
    "78355",
    "TX"
  ],
  "FREER": [
    "78357",
    "TX"
  ],
  "HEBBRONVILLE": [
    "78361",
    "TX"
  ],
  "MATHIS": [
    "78368",
    "TX"
  ],
  "MIRANDO CITY": [
    "78369",
    "TX"
  ],
  "ODEM": [
    "78370",
    "TX"
  ],
  "ORANGE GROVE": [
    "78372",
    "TX"
  ],
  "PORT ARANSAS": [
    "78373",
    "TX"
  ],
  "PREMONT": [
    "78375",
    "TX"
  ],
  "REALITOS": [
    "78376",
    "TX"
  ],
  "REFUGIO": [
    "78377",
    "TX"
  ],
  "RIVIERA": [
    "78379",
    "TX"
  ],
  "ROBSTOWN": [
    "78380",
    "TX"
  ],
  "SANDIA": [
    "78383",
    "TX"
  ],
  "SAN DIEGO": [
    "92198",
    "CA"
  ],
  "SARITA": [
    "78385",
    "TX"
  ],
  "SINTON": [
    "78387",
    "TX"
  ],
  "TYNAN": [
    "78391",
    "TX"
  ],
  "CORPUS CHRISTI": [
    "78480",
    "TX"
  ],
  "MCALLEN": [
    "78505",
    "TX"
  ],
  "COMBES": [
    "78535",
    "TX"
  ],
  "DELMITA": [
    "78536",
    "TX"
  ],
  "DONNA": [
    "78537",
    "TX"
  ],
  "EDCOUCH": [
    "78538",
    "TX"
  ],
  "ELSA": [
    "78543",
    "TX"
  ],
  "GARCIASVILLE": [
    "78547",
    "TX"
  ],
  "GRULLA": [
    "78548",
    "TX"
  ],
  "HARGILL": [
    "78549",
    "TX"
  ],
  "HARLINGEN": [
    "78553",
    "TX"
  ],
  "LA BLANCA": [
    "78558",
    "TX"
  ],
  "LA FERIA": [
    "78559",
    "TX"
  ],
  "LA JOYA": [
    "87028",
    "NM"
  ],
  "LASARA": [
    "78561",
    "TX"
  ],
  "LA VILLA": [
    "78562",
    "TX"
  ],
  "LOS EBANOS": [
    "78565",
    "TX"
  ],
  "LOS FRESNOS": [
    "78566",
    "TX"
  ],
  "LOS INDIOS": [
    "78567",
    "TX"
  ],
  "LOZANO": [
    "78568",
    "TX"
  ],
  "LYFORD": [
    "78569",
    "TX"
  ],
  "MERCEDES": [
    "78570",
    "TX"
  ],
  "OLMITO": [
    "78575",
    "TX"
  ],
  "PENITAS": [
    "78576",
    "TX"
  ],
  "PHARR": [
    "78577",
    "TX"
  ],
  "PORT ISABEL": [
    "78578",
    "TX"
  ],
  "PROGRESO": [
    "78579",
    "TX"
  ],
  "RIO GRANDE CITY": [
    "78582",
    "TX"
  ],
  "RIO HONDO": [
    "78583",
    "TX"
  ],
  "ROMA": [
    "78584",
    "TX"
  ],
  "SAN BENITO": [
    "78586",
    "TX"
  ],
  "SAN ISIDRO": [
    "78588",
    "TX"
  ],
  "SAN JUAN": [
    "78589",
    "TX"
  ],
  "SAN PERLITA": [
    "78590",
    "TX"
  ],
  "SANTA ELENA": [
    "78591",
    "TX"
  ],
  "SANTA MARIA": [
    "93458",
    "CA"
  ],
  "SANTA ROSA": [
    "95409",
    "CA"
  ],
  "SULLIVAN CITY": [
    "78595",
    "TX"
  ],
  "WESLACO": [
    "78599",
    "TX"
  ],
  "SOUTH PADRE ISLAND": [
    "78597",
    "TX"
  ],
  "PORT MANSFIELD": [
    "78598",
    "TX"
  ],
  "BERTRAM": [
    "78605",
    "TX"
  ],
  "BRIGGS": [
    "78608",
    "TX"
  ],
  "BUCHANAN DAM": [
    "78609",
    "TX"
  ],
  "BURNET": [
    "78611",
    "TX"
  ],
  "CEDAR PARK": [
    "78630",
    "TX"
  ],
  "COST": [
    "78614",
    "TX"
  ],
  "COUPLAND": [
    "78615",
    "TX"
  ],
  "DEL VALLE": [
    "78617",
    "TX"
  ],
  "DOSS": [
    "78618",
    "TX"
  ],
  "DRIPPING SPRINGS": [
    "78620",
    "TX"
  ],
  "FENTRESS": [
    "78622",
    "TX"
  ],
  "FISCHER": [
    "78623",
    "TX"
  ],
  "HUTTO": [
    "78634",
    "TX"
  ],
  "HYE": [
    "78635",
    "TX"
  ],
  "LEANDER": [
    "78646",
    "TX"
  ],
  "LLANO": [
    "93544",
    "CA"
  ],
  "MC DADE": [
    "78650",
    "TX"
  ],
  "MANCHACA": [
    "78652",
    "TX"
  ],
  "HORSESHOE BAY": [
    "78657",
    "TX"
  ],
  "PAIGE": [
    "78659",
    "TX"
  ],
  "PFLUGERVILLE": [
    "78691",
    "TX"
  ],
  "PRAIRIE LEA": [
    "78661",
    "TX"
  ],
  "ROUND MOUNTAIN": [
    "96084",
    "CA"
  ],
  "ROUND ROCK": [
    "86547",
    "AZ"
  ],
  "SAN MARCOS": [
    "92096",
    "CA"
  ],
  "SPICEWOOD": [
    "78669",
    "TX"
  ],
  "TOW": [
    "78672",
    "TX"
  ],
  "WALBURG": [
    "78673",
    "TX"
  ],
  "WIMBERLEY": [
    "78676",
    "TX"
  ],
  "UVALDE": [
    "78802",
    "TX"
  ],
  "ASHERTON": [
    "78827",
    "TX"
  ],
  "BARKSDALE": [
    "78828",
    "TX"
  ],
  "BIG WELLS": [
    "78830",
    "TX"
  ],
  "BRACKETTVILLE": [
    "78832",
    "TX"
  ],
  "CAMP WOOD": [
    "78833",
    "TX"
  ],
  "CARRIZO SPRINGS": [
    "78834",
    "TX"
  ],
  "CATARINA": [
    "78836",
    "TX"
  ],
  "CONCAN": [
    "78838",
    "TX"
  ],
  "LAUGHLIN AFB": [
    "78843",
    "TX"
  ],
  "D HANIS": [
    "78850",
    "TX"
  ],
  "EAGLE PASS": [
    "78853",
    "TX"
  ],
  "EL INDIO": [
    "78860",
    "TX"
  ],
  "HONDO": [
    "88336",
    "NM"
  ],
  "KNIPPA": [
    "78870",
    "TX"
  ],
  "LANGTRY": [
    "78871",
    "TX"
  ],
  "LA PRYOR": [
    "78872",
    "TX"
  ],
  "LEAKEY": [
    "78873",
    "TX"
  ],
  "QUEMADO": [
    "87829",
    "NM"
  ],
  "RIO FRIO": [
    "78879",
    "TX"
  ],
  "ROCKSPRINGS": [
    "78880",
    "TX"
  ],
  "SABINAL": [
    "78881",
    "TX"
  ],
  "TARPLEY": [
    "78883",
    "TX"
  ],
  "UTOPIA": [
    "78884",
    "TX"
  ],
  "VANDERPOOL": [
    "78885",
    "TX"
  ],
  "YANCEY": [
    "78886",
    "TX"
  ],
  "BLEIBLERVILLE": [
    "78931",
    "TX"
  ],
  "CARMINE": [
    "78932",
    "TX"
  ],
  "CAT SPRING": [
    "78933",
    "TX"
  ],
  "ALLEYTON": [
    "78935",
    "TX"
  ],
  "ELLINGER": [
    "78938",
    "TX"
  ],
  "FLATONIA": [
    "78941",
    "TX"
  ],
  "GIDDINGS": [
    "78942",
    "TX"
  ],
  "MULDOON": [
    "78949",
    "TX"
  ],
  "PLUM": [
    "78952",
    "TX"
  ],
  "ROSANKY": [
    "78953",
    "TX"
  ],
  "SCHULENBURG": [
    "78956",
    "TX"
  ],
  "WAELDER": [
    "78959",
    "TX"
  ],
  "WARDA": [
    "78960",
    "TX"
  ],
  "WEIMAR": [
    "95736",
    "CA"
  ],
  "ALANREED": [
    "79002",
    "TX"
  ],
  "BOOKER": [
    "79005",
    "TX"
  ],
  "BORGER": [
    "79008",
    "TX"
  ],
  "BOVINA": [
    "79009",
    "TX"
  ],
  "BOYS RANCH": [
    "79010",
    "TX"
  ],
  "BRISCOE": [
    "79011",
    "TX"
  ],
  "BUSHLAND": [
    "79012",
    "TX"
  ],
  "CACTUS": [
    "79013",
    "TX"
  ],
  "CLAUDE": [
    "79019",
    "TX"
  ],
  "COTTON CENTER": [
    "79021",
    "TX"
  ],
  "DALHART": [
    "79022",
    "TX"
  ],
  "DARROUZETT": [
    "79024",
    "TX"
  ],
  "DIMMITT": [
    "79027",
    "TX"
  ],
  "EARTH": [
    "79031",
    "TX"
  ],
  "EDMONSON": [
    "79032",
    "TX"
  ],
  "FARNSWORTH": [
    "79033",
    "TX"
  ],
  "FOLLETT": [
    "79034",
    "TX"
  ],
  "FRIONA": [
    "79035",
    "TX"
  ],
  "FRITCH": [
    "79036",
    "TX"
  ],
  "GROOM": [
    "79039",
    "TX"
  ],
  "GRUVER": [
    "79040",
    "TX"
  ],
  "HALE CENTER": [
    "79041",
    "TX"
  ],
  "HIGGINS": [
    "79046",
    "TX"
  ],
  "KRESS": [
    "79052",
    "TX"
  ],
  "LAZBUDDIE": [
    "79053",
    "TX"
  ],
  "LEFORS": [
    "79054",
    "TX"
  ],
  "MASTERSON": [
    "79058",
    "TX"
  ],
  "MOBEETIE": [
    "79061",
    "TX"
  ],
  "OLTON": [
    "79064",
    "TX"
  ],
  "PAMPA": [
    "79066",
    "TX"
  ],
  "PANHANDLE": [
    "79068",
    "TX"
  ],
  "PERRYTON": [
    "79070",
    "TX"
  ],
  "SKELLYTOWN": [
    "79080",
    "TX"
  ],
  "SPEARMAN": [
    "79081",
    "TX"
  ],
  "SPRINGLAKE": [
    "79082",
    "TX"
  ],
  "SUNRAY": [
    "79086",
    "TX"
  ],
  "TEXLINE": [
    "79087",
    "TX"
  ],
  "TULIA": [
    "79088",
    "TX"
  ],
  "UMBARGER": [
    "79091",
    "TX"
  ],
  "VEGA": [
    "79092",
    "TX"
  ],
  "WAKA": [
    "79093",
    "TX"
  ],
  "WILDORADO": [
    "79098",
    "TX"
  ],
  "AMARILLO": [
    "79178",
    "TX"
  ],
  "CHILDRESS": [
    "79201",
    "TX"
  ],
  "CROWELL": [
    "79227",
    "TX"
  ],
  "FLOMOT": [
    "79234",
    "TX"
  ],
  "FLOYDADA": [
    "79235",
    "TX"
  ],
  "HEDLEY": [
    "79237",
    "TX"
  ],
  "LELIA LAKE": [
    "79240",
    "TX"
  ],
  "LOCKNEY": [
    "79241",
    "TX"
  ],
  "MATADOR": [
    "79244",
    "TX"
  ],
  "QUAIL": [
    "79251",
    "TX"
  ],
  "QUANAH": [
    "79252",
    "TX"
  ],
  "QUITAQUE": [
    "79255",
    "TX"
  ],
  "ROARING SPRINGS": [
    "79256",
    "TX"
  ],
  "SILVERTON": [
    "97381",
    "OR"
  ],
  "ABERNATHY": [
    "79311",
    "TX"
  ],
  "ANTON": [
    "80801",
    "CO"
  ],
  "CROSBYTON": [
    "79322",
    "TX"
  ],
  "DENVER CITY": [
    "79323",
    "TX"
  ],
  "FIELDTON": [
    "79326",
    "TX"
  ],
  "IDALOU": [
    "79329",
    "TX"
  ],
  "JUSTICEBURG": [
    "79330",
    "TX"
  ],
  "LAMESA": [
    "79331",
    "TX"
  ],
  "LEVELLAND": [
    "79338",
    "TX"
  ],
  "LITTLEFIELD": [
    "86432",
    "AZ"
  ],
  "LOOP": [
    "79342",
    "TX"
  ],
  "LORENZO": [
    "79343",
    "TX"
  ],
  "MULESHOE": [
    "79347",
    "TX"
  ],
  "NEW DEAL": [
    "79350",
    "TX"
  ],
  "ODONNELL": [
    "79351",
    "TX"
  ],
  "PEP": [
    "79353",
    "TX"
  ],
  "POST": [
    "97752",
    "OR"
  ],
  "RALLS": [
    "79357",
    "TX"
  ],
  "ROPESVILLE": [
    "79358",
    "TX"
  ],
  "SEAGRAVES": [
    "79359",
    "TX"
  ],
  "SHALLOWATER": [
    "79363",
    "TX"
  ],
  "SLATON": [
    "79364",
    "TX"
  ],
  "RANSOM CANYON": [
    "79366",
    "TX"
  ],
  "SMYER": [
    "79367",
    "TX"
  ],
  "SPADE": [
    "79369",
    "TX"
  ],
  "SPUR": [
    "79370",
    "TX"
  ],
  "SUDAN": [
    "79371",
    "TX"
  ],
  "SUNDOWN": [
    "79372",
    "TX"
  ],
  "TAHOKA": [
    "79373",
    "TX"
  ],
  "WHITEFACE": [
    "79379",
    "TX"
  ],
  "WHITHARRAL": [
    "79380",
    "TX"
  ],
  "WOLFFORTH": [
    "79382",
    "TX"
  ],
  "NEW HOME": [
    "79383",
    "TX"
  ],
  "LUBBOCK": [
    "79499",
    "TX"
  ],
  "ASPERMONT": [
    "79502",
    "TX"
  ],
  "BAIRD": [
    "79504",
    "TX"
  ],
  "BENJAMIN": [
    "79505",
    "TX"
  ],
  "COLORADO CITY": [
    "86021",
    "AZ"
  ],
  "FLUVANNA": [
    "79517",
    "TX"
  ],
  "HERMLEIGH": [
    "79526",
    "TX"
  ],
  "IRA": [
    "79527",
    "TX"
  ],
  "JAYTON": [
    "79528",
    "TX"
  ],
  "LUEDERS": [
    "79533",
    "TX"
  ],
  "MC CAULLEY": [
    "79534",
    "TX"
  ],
  "MARYNEAL": [
    "79535",
    "TX"
  ],
  "MERKEL": [
    "79536",
    "TX"
  ],
  "NOVICE": [
    "79538",
    "TX"
  ],
  "OLD GLORY": [
    "79540",
    "TX"
  ],
  "OVALO": [
    "79541",
    "TX"
  ],
  "ROTAN": [
    "79546",
    "TX"
  ],
  "RULE": [
    "79548",
    "TX"
  ],
  "TYE": [
    "79563",
    "TX"
  ],
  "WINTERS": [
    "95694",
    "CA"
  ],
  "DYESS AFB": [
    "79607",
    "TX"
  ],
  "ACKERLY": [
    "79713",
    "TX"
  ],
  "BALMORHEA": [
    "79718",
    "TX"
  ],
  "BIG SPRING": [
    "79721",
    "TX"
  ],
  "COYANOSA": [
    "79730",
    "TX"
  ],
  "FORSAN": [
    "79733",
    "TX"
  ],
  "FORT DAVIS": [
    "79734",
    "TX"
  ],
  "FORT STOCKTON": [
    "79735",
    "TX"
  ],
  "GAIL": [
    "79738",
    "TX"
  ],
  "GRANDFALLS": [
    "79742",
    "TX"
  ],
  "IRAAN": [
    "79744",
    "TX"
  ],
  "KNOTT": [
    "79748",
    "TX"
  ],
  "LENORAH": [
    "79749",
    "TX"
  ],
  "MC CAMEY": [
    "79752",
    "TX"
  ],
  "MONAHANS": [
    "79756",
    "TX"
  ],
  "NOTREES": [
    "79759",
    "TX"
  ],
  "ORLA": [
    "79770",
    "TX"
  ],
  "PECOS": [
    "87552",
    "NM"
  ],
  "PENWELL": [
    "79776",
    "TX"
  ],
  "PYOTE": [
    "79777",
    "TX"
  ],
  "SARAGOSA": [
    "79780",
    "TX"
  ],
  "TARZAN": [
    "79783",
    "TX"
  ],
  "TOYAH": [
    "79785",
    "TX"
  ],
  "TOYAHVALE": [
    "79786",
    "TX"
  ],
  "WICKETT": [
    "79788",
    "TX"
  ],
  "WINK": [
    "79789",
    "TX"
  ],
  "BIG BEND NATIONAL PARK": [
    "79834",
    "TX"
  ],
  "CANUTILLO": [
    "79835",
    "TX"
  ],
  "CLINT": [
    "79836",
    "TX"
  ],
  "DELL CITY": [
    "79837",
    "TX"
  ],
  "FABENS": [
    "79838",
    "TX"
  ],
  "FORT HANCOCK": [
    "79839",
    "TX"
  ],
  "MARFA": [
    "79843",
    "TX"
  ],
  "PRESIDIO": [
    "79845",
    "TX"
  ],
  "SALT FLAT": [
    "79847",
    "TX"
  ],
  "SAN ELIZARIO": [
    "79849",
    "TX"
  ],
  "SIERRA BLANCA": [
    "79851",
    "TX"
  ],
  "TERLINGUA": [
    "79852",
    "TX"
  ],
  "TORNILLO": [
    "79853",
    "TX"
  ],
  "VAN HORN": [
    "79855",
    "TX"
  ],
  "FORT BLISS": [
    "79918",
    "TX"
  ],
  "ARVADA": [
    "82831",
    "WY"
  ],
  "BROOMFIELD": [
    "80038",
    "CO"
  ],
  "COMMERCE CITY": [
    "80037",
    "CO"
  ],
  "ELDORADO SPRINGS": [
    "80025",
    "CO"
  ],
  "WHEAT RIDGE": [
    "80034",
    "CO"
  ],
  "AGATE": [
    "80101",
    "CO"
  ],
  "DEER TRAIL": [
    "80105",
    "CO"
  ],
  "ELBERT": [
    "80106",
    "CO"
  ],
  "LARKSPUR": [
    "94977",
    "CA"
  ],
  "LOUVIERS": [
    "80131",
    "CO"
  ],
  "PALMER LAKE": [
    "80133",
    "CO"
  ],
  "BOND": [
    "80423",
    "CO"
  ],
  "BUFFALO CREEK": [
    "80425",
    "CO"
  ],
  "CONIFER": [
    "80433",
    "CO"
  ],
  "COWDREY": [
    "80434",
    "CO"
  ],
  "GRAND LAKE": [
    "80447",
    "CO"
  ],
  "HARTSEL": [
    "80449",
    "CO"
  ],
  "HOT SULPHUR SPRINGS": [
    "80451",
    "CO"
  ],
  "IDAHO SPRINGS": [
    "80452",
    "CO"
  ],
  "IDLEDALE": [
    "80453",
    "CO"
  ],
  "INDIAN HILLS": [
    "80454",
    "CO"
  ],
  "KITTREDGE": [
    "80457",
    "CO"
  ],
  "KREMMLING": [
    "80459",
    "CO"
  ],
  "LEADVILLE": [
    "80461",
    "CO"
  ],
  "PINE": [
    "85544",
    "AZ"
  ],
  "PINECLIFFE": [
    "80471",
    "CO"
  ],
  "ROLLINSVILLE": [
    "80474",
    "CO"
  ],
  "SILVER PLUME": [
    "80476",
    "CO"
  ],
  "STEAMBOAT SPRINGS": [
    "80488",
    "CO"
  ],
  "TABERNASH": [
    "80478",
    "CO"
  ],
  "TOPONAS": [
    "80479",
    "CO"
  ],
  "YAMPA": [
    "80483",
    "CO"
  ],
  "SILVERTHORNE": [
    "80498",
    "CO"
  ],
  "LONGMONT": [
    "80504",
    "CO"
  ],
  "ALLENSPARK": [
    "80510",
    "CO"
  ],
  "ESTES PARK": [
    "80517",
    "CO"
  ],
  "BELLVUE": [
    "80512",
    "CO"
  ],
  "BERTHOUD": [
    "80513",
    "CO"
  ],
  "DACONO": [
    "80514",
    "CO"
  ],
  "FIRESTONE": [
    "80520",
    "CO"
  ],
  "FORT COLLINS": [
    "80553",
    "CO"
  ],
  "HYGIENE": [
    "80533",
    "CO"
  ],
  "MILLIKEN": [
    "80543",
    "CO"
  ],
  "NIWOT": [
    "80544",
    "CO"
  ],
  "RED FEATHER LAKES": [
    "80545",
    "CO"
  ],
  "TIMNATH": [
    "80547",
    "CO"
  ],
  "AULT": [
    "80610",
    "CO"
  ],
  "BRIGGSDALE": [
    "80611",
    "CO"
  ],
  "CARR": [
    "80612",
    "CO"
  ],
  "FORT LUPTON": [
    "80621",
    "CO"
  ],
  "GILCREST": [
    "80623",
    "CO"
  ],
  "KEENESBURG": [
    "80643",
    "CO"
  ],
  "NUNN": [
    "80648",
    "CO"
  ],
  "ROGGEN": [
    "80652",
    "CO"
  ],
  "WELDONA": [
    "80653",
    "CO"
  ],
  "FORT MORGAN": [
    "80701",
    "CO"
  ],
  "LOG LANE VILLAGE": [
    "80705",
    "CO"
  ],
  "BRUSH": [
    "80723",
    "CO"
  ],
  "CROOK": [
    "80726",
    "CO"
  ],
  "ECKLEY": [
    "80727",
    "CO"
  ],
  "HAXTUN": [
    "80731",
    "CO"
  ],
  "HILLROSE": [
    "80733",
    "CO"
  ],
  "IDALIA": [
    "80735",
    "CO"
  ],
  "ILIFF": [
    "80736",
    "CO"
  ],
  "JULESBURG": [
    "80737",
    "CO"
  ],
  "LINDON": [
    "84042",
    "UT"
  ],
  "MERINO": [
    "80741",
    "CO"
  ],
  "NEW RAYMER": [
    "80742",
    "CO"
  ],
  "PADRONI": [
    "80745",
    "CO"
  ],
  "PEETZ": [
    "80747",
    "CO"
  ],
  "WOODROW": [
    "80757",
    "CO"
  ],
  "ARRIBA": [
    "80804",
    "CO"
  ],
  "CALHAN": [
    "80808",
    "CO"
  ],
  "CHEYENNE WELLS": [
    "80810",
    "CO"
  ],
  "CRIPPLE CREEK": [
    "80813",
    "CO"
  ],
  "FLAGLER": [
    "80815",
    "CO"
  ],
  "GREEN MOUNTAIN FALLS": [
    "80819",
    "CO"
  ],
  "GUFFEY": [
    "80820",
    "CO"
  ],
  "JOES": [
    "80822",
    "CO"
  ],
  "KIRK": [
    "80824",
    "CO"
  ],
  "KIT CARSON": [
    "80825",
    "CO"
  ],
  "LIMON": [
    "80828",
    "CO"
  ],
  "MANITOU SPRINGS": [
    "80829",
    "CO"
  ],
  "MATHESON": [
    "80830",
    "CO"
  ],
  "PEYTON": [
    "80831",
    "CO"
  ],
  "RAMAH": [
    "87321",
    "NM"
  ],
  "SEIBERT": [
    "80834",
    "CO"
  ],
  "SIMLA": [
    "80835",
    "CO"
  ],
  "USAF ACADEMY": [
    "80841",
    "CO"
  ],
  "VONA": [
    "80861",
    "CO"
  ],
  "WOODLAND PARK": [
    "80866",
    "CO"
  ],
  "COLORADO SPRINGS": [
    "80970",
    "CO"
  ],
  "PUEBLO": [
    "81011",
    "CO"
  ],
  "AGUILAR": [
    "81020",
    "CO"
  ],
  "BONCARBO": [
    "81024",
    "CO"
  ],
  "CAMPO": [
    "91906",
    "CA"
  ],
  "HASWELL": [
    "81045",
    "CO"
  ],
  "HOEHNE": [
    "81046",
    "CO"
  ],
  "KIM": [
    "81049",
    "CO"
  ],
  "LA JUNTA": [
    "81050",
    "CO"
  ],
  "LAS ANIMAS": [
    "81054",
    "CO"
  ],
  "LA VETA": [
    "81055",
    "CO"
  ],
  "MC CLAVE": [
    "81057",
    "CO"
  ],
  "MANZANOLA": [
    "81058",
    "CO"
  ],
  "MODEL": [
    "81059",
    "CO"
  ],
  "OLNEY SPRINGS": [
    "81062",
    "CO"
  ],
  "ORDWAY": [
    "81063",
    "CO"
  ],
  "PRITCHETT": [
    "81064",
    "CO"
  ],
  "SHERIDAN LAKE": [
    "81071",
    "CO"
  ],
  "SUGAR CITY": [
    "83448",
    "ID"
  ],
  "SWINK": [
    "81077",
    "CO"
  ],
  "TWO BUTTES": [
    "81084",
    "CO"
  ],
  "WALSENBURG": [
    "81089",
    "CO"
  ],
  "ALAMOSA": [
    "81102",
    "CO"
  ],
  "ANTONITO": [
    "81120",
    "CO"
  ],
  "ARBOLES": [
    "81121",
    "CO"
  ],
  "BLANCA": [
    "81123",
    "CO"
  ],
  "CAPULIN": [
    "88414",
    "NM"
  ],
  "CHROMO": [
    "81128",
    "CO"
  ],
  "CONEJOS": [
    "81129",
    "CO"
  ],
  "CREEDE": [
    "81130",
    "CO"
  ],
  "CRESTONE": [
    "81131",
    "CO"
  ],
  "DEL NORTE": [
    "81132",
    "CO"
  ],
  "FORT GARLAND": [
    "81133",
    "CO"
  ],
  "IGNACIO": [
    "81137",
    "CO"
  ],
  "JAROSO": [
    "81138",
    "CO"
  ],
  "LA JARA": [
    "87027",
    "NM"
  ],
  "MANASSA": [
    "81141",
    "CO"
  ],
  "MOFFAT": [
    "81143",
    "CO"
  ],
  "MONTE VISTA": [
    "81144",
    "CO"
  ],
  "MOSCA": [
    "81146",
    "CO"
  ],
  "PAGOSA SPRINGS": [
    "81157",
    "CO"
  ],
  "SAGUACHE": [
    "81149",
    "CO"
  ],
  "SAN LUIS": [
    "85349",
    "AZ"
  ],
  "SALIDA": [
    "95368",
    "CA"
  ],
  "CANON CITY": [
    "81215",
    "CO"
  ],
  "COTOPAXI": [
    "81223",
    "CO"
  ],
  "CRESTED BUTTE": [
    "81225",
    "CO"
  ],
  "NATHROP": [
    "81236",
    "CO"
  ],
  "PONCHA SPRINGS": [
    "81242",
    "CO"
  ],
  "POWDERHORN": [
    "81243",
    "CO"
  ],
  "SARGENTS": [
    "81248",
    "CO"
  ],
  "WESTCLIFFE": [
    "81252",
    "CO"
  ],
  "CAHONE": [
    "81320",
    "CO"
  ],
  "DOLORES": [
    "81323",
    "CO"
  ],
  "DOVE CREEK": [
    "81324",
    "CO"
  ],
  "EGNAR": [
    "81325",
    "CO"
  ],
  "HESPERUS": [
    "81326",
    "CO"
  ],
  "MANCOS": [
    "81328",
    "CO"
  ],
  "MARVEL": [
    "81329",
    "CO"
  ],
  "MESA VERDE NATIONAL PARK": [
    "81330",
    "CO"
  ],
  "RICO": [
    "81332",
    "CO"
  ],
  "TOWAOC": [
    "81334",
    "CO"
  ],
  "YELLOW JACKET": [
    "81335",
    "CO"
  ],
  "BEDROCK": [
    "81411",
    "CO"
  ],
  "CEDAREDGE": [
    "81413",
    "CO"
  ],
  "ECKERT": [
    "81418",
    "CO"
  ],
  "HOTCHKISS": [
    "81419",
    "CO"
  ],
  "LAZEAR": [
    "81420",
    "CO"
  ],
  "NATURITA": [
    "81422",
    "CO"
  ],
  "NUCLA": [
    "81424",
    "CO"
  ],
  "OPHIR": [
    "97464",
    "OR"
  ],
  "OURAY": [
    "81427",
    "CO"
  ],
  "PAONIA": [
    "81428",
    "CO"
  ],
  "PLACERVILLE": [
    "95667",
    "CA"
  ],
  "REDVALE": [
    "81431",
    "CO"
  ],
  "TELLURIDE": [
    "81435",
    "CO"
  ],
  "FRUITA": [
    "81521",
    "CO"
  ],
  "GLADE PARK": [
    "81523",
    "CO"
  ],
  "MACK": [
    "81525",
    "CO"
  ],
  "GLENWOOD SPRINGS": [
    "81602",
    "CO"
  ],
  "DINOSAUR": [
    "81610",
    "CO"
  ],
  "ASPEN": [
    "81612",
    "CO"
  ],
  "SNOWMASS VILLAGE": [
    "81615",
    "CO"
  ],
  "BASALT": [
    "81621",
    "CO"
  ],
  "COLLBRAN": [
    "81624",
    "CO"
  ],
  "DE BEQUE": [
    "81630",
    "CO"
  ],
  "PARACHUTE": [
    "81635",
    "CO"
  ],
  "BATTLEMENT MESA": [
    "81636",
    "CO"
  ],
  "MAYBELL": [
    "81640",
    "CO"
  ],
  "MESA": [
    "99343",
    "WA"
  ],
  "MOLINA": [
    "81646",
    "CO"
  ],
  "RANGELY": [
    "81648",
    "CO"
  ],
  "RED CLIFF": [
    "81649",
    "CO"
  ],
  "RIFLE": [
    "81650",
    "CO"
  ],
  "SILT": [
    "81652",
    "CO"
  ],
  "SNOWMASS": [
    "81654",
    "CO"
  ],
  "WOODY CREEK": [
    "81656",
    "CO"
  ],
  "FE WARREN AFB": [
    "82005",
    "WY"
  ],
  "ALBIN": [
    "82050",
    "WY"
  ],
  "CENTENNIAL": [
    "82055",
    "WY"
  ],
  "GRANITE CANON": [
    "82059",
    "WY"
  ],
  "HORSE CREEK": [
    "82061",
    "WY"
  ],
  "JELM": [
    "82063",
    "WY"
  ],
  "LARAMIE": [
    "82073",
    "WY"
  ],
  "PINE BLUFFS": [
    "82082",
    "WY"
  ],
  "ROCK RIVER": [
    "82083",
    "WY"
  ],
  "TIE SIDING": [
    "82084",
    "WY"
  ],
  "YELLOWSTONE NATIONAL PARK": [
    "82190",
    "WY"
  ],
  "CHUGWATER": [
    "82210",
    "WY"
  ],
  "FORT LARAMIE": [
    "82212",
    "WY"
  ],
  "GLENDO": [
    "82213",
    "WY"
  ],
  "HAWK SPRINGS": [
    "82217",
    "WY"
  ],
  "LANCE CREEK": [
    "82222",
    "WY"
  ],
  "LINGLE": [
    "82223",
    "WY"
  ],
  "LUSK": [
    "82225",
    "WY"
  ],
  "VETERAN": [
    "82243",
    "WY"
  ],
  "RAWLINS": [
    "82301",
    "WY"
  ],
  "BAGGS": [
    "82321",
    "WY"
  ],
  "BAIROIL": [
    "82322",
    "WY"
  ],
  "ELK MOUNTAIN": [
    "82324",
    "WY"
  ],
  "ENCAMPMENT": [
    "82325",
    "WY"
  ],
  "MEDICINE BOW": [
    "82329",
    "WY"
  ],
  "SAVERY": [
    "82332",
    "WY"
  ],
  "WAMSUTTER": [
    "82336",
    "WY"
  ],
  "WORLAND": [
    "82401",
    "WY"
  ],
  "COWLEY": [
    "82420",
    "WY"
  ],
  "DEAVER": [
    "82421",
    "WY"
  ],
  "FRANNIE": [
    "82423",
    "WY"
  ],
  "GREYBULL": [
    "82426",
    "WY"
  ],
  "HYATTVILLE": [
    "82428",
    "WY"
  ],
  "MEETEETSE": [
    "82433",
    "WY"
  ],
  "SHELL": [
    "82441",
    "WY"
  ],
  "TEN SLEEP": [
    "82442",
    "WY"
  ],
  "THERMOPOLIS": [
    "82443",
    "WY"
  ],
  "WAPITI": [
    "82450",
    "WY"
  ],
  "CROWHEART": [
    "82512",
    "WY"
  ],
  "FORT WASHAKIE": [
    "82514",
    "WY"
  ],
  "KINNEAR": [
    "82516",
    "WY"
  ],
  "LANDER": [
    "82520",
    "WY"
  ],
  "PAVILLION": [
    "82523",
    "WY"
  ],
  "CASPER": [
    "82609",
    "WY"
  ],
  "SHIRLEY BASIN": [
    "82615",
    "WY"
  ],
  "ALCOVA": [
    "82620",
    "WY"
  ],
  "ARMINTO": [
    "82630",
    "WY"
  ],
  "GLENROCK": [
    "82637",
    "WY"
  ],
  "HILAND": [
    "82638",
    "WY"
  ],
  "KAYCEE": [
    "82639",
    "WY"
  ],
  "LINCH": [
    "82640",
    "WY"
  ],
  "LYSITE": [
    "82642",
    "WY"
  ],
  "MIDWEST": [
    "82643",
    "WY"
  ],
  "POWDER RIVER": [
    "82648",
    "WY"
  ],
  "SHOSHONI": [
    "82649",
    "WY"
  ],
  "ALADDIN": [
    "82710",
    "WY"
  ],
  "DEVILS TOWER": [
    "82714",
    "WY"
  ],
  "HULETT": [
    "82720",
    "WY"
  ],
  "MOORCROFT": [
    "82721",
    "WY"
  ],
  "RECLUSE": [
    "82725",
    "WY"
  ],
  "ROZET": [
    "82727",
    "WY"
  ],
  "SUNDANCE": [
    "82729",
    "WY"
  ],
  "BIG HORN": [
    "82833",
    "WY"
  ],
  "RANCHESTER": [
    "82839",
    "WY"
  ],
  "SADDLESTRING": [
    "82840",
    "WY"
  ],
  "WOLF": [
    "82844",
    "WY"
  ],
  "WYARNO": [
    "82845",
    "WY"
  ],
  "LITTLE AMERICA": [
    "82929",
    "WY"
  ],
  "FARSON": [
    "82932",
    "WY"
  ],
  "FORT BRIDGER": [
    "82933",
    "WY"
  ],
  "GREEN RIVER": [
    "84525",
    "UT"
  ],
  "LONETREE": [
    "82936",
    "WY"
  ],
  "MC KINNON": [
    "82938",
    "WY"
  ],
  "PINEDALE": [
    "85934",
    "AZ"
  ],
  "ROBERTSON": [
    "82944",
    "WY"
  ],
  "MOOSE": [
    "83012",
    "WY"
  ],
  "TETON VILLAGE": [
    "83025",
    "WY"
  ],
  "KEMMERER": [
    "83101",
    "WY"
  ],
  "BIG PINEY": [
    "83113",
    "WY"
  ],
  "COKEVILLE": [
    "83114",
    "WY"
  ],
  "DANIEL": [
    "83115",
    "WY"
  ],
  "DIAMONDVILLE": [
    "83116",
    "WY"
  ],
  "LA BARGE": [
    "83123",
    "WY"
  ],
  "OPAL": [
    "83124",
    "WY"
  ],
  "THAYNE": [
    "83127",
    "WY"
  ],
  "POCATELLO": [
    "83209",
    "ID"
  ],
  "FORT HALL": [
    "83203",
    "ID"
  ],
  "AMERICAN FALLS": [
    "83211",
    "ID"
  ],
  "ARBON": [
    "83212",
    "ID"
  ],
  "ARIMO": [
    "83214",
    "ID"
  ],
  "BLACKFOOT": [
    "83221",
    "ID"
  ],
  "CHALLIS": [
    "83226",
    "ID"
  ],
  "DINGLE": [
    "83233",
    "ID"
  ],
  "DOWNEY": [
    "90242",
    "CA"
  ],
  "GRACE": [
    "83241",
    "ID"
  ],
  "INKOM": [
    "83245",
    "ID"
  ],
  "LAVA HOT SPRINGS": [
    "83246",
    "ID"
  ],
  "MCCAMMON": [
    "83250",
    "ID"
  ],
  "MACKAY": [
    "83251",
    "ID"
  ],
  "MALAD CITY": [
    "83252",
    "ID"
  ],
  "SHELLEY": [
    "83274",
    "ID"
  ],
  "SODA SPRINGS": [
    "95728",
    "CA"
  ],
  "THATCHER": [
    "85552",
    "AZ"
  ],
  "FISH HAVEN": [
    "83287",
    "ID"
  ],
  "TWIN FALLS": [
    "83303",
    "ID"
  ],
  "ROGERSON": [
    "83302",
    "ID"
  ],
  "BURLEY": [
    "98322",
    "WA"
  ],
  "CASTLEFORD": [
    "83321",
    "ID"
  ],
  "CORRAL": [
    "83322",
    "ID"
  ],
  "DECLO": [
    "83323",
    "ID"
  ],
  "DIETRICH": [
    "83324",
    "ID"
  ],
  "FILER": [
    "83328",
    "ID"
  ],
  "GOODING": [
    "83330",
    "ID"
  ],
  "HAGERMAN": [
    "88232",
    "NM"
  ],
  "HAILEY": [
    "83333",
    "ID"
  ],
  "HANSEN": [
    "83334",
    "ID"
  ],
  "HEYBURN": [
    "83336",
    "ID"
  ],
  "MINIDOKA": [
    "83343",
    "ID"
  ],
  "MURTAUGH": [
    "83344",
    "ID"
  ],
  "PAUL": [
    "83347",
    "ID"
  ],
  "PICABO": [
    "83348",
    "ID"
  ],
  "SHOSHONE": [
    "92384",
    "CA"
  ],
  "SUN VALLEY": [
    "91353",
    "CA"
  ],
  "IDAHO FALLS": [
    "83415",
    "ID"
  ],
  "DRIGGS": [
    "83422",
    "ID"
  ],
  "MACKS INN": [
    "83433",
    "ID"
  ],
  "MENAN": [
    "83434",
    "ID"
  ],
  "MONTEVIEW": [
    "83435",
    "ID"
  ],
  "NEWDALE": [
    "83436",
    "ID"
  ],
  "REXBURG": [
    "83460",
    "ID"
  ],
  "RIGBY": [
    "83442",
    "ID"
  ],
  "RIRIE": [
    "83443",
    "ID"
  ],
  "SWAN VALLEY": [
    "83449",
    "ID"
  ],
  "TERRETON": [
    "83450",
    "ID"
  ],
  "TETON": [
    "83451",
    "ID"
  ],
  "TETONIA": [
    "83452",
    "ID"
  ],
  "UCON": [
    "83454",
    "ID"
  ],
  "GIBBONSVILLE": [
    "83463",
    "ID"
  ],
  "LEADORE": [
    "83464",
    "ID"
  ],
  "LEMHI": [
    "83465",
    "ID"
  ],
  "NORTH FORK": [
    "93643",
    "CA"
  ],
  "SALMON": [
    "83467",
    "ID"
  ],
  "TENDOY": [
    "83468",
    "ID"
  ],
  "SHOUP": [
    "83469",
    "ID"
  ],
  "AHSAHKA": [
    "83520",
    "ID"
  ],
  "CRAIGMONT": [
    "83523",
    "ID"
  ],
  "CULDESAC": [
    "83524",
    "ID"
  ],
  "GRANGEVILLE": [
    "83530",
    "ID"
  ],
  "GREENCREEK": [
    "83533",
    "ID"
  ],
  "JULIAETTA": [
    "83535",
    "ID"
  ],
  "KAMIAH": [
    "83536",
    "ID"
  ],
  "KENDRICK": [
    "83537",
    "ID"
  ],
  "KOOSKIA": [
    "83539",
    "ID"
  ],
  "LAPWAI": [
    "83540",
    "ID"
  ],
  "LUCILE": [
    "83542",
    "ID"
  ],
  "NEZPERCE": [
    "83543",
    "ID"
  ],
  "OROFINO": [
    "83544",
    "ID"
  ],
  "REUBENS": [
    "83548",
    "ID"
  ],
  "RIGGINS": [
    "83549",
    "ID"
  ],
  "STITES": [
    "83552",
    "ID"
  ],
  "WEIPPE": [
    "83553",
    "ID"
  ],
  "WHITE BIRD": [
    "83554",
    "ID"
  ],
  "BRUNEAU": [
    "83604",
    "ID"
  ],
  "GARDEN VALLEY": [
    "95633",
    "CA"
  ],
  "GLENNS FERRY": [
    "83623",
    "ID"
  ],
  "HAMMETT": [
    "83627",
    "ID"
  ],
  "HOMEDALE": [
    "83628",
    "ID"
  ],
  "IDAHO CITY": [
    "83631",
    "ID"
  ],
  "KING HILL": [
    "83633",
    "ID"
  ],
  "KUNA": [
    "83634",
    "ID"
  ],
  "LETHA": [
    "83636",
    "ID"
  ],
  "MCCALL": [
    "83638",
    "ID"
  ],
  "MARSING": [
    "83639",
    "ID"
  ],
  "MELBA": [
    "83641",
    "ID"
  ],
  "MOUNTAIN HOME AFB": [
    "83648",
    "ID"
  ],
  "NAMPA": [
    "83687",
    "ID"
  ],
  "NEW MEADOWS": [
    "83654",
    "ID"
  ],
  "NOTUS": [
    "83656",
    "ID"
  ],
  "PAYETTE": [
    "83661",
    "ID"
  ],
  "SWEET": [
    "83670",
    "ID"
  ],
  "WEISER": [
    "83672",
    "ID"
  ],
  "YELLOW PINE": [
    "83677",
    "ID"
  ],
  "BOISE": [
    "83728",
    "ID"
  ],
  "BAYVIEW": [
    "83803",
    "ID"
  ],
  "BONNERS FERRY": [
    "83805",
    "ID"
  ],
  "BOVILL": [
    "83806",
    "ID"
  ],
  "CALDER": [
    "83808",
    "ID"
  ],
  "CAREYWOOD": [
    "83809",
    "ID"
  ],
  "CATALDO": [
    "83810",
    "ID"
  ],
  "CLARK FORK": [
    "83811",
    "ID"
  ],
  "COCOLALLA": [
    "83813",
    "ID"
  ],
  "COEUR D ALENE": [
    "83816",
    "ID"
  ],
  "COOLIN": [
    "83821",
    "ID"
  ],
  "DEARY": [
    "83823",
    "ID"
  ],
  "DESMET": [
    "83824",
    "ID"
  ],
  "KOOTENAI": [
    "83840",
    "ID"
  ],
  "MEDIMONT": [
    "83842",
    "ID"
  ],
  "MOYIE SPRINGS": [
    "83845",
    "ID"
  ],
  "MULLAN": [
    "83846",
    "ID"
  ],
  "NORDMAN": [
    "83848",
    "ID"
  ],
  "OSBURN": [
    "83849",
    "ID"
  ],
  "PONDERAY": [
    "83852",
    "ID"
  ],
  "PORTHILL": [
    "83853",
    "ID"
  ],
  "POST FALLS": [
    "83877",
    "ID"
  ],
  "POTLATCH": [
    "83855",
    "ID"
  ],
  "PRIEST RIVER": [
    "83856",
    "ID"
  ],
  "RATHDRUM": [
    "83858",
    "ID"
  ],
  "SAGLE": [
    "83860",
    "ID"
  ],
  "SAINT MARIES": [
    "83861",
    "ID"
  ],
  "SANDPOINT": [
    "83864",
    "ID"
  ],
  "COLBURN": [
    "83865",
    "ID"
  ],
  "SANTA": [
    "83866",
    "ID"
  ],
  "SMELTERVILLE": [
    "83868",
    "ID"
  ],
  "TENSED": [
    "83870",
    "ID"
  ],
  "WORLEY": [
    "83876",
    "ID"
  ],
  "ALTONAH": [
    "84002",
    "UT"
  ],
  "AMERICAN FORK": [
    "84003",
    "UT"
  ],
  "EAGLE MOUNTAIN": [
    "84005",
    "UT"
  ],
  "BINGHAM CANYON": [
    "84006",
    "UT"
  ],
  "BLUEBELL": [
    "84007",
    "UT"
  ],
  "BONANZA": [
    "97623",
    "OR"
  ],
  "BOUNTIFUL": [
    "84011",
    "UT"
  ],
  "CEDAR VALLEY": [
    "84013",
    "UT"
  ],
  "COALVILLE": [
    "84017",
    "UT"
  ],
  "DUCHESNE": [
    "84021",
    "UT"
  ],
  "DUGWAY": [
    "84022",
    "UT"
  ],
  "DUTCH JOHN": [
    "84023",
    "UT"
  ],
  "FORT DUCHESNE": [
    "84026",
    "UT"
  ],
  "HEBER CITY": [
    "84032",
    "UT"
  ],
  "HENEFER": [
    "84033",
    "UT"
  ],
  "IBAPAH": [
    "84034",
    "UT"
  ],
  "JENSEN": [
    "84035",
    "UT"
  ],
  "KAMAS": [
    "84036",
    "UT"
  ],
  "KAYSVILLE": [
    "84037",
    "UT"
  ],
  "LAKETOWN": [
    "84038",
    "UT"
  ],
  "LAPOINT": [
    "84039",
    "UT"
  ],
  "LEHI": [
    "84043",
    "UT"
  ],
  "MAGNA": [
    "84044",
    "UT"
  ],
  "MYTON": [
    "84052",
    "UT"
  ],
  "NORTH SALT LAKE": [
    "84054",
    "UT"
  ],
  "HILL AFB": [
    "84056",
    "UT"
  ],
  "OREM": [
    "84097",
    "UT"
  ],
  "PEOA": [
    "84061",
    "UT"
  ],
  "RUSH VALLEY": [
    "84069",
    "UT"
  ],
  "SANDY": [
    "97055",
    "OR"
  ],
  "TABIONA": [
    "84072",
    "UT"
  ],
  "TOOELE": [
    "84074",
    "UT"
  ],
  "TRIDELL": [
    "84076",
    "UT"
  ],
  "VERNAL": [
    "84079",
    "UT"
  ],
  "WEST JORDAN": [
    "84088",
    "UT"
  ],
  "WALLSBURG": [
    "84082",
    "UT"
  ],
  "WENDOVER": [
    "84083",
    "UT"
  ],
  "WHITEROCKS": [
    "84085",
    "UT"
  ],
  "WOODS CROSS": [
    "84087",
    "UT"
  ],
  "SOUTH JORDAN": [
    "84095",
    "UT"
  ],
  "HERRIMAN": [
    "84096",
    "UT"
  ],
  "SALT LAKE CITY": [
    "84190",
    "UT"
  ],
  "BEAR RIVER CITY": [
    "84301",
    "UT"
  ],
  "BRIGHAM CITY": [
    "84302",
    "UT"
  ],
  "CACHE JUNCTION": [
    "84304",
    "UT"
  ],
  "FIELDING": [
    "84311",
    "UT"
  ],
  "HONEYVILLE": [
    "84314",
    "UT"
  ],
  "HYRUM": [
    "84319",
    "UT"
  ],
  "PARK VALLEY": [
    "84329",
    "UT"
  ],
  "SNOWVILLE": [
    "84336",
    "UT"
  ],
  "TREMONTON": [
    "84337",
    "UT"
  ],
  "ANETH": [
    "84510",
    "UT"
  ],
  "BLANDING": [
    "84511",
    "UT"
  ],
  "BLUFF": [
    "84512",
    "UT"
  ],
  "CASTLE DALE": [
    "84513",
    "UT"
  ],
  "EAST CARBON": [
    "84520",
    "UT"
  ],
  "FERRON": [
    "84523",
    "UT"
  ],
  "HELPER": [
    "84526",
    "UT"
  ],
  "LA SAL": [
    "84530",
    "UT"
  ],
  "MEXICAN HAT": [
    "84531",
    "UT"
  ],
  "MOAB": [
    "84532",
    "UT"
  ],
  "LAKE POWELL": [
    "84533",
    "UT"
  ],
  "MONTEZUMA CREEK": [
    "84534",
    "UT"
  ],
  "MONUMENT VALLEY": [
    "84536",
    "UT"
  ],
  "PROVO": [
    "84606",
    "UT"
  ],
  "CENTERFIELD": [
    "84622",
    "UT"
  ],
  "FOUNTAIN GREEN": [
    "84632",
    "UT"
  ],
  "KANOSH": [
    "84637",
    "UT"
  ],
  "LEAMINGTON": [
    "84638",
    "UT"
  ],
  "LEVAN": [
    "84639",
    "UT"
  ],
  "LYNNDYL": [
    "84640",
    "UT"
  ],
  "MANTI": [
    "84642",
    "UT"
  ],
  "MONA": [
    "84645",
    "UT"
  ],
  "MORONI": [
    "84646",
    "UT"
  ],
  "NEPHI": [
    "84648",
    "UT"
  ],
  "REDMOND": [
    "98073",
    "WA"
  ],
  "SANTAQUIN": [
    "84655",
    "UT"
  ],
  "SIGURD": [
    "84657",
    "UT"
  ],
  "SPANISH FORK": [
    "84660",
    "UT"
  ],
  "ANNABELLA": [
    "84711",
    "UT"
  ],
  "ANTIMONY": [
    "84712",
    "UT"
  ],
  "BERYL": [
    "84714",
    "UT"
  ],
  "CANNONVILLE": [
    "84718",
    "UT"
  ],
  "BRIAN HEAD": [
    "84719",
    "UT"
  ],
  "CEDAR CITY": [
    "84721",
    "UT"
  ],
  "ELSINORE": [
    "84724",
    "UT"
  ],
  "ESCALANTE": [
    "84726",
    "UT"
  ],
  "HANKSVILLE": [
    "84734",
    "UT"
  ],
  "HATCH": [
    "87937",
    "NM"
  ],
  "HENRIEVILLE": [
    "84736",
    "UT"
  ],
  "IVINS": [
    "84738",
    "UT"
  ],
  "JOSEPH": [
    "97846",
    "OR"
  ],
  "KANAB": [
    "84741",
    "UT"
  ],
  "KANARRAVILLE": [
    "84742",
    "UT"
  ],
  "KOOSHAREM": [
    "84744",
    "UT"
  ],
  "LA VERKIN": [
    "84745",
    "UT"
  ],
  "LOA": [
    "84747",
    "UT"
  ],
  "MARYSVALE": [
    "84750",
    "UT"
  ],
  "ORDERVILLE": [
    "84758",
    "UT"
  ],
  "PANGUITCH": [
    "84759",
    "UT"
  ],
  "PARAGONAH": [
    "84760",
    "UT"
  ],
  "PAROWAN": [
    "84761",
    "UT"
  ],
  "DUCK CREEK VILLAGE": [
    "84762",
    "UT"
  ],
  "BRYCE": [
    "84764",
    "UT"
  ],
  "SANTA CLARA": [
    "95056",
    "CA"
  ],
  "SEVIER": [
    "84766",
    "UT"
  ],
  "TEASDALE": [
    "84773",
    "UT"
  ],
  "TOQUERVILLE": [
    "84774",
    "UT"
  ],
  "TORREY": [
    "84775",
    "UT"
  ],
  "TROPIC": [
    "84776",
    "UT"
  ],
  "VIRGIN": [
    "84779",
    "UT"
  ],
  "VEYO": [
    "84782",
    "UT"
  ],
  "DAMMERON VALLEY": [
    "84783",
    "UT"
  ],
  "HILDALE": [
    "84784",
    "UT"
  ],
  "APACHE JUNCTION": [
    "85178",
    "AZ"
  ],
  "GOLD CANYON": [
    "85118",
    "AZ"
  ],
  "BAPCHULE": [
    "85121",
    "AZ"
  ],
  "CASA GRANDE": [
    "85194",
    "AZ"
  ],
  "ARIZONA CITY": [
    "85123",
    "AZ"
  ],
  "CHANDLER HEIGHTS": [
    "85127",
    "AZ"
  ],
  "ELOY": [
    "85131",
    "AZ"
  ],
  "MARICOPA": [
    "93252",
    "CA"
  ],
  "SAN TAN VALLEY": [
    "85143",
    "AZ"
  ],
  "PICACHO": [
    "88343",
    "NM"
  ],
  "QUEEN CREEK": [
    "85142",
    "AZ"
  ],
  "SACATON": [
    "85147",
    "AZ"
  ],
  "VALLEY FARMS": [
    "85191",
    "AZ"
  ],
  "WINKELMAN": [
    "85192",
    "AZ"
  ],
  "HIGLEY": [
    "85236",
    "AZ"
  ],
  "SCOTTSDALE": [
    "85271",
    "AZ"
  ],
  "PARADISE VALLEY": [
    "89426",
    "NV"
  ],
  "RIO VERDE": [
    "85263",
    "AZ"
  ],
  "FORT MCDOWELL": [
    "85264",
    "AZ"
  ],
  "FOUNTAIN HILLS": [
    "85269",
    "AZ"
  ],
  "TEMPE": [
    "85287",
    "AZ"
  ],
  "LUKE AIR FORCE BASE": [
    "85309",
    "AZ"
  ],
  "AGUILA": [
    "85320",
    "AZ"
  ],
  "AJO": [
    "85321",
    "AZ"
  ],
  "BLACK CANYON CITY": [
    "85324",
    "AZ"
  ],
  "BOUSE": [
    "85325",
    "AZ"
  ],
  "CAVE CREEK": [
    "85331",
    "AZ"
  ],
  "CIBOLA": [
    "85328",
    "AZ"
  ],
  "CONGRESS": [
    "85332",
    "AZ"
  ],
  "DATELAND": [
    "85333",
    "AZ"
  ],
  "EHRENBERG": [
    "85334",
    "AZ"
  ],
  "EL MIRAGE": [
    "85335",
    "AZ"
  ],
  "GILA BEND": [
    "85337",
    "AZ"
  ],
  "GOODYEAR": [
    "85395",
    "AZ"
  ],
  "LAVEEN": [
    "85339",
    "AZ"
  ],
  "LITCHFIELD PARK": [
    "85340",
    "AZ"
  ],
  "LUKEVILLE": [
    "85341",
    "AZ"
  ],
  "PALO VERDE": [
    "92266",
    "CA"
  ],
  "QUARTZSITE": [
    "85359",
    "AZ"
  ],
  "ROLL": [
    "85347",
    "AZ"
  ],
  "SALOME": [
    "85348",
    "AZ"
  ],
  "SOMERTON": [
    "85350",
    "AZ"
  ],
  "TACNA": [
    "85352",
    "AZ"
  ],
  "TOLLESON": [
    "85353",
    "AZ"
  ],
  "TONOPAH": [
    "89049",
    "NV"
  ],
  "WADDELL": [
    "85355",
    "AZ"
  ],
  "WELLTON": [
    "85356",
    "AZ"
  ],
  "WENDEN": [
    "85357",
    "AZ"
  ],
  "WICKENBURG": [
    "85390",
    "AZ"
  ],
  "WIKIEUP": [
    "85360",
    "AZ"
  ],
  "WITTMANN": [
    "85361",
    "AZ"
  ],
  "YARNELL": [
    "85362",
    "AZ"
  ],
  "YOUNGTOWN": [
    "85363",
    "AZ"
  ],
  "POSTON": [
    "85371",
    "AZ"
  ],
  "SUN CITY WEST": [
    "85376",
    "AZ"
  ],
  "CAREFREE": [
    "85377",
    "AZ"
  ],
  "GLOBE": [
    "85502",
    "AZ"
  ],
  "BYLAS": [
    "85530",
    "AZ"
  ],
  "PERIDOT": [
    "85542",
    "AZ"
  ],
  "PIMA": [
    "85543",
    "AZ"
  ],
  "SAN CARLOS": [
    "94070",
    "CA"
  ],
  "TONTO BASIN": [
    "85553",
    "AZ"
  ],
  "YOUNG": [
    "85554",
    "AZ"
  ],
  "ARIVACA": [
    "85601",
    "AZ"
  ],
  "COCHISE": [
    "85606",
    "AZ"
  ],
  "DRAGOON": [
    "85609",
    "AZ"
  ],
  "ELFRIDA": [
    "85610",
    "AZ"
  ],
  "FORT HUACHUCA": [
    "85670",
    "AZ"
  ],
  "HUACHUCA CITY": [
    "85616",
    "AZ"
  ],
  "MC NEAL": [
    "85617",
    "AZ"
  ],
  "MOUNT LEMMON": [
    "85619",
    "AZ"
  ],
  "NACO": [
    "85620",
    "AZ"
  ],
  "NOGALES": [
    "85628",
    "AZ"
  ],
  "ORACLE": [
    "85623",
    "AZ"
  ],
  "PATAGONIA": [
    "85624",
    "AZ"
  ],
  "PEARCE": [
    "85625",
    "AZ"
  ],
  "PIRTLEVILLE": [
    "85626",
    "AZ"
  ],
  "POMERENE": [
    "85627",
    "AZ"
  ],
  "SAHUARITA": [
    "85629",
    "AZ"
  ],
  "SAN MANUEL": [
    "85631",
    "AZ"
  ],
  "SAN SIMON": [
    "85632",
    "AZ"
  ],
  "SASABE": [
    "85633",
    "AZ"
  ],
  "SELLS": [
    "85634",
    "AZ"
  ],
  "SIERRA VISTA": [
    "85650",
    "AZ"
  ],
  "SONOITA": [
    "85637",
    "AZ"
  ],
  "TOMBSTONE": [
    "85638",
    "AZ"
  ],
  "TOPAWA": [
    "85639",
    "AZ"
  ],
  "TUMACACORI": [
    "85640",
    "AZ"
  ],
  "WILLCOX": [
    "85644",
    "AZ"
  ],
  "AMADO": [
    "85645",
    "AZ"
  ],
  "TUBAC": [
    "85646",
    "AZ"
  ],
  "RIO RICO": [
    "85648",
    "AZ"
  ],
  "CORTARO": [
    "85652",
    "AZ"
  ],
  "MARANA": [
    "85658",
    "AZ"
  ],
  "RILLITO": [
    "85654",
    "AZ"
  ],
  "TUCSON": [
    "85775",
    "AZ"
  ],
  "CATALINA": [
    "85738",
    "AZ"
  ],
  "SHOW LOW": [
    "85902",
    "AZ"
  ],
  "CIBECUE": [
    "85911",
    "AZ"
  ],
  "WHITE MOUNTAIN LAKE": [
    "85912",
    "AZ"
  ],
  "BLUE": [
    "85922",
    "AZ"
  ],
  "CLAY SPRINGS": [
    "85923",
    "AZ"
  ],
  "EAGAR": [
    "85925",
    "AZ"
  ],
  "FORT APACHE": [
    "85926",
    "AZ"
  ],
  "HEBER": [
    "92249",
    "CA"
  ],
  "FOREST LAKES": [
    "85931",
    "AZ"
  ],
  "NUTRIOSO": [
    "85932",
    "AZ"
  ],
  "OVERGAARD": [
    "85933",
    "AZ"
  ],
  "PINETOP": [
    "85935",
    "AZ"
  ],
  "SNOWFLAKE": [
    "85937",
    "AZ"
  ],
  "SPRINGERVILLE": [
    "85938",
    "AZ"
  ],
  "WHITERIVER": [
    "85941",
    "AZ"
  ],
  "FLAGSTAFF": [
    "86011",
    "AZ"
  ],
  "BELLEMONT": [
    "86015",
    "AZ"
  ],
  "GRAY MOUNTAIN": [
    "86016",
    "AZ"
  ],
  "MUNDS PARK": [
    "86017",
    "AZ"
  ],
  "GRAND CANYON": [
    "86023",
    "AZ"
  ],
  "HAPPY JACK": [
    "86024",
    "AZ"
  ],
  "PETRIFIED FOREST NATL PK": [
    "86028",
    "AZ"
  ],
  "HOTEVILLA": [
    "86030",
    "AZ"
  ],
  "INDIAN WELLS": [
    "92210",
    "CA"
  ],
  "JOSEPH CITY": [
    "86032",
    "AZ"
  ],
  "KAYENTA": [
    "86033",
    "AZ"
  ],
  "KEAMS CANYON": [
    "86034",
    "AZ"
  ],
  "LEUPP": [
    "86035",
    "AZ"
  ],
  "MARBLE CANYON": [
    "86036",
    "AZ"
  ],
  "MORMON LAKE": [
    "86038",
    "AZ"
  ],
  "KYKOTSMOVI VILLAGE": [
    "86039",
    "AZ"
  ],
  "POLACCA": [
    "86042",
    "AZ"
  ],
  "SECOND MESA": [
    "86043",
    "AZ"
  ],
  "TONALEA": [
    "86044",
    "AZ"
  ],
  "TUBA CITY": [
    "86045",
    "AZ"
  ],
  "NORTH RIM": [
    "86052",
    "AZ"
  ],
  "KAIBETO": [
    "86053",
    "AZ"
  ],
  "SHONTO": [
    "86054",
    "AZ"
  ],
  "PRESCOTT VALLEY": [
    "86315",
    "AZ"
  ],
  "ASH FORK": [
    "86320",
    "AZ"
  ],
  "CAMP VERDE": [
    "86322",
    "AZ"
  ],
  "CHINO VALLEY": [
    "86323",
    "AZ"
  ],
  "CORNVILLE": [
    "86325",
    "AZ"
  ],
  "PAULDEN": [
    "86334",
    "AZ"
  ],
  "RIMROCK": [
    "86335",
    "AZ"
  ],
  "SEDONA": [
    "86351",
    "AZ"
  ],
  "SKULL VALLEY": [
    "86338",
    "AZ"
  ],
  "LAKE MONTEZUMA": [
    "86342",
    "AZ"
  ],
  "CROWN KING": [
    "86343",
    "AZ"
  ],
  "LAKE HAVASU CITY": [
    "86406",
    "AZ"
  ],
  "FORT MOHAVE": [
    "86427",
    "AZ"
  ],
  "BULLHEAD CITY": [
    "86442",
    "AZ"
  ],
  "CHLORIDE": [
    "86431",
    "AZ"
  ],
  "OATMAN": [
    "86433",
    "AZ"
  ],
  "PEACH SPRINGS": [
    "86434",
    "AZ"
  ],
  "SUPAI": [
    "86435",
    "AZ"
  ],
  "TOPOCK": [
    "86436",
    "AZ"
  ],
  "YUCCA": [
    "86438",
    "AZ"
  ],
  "MOHAVE VALLEY": [
    "86446",
    "AZ"
  ],
  "DOLAN SPRINGS": [
    "86441",
    "AZ"
  ],
  "TEMPLE BAR MARINA": [
    "86443",
    "AZ"
  ],
  "MEADVIEW": [
    "86444",
    "AZ"
  ],
  "WILLOW BEACH": [
    "86445",
    "AZ"
  ],
  "CHINLE": [
    "86503",
    "AZ"
  ],
  "HOUCK": [
    "86506",
    "AZ"
  ],
  "LUKACHUKAI": [
    "86507",
    "AZ"
  ],
  "PINON": [
    "88344",
    "NM"
  ],
  "TEEC NOS POS": [
    "86514",
    "AZ"
  ],
  "WINDOW ROCK": [
    "86515",
    "AZ"
  ],
  "BLUE GAP": [
    "86520",
    "AZ"
  ],
  "DENNEHOTSO": [
    "86535",
    "AZ"
  ],
  "MANY FARMS": [
    "86538",
    "AZ"
  ],
  "RED VALLEY": [
    "86544",
    "AZ"
  ],
  "ROCK POINT": [
    "86545",
    "AZ"
  ],
  "TSAILE": [
    "86556",
    "AZ"
  ],
  "ALGODONES": [
    "87001",
    "NM"
  ],
  "BELEN": [
    "87002",
    "NM"
  ],
  "BERNALILLO": [
    "87004",
    "NM"
  ],
  "BLUEWATER": [
    "87005",
    "NM"
  ],
  "BOSQUE": [
    "87006",
    "NM"
  ],
  "CASA BLANCA": [
    "87007",
    "NM"
  ],
  "CEDAR CREST": [
    "87008",
    "NM"
  ],
  "CERRILLOS": [
    "87010",
    "NM"
  ],
  "CLAUNCH": [
    "87011",
    "NM"
  ],
  "COYOTE": [
    "95013",
    "CA"
  ],
  "CUBERO": [
    "87014",
    "NM"
  ],
  "ESTANCIA": [
    "87016",
    "NM"
  ],
  "GRANTS": [
    "87020",
    "NM"
  ],
  "ISLETA": [
    "87022",
    "NM"
  ],
  "JARALES": [
    "87023",
    "NM"
  ],
  "JEMEZ PUEBLO": [
    "87024",
    "NM"
  ],
  "JEMEZ SPRINGS": [
    "87025",
    "NM"
  ],
  "LAGUNA": [
    "87026",
    "NM"
  ],
  "LINDRITH": [
    "87029",
    "NM"
  ],
  "LOS LUNAS": [
    "87031",
    "NM"
  ],
  "PUEBLO OF ACOMA": [
    "87034",
    "NM"
  ],
  "MORIARTY": [
    "87035",
    "NM"
  ],
  "MOUNTAINAIR": [
    "87036",
    "NM"
  ],
  "NAGEEZI": [
    "87037",
    "NM"
  ],
  "NEW LAGUNA": [
    "87038",
    "NM"
  ],
  "PENA BLANCA": [
    "87041",
    "NM"
  ],
  "PERALTA": [
    "87042",
    "NM"
  ],
  "PLACITAS": [
    "87043",
    "NM"
  ],
  "PONDEROSA": [
    "87044",
    "NM"
  ],
  "PREWITT": [
    "87045",
    "NM"
  ],
  "SANDIA PARK": [
    "87047",
    "NM"
  ],
  "CORRALES": [
    "87048",
    "NM"
  ],
  "SAN FIDEL": [
    "87049",
    "NM"
  ],
  "SAN RAFAEL": [
    "94915",
    "CA"
  ],
  "SANTO DOMINGO PUEBLO": [
    "87052",
    "NM"
  ],
  "SAN YSIDRO": [
    "92173",
    "CA"
  ],
  "TIJERAS": [
    "87059",
    "NM"
  ],
  "TOME": [
    "87060",
    "NM"
  ],
  "TORREON": [
    "87061",
    "NM"
  ],
  "VEGUITA": [
    "87062",
    "NM"
  ],
  "BOSQUE FARMS": [
    "87068",
    "NM"
  ],
  "CLINES CORNERS": [
    "87070",
    "NM"
  ],
  "COCHITI PUEBLO": [
    "87072",
    "NM"
  ],
  "COCHITI LAKE": [
    "87083",
    "NM"
  ],
  "ALBUQUERQUE": [
    "87199",
    "NM"
  ],
  "KIRTLAND AFB": [
    "87117",
    "NM"
  ],
  "RIO RANCHO": [
    "87174",
    "NM"
  ],
  "GALLUP": [
    "87305",
    "NM"
  ],
  "BRIMHALL": [
    "87310",
    "NM"
  ],
  "CHURCH ROCK": [
    "87311",
    "NM"
  ],
  "CONTINENTAL DIVIDE": [
    "87312",
    "NM"
  ],
  "CROWNPOINT": [
    "87313",
    "NM"
  ],
  "FENCE LAKE": [
    "87315",
    "NM"
  ],
  "FORT WINGATE": [
    "87316",
    "NM"
  ],
  "GAMERCO": [
    "87317",
    "NM"
  ],
  "MENTMORE": [
    "87319",
    "NM"
  ],
  "MEXICAN SPRINGS": [
    "87320",
    "NM"
  ],
  "THOREAU": [
    "87323",
    "NM"
  ],
  "TOHATCHI": [
    "87325",
    "NM"
  ],
  "VANDERWAGEN": [
    "87326",
    "NM"
  ],
  "NAVAJO": [
    "87328",
    "NM"
  ],
  "PINEHILL": [
    "87357",
    "NM"
  ],
  "SHEEP SPRINGS": [
    "87364",
    "NM"
  ],
  "SMITH LAKE": [
    "87365",
    "NM"
  ],
  "YATAHEY": [
    "87375",
    "NM"
  ],
  "AZTEC": [
    "87410",
    "NM"
  ],
  "FLORA VISTA": [
    "87415",
    "NM"
  ],
  "KIRTLAND": [
    "87417",
    "NM"
  ],
  "NAVAJO DAM": [
    "87419",
    "NM"
  ],
  "SHIPROCK": [
    "87420",
    "NM"
  ],
  "WATERFLOW": [
    "87421",
    "NM"
  ],
  "SANOSTEE": [
    "87461",
    "NM"
  ],
  "ABIQUIU": [
    "87510",
    "NM"
  ],
  "ALCALDE": [
    "87511",
    "NM"
  ],
  "AMALIA": [
    "87512",
    "NM"
  ],
  "ARROYO HONDO": [
    "87513",
    "NM"
  ],
  "ARROYO SECO": [
    "87514",
    "NM"
  ],
  "CANJILON": [
    "87515",
    "NM"
  ],
  "CANONES": [
    "87516",
    "NM"
  ],
  "CEBOLLA": [
    "87518",
    "NM"
  ],
  "CHAMA": [
    "87520",
    "NM"
  ],
  "CHAMISAL": [
    "87521",
    "NM"
  ],
  "CHIMAYO": [
    "87522",
    "NM"
  ],
  "COSTILLA": [
    "87524",
    "NM"
  ],
  "TAOS SKI VALLEY": [
    "87525",
    "NM"
  ],
  "DULCE": [
    "87528",
    "NM"
  ],
  "EL PRADO": [
    "87529",
    "NM"
  ],
  "EL RITO": [
    "87530",
    "NM"
  ],
  "EMBUDO": [
    "87531",
    "NM"
  ],
  "ESPANOLA": [
    "87533",
    "NM"
  ],
  "GLORIETA": [
    "87535",
    "NM"
  ],
  "HERNANDEZ": [
    "87537",
    "NM"
  ],
  "ILFELD": [
    "87538",
    "NM"
  ],
  "LA MADERA": [
    "87539",
    "NM"
  ],
  "LAMY": [
    "87540",
    "NM"
  ],
  "LOS ALAMOS": [
    "93440",
    "CA"
  ],
  "MEDANALES": [
    "87548",
    "NM"
  ],
  "OJO CALIENTE": [
    "87549",
    "NM"
  ],
  "LOS OJOS": [
    "87551",
    "NM"
  ],
  "PENASCO": [
    "87553",
    "NM"
  ],
  "QUESTA": [
    "87556",
    "NM"
  ],
  "RANCHOS DE TAOS": [
    "87557",
    "NM"
  ],
  "RED RIVER": [
    "87558",
    "NM"
  ],
  "RIBERA": [
    "87560",
    "NM"
  ],
  "SAN CRISTOBAL": [
    "87564",
    "NM"
  ],
  "OHKAY OWINGEH": [
    "87566",
    "NM"
  ],
  "SANTA CRUZ": [
    "95065",
    "CA"
  ],
  "SERAFINA": [
    "87569",
    "NM"
  ],
  "TAOS": [
    "87571",
    "NM"
  ],
  "TESUQUE": [
    "87574",
    "NM"
  ],
  "TIERRA AMARILLA": [
    "87575",
    "NM"
  ],
  "TRES PIEDRAS": [
    "87577",
    "NM"
  ],
  "TRUCHAS": [
    "87578",
    "NM"
  ],
  "VADITO": [
    "87579",
    "NM"
  ],
  "VALDEZ": [
    "99686",
    "AK"
  ],
  "VALLECITOS": [
    "87581",
    "NM"
  ],
  "VELARDE": [
    "87582",
    "NM"
  ],
  "VILLANUEVA": [
    "87583",
    "NM"
  ],
  "LAS VEGAS": [
    "89199",
    "NV"
  ],
  "ANGEL FIRE": [
    "87710",
    "NM"
  ],
  "ANTON CHICO": [
    "87711",
    "NM"
  ],
  "CHACON": [
    "87713",
    "NM"
  ],
  "EAGLE NEST": [
    "87718",
    "NM"
  ],
  "GUADALUPITA": [
    "87722",
    "NM"
  ],
  "HOLMAN": [
    "87723",
    "NM"
  ],
  "MOSQUERO": [
    "87733",
    "NM"
  ],
  "OJO FELIZ": [
    "87735",
    "NM"
  ],
  "RATON": [
    "87740",
    "NM"
  ],
  "ROCIADA": [
    "87742",
    "NM"
  ],
  "SAPELLO": [
    "87745",
    "NM"
  ],
  "UTE PARK": [
    "87749",
    "NM"
  ],
  "WAGON MOUND": [
    "87752",
    "NM"
  ],
  "WATROUS": [
    "87753",
    "NM"
  ],
  "SOCORRO": [
    "87801",
    "NM"
  ],
  "DATIL": [
    "87821",
    "NM"
  ],
  "LEMITAR": [
    "87823",
    "NM"
  ],
  "LUNA": [
    "87824",
    "NM"
  ],
  "MAGDALENA": [
    "87825",
    "NM"
  ],
  "PIE TOWN": [
    "87827",
    "NM"
  ],
  "SAN ACACIA": [
    "87831",
    "NM"
  ],
  "TRUTH OR CONSEQUENCES": [
    "87901",
    "NM"
  ],
  "ARREY": [
    "87930",
    "NM"
  ],
  "CABALLO": [
    "87931",
    "NM"
  ],
  "ELEPHANT BUTTE": [
    "87935",
    "NM"
  ],
  "LAS CRUCES": [
    "88013",
    "NM"
  ],
  "WHITE SANDS MISSILE RANGE": [
    "88002",
    "NM"
  ],
  "SANTA TERESA": [
    "88008",
    "NM"
  ],
  "PLAYAS": [
    "88009",
    "NM"
  ],
  "ANIMAS": [
    "88020",
    "NM"
  ],
  "ARENAS VALLEY": [
    "88022",
    "NM"
  ],
  "BERINO": [
    "88024",
    "NM"
  ],
  "CHAMBERINO": [
    "88027",
    "NM"
  ],
  "CLIFF": [
    "88028",
    "NM"
  ],
  "DEMING": [
    "98244",
    "WA"
  ],
  "DONA ANA": [
    "88032",
    "NM"
  ],
  "FAIRACRES": [
    "88033",
    "NM"
  ],
  "FAYWOOD": [
    "88034",
    "NM"
  ],
  "GILA": [
    "88038",
    "NM"
  ],
  "HACHITA": [
    "88040",
    "NM"
  ],
  "LA MESA": [
    "91944",
    "CA"
  ],
  "LORDSBURG": [
    "88045",
    "NM"
  ],
  "MESILLA": [
    "88046",
    "NM"
  ],
  "MESILLA PARK": [
    "88047",
    "NM"
  ],
  "MIMBRES": [
    "88049",
    "NM"
  ],
  "MULE CREEK": [
    "88051",
    "NM"
  ],
  "ORGAN": [
    "88052",
    "NM"
  ],
  "PINOS ALTOS": [
    "88053",
    "NM"
  ],
  "RADIUM SPRINGS": [
    "88054",
    "NM"
  ],
  "REDROCK": [
    "88055",
    "NM"
  ],
  "RODEO": [
    "94572",
    "CA"
  ],
  "SAN MIGUEL": [
    "93451",
    "CA"
  ],
  "SUNLAND PARK": [
    "88063",
    "NM"
  ],
  "VADO": [
    "88072",
    "NM"
  ],
  "CHAPARRAL": [
    "88081",
    "NM"
  ],
  "CLOVIS": [
    "93619",
    "CA"
  ],
  "CANNON AFB": [
    "88103",
    "NM"
  ],
  "CAUSEY": [
    "88113",
    "NM"
  ],
  "CROSSROADS": [
    "88114",
    "NM"
  ],
  "ELIDA": [
    "88116",
    "NM"
  ],
  "FORT SUMNER": [
    "88119",
    "NM"
  ],
  "HOUSE": [
    "88121",
    "NM"
  ],
  "PORTALES": [
    "88130",
    "NM"
  ],
  "TAIBAN": [
    "88134",
    "NM"
  ],
  "YESO": [
    "88136",
    "NM"
  ],
  "CAPROCK": [
    "88213",
    "NM"
  ],
  "JAL": [
    "88252",
    "NM"
  ],
  "LOCO HILLS": [
    "88255",
    "NM"
  ],
  "MCDONALD": [
    "88262",
    "NM"
  ],
  "MALJAMAR": [
    "88264",
    "NM"
  ],
  "WHITES CITY": [
    "88268",
    "NM"
  ],
  "CARRIZOZO": [
    "88301",
    "NM"
  ],
  "ALAMOGORDO": [
    "88311",
    "NM"
  ],
  "BENT": [
    "88314",
    "NM"
  ],
  "CAPITAN": [
    "88316",
    "NM"
  ],
  "CLOUDCROFT": [
    "88317",
    "NM"
  ],
  "HIGH ROLLS MOUNTAIN PARK": [
    "88325",
    "NM"
  ],
  "HOLLOMAN AIR FORCE BASE": [
    "88330",
    "NM"
  ],
  "LA LUZ": [
    "88337",
    "NM"
  ],
  "MAYHILL": [
    "88339",
    "NM"
  ],
  "MESCALERO": [
    "88340",
    "NM"
  ],
  "NOGAL": [
    "88341",
    "NM"
  ],
  "OROGRANDE": [
    "88342",
    "NM"
  ],
  "RUIDOSO": [
    "88355",
    "NM"
  ],
  "RUIDOSO DOWNS": [
    "88346",
    "NM"
  ],
  "SAN PATRICIO": [
    "88348",
    "NM"
  ],
  "SUNSPOT": [
    "88349",
    "NM"
  ],
  "TIMBERON": [
    "88350",
    "NM"
  ],
  "TINNIE": [
    "88351",
    "NM"
  ],
  "TULAROSA": [
    "88352",
    "NM"
  ],
  "TUCUMCARI": [
    "88401",
    "NM"
  ],
  "AMISTAD": [
    "88410",
    "NM"
  ],
  "BARD": [
    "92222",
    "CA"
  ],
  "CONCHAS DAM": [
    "88416",
    "NM"
  ],
  "MCALISTER": [
    "88427",
    "NM"
  ],
  "NARA VISA": [
    "88430",
    "NM"
  ],
  "SAN JON": [
    "88434",
    "NM"
  ],
  "THE LAKES": [
    "89163",
    "NV"
  ],
  "BEATTY": [
    "97621",
    "OR"
  ],
  "BLUE DIAMOND": [
    "89004",
    "NV"
  ],
  "BOULDER CITY": [
    "89006",
    "NV"
  ],
  "BUNKERVILLE": [
    "89007",
    "NV"
  ],
  "CALIENTE": [
    "93518",
    "CA"
  ],
  "HIKO": [
    "89017",
    "NV"
  ],
  "INDIAN SPRINGS": [
    "89070",
    "NV"
  ],
  "JEAN": [
    "89026",
    "NV"
  ],
  "AMARGOSA VALLEY": [
    "89020",
    "NV"
  ],
  "LOGANDALE": [
    "89021",
    "NV"
  ],
  "MERCURY": [
    "89023",
    "NV"
  ],
  "MOAPA": [
    "89025",
    "NV"
  ],
  "LAUGHLIN": [
    "89029",
    "NV"
  ],
  "NORTH LAS VEGAS": [
    "89086",
    "NV"
  ],
  "COYOTE SPRINGS": [
    "89037",
    "NV"
  ],
  "CAL NEV ARI": [
    "89039",
    "NV"
  ],
  "PAHRUMP": [
    "89061",
    "NV"
  ],
  "PANACA": [
    "89042",
    "NV"
  ],
  "PIOCHE": [
    "89043",
    "NV"
  ],
  "SEARCHLIGHT": [
    "89046",
    "NV"
  ],
  "SILVERPEAK": [
    "89047",
    "NV"
  ],
  "NELLIS AFB": [
    "89191",
    "NV"
  ],
  "DUCKWATER": [
    "89314",
    "NV"
  ],
  "LUND": [
    "89317",
    "NV"
  ],
  "MC GILL": [
    "89318",
    "NV"
  ],
  "DENIO": [
    "89404",
    "NV"
  ],
  "FERNLEY": [
    "89408",
    "NV"
  ],
  "GABBS": [
    "89409",
    "NV"
  ],
  "GARDNERVILLE": [
    "89460",
    "NV"
  ],
  "GERLACH": [
    "89412",
    "NV"
  ],
  "GLENBROOK": [
    "89413",
    "NV"
  ],
  "IMLAY": [
    "89418",
    "NV"
  ],
  "LOVELOCK": [
    "89419",
    "NV"
  ],
  "MC DERMITT": [
    "89421",
    "NV"
  ],
  "MINA": [
    "89422",
    "NV"
  ],
  "OROVADA": [
    "89425",
    "NV"
  ],
  "SCHURZ": [
    "89427",
    "NV"
  ],
  "SMITH": [
    "89430",
    "NV"
  ],
  "VALMY": [
    "89438",
    "NV"
  ],
  "VERDI": [
    "89439",
    "NV"
  ],
  "WINNEMUCCA": [
    "89446",
    "NV"
  ],
  "YERINGTON": [
    "89447",
    "NV"
  ],
  "ZEPHYR COVE": [
    "89448",
    "NV"
  ],
  "STATELINE": [
    "89449",
    "NV"
  ],
  "INCLINE VILLAGE": [
    "89452",
    "NV"
  ],
  "WASHOE VALLEY": [
    "89704",
    "NV"
  ],
  "BATTLE MOUNTAIN": [
    "89820",
    "NV"
  ],
  "CRESCENT VALLEY": [
    "89821",
    "NV"
  ],
  "CARLIN": [
    "89822",
    "NV"
  ],
  "DEETH": [
    "89823",
    "NV"
  ],
  "JACKPOT": [
    "89825",
    "NV"
  ],
  "JARBIDGE": [
    "89826",
    "NV"
  ],
  "LAMOILLE": [
    "89828",
    "NV"
  ],
  "OWYHEE": [
    "89832",
    "NV"
  ],
  "WEST WENDOVER": [
    "89883",
    "NV"
  ],
  "LOS ANGELES": [
    "90096",
    "CA"
  ],
  "WEST HOLLYWOOD": [
    "90069",
    "CA"
  ],
  "PLAYA VISTA": [
    "90094",
    "CA"
  ],
  "BELL GARDENS": [
    "90201",
    "CA"
  ],
  "CULVER CITY": [
    "90233",
    "CA"
  ],
  "EL SEGUNDO": [
    "90245",
    "CA"
  ],
  "GARDENA": [
    "90249",
    "CA"
  ],
  "HERMOSA BEACH": [
    "90254",
    "CA"
  ],
  "HUNTINGTON PARK": [
    "90255",
    "CA"
  ],
  "LYNWOOD": [
    "90262",
    "CA"
  ],
  "MALIBU": [
    "90265",
    "CA"
  ],
  "MANHATTAN BEACH": [
    "90267",
    "CA"
  ],
  "PACIFIC PALISADES": [
    "90272",
    "CA"
  ],
  "PALOS VERDES PENINSULA": [
    "90274",
    "CA"
  ],
  "RANCHO PALOS VERDES": [
    "90275",
    "CA"
  ],
  "REDONDO BEACH": [
    "90278",
    "CA"
  ],
  "SOUTH GATE": [
    "90280",
    "CA"
  ],
  "TOPANGA": [
    "90290",
    "CA"
  ],
  "MARINA DEL REY": [
    "90295",
    "CA"
  ],
  "PLAYA DEL REY": [
    "90296",
    "CA"
  ],
  "INGLEWOOD": [
    "90312",
    "CA"
  ],
  "SANTA MONICA": [
    "90411",
    "CA"
  ],
  "BUENA PARK": [
    "90624",
    "CA"
  ],
  "LA PALMA": [
    "90623",
    "CA"
  ],
  "LA HABRA": [
    "90633",
    "CA"
  ],
  "LA MIRADA": [
    "90639",
    "CA"
  ],
  "PICO RIVERA": [
    "90662",
    "CA"
  ],
  "SANTA FE SPRINGS": [
    "90671",
    "CA"
  ],
  "CERRITOS": [
    "90703",
    "CA"
  ],
  "HARBOR CITY": [
    "90710",
    "CA"
  ],
  "HAWAIIAN GARDENS": [
    "90716",
    "CA"
  ],
  "LOMITA": [
    "90717",
    "CA"
  ],
  "LOS ALAMITOS": [
    "90721",
    "CA"
  ],
  "PARAMOUNT": [
    "90723",
    "CA"
  ],
  "SAN PEDRO": [
    "90734",
    "CA"
  ],
  "SEAL BEACH": [
    "90740",
    "CA"
  ],
  "SURFSIDE": [
    "90743",
    "CA"
  ],
  "SIGNAL HILL": [
    "90755",
    "CA"
  ],
  "ALTADENA": [
    "91003",
    "CA"
  ],
  "DUARTE": [
    "91010",
    "CA"
  ],
  "LA CANADA FLINTRIDGE": [
    "91012",
    "CA"
  ],
  "MOUNT WILSON": [
    "91023",
    "CA"
  ],
  "SIERRA MADRE": [
    "91025",
    "CA"
  ],
  "SOUTH PASADENA": [
    "91031",
    "CA"
  ],
  "SUNLAND": [
    "91041",
    "CA"
  ],
  "TUJUNGA": [
    "91043",
    "CA"
  ],
  "VERDUGO CITY": [
    "91046",
    "CA"
  ],
  "SAN MARINO": [
    "91118",
    "CA"
  ],
  "LA CRESCENTA": [
    "91224",
    "CA"
  ],
  "AGOURA HILLS": [
    "91376",
    "CA"
  ],
  "CALABASAS": [
    "91372",
    "CA"
  ],
  "CANOGA PARK": [
    "91309",
    "CA"
  ],
  "WEST HILLS": [
    "91308",
    "CA"
  ],
  "CASTAIC": [
    "91384",
    "CA"
  ],
  "NEWBURY PARK": [
    "91320",
    "CA"
  ],
  "NORTHRIDGE": [
    "91330",
    "CA"
  ],
  "PORTER RANCH": [
    "91326",
    "CA"
  ],
  "PACOIMA": [
    "91334",
    "CA"
  ],
  "RESEDA": [
    "91337",
    "CA"
  ],
  "SAN FERNANDO": [
    "91341",
    "CA"
  ],
  "SYLMAR": [
    "91392",
    "CA"
  ],
  "NORTH HILLS": [
    "91393",
    "CA"
  ],
  "GRANADA HILLS": [
    "91394",
    "CA"
  ],
  "MISSION HILLS": [
    "91395",
    "CA"
  ],
  "SANTA CLARITA": [
    "91390",
    "CA"
  ],
  "CANYON COUNTRY": [
    "91387",
    "CA"
  ],
  "TARZANA": [
    "91357",
    "CA"
  ],
  "THOUSAND OAKS": [
    "91362",
    "CA"
  ],
  "WESTLAKE VILLAGE": [
    "91361",
    "CA"
  ],
  "WOODLAND HILLS": [
    "91371",
    "CA"
  ],
  "STEVENSON RANCH": [
    "91381",
    "CA"
  ],
  "VAN NUYS": [
    "91411",
    "CA"
  ],
  "PANORAMA CITY": [
    "91412",
    "CA"
  ],
  "SHERMAN OAKS": [
    "91495",
    "CA"
  ],
  "NORTH HOLLYWOOD": [
    "91616",
    "CA"
  ],
  "STUDIO CITY": [
    "91614",
    "CA"
  ],
  "VALLEY VILLAGE": [
    "91617",
    "CA"
  ],
  "TOLUCA LAKE": [
    "91610",
    "CA"
  ],
  "RANCHO CUCAMONGA": [
    "91739",
    "CA"
  ],
  "AZUSA": [
    "91702",
    "CA"
  ],
  "BALDWIN PARK": [
    "91706",
    "CA"
  ],
  "CHINO": [
    "91710",
    "CA"
  ],
  "CHINO HILLS": [
    "91709",
    "CA"
  ],
  "CITY OF INDUSTRY": [
    "91716",
    "CA"
  ],
  "COVINA": [
    "91724",
    "CA"
  ],
  "EL MONTE": [
    "91735",
    "CA"
  ],
  "SOUTH EL MONTE": [
    "91733",
    "CA"
  ],
  "GUASTI": [
    "91743",
    "CA"
  ],
  "LA PUENTE": [
    "91749",
    "CA"
  ],
  "HACIENDA HEIGHTS": [
    "91745",
    "CA"
  ],
  "ROWLAND HEIGHTS": [
    "91748",
    "CA"
  ],
  "LA VERNE": [
    "91750",
    "CA"
  ],
  "MIRA LOMA": [
    "91752",
    "CA"
  ],
  "MONTEREY PARK": [
    "91755",
    "CA"
  ],
  "MT BALDY": [
    "91759",
    "CA"
  ],
  "DIAMOND BAR": [
    "91765",
    "CA"
  ],
  "ROSEMEAD": [
    "91772",
    "CA"
  ],
  "SAN DIMAS": [
    "91773",
    "CA"
  ],
  "SAN GABRIEL": [
    "91778",
    "CA"
  ],
  "TEMPLE CITY": [
    "91780",
    "CA"
  ],
  "WEST COVINA": [
    "91793",
    "CA"
  ],
  "BOULEVARD": [
    "91905",
    "CA"
  ],
  "CHULA VISTA": [
    "91921",
    "CA"
  ],
  "DESCANSO": [
    "91916",
    "CA"
  ],
  "DULZURA": [
    "91917",
    "CA"
  ],
  "GUATAY": [
    "91931",
    "CA"
  ],
  "IMPERIAL BEACH": [
    "91933",
    "CA"
  ],
  "JACUMBA": [
    "91934",
    "CA"
  ],
  "JAMUL": [
    "91935",
    "CA"
  ],
  "LEMON GROVE": [
    "91946",
    "CA"
  ],
  "MOUNT LAGUNA": [
    "91948",
    "CA"
  ],
  "POTRERO": [
    "91963",
    "CA"
  ],
  "TECATE": [
    "91980",
    "CA"
  ],
  "BONSALL": [
    "92003",
    "CA"
  ],
  "BORREGO SPRINGS": [
    "92004",
    "CA"
  ],
  "CARDIFF BY THE SEA": [
    "92007",
    "CA"
  ],
  "DEL MAR": [
    "92014",
    "CA"
  ],
  "EL CAJON": [
    "92022",
    "CA"
  ],
  "ENCINITAS": [
    "92024",
    "CA"
  ],
  "ESCONDIDO": [
    "92046",
    "CA"
  ],
  "FALLBROOK": [
    "92088",
    "CA"
  ],
  "LA JOLLA": [
    "92093",
    "CA"
  ],
  "CAMP PENDLETON": [
    "92055",
    "CA"
  ],
  "PALA": [
    "92059",
    "CA"
  ],
  "PALOMAR MOUNTAIN": [
    "92060",
    "CA"
  ],
  "PAUMA VALLEY": [
    "92061",
    "CA"
  ],
  "POWAY": [
    "92074",
    "CA"
  ],
  "RANCHITA": [
    "92066",
    "CA"
  ],
  "RANCHO SANTA FE": [
    "92091",
    "CA"
  ],
  "SAN LUIS REY": [
    "92068",
    "CA"
  ],
  "SANTA YSABEL": [
    "92070",
    "CA"
  ],
  "SOLANA BEACH": [
    "92075",
    "CA"
  ],
  "VISTA": [
    "92085",
    "CA"
  ],
  "WARNER SPRINGS": [
    "92086",
    "CA"
  ],
  "CORONADO": [
    "92178",
    "CA"
  ],
  "INDIO": [
    "92203",
    "CA"
  ],
  "PALM DESERT": [
    "92261",
    "CA"
  ],
  "BANNING": [
    "92220",
    "CA"
  ],
  "BRAWLEY": [
    "92227",
    "CA"
  ],
  "CABAZON": [
    "92230",
    "CA"
  ],
  "CALEXICO": [
    "92232",
    "CA"
  ],
  "CALIPATRIA": [
    "92233",
    "CA"
  ],
  "CATHEDRAL CITY": [
    "92235",
    "CA"
  ],
  "COACHELLA": [
    "92236",
    "CA"
  ],
  "DESERT CENTER": [
    "92239",
    "CA"
  ],
  "DESERT HOT SPRINGS": [
    "92241",
    "CA"
  ],
  "EARP": [
    "92242",
    "CA"
  ],
  "EL CENTRO": [
    "92244",
    "CA"
  ],
  "LA QUINTA": [
    "92253",
    "CA"
  ],
  "HOLTVILLE": [
    "92250",
    "CA"
  ],
  "JOSHUA TREE": [
    "92252",
    "CA"
  ],
  "MORONGO VALLEY": [
    "92256",
    "CA"
  ],
  "NILAND": [
    "92257",
    "CA"
  ],
  "NORTH PALM SPRINGS": [
    "92258",
    "CA"
  ],
  "OCOTILLO": [
    "92259",
    "CA"
  ],
  "PALM SPRINGS": [
    "92264",
    "CA"
  ],
  "PARKER DAM": [
    "92267",
    "CA"
  ],
  "PIONEERTOWN": [
    "92268",
    "CA"
  ],
  "RANCHO MIRAGE": [
    "92270",
    "CA"
  ],
  "SEELEY": [
    "92273",
    "CA"
  ],
  "THERMAL": [
    "92274",
    "CA"
  ],
  "SALTON CITY": [
    "92275",
    "CA"
  ],
  "THOUSAND PALMS": [
    "92276",
    "CA"
  ],
  "TWENTYNINE PALMS": [
    "92278",
    "CA"
  ],
  "VIDAL": [
    "92280",
    "CA"
  ],
  "WESTMORLAND": [
    "92281",
    "CA"
  ],
  "WINTERHAVEN": [
    "92283",
    "CA"
  ],
  "YUCCA VALLEY": [
    "92286",
    "CA"
  ],
  "LANDERS": [
    "92285",
    "CA"
  ],
  "ADELANTO": [
    "92301",
    "CA"
  ],
  "ANGELUS OAKS": [
    "92305",
    "CA"
  ],
  "APPLE VALLEY": [
    "92308",
    "CA"
  ],
  "FORT IRWIN": [
    "92310",
    "CA"
  ],
  "GRAND TERRACE": [
    "92313",
    "CA"
  ],
  "BIG BEAR CITY": [
    "92314",
    "CA"
  ],
  "BIG BEAR LAKE": [
    "92315",
    "CA"
  ],
  "BLUE JAY": [
    "92317",
    "CA"
  ],
  "CALIMESA": [
    "92320",
    "CA"
  ],
  "CEDAR GLEN": [
    "92321",
    "CA"
  ],
  "CEDARPINES PARK": [
    "92322",
    "CA"
  ],
  "CIMA": [
    "92323",
    "CA"
  ],
  "CREST PARK": [
    "92326",
    "CA"
  ],
  "DEATH VALLEY": [
    "92328",
    "CA"
  ],
  "PHELAN": [
    "92371",
    "CA"
  ],
  "FAWNSKIN": [
    "92333",
    "CA"
  ],
  "FOREST FALLS": [
    "92339",
    "CA"
  ],
  "GREEN VALLEY LAKE": [
    "92341",
    "CA"
  ],
  "HELENDALE": [
    "92342",
    "CA"
  ],
  "HINKLEY": [
    "92347",
    "CA"
  ],
  "LOMA LINDA": [
    "92357",
    "CA"
  ],
  "LAKE ARROWHEAD": [
    "92352",
    "CA"
  ],
  "LUCERNE VALLEY": [
    "92356",
    "CA"
  ],
  "LYTLE CREEK": [
    "92358",
    "CA"
  ],
  "NEEDLES": [
    "92363",
    "CA"
  ],
  "NIPTON": [
    "92364",
    "CA"
  ],
  "NEWBERRY SPRINGS": [
    "92365",
    "CA"
  ],
  "MOUNTAIN PASS": [
    "92366",
    "CA"
  ],
  "ORO GRANDE": [
    "92368",
    "CA"
  ],
  "PINON HILLS": [
    "92372",
    "CA"
  ],
  "REDLANDS": [
    "92375",
    "CA"
  ],
  "RIALTO": [
    "92377",
    "CA"
  ],
  "RIMFOREST": [
    "92378",
    "CA"
  ],
  "RUNNING SPRINGS": [
    "92382",
    "CA"
  ],
  "SKYFOREST": [
    "92385",
    "CA"
  ],
  "TECOPA": [
    "92389",
    "CA"
  ],
  "TWIN PEAKS": [
    "92391",
    "CA"
  ],
  "VICTORVILLE": [
    "92395",
    "CA"
  ],
  "WRIGHTWOOD": [
    "92397",
    "CA"
  ],
  "YERMO": [
    "92398",
    "CA"
  ],
  "YUCAIPA": [
    "92399",
    "CA"
  ],
  "SAN BERNARDINO": [
    "92427",
    "CA"
  ],
  "MARCH AIR RESERVE BASE": [
    "92518",
    "CA"
  ],
  "LAKE ELSINORE": [
    "92532",
    "CA"
  ],
  "AGUANGA": [
    "92536",
    "CA"
  ],
  "ANZA": [
    "92539",
    "CA"
  ],
  "HEMET": [
    "92546",
    "CA"
  ],
  "IDYLLWILD": [
    "92549",
    "CA"
  ],
  "MORENO VALLEY": [
    "92557",
    "CA"
  ],
  "MOUNTAIN CENTER": [
    "92561",
    "CA"
  ],
  "MURRIETA": [
    "92564",
    "CA"
  ],
  "NUEVO": [
    "92567",
    "CA"
  ],
  "PERRIS": [
    "92599",
    "CA"
  ],
  "SAN JACINTO": [
    "92583",
    "CA"
  ],
  "QUAIL VALLEY": [
    "92587",
    "CA"
  ],
  "TEMECULA": [
    "92593",
    "CA"
  ],
  "WILDOMAR": [
    "92595",
    "CA"
  ],
  "HUNTINGTON BEACH": [
    "92649",
    "CA"
  ],
  "LAGUNA NIGUEL": [
    "92677",
    "CA"
  ],
  "EL TORO": [
    "92609",
    "CA"
  ],
  "FOOTHILL RANCH": [
    "92610",
    "CA"
  ],
  "CAPISTRANO BEACH": [
    "92624",
    "CA"
  ],
  "CORONA DEL MAR": [
    "92625",
    "CA"
  ],
  "COSTA MESA": [
    "92628",
    "CA"
  ],
  "DANA POINT": [
    "92629",
    "CA"
  ],
  "LAGUNA WOODS": [
    "92637",
    "CA"
  ],
  "EAST IRVINE": [
    "92650",
    "CA"
  ],
  "LAGUNA BEACH": [
    "92652",
    "CA"
  ],
  "LAGUNA HILLS": [
    "92654",
    "CA"
  ],
  "MIDWAY CITY": [
    "92655",
    "CA"
  ],
  "ALISO VIEJO": [
    "92698",
    "CA"
  ],
  "NEWPORT COAST": [
    "92657",
    "CA"
  ],
  "NEWPORT BEACH": [
    "92663",
    "CA"
  ],
  "SAN CLEMENTE": [
    "92674",
    "CA"
  ],
  "SAN JUAN CAPISTRANO": [
    "92693",
    "CA"
  ],
  "SILVERADO": [
    "92676",
    "CA"
  ],
  "TRABUCO CANYON": [
    "92679",
    "CA"
  ],
  "RANCHO SANTA MARGARITA": [
    "92688",
    "CA"
  ],
  "MISSION VIEJO": [
    "92692",
    "CA"
  ],
  "LADERA RANCH": [
    "92694",
    "CA"
  ],
  "SANTA ANA": [
    "92799",
    "CA"
  ],
  "FOUNTAIN VALLEY": [
    "92728",
    "CA"
  ],
  "ANAHEIM": [
    "92850",
    "CA"
  ],
  "BREA": [
    "92823",
    "CA"
  ],
  "PLACENTIA": [
    "92871",
    "CA"
  ],
  "YORBA LINDA": [
    "92887",
    "CA"
  ],
  "CAMARILLO": [
    "93012",
    "CA"
  ],
  "CARPINTERIA": [
    "93014",
    "CA"
  ],
  "MOORPARK": [
    "93021",
    "CA"
  ],
  "OAK VIEW": [
    "93022",
    "CA"
  ],
  "OJAI": [
    "93024",
    "CA"
  ],
  "OXNARD": [
    "93036",
    "CA"
  ],
  "PIRU": [
    "93040",
    "CA"
  ],
  "PORT HUENEME": [
    "93044",
    "CA"
  ],
  "POINT MUGU NAWC": [
    "93042",
    "CA"
  ],
  "PORT HUENEME CBC BASE": [
    "93043",
    "CA"
  ],
  "SANTA PAULA": [
    "93061",
    "CA"
  ],
  "SIMI VALLEY": [
    "93099",
    "CA"
  ],
  "BRANDEIS": [
    "93064",
    "CA"
  ],
  "SOMIS": [
    "93066",
    "CA"
  ],
  "SUMMERLAND": [
    "93067",
    "CA"
  ],
  "SANTA BARBARA": [
    "93190",
    "CA"
  ],
  "GOLETA": [
    "93199",
    "CA"
  ],
  "ALPAUGH": [
    "93201",
    "CA"
  ],
  "ARMONA": [
    "93202",
    "CA"
  ],
  "ARVIN": [
    "93203",
    "CA"
  ],
  "AVENAL": [
    "93204",
    "CA"
  ],
  "BODFISH": [
    "93205",
    "CA"
  ],
  "BUTTONWILLOW": [
    "93206",
    "CA"
  ],
  "CALIFORNIA HOT SPRINGS": [
    "93207",
    "CA"
  ],
  "CAMP NELSON": [
    "93208",
    "CA"
  ],
  "COALINGA": [
    "93210",
    "CA"
  ],
  "CORCORAN": [
    "93212",
    "CA"
  ],
  "DUCOR": [
    "93218",
    "CA"
  ],
  "EARLIMART": [
    "93219",
    "CA"
  ],
  "PINE MOUNTAIN CLUB": [
    "93222",
    "CA"
  ],
  "FELLOWS": [
    "93224",
    "CA"
  ],
  "FRAZIER PARK": [
    "93225",
    "CA"
  ],
  "HANFORD": [
    "93232",
    "CA"
  ],
  "KERNVILLE": [
    "93238",
    "CA"
  ],
  "KETTLEMAN CITY": [
    "93239",
    "CA"
  ],
  "LAKE ISABELLA": [
    "93240",
    "CA"
  ],
  "LATON": [
    "93242",
    "CA"
  ],
  "LEBEC": [
    "93243",
    "CA"
  ],
  "LEMON COVE": [
    "93244",
    "CA"
  ],
  "LEMOORE": [
    "93246",
    "CA"
  ],
  "LOST HILLS": [
    "93249",
    "CA"
  ],
  "MC KITTRICK": [
    "93251",
    "CA"
  ],
  "NEW CUYAMA": [
    "93254",
    "CA"
  ],
  "ONYX": [
    "93255",
    "CA"
  ],
  "PIXLEY": [
    "93256",
    "CA"
  ],
  "POSEY": [
    "93260",
    "CA"
  ],
  "RICHGROVE": [
    "93261",
    "CA"
  ],
  "SEQUOIA NATIONAL PARK": [
    "93262",
    "CA"
  ],
  "SHAFTER": [
    "93263",
    "CA"
  ],
  "STRATHMORE": [
    "93267",
    "CA"
  ],
  "TERRA BELLA": [
    "93270",
    "CA"
  ],
  "TUPMAN": [
    "93276",
    "CA"
  ],
  "VISALIA": [
    "93292",
    "CA"
  ],
  "WAUKENA": [
    "93282",
    "CA"
  ],
  "WOFFORD HEIGHTS": [
    "93285",
    "CA"
  ],
  "SAN LUIS OBISPO": [
    "93409",
    "CA"
  ],
  "LOS OSOS": [
    "93412",
    "CA"
  ],
  "ARROYO GRANDE": [
    "93421",
    "CA"
  ],
  "ATASCADERO": [
    "93423",
    "CA"
  ],
  "AVILA BEACH": [
    "93424",
    "CA"
  ],
  "BUELLTON": [
    "93427",
    "CA"
  ],
  "CASMALIA": [
    "93429",
    "CA"
  ],
  "CAYUCOS": [
    "93430",
    "CA"
  ],
  "GROVER BEACH": [
    "93483",
    "CA"
  ],
  "GUADALUPE": [
    "93434",
    "CA"
  ],
  "LOMPOC": [
    "93438",
    "CA"
  ],
  "LOS OLIVOS": [
    "93441",
    "CA"
  ],
  "MORRO BAY": [
    "93443",
    "CA"
  ],
  "NIPOMO": [
    "93444",
    "CA"
  ],
  "OCEANO": [
    "93475",
    "CA"
  ],
  "PASO ROBLES": [
    "93447",
    "CA"
  ],
  "PISMO BEACH": [
    "93449",
    "CA"
  ],
  "SAN ARDO": [
    "93450",
    "CA"
  ],
  "SAN SIMEON": [
    "93452",
    "CA"
  ],
  "SANTA MARGARITA": [
    "93453",
    "CA"
  ],
  "SANTA YNEZ": [
    "93460",
    "CA"
  ],
  "SOLVANG": [
    "93464",
    "CA"
  ],
  "MOJAVE": [
    "93502",
    "CA"
  ],
  "CALIFORNIA CITY": [
    "93505",
    "CA"
  ],
  "BIG PINE": [
    "93513",
    "CA"
  ],
  "BORON": [
    "93596",
    "CA"
  ],
  "INYOKERN": [
    "93527",
    "CA"
  ],
  "JUNE LAKE": [
    "93529",
    "CA"
  ],
  "KEELER": [
    "93530",
    "CA"
  ],
  "LAKE HUGHES": [
    "93532",
    "CA"
  ],
  "LEE VINING": [
    "93541",
    "CA"
  ],
  "LITTLEROCK": [
    "98556",
    "WA"
  ],
  "LONE PINE": [
    "93545",
    "CA"
  ],
  "MAMMOTH LAKES": [
    "93546",
    "CA"
  ],
  "OLANCHA": [
    "93549",
    "CA"
  ],
  "PEARBLOSSOM": [
    "93553",
    "CA"
  ],
  "RANDSBURG": [
    "93554",
    "CA"
  ],
  "RED MOUNTAIN": [
    "93558",
    "CA"
  ],
  "TEHACHAPI": [
    "93581",
    "CA"
  ],
  "TRONA": [
    "93592",
    "CA"
  ],
  "VALYERMO": [
    "93563",
    "CA"
  ],
  "AHWAHNEE": [
    "93601",
    "CA"
  ],
  "AUBERRY": [
    "93602",
    "CA"
  ],
  "BASS LAKE": [
    "93604",
    "CA"
  ],
  "BIOLA": [
    "93606",
    "CA"
  ],
  "BURREL": [
    "93607",
    "CA"
  ],
  "CANTUA CREEK": [
    "93608",
    "CA"
  ],
  "CARUTHERS": [
    "93609",
    "CA"
  ],
  "CHOWCHILLA": [
    "93610",
    "CA"
  ],
  "COARSEGOLD": [
    "93614",
    "CA"
  ],
  "DEL REY": [
    "93616",
    "CA"
  ],
  "DINUBA": [
    "93618",
    "CA"
  ],
  "DOS PALOS": [
    "93620",
    "CA"
  ],
  "FIREBAUGH": [
    "93622",
    "CA"
  ],
  "FISH CAMP": [
    "93623",
    "CA"
  ],
  "FRIANT": [
    "93626",
    "CA"
  ],
  "HELM": [
    "93627",
    "CA"
  ],
  "KERMAN": [
    "93630",
    "CA"
  ],
  "KINGSBURG": [
    "93631",
    "CA"
  ],
  "KINGS CANYON NATIONAL PK": [
    "93633",
    "CA"
  ],
  "LOS BANOS": [
    "93635",
    "CA"
  ],
  "MIRAMONTE": [
    "93641",
    "CA"
  ],
  "MONO HOT SPRINGS": [
    "93642",
    "CA"
  ],
  "O NEALS": [
    "93645",
    "CA"
  ],
  "ORANGE COVE": [
    "93646",
    "CA"
  ],
  "OROSI": [
    "93647",
    "CA"
  ],
  "PARLIER": [
    "93648",
    "CA"
  ],
  "PIEDRA": [
    "93649",
    "CA"
  ],
  "PRATHER": [
    "93651",
    "CA"
  ],
  "RAISIN CITY": [
    "93652",
    "CA"
  ],
  "REEDLEY": [
    "93654",
    "CA"
  ],
  "SAN JOAQUIN": [
    "93660",
    "CA"
  ],
  "SHAVER LAKE": [
    "93664",
    "CA"
  ],
  "SOUTH DOS PALOS": [
    "93665",
    "CA"
  ],
  "SULTANA": [
    "93666",
    "CA"
  ],
  "TOLLHOUSE": [
    "93667",
    "CA"
  ],
  "TRANQUILLITY": [
    "93668",
    "CA"
  ],
  "WISHON": [
    "93669",
    "CA"
  ],
  "YETTEM": [
    "93670",
    "CA"
  ],
  "TRAVER": [
    "93673",
    "CA"
  ],
  "SQUAW VALLEY": [
    "93675",
    "CA"
  ],
  "SALINAS": [
    "93915",
    "CA"
  ],
  "BIG SUR": [
    "93920",
    "CA"
  ],
  "CARMEL BY THE SEA": [
    "93921",
    "CA"
  ],
  "CARMEL VALLEY": [
    "93924",
    "CA"
  ],
  "CHUALAR": [
    "93925",
    "CA"
  ],
  "JOLON": [
    "93928",
    "CA"
  ],
  "MARINA": [
    "93933",
    "CA"
  ],
  "PACIFIC GROVE": [
    "93950",
    "CA"
  ],
  "PEBBLE BEACH": [
    "93953",
    "CA"
  ],
  "SAN LUCAS": [
    "93954",
    "CA"
  ],
  "SEASIDE": [
    "97138",
    "OR"
  ],
  "SOLEDAD": [
    "93960",
    "CA"
  ],
  "SPRECKELS": [
    "93962",
    "CA"
  ],
  "BRISBANE": [
    "94005",
    "CA"
  ],
  "DALY CITY": [
    "94017",
    "CA"
  ],
  "EL GRANADA": [
    "94018",
    "CA"
  ],
  "HALF MOON BAY": [
    "94019",
    "CA"
  ],
  "LA HONDA": [
    "94020",
    "CA"
  ],
  "LOMA MAR": [
    "94021",
    "CA"
  ],
  "LOS ALTOS": [
    "94024",
    "CA"
  ],
  "MENLO PARK": [
    "94026",
    "CA"
  ],
  "ATHERTON": [
    "94027",
    "CA"
  ],
  "PORTOLA VALLEY": [
    "94028",
    "CA"
  ],
  "MILLBRAE": [
    "94030",
    "CA"
  ],
  "MONTARA": [
    "94037",
    "CA"
  ],
  "MOSS BEACH": [
    "94038",
    "CA"
  ],
  "PACIFICA": [
    "94044",
    "CA"
  ],
  "PESCADERO": [
    "94060",
    "CA"
  ],
  "REDWOOD CITY": [
    "94065",
    "CA"
  ],
  "SAN BRUNO": [
    "94066",
    "CA"
  ],
  "SAN GREGORIO": [
    "94074",
    "CA"
  ],
  "SOUTH SAN FRANCISCO": [
    "94083",
    "CA"
  ],
  "SAN FRANCISCO": [
    "94188",
    "CA"
  ],
  "PALO ALTO": [
    "94309",
    "CA"
  ],
  "ALAMEDA": [
    "94502",
    "CA"
  ],
  "AMERICAN CANYON": [
    "94503",
    "CA"
  ],
  "DISCOVERY BAY": [
    "94505",
    "CA"
  ],
  "ANGWIN": [
    "94508",
    "CA"
  ],
  "BENICIA": [
    "94510",
    "CA"
  ],
  "BETHEL ISLAND": [
    "94511",
    "CA"
  ],
  "BIRDS LANDING": [
    "94512",
    "CA"
  ],
  "CALISTOGA": [
    "94515",
    "CA"
  ],
  "DIABLO": [
    "94528",
    "CA"
  ],
  "EL CERRITO": [
    "94530",
    "CA"
  ],
  "TRAVIS AFB": [
    "94535",
    "CA"
  ],
  "CASTRO VALLEY": [
    "94552",
    "CA"
  ],
  "HERCULES": [
    "94547",
    "CA"
  ],
  "KNIGHTSEN": [
    "94548",
    "CA"
  ],
  "MARTINEZ": [
    "94553",
    "CA"
  ],
  "MORAGA": [
    "94575",
    "CA"
  ],
  "NAPA": [
    "94581",
    "CA"
  ],
  "ORINDA": [
    "94563",
    "CA"
  ],
  "PINOLE": [
    "94564",
    "CA"
  ],
  "POPE VALLEY": [
    "94567",
    "CA"
  ],
  "PORT COSTA": [
    "94569",
    "CA"
  ],
  "SAN LEANDRO": [
    "94579",
    "CA"
  ],
  "SAN LORENZO": [
    "94580",
    "CA"
  ],
  "SAN RAMON": [
    "94583",
    "CA"
  ],
  "SUISUN CITY": [
    "94585",
    "CA"
  ],
  "SUNOL": [
    "94586",
    "CA"
  ],
  "VALLEJO": [
    "94592",
    "CA"
  ],
  "YOUNTVILLE": [
    "94599",
    "CA"
  ],
  "EMERYVILLE": [
    "94662",
    "CA"
  ],
  "EL SOBRANTE": [
    "94820",
    "CA"
  ],
  "SAN PABLO": [
    "94806",
    "CA"
  ],
  "GREENBRAE": [
    "94904",
    "CA"
  ],
  "KENTFIELD": [
    "94914",
    "CA"
  ],
  "BELVEDERE TIBURON": [
    "94920",
    "CA"
  ],
  "BODEGA": [
    "94922",
    "CA"
  ],
  "BODEGA BAY": [
    "94923",
    "CA"
  ],
  "BOLINAS": [
    "94924",
    "CA"
  ],
  "CORTE MADERA": [
    "94976",
    "CA"
  ],
  "ROHNERT PARK": [
    "94928",
    "CA"
  ],
  "DILLON BEACH": [
    "94929",
    "CA"
  ],
  "COTATI": [
    "94931",
    "CA"
  ],
  "FOREST KNOLLS": [
    "94933",
    "CA"
  ],
  "LAGUNITAS": [
    "94938",
    "CA"
  ],
  "MILL VALLEY": [
    "94942",
    "CA"
  ],
  "NOVATO": [
    "94998",
    "CA"
  ],
  "NICASIO": [
    "94946",
    "CA"
  ],
  "OLEMA": [
    "94950",
    "CA"
  ],
  "PENNGROVE": [
    "94951",
    "CA"
  ],
  "PETALUMA": [
    "94975",
    "CA"
  ],
  "POINT REYES STATION": [
    "94956",
    "CA"
  ],
  "SAN ANSELMO": [
    "94979",
    "CA"
  ],
  "SAN GERONIMO": [
    "94963",
    "CA"
  ],
  "SAN QUENTIN": [
    "94964",
    "CA"
  ],
  "SAUSALITO": [
    "94966",
    "CA"
  ],
  "STINSON BEACH": [
    "94970",
    "CA"
  ],
  "TOMALES": [
    "94971",
    "CA"
  ],
  "VALLEY FORD": [
    "94972",
    "CA"
  ],
  "WOODACRE": [
    "94973",
    "CA"
  ],
  "APTOS": [
    "95003",
    "CA"
  ],
  "ALVISO": [
    "95002",
    "CA"
  ],
  "AROMAS": [
    "95004",
    "CA"
  ],
  "BOULDER CREEK": [
    "95006",
    "CA"
  ],
  "BROOKDALE": [
    "95007",
    "CA"
  ],
  "CAPITOLA": [
    "95010",
    "CA"
  ],
  "CUPERTINO": [
    "95015",
    "CA"
  ],
  "GILROY": [
    "95021",
    "CA"
  ],
  "HOLY CITY": [
    "95026",
    "CA"
  ],
  "LOS GATOS": [
    "95033",
    "CA"
  ],
  "MILPITAS": [
    "95036",
    "CA"
  ],
  "MORGAN HILL": [
    "95038",
    "CA"
  ],
  "MOSS LANDING": [
    "95039",
    "CA"
  ],
  "NEW ALMADEN": [
    "95042",
    "CA"
  ],
  "PAICINES": [
    "95043",
    "CA"
  ],
  "REDWOOD ESTATES": [
    "95044",
    "CA"
  ],
  "SAN JUAN BAUTISTA": [
    "95045",
    "CA"
  ],
  "SAN MARTIN": [
    "95046",
    "CA"
  ],
  "SCOTTS VALLEY": [
    "95067",
    "CA"
  ],
  "SOQUEL": [
    "95073",
    "CA"
  ],
  "TRES PINOS": [
    "95075",
    "CA"
  ],
  "WATSONVILLE": [
    "95077",
    "CA"
  ],
  "MOUNT HAMILTON": [
    "95140",
    "CA"
  ],
  "ACAMPO": [
    "95220",
    "CA"
  ],
  "ALTAVILLE": [
    "95221",
    "CA"
  ],
  "ANGELS CAMP": [
    "95222",
    "CA"
  ],
  "BURSON": [
    "95225",
    "CA"
  ],
  "CAMPO SECO": [
    "95226",
    "CA"
  ],
  "COPPEROPOLIS": [
    "95228",
    "CA"
  ],
  "DOUGLAS FLAT": [
    "95229",
    "CA"
  ],
  "HATHAWAY PINES": [
    "95233",
    "CA"
  ],
  "LOCKEFORD": [
    "95237",
    "CA"
  ],
  "MOKELUMNE HILL": [
    "95245",
    "CA"
  ],
  "MOUNTAIN RANCH": [
    "95246",
    "CA"
  ],
  "MURPHYS": [
    "95247",
    "CA"
  ],
  "RAIL ROAD FLAT": [
    "95248",
    "CA"
  ],
  "SAN ANDREAS": [
    "95249",
    "CA"
  ],
  "VALLECITO": [
    "95251",
    "CA"
  ],
  "WILSEYVILLE": [
    "95257",
    "CA"
  ],
  "BALLICO": [
    "95303",
    "CA"
  ],
  "BIG OAK FLAT": [
    "95305",
    "CA"
  ],
  "CATHEYS VALLEY": [
    "95306",
    "CA"
  ],
  "CHINESE CAMP": [
    "95309",
    "CA"
  ],
  "CRESSEY": [
    "95312",
    "CA"
  ],
  "CROWS LANDING": [
    "95313",
    "CA"
  ],
  "DENAIR": [
    "95316",
    "CA"
  ],
  "EL NIDO": [
    "95317",
    "CA"
  ],
  "EL PORTAL": [
    "95318",
    "CA"
  ],
  "ESCALON": [
    "95320",
    "CA"
  ],
  "HILMAR": [
    "95324",
    "CA"
  ],
  "HORNITOS": [
    "95325",
    "CA"
  ],
  "HUGHSON": [
    "95326",
    "CA"
  ],
  "LONG BARN": [
    "95335",
    "CA"
  ],
  "MANTECA": [
    "95337",
    "CA"
  ],
  "MARIPOSA": [
    "95338",
    "CA"
  ],
  "MERCED": [
    "95348",
    "CA"
  ],
  "MIDPINES": [
    "95345",
    "CA"
  ],
  "MI WUK VILLAGE": [
    "95346",
    "CA"
  ],
  "PINECREST": [
    "95364",
    "CA"
  ],
  "PLANADA": [
    "95365",
    "CA"
  ],
  "RIVERBANK": [
    "95367",
    "CA"
  ],
  "SNELLING": [
    "95369",
    "CA"
  ],
  "SOULSBYVILLE": [
    "95372",
    "CA"
  ],
  "STEVINSON": [
    "95374",
    "CA"
  ],
  "TUOLUMNE": [
    "95379",
    "CA"
  ],
  "TURLOCK": [
    "95382",
    "CA"
  ],
  "TWAIN HARTE": [
    "95383",
    "CA"
  ],
  "VERNALIS": [
    "95385",
    "CA"
  ],
  "WESTLEY": [
    "95387",
    "CA"
  ],
  "YOSEMITE NATIONAL PARK": [
    "95389",
    "CA"
  ],
  "BOYES HOT SPRINGS": [
    "95416",
    "CA"
  ],
  "BRANSCOMB": [
    "95417",
    "CA"
  ],
  "CALPELLA": [
    "95418",
    "CA"
  ],
  "CAMP MEEKER": [
    "95419",
    "CA"
  ],
  "CASPAR": [
    "95420",
    "CA"
  ],
  "CAZADERO": [
    "95421",
    "CA"
  ],
  "CLEARLAKE": [
    "98235",
    "WA"
  ],
  "CLEARLAKE OAKS": [
    "95423",
    "CA"
  ],
  "CLEARLAKE PARK": [
    "95424",
    "CA"
  ],
  "COMPTCHE": [
    "95427",
    "CA"
  ],
  "COVELO": [
    "95428",
    "CA"
  ],
  "DOS RIOS": [
    "95429",
    "CA"
  ],
  "DUNCANS MILLS": [
    "95430",
    "CA"
  ],
  "ELK": [
    "99009",
    "WA"
  ],
  "EL VERANO": [
    "95433",
    "CA"
  ],
  "GEYSERVILLE": [
    "95441",
    "CA"
  ],
  "GLEN ELLEN": [
    "95442",
    "CA"
  ],
  "GLENHAVEN": [
    "95443",
    "CA"
  ],
  "GRATON": [
    "95444",
    "CA"
  ],
  "GUALALA": [
    "95445",
    "CA"
  ],
  "GUERNEVILLE": [
    "95446",
    "CA"
  ],
  "HEALDSBURG": [
    "95448",
    "CA"
  ],
  "HOPLAND": [
    "95449",
    "CA"
  ],
  "JENNER": [
    "95450",
    "CA"
  ],
  "KELSEYVILLE": [
    "95451",
    "CA"
  ],
  "KENWOOD": [
    "95452",
    "CA"
  ],
  "LAKEPORT": [
    "95453",
    "CA"
  ],
  "LAYTONVILLE": [
    "95454",
    "CA"
  ],
  "LOWER LAKE": [
    "95457",
    "CA"
  ],
  "MENDOCINO": [
    "95460",
    "CA"
  ],
  "MONTE RIO": [
    "95462",
    "CA"
  ],
  "NAVARRO": [
    "95463",
    "CA"
  ],
  "NICE": [
    "95464",
    "CA"
  ],
  "OCCIDENTAL": [
    "95465",
    "CA"
  ],
  "HIDDEN VALLEY LAKE": [
    "95467",
    "CA"
  ],
  "POINT ARENA": [
    "95468",
    "CA"
  ],
  "POTTER VALLEY": [
    "95469",
    "CA"
  ],
  "REDWOOD VALLEY": [
    "95470",
    "CA"
  ],
  "RIO NIDO": [
    "95471",
    "CA"
  ],
  "SONOMA": [
    "95476",
    "CA"
  ],
  "STEWARTS POINT": [
    "95480",
    "CA"
  ],
  "UKIAH": [
    "97880",
    "OR"
  ],
  "UPPER LAKE": [
    "95485",
    "CA"
  ],
  "VILLA GRANDE": [
    "95486",
    "CA"
  ],
  "VINEBURG": [
    "95487",
    "CA"
  ],
  "WILLITS": [
    "95490",
    "CA"
  ],
  "WITTER SPRINGS": [
    "95493",
    "CA"
  ],
  "THE SEA RANCH": [
    "95497",
    "CA"
  ],
  "ALDERPOINT": [
    "95511",
    "CA"
  ],
  "BLOCKSBURG": [
    "95514",
    "CA"
  ],
  "ARCATA": [
    "95521",
    "CA"
  ],
  "MCKINLEYVILLE": [
    "95519",
    "CA"
  ],
  "BLUE LAKE": [
    "95525",
    "CA"
  ],
  "BURNT RANCH": [
    "95527",
    "CA"
  ],
  "CARLOTTA": [
    "95528",
    "CA"
  ],
  "CUTTEN": [
    "95534",
    "CA"
  ],
  "FIELDS LANDING": [
    "95537",
    "CA"
  ],
  "FORT DICK": [
    "95538",
    "CA"
  ],
  "GARBERVILLE": [
    "95542",
    "CA"
  ],
  "GASQUET": [
    "95543",
    "CA"
  ],
  "HONEYDEW": [
    "95545",
    "CA"
  ],
  "HOOPA": [
    "95546",
    "CA"
  ],
  "HYDESVILLE": [
    "95547",
    "CA"
  ],
  "KLAMATH": [
    "95548",
    "CA"
  ],
  "KNEELAND": [
    "95549",
    "CA"
  ],
  "KORBEL": [
    "95550",
    "CA"
  ],
  "LOLETA": [
    "95551",
    "CA"
  ],
  "MAD RIVER": [
    "95552",
    "CA"
  ],
  "MIRANDA": [
    "95553",
    "CA"
  ],
  "MYERS FLAT": [
    "95554",
    "CA"
  ],
  "ORICK": [
    "95555",
    "CA"
  ],
  "PHILLIPSVILLE": [
    "95559",
    "CA"
  ],
  "REDWAY": [
    "95560",
    "CA"
  ],
  "RIO DELL": [
    "95562",
    "CA"
  ],
  "SALYER": [
    "95563",
    "CA"
  ],
  "SAMOA": [
    "95564",
    "CA"
  ],
  "SMITH RIVER": [
    "95567",
    "CA"
  ],
  "SOMES BAR": [
    "95568",
    "CA"
  ],
  "REDCREST": [
    "95569",
    "CA"
  ],
  "WEOTT": [
    "95571",
    "CA"
  ],
  "PIERCY": [
    "95587",
    "CA"
  ],
  "WHITETHORN": [
    "95589",
    "CA"
  ],
  "ZENIA": [
    "95595",
    "CA"
  ],
  "AMADOR CITY": [
    "95601",
    "CA"
  ],
  "WEST SACRAMENTO": [
    "95799",
    "CA"
  ],
  "CAPAY": [
    "95607",
    "CA"
  ],
  "CARMICHAEL": [
    "95609",
    "CA"
  ],
  "CITRUS HEIGHTS": [
    "95621",
    "CA"
  ],
  "COOL": [
    "95614",
    "CA"
  ],
  "DIAMOND SPRINGS": [
    "95619",
    "CA"
  ],
  "ELK GROVE": [
    "95759",
    "CA"
  ],
  "ELVERTA": [
    "95626",
    "CA"
  ],
  "ESPARTO": [
    "95627",
    "CA"
  ],
  "FIDDLETOWN": [
    "95629",
    "CA"
  ],
  "FORESTHILL": [
    "95631",
    "CA"
  ],
  "GRIZZLY FLATS": [
    "95636",
    "CA"
  ],
  "GUINDA": [
    "95637",
    "CA"
  ],
  "HERALD": [
    "95638",
    "CA"
  ],
  "IONE": [
    "99139",
    "WA"
  ],
  "ISLETON": [
    "95641",
    "CA"
  ],
  "KNIGHTS LANDING": [
    "95645",
    "CA"
  ],
  "LOTUS": [
    "95651",
    "CA"
  ],
  "MCCLELLAN": [
    "95652",
    "CA"
  ],
  "MOUNT AUKUM": [
    "95656",
    "CA"
  ],
  "NICOLAUS": [
    "95659",
    "CA"
  ],
  "NORTH HIGHLANDS": [
    "95660",
    "CA"
  ],
  "ORANGEVALE": [
    "95662",
    "CA"
  ],
  "PILOT HILL": [
    "95664",
    "CA"
  ],
  "RANCHO CORDOVA": [
    "95742",
    "CA"
  ],
  "REPRESA": [
    "95671",
    "CA"
  ],
  "RIO LINDA": [
    "95673",
    "CA"
  ],
  "RIO OSO": [
    "95674",
    "CA"
  ],
  "RIVER PINES": [
    "95675",
    "CA"
  ],
  "ROCKLIN": [
    "95765",
    "CA"
  ],
  "SHINGLE SPRINGS": [
    "95682",
    "CA"
  ],
  "SLOUGHHOUSE": [
    "95683",
    "CA"
  ],
  "SUTTER CREEK": [
    "95685",
    "CA"
  ],
  "VACAVILLE": [
    "95696",
    "CA"
  ],
  "VOLCANO": [
    "96785",
    "HI"
  ],
  "YOLO": [
    "95697",
    "CA"
  ],
  "ZAMORA": [
    "95698",
    "CA"
  ],
  "DRYTOWN": [
    "95699",
    "CA"
  ],
  "CAMINO": [
    "95709",
    "CA"
  ],
  "CHICAGO PARK": [
    "95712",
    "CA"
  ],
  "DUTCH FLAT": [
    "95714",
    "CA"
  ],
  "EMIGRANT GAP": [
    "95715",
    "CA"
  ],
  "GOLD RUN": [
    "95717",
    "CA"
  ],
  "KYBURZ": [
    "95720",
    "CA"
  ],
  "ECHO LAKE": [
    "95721",
    "CA"
  ],
  "MEADOW VISTA": [
    "95722",
    "CA"
  ],
  "NORDEN": [
    "95724",
    "CA"
  ],
  "POLLOCK PINES": [
    "95726",
    "CA"
  ],
  "GRANITE BAY": [
    "95746",
    "CA"
  ],
  "EL DORADO HILLS": [
    "95762",
    "CA"
  ],
  "BEALE AFB": [
    "95903",
    "CA"
  ],
  "ALLEGHANY": [
    "95910",
    "CA"
  ],
  "ARBUCKLE": [
    "95912",
    "CA"
  ],
  "ARTOIS": [
    "95913",
    "CA"
  ],
  "BERRY CREEK": [
    "95916",
    "CA"
  ],
  "BIGGS": [
    "95917",
    "CA"
  ],
  "BUTTE CITY": [
    "95920",
    "CA"
  ],
  "CAMPTONVILLE": [
    "95922",
    "CA"
  ],
  "CANYON DAM": [
    "95923",
    "CA"
  ],
  "CEDAR RIDGE": [
    "95924",
    "CA"
  ],
  "CHALLENGE": [
    "95925",
    "CA"
  ],
  "CLIPPER MILLS": [
    "95930",
    "CA"
  ],
  "CRESCENT MILLS": [
    "95934",
    "CA"
  ],
  "DOBBINS": [
    "95935",
    "CA"
  ],
  "DOWNIEVILLE": [
    "95936",
    "CA"
  ],
  "DUNNIGAN": [
    "95937",
    "CA"
  ],
  "FORBESTOWN": [
    "95941",
    "CA"
  ],
  "FOREST RANCH": [
    "95942",
    "CA"
  ],
  "GOODYEARS BAR": [
    "95944",
    "CA"
  ],
  "GRASS VALLEY": [
    "97029",
    "OR"
  ],
  "PENN VALLEY": [
    "95946",
    "CA"
  ],
  "HAMILTON CITY": [
    "95951",
    "CA"
  ],
  "MAGALIA": [
    "95954",
    "CA"
  ],
  "MEADOW VALLEY": [
    "95956",
    "CA"
  ],
  "NEVADA CITY": [
    "95959",
    "CA"
  ],
  "NORTH SAN JUAN": [
    "95960",
    "CA"
  ],
  "OLIVEHURST": [
    "95961",
    "CA"
  ],
  "OREGON HOUSE": [
    "95962",
    "CA"
  ],
  "OROVILLE": [
    "98844",
    "WA"
  ],
  "RACKERBY": [
    "95972",
    "CA"
  ],
  "RICHVALE": [
    "95974",
    "CA"
  ],
  "ROUGH AND READY": [
    "95975",
    "CA"
  ],
  "SMARTSVILLE": [
    "95977",
    "CA"
  ],
  "STIRLING CITY": [
    "95978",
    "CA"
  ],
  "STONYFORD": [
    "95979",
    "CA"
  ],
  "STRAWBERRY VALLEY": [
    "95981",
    "CA"
  ],
  "TWAIN": [
    "95984",
    "CA"
  ],
  "WILLOWS": [
    "95988",
    "CA"
  ],
  "YUBA CITY": [
    "95993",
    "CA"
  ],
  "ADIN": [
    "96006",
    "CA"
  ],
  "BIEBER": [
    "96009",
    "CA"
  ],
  "BIG BAR": [
    "96010",
    "CA"
  ],
  "BURNEY": [
    "96013",
    "CA"
  ],
  "CASSEL": [
    "96016",
    "CA"
  ],
  "CASTELLA": [
    "96017",
    "CA"
  ],
  "SHASTA LAKE": [
    "96089",
    "CA"
  ],
  "DORRIS": [
    "96023",
    "CA"
  ],
  "DOUGLAS CITY": [
    "96024",
    "CA"
  ],
  "DUNSMUIR": [
    "96025",
    "CA"
  ],
  "FALL RIVER MILLS": [
    "96028",
    "CA"
  ],
  "FLOURNOY": [
    "96029",
    "CA"
  ],
  "FORKS OF SALMON": [
    "96031",
    "CA"
  ],
  "FORT JONES": [
    "96032",
    "CA"
  ],
  "FRENCH GULCH": [
    "96033",
    "CA"
  ],
  "GAZELLE": [
    "96034",
    "CA"
  ],
  "GERBER": [
    "96035",
    "CA"
  ],
  "HAPPY CAMP": [
    "96039",
    "CA"
  ],
  "HAT CREEK": [
    "96040",
    "CA"
  ],
  "HAYFORK": [
    "96041",
    "CA"
  ],
  "HORNBROOK": [
    "96044",
    "CA"
  ],
  "HYAMPOM": [
    "96046",
    "CA"
  ],
  "IGO": [
    "96047",
    "CA"
  ],
  "KLAMATH RIVER": [
    "96050",
    "CA"
  ],
  "LAKEHEAD": [
    "96051",
    "CA"
  ],
  "LOS MOLINOS": [
    "96055",
    "CA"
  ],
  "MCARTHUR": [
    "96056",
    "CA"
  ],
  "MCCLOUD": [
    "96057",
    "CA"
  ],
  "MACDOEL": [
    "96058",
    "CA"
  ],
  "MONTGOMERY CREEK": [
    "96065",
    "CA"
  ],
  "MOUNT SHASTA": [
    "96067",
    "CA"
  ],
  "NUBIEBER": [
    "96068",
    "CA"
  ],
  "OAK RUN": [
    "96069",
    "CA"
  ],
  "OBRIEN": [
    "96070",
    "CA"
  ],
  "OLD STATION": [
    "96071",
    "CA"
  ],
  "PALO CEDRO": [
    "96073",
    "CA"
  ],
  "PASKENTA": [
    "96074",
    "CA"
  ],
  "PLATINA": [
    "96076",
    "CA"
  ],
  "PROBERTA": [
    "96078",
    "CA"
  ],
  "RED BLUFF": [
    "96080",
    "CA"
  ],
  "SCOTT BAR": [
    "96085",
    "CA"
  ],
  "SEIAD VALLEY": [
    "96086",
    "CA"
  ],
  "SHASTA": [
    "96087",
    "CA"
  ],
  "SHINGLETOWN": [
    "96088",
    "CA"
  ],
  "TEHAMA": [
    "96090",
    "CA"
  ],
  "TRINITY CENTER": [
    "96091",
    "CA"
  ],
  "WEED": [
    "96094",
    "CA"
  ],
  "WHISKEYTOWN": [
    "96095",
    "CA"
  ],
  "WHITMORE": [
    "96096",
    "CA"
  ],
  "YREKA": [
    "96097",
    "CA"
  ],
  "BLAIRSDEN-GRAEAGLE": [
    "96103",
    "CA"
  ],
  "CHILCOOT": [
    "96105",
    "CA"
  ],
  "COLEVILLE": [
    "96107",
    "CA"
  ],
  "DAVIS CREEK": [
    "96108",
    "CA"
  ],
  "FLORISTON": [
    "96111",
    "CA"
  ],
  "FORT BIDWELL": [
    "96112",
    "CA"
  ],
  "HERLONG": [
    "96113",
    "CA"
  ],
  "LIKELY": [
    "96116",
    "CA"
  ],
  "LOYALTON": [
    "96118",
    "CA"
  ],
  "MARKLEEVILLE": [
    "96120",
    "CA"
  ],
  "PORTOLA": [
    "96122",
    "CA"
  ],
  "CALPINE": [
    "96124",
    "CA"
  ],
  "SIERRA CITY": [
    "96125",
    "CA"
  ],
  "SIERRAVILLE": [
    "96126",
    "CA"
  ],
  "SUSANVILLE": [
    "96130",
    "CA"
  ],
  "BECKWOURTH": [
    "96129",
    "CA"
  ],
  "TERMO": [
    "96132",
    "CA"
  ],
  "TOPAZ": [
    "96133",
    "CA"
  ],
  "TULELAKE": [
    "96134",
    "CA"
  ],
  "CARNELIAN BAY": [
    "96140",
    "CA"
  ],
  "TAHOMA": [
    "96142",
    "CA"
  ],
  "KINGS BEACH": [
    "96143",
    "CA"
  ],
  "TAHOE CITY": [
    "96145",
    "CA"
  ],
  "OLYMPIC VALLEY": [
    "96146",
    "CA"
  ],
  "TAHOE VISTA": [
    "96148",
    "CA"
  ],
  "SOUTH LAKE TAHOE": [
    "96158",
    "CA"
  ],
  "TRUCKEE": [
    "96162",
    "CA"
  ],
  "AIEA": [
    "96701",
    "HI"
  ],
  "ANAHOLA": [
    "96703",
    "HI"
  ],
  "CAPTAIN COOK": [
    "96704",
    "HI"
  ],
  "ELEELE": [
    "96705",
    "HI"
  ],
  "EWA BEACH": [
    "96706",
    "HI"
  ],
  "KAPOLEI": [
    "96709",
    "HI"
  ],
  "HAIKU": [
    "96708",
    "HI"
  ],
  "HAKALAU": [
    "96710",
    "HI"
  ],
  "HALEIWA": [
    "96712",
    "HI"
  ],
  "HANA": [
    "96713",
    "HI"
  ],
  "HANALEI": [
    "96714",
    "HI"
  ],
  "HANAMAULU": [
    "96715",
    "HI"
  ],
  "HANAPEPE": [
    "96716",
    "HI"
  ],
  "HAUULA": [
    "96717",
    "HI"
  ],
  "HAWAII NATIONAL PARK": [
    "96718",
    "HI"
  ],
  "HAWI": [
    "96719",
    "HI"
  ],
  "HILO": [
    "96721",
    "HI"
  ],
  "HOLUALOA": [
    "96725",
    "HI"
  ],
  "HONAUNAU": [
    "96726",
    "HI"
  ],
  "HONOKAA": [
    "96727",
    "HI"
  ],
  "HONOMU": [
    "96728",
    "HI"
  ],
  "HOOLEHUA": [
    "96729",
    "HI"
  ],
  "KAAAWA": [
    "96730",
    "HI"
  ],
  "KAHUKU": [
    "96731",
    "HI"
  ],
  "KAHULUI": [
    "96733",
    "HI"
  ],
  "KAILUA": [
    "96734",
    "HI"
  ],
  "WAIKOLOA": [
    "96738",
    "HI"
  ],
  "KEAUHOU": [
    "96739",
    "HI"
  ],
  "KAILUA KONA": [
    "96745",
    "HI"
  ],
  "KALAHEO": [
    "96741",
    "HI"
  ],
  "KALAUPAPA": [
    "96742",
    "HI"
  ],
  "KAMUELA": [
    "96743",
    "HI"
  ],
  "KANEOHE": [
    "96744",
    "HI"
  ],
  "KAPAA": [
    "96746",
    "HI"
  ],
  "KAUMAKANI": [
    "96747",
    "HI"
  ],
  "KAUNAKAKAI": [
    "96748",
    "HI"
  ],
  "KEAAU": [
    "96749",
    "HI"
  ],
  "KEALAKEKUA": [
    "96750",
    "HI"
  ],
  "KEALIA": [
    "96751",
    "HI"
  ],
  "KEKAHA": [
    "96752",
    "HI"
  ],
  "KIHEI": [
    "96753",
    "HI"
  ],
  "KILAUEA": [
    "96754",
    "HI"
  ],
  "KAPAAU": [
    "96755",
    "HI"
  ],
  "KOLOA": [
    "96756",
    "HI"
  ],
  "KUALAPUU": [
    "96757",
    "HI"
  ],
  "KUNIA": [
    "96759",
    "HI"
  ],
  "KURTISTOWN": [
    "96760",
    "HI"
  ],
  "LAHAINA": [
    "96767",
    "HI"
  ],
  "LAIE": [
    "96762",
    "HI"
  ],
  "LANAI CITY": [
    "96763",
    "HI"
  ],
  "LAUPAHOEHOE": [
    "96764",
    "HI"
  ],
  "LAWAI": [
    "96765",
    "HI"
  ],
  "LIHUE": [
    "96766",
    "HI"
  ],
  "MAKAWAO": [
    "96768",
    "HI"
  ],
  "MAKAWELI": [
    "96769",
    "HI"
  ],
  "MAUNALOA": [
    "96770",
    "HI"
  ],
  "NAALEHU": [
    "96772",
    "HI"
  ],
  "NINOLE": [
    "96773",
    "HI"
  ],
  "OOKALA": [
    "96774",
    "HI"
  ],
  "PAAUILO": [
    "96776",
    "HI"
  ],
  "PAHALA": [
    "96777",
    "HI"
  ],
  "PAHOA": [
    "96778",
    "HI"
  ],
  "PAIA": [
    "96779",
    "HI"
  ],
  "PAPAALOA": [
    "96780",
    "HI"
  ],
  "PAPAIKOU": [
    "96781",
    "HI"
  ],
  "PEPEEKEO": [
    "96783",
    "HI"
  ],
  "PUUNENE": [
    "96784",
    "HI"
  ],
  "WAHIAWA": [
    "96786",
    "HI"
  ],
  "PUKALANI": [
    "96788",
    "HI"
  ],
  "MILILANI": [
    "96789",
    "HI"
  ],
  "KULA": [
    "96790",
    "HI"
  ],
  "WAIALUA": [
    "96791",
    "HI"
  ],
  "WAIANAE": [
    "96792",
    "HI"
  ],
  "WAILUKU": [
    "96793",
    "HI"
  ],
  "WAIMANALO": [
    "96795",
    "HI"
  ],
  "WAIMEA": [
    "96796",
    "HI"
  ],
  "WAIPAHU": [
    "96797",
    "HI"
  ],
  "HONOLULU": [
    "96850",
    "HI"
  ],
  "JBPHH": [
    "96860",
    "HI"
  ],
  "WHEELER ARMY AIRFIELD": [
    "96854",
    "HI"
  ],
  "SCHOFIELD BARRACKS": [
    "96857",
    "HI"
  ],
  "FORT SHAFTER": [
    "96858",
    "HI"
  ],
  "TRIPLER ARMY MEDICAL CENTER": [
    "96859",
    "HI"
  ],
  "CAMP H M SMITH": [
    "96861",
    "HI"
  ],
  "MCBH KANEOHE BAY": [
    "96863",
    "HI"
  ],
  "BEAVERCREEK": [
    "97004",
    "OR"
  ],
  "BRIDAL VEIL": [
    "97010",
    "OR"
  ],
  "CASCADE LOCKS": [
    "97014",
    "OR"
  ],
  "CLACKAMAS": [
    "97015",
    "OR"
  ],
  "CLATSKANIE": [
    "97016",
    "OR"
  ],
  "CORBETT": [
    "97019",
    "OR"
  ],
  "DONALD": [
    "97020",
    "OR"
  ],
  "DUFUR": [
    "97021",
    "OR"
  ],
  "EAGLE CREEK": [
    "97022",
    "OR"
  ],
  "ESTACADA": [
    "97023",
    "OR"
  ],
  "GERVAIS": [
    "97026",
    "OR"
  ],
  "GOVERNMENT CAMP": [
    "97028",
    "OR"
  ],
  "HOOD RIVER": [
    "97031",
    "OR"
  ],
  "LAKE OSWEGO": [
    "97035",
    "OR"
  ],
  "MARYLHURST": [
    "97036",
    "OR"
  ],
  "MAUPIN": [
    "97037",
    "OR"
  ],
  "MOLALLA": [
    "97038",
    "OR"
  ],
  "MOSIER": [
    "97040",
    "OR"
  ],
  "MOUNT HOOD PARKDALE": [
    "97041",
    "OR"
  ],
  "MULINO": [
    "97042",
    "OR"
  ],
  "OREGON CITY": [
    "97045",
    "OR"
  ],
  "RAINIER": [
    "98576",
    "WA"
  ],
  "RHODODENDRON": [
    "97049",
    "OR"
  ],
  "RUFUS": [
    "97050",
    "OR"
  ],
  "SAINT HELENS": [
    "97051",
    "OR"
  ],
  "DEER ISLAND": [
    "97054",
    "OR"
  ],
  "SCAPPOOSE": [
    "97056",
    "OR"
  ],
  "THE DALLES": [
    "97058",
    "OR"
  ],
  "TUALATIN": [
    "97062",
    "OR"
  ],
  "TYGH VALLEY": [
    "97063",
    "OR"
  ],
  "VERNONIA": [
    "97064",
    "OR"
  ],
  "WELCHES": [
    "97067",
    "OR"
  ],
  "WEST LINN": [
    "97068",
    "OR"
  ],
  "HAPPY VALLEY": [
    "97086",
    "OR"
  ],
  "ARCH CAPE": [
    "97102",
    "OR"
  ],
  "CANNON BEACH": [
    "97110",
    "OR"
  ],
  "GALES CREEK": [
    "97117",
    "OR"
  ],
  "GARIBALDI": [
    "97118",
    "OR"
  ],
  "HEBO": [
    "97122",
    "OR"
  ],
  "MANZANITA": [
    "97130",
    "OR"
  ],
  "NEHALEM": [
    "97131",
    "OR"
  ],
  "NEWBERG": [
    "97132",
    "OR"
  ],
  "NORTH PLAINS": [
    "97133",
    "OR"
  ],
  "PACIFIC CITY": [
    "97135",
    "OR"
  ],
  "TILLAMOOK": [
    "97141",
    "OR"
  ],
  "NETARTS": [
    "97143",
    "OR"
  ],
  "TIMBER": [
    "97144",
    "OR"
  ],
  "TOLOVANA PARK": [
    "97145",
    "OR"
  ],
  "YAMHILL": [
    "97148",
    "OR"
  ],
  "NESKOWIN": [
    "97149",
    "OR"
  ],
  "KEIZER": [
    "97307",
    "OR"
  ],
  "ALSEA": [
    "97324",
    "OR"
  ],
  "AUMSVILLE": [
    "97325",
    "OR"
  ],
  "BLODGETT": [
    "97326",
    "OR"
  ],
  "CASCADIA": [
    "97329",
    "OR"
  ],
  "DEPOE BAY": [
    "97341",
    "OR"
  ],
  "GRAND RONDE": [
    "97347",
    "OR"
  ],
  "IDANHA": [
    "97350",
    "OR"
  ],
  "LOGSDEN": [
    "97357",
    "OR"
  ],
  "MILL CITY": [
    "97360",
    "OR"
  ],
  "MOUNT ANGEL": [
    "97362",
    "OR"
  ],
  "NEOTSU": [
    "97364",
    "OR"
  ],
  "SOUTH BEACH": [
    "97366",
    "OR"
  ],
  "OTTER ROCK": [
    "97369",
    "OR"
  ],
  "PHILOMATH": [
    "97370",
    "OR"
  ],
  "RICKREALL": [
    "97371",
    "OR"
  ],
  "SCOTTS MILLS": [
    "97375",
    "OR"
  ],
  "SEAL ROCK": [
    "97376",
    "OR"
  ],
  "SHEDD": [
    "97377",
    "OR"
  ],
  "SILETZ": [
    "97380",
    "OR"
  ],
  "STAYTON": [
    "97383",
    "OR"
  ],
  "MEHAMA": [
    "97384",
    "OR"
  ],
  "SUBLIMITY": [
    "97385",
    "OR"
  ],
  "GLENEDEN BEACH": [
    "97388",
    "OR"
  ],
  "TANGENT": [
    "97389",
    "OR"
  ],
  "TIDEWATER": [
    "97390",
    "OR"
  ],
  "WALDPORT": [
    "97394",
    "OR"
  ],
  "WILLAMINA": [
    "97396",
    "OR"
  ],
  "AGNESS": [
    "97406",
    "OR"
  ],
  "ALVADORE": [
    "97409",
    "OR"
  ],
  "AZALEA": [
    "97410",
    "OR"
  ],
  "BANDON": [
    "97411",
    "OR"
  ],
  "BLACHLY": [
    "97412",
    "OR"
  ],
  "BROADBENT": [
    "97414",
    "OR"
  ],
  "CAMAS VALLEY": [
    "97416",
    "OR"
  ],
  "CANYONVILLE": [
    "97417",
    "OR"
  ],
  "COOS BAY": [
    "97420",
    "OR"
  ],
  "COQUILLE": [
    "97423",
    "OR"
  ],
  "DAYS CREEK": [
    "97429",
    "OR"
  ],
  "DORENA": [
    "97434",
    "OR"
  ],
  "DRAIN": [
    "97435",
    "OR"
  ],
  "GLIDE": [
    "97443",
    "OR"
  ],
  "GOLD BEACH": [
    "97444",
    "OR"
  ],
  "IDLEYLD PARK": [
    "97447",
    "OR"
  ],
  "LANGLOIS": [
    "97450",
    "OR"
  ],
  "LORANE": [
    "97451",
    "OR"
  ],
  "MARCOLA": [
    "97454",
    "OR"
  ],
  "MYRTLE CREEK": [
    "97457",
    "OR"
  ],
  "MYRTLE POINT": [
    "97458",
    "OR"
  ],
  "NOTI": [
    "97461",
    "OR"
  ],
  "OAKRIDGE": [
    "97463",
    "OR"
  ],
  "PORT ORFORD": [
    "97465",
    "OR"
  ],
  "REEDSPORT": [
    "97467",
    "OR"
  ],
  "RIDDLE": [
    "97469",
    "OR"
  ],
  "ROSEBURG": [
    "97471",
    "OR"
  ],
  "SIXES": [
    "97476",
    "OR"
  ],
  "SWISSHOME": [
    "97480",
    "OR"
  ],
  "TENMILE": [
    "97481",
    "OR"
  ],
  "UMPQUA": [
    "97486",
    "OR"
  ],
  "VENETA": [
    "97487",
    "OR"
  ],
  "WALTERVILLE": [
    "97489",
    "OR"
  ],
  "WEDDERBURN": [
    "97491",
    "OR"
  ],
  "WESTFIR": [
    "97492",
    "OR"
  ],
  "WILBUR": [
    "99185",
    "WA"
  ],
  "YACHATS": [
    "97498",
    "OR"
  ],
  "YONCALLA": [
    "97499",
    "OR"
  ],
  "CENTRAL POINT": [
    "97502",
    "OR"
  ],
  "BUTTE FALLS": [
    "97522",
    "OR"
  ],
  "CAVE JUNCTION": [
    "97523",
    "OR"
  ],
  "EAGLE POINT": [
    "97524",
    "OR"
  ],
  "GRANTS PASS": [
    "97528",
    "OR"
  ],
  "KERBY": [
    "97531",
    "OR"
  ],
  "MERLIN": [
    "97532",
    "OR"
  ],
  "ROGUE RIVER": [
    "97537",
    "OR"
  ],
  "SHADY COVE": [
    "97539",
    "OR"
  ],
  "TALENT": [
    "97540",
    "OR"
  ],
  "WILDERVILLE": [
    "97543",
    "OR"
  ],
  "KLAMATH FALLS": [
    "97603",
    "OR"
  ],
  "CRATER LAKE": [
    "97604",
    "OR"
  ],
  "BLY": [
    "97622",
    "OR"
  ],
  "CHILOQUIN": [
    "97624",
    "OR"
  ],
  "DAIRY": [
    "97625",
    "OR"
  ],
  "FORT KLAMATH": [
    "97626",
    "OR"
  ],
  "KENO": [
    "97627",
    "OR"
  ],
  "MALIN": [
    "97632",
    "OR"
  ],
  "NEW PINE CREEK": [
    "97635",
    "OR"
  ],
  "PLUSH": [
    "97637",
    "OR"
  ],
  "SPRAGUE RIVER": [
    "97639",
    "OR"
  ],
  "SUMMER LAKE": [
    "97640",
    "OR"
  ],
  "CHRISTMAS VALLEY": [
    "97641",
    "OR"
  ],
  "FIELDS": [
    "97710",
    "OR"
  ],
  "CAMP SHERMAN": [
    "97730",
    "OR"
  ],
  "CHEMULT": [
    "97731",
    "OR"
  ],
  "FORT ROCK": [
    "97735",
    "OR"
  ],
  "FRENCHGLEN": [
    "97736",
    "OR"
  ],
  "LA PINE": [
    "97739",
    "OR"
  ],
  "MADRAS": [
    "97741",
    "OR"
  ],
  "POWELL BUTTE": [
    "97753",
    "OR"
  ],
  "PRINEVILLE": [
    "97754",
    "OR"
  ],
  "SISTERS": [
    "97759",
    "OR"
  ],
  "TERREBONNE": [
    "97760",
    "OR"
  ],
  "ATHENA": [
    "97813",
    "OR"
  ],
  "BAKER CITY": [
    "97814",
    "OR"
  ],
  "BATES": [
    "97817",
    "OR"
  ],
  "BOARDMAN": [
    "97818",
    "OR"
  ],
  "CANYON CITY": [
    "97820",
    "OR"
  ],
  "FOSSIL": [
    "97830",
    "OR"
  ],
  "HAINES": [
    "99827",
    "AK"
  ],
  "HALFWAY": [
    "97834",
    "OR"
  ],
  "HELIX": [
    "97835",
    "OR"
  ],
  "HEPPNER": [
    "97836",
    "OR"
  ],
  "HERMISTON": [
    "97838",
    "OR"
  ],
  "IMBLER": [
    "97841",
    "OR"
  ],
  "IMNAHA": [
    "97842",
    "OR"
  ],
  "IRRIGON": [
    "97844",
    "OR"
  ],
  "JOHN DAY": [
    "97845",
    "OR"
  ],
  "LA GRANDE": [
    "98348",
    "WA"
  ],
  "LOSTINE": [
    "97857",
    "OR"
  ],
  "MEACHAM": [
    "97859",
    "OR"
  ],
  "MIKKALO": [
    "97861",
    "OR"
  ],
  "MILTON FREEWATER": [
    "97862",
    "OR"
  ],
  "NORTH POWDER": [
    "97867",
    "OR"
  ],
  "PILOT ROCK": [
    "97868",
    "OR"
  ],
  "SPRAY": [
    "97874",
    "OR"
  ],
  "SUMPTER": [
    "97877",
    "OR"
  ],
  "WALLOWA": [
    "97885",
    "OR"
  ],
  "BROGAN": [
    "97903",
    "OR"
  ],
  "DREWSEY": [
    "97904",
    "OR"
  ],
  "DURKEE": [
    "97905",
    "OR"
  ],
  "IRONSIDE": [
    "97908",
    "OR"
  ],
  "JAMIESON": [
    "97909",
    "OR"
  ],
  "JORDAN VALLEY": [
    "97910",
    "OR"
  ],
  "JUNTURA": [
    "97911",
    "OR"
  ],
  "NYSSA": [
    "97913",
    "OR"
  ],
  "WESTFALL": [
    "97920",
    "OR"
  ],
  "FEDERAL WAY": [
    "98093",
    "WA"
  ],
  "BLACK DIAMOND": [
    "98010",
    "WA"
  ],
  "BOTHELL": [
    "98041",
    "WA"
  ],
  "CARNATION": [
    "98014",
    "WA"
  ],
  "DUVALL": [
    "98019",
    "WA"
  ],
  "EDMONDS": [
    "98026",
    "WA"
  ],
  "ENUMCLAW": [
    "98022",
    "WA"
  ],
  "FALL CITY": [
    "98024",
    "WA"
  ],
  "ISSAQUAH": [
    "98029",
    "WA"
  ],
  "KENMORE": [
    "98028",
    "WA"
  ],
  "LYNNWOOD": [
    "98087",
    "WA"
  ],
  "MAPLE VALLEY": [
    "98038",
    "WA"
  ],
  "MERCER ISLAND": [
    "98040",
    "WA"
  ],
  "MOUNTLAKE TERRACE": [
    "98043",
    "WA"
  ],
  "RAVENSDALE": [
    "98051",
    "WA"
  ],
  "RENTON": [
    "98059",
    "WA"
  ],
  "ROLLINGBAY": [
    "98061",
    "WA"
  ],
  "SEAHURST": [
    "98062",
    "WA"
  ],
  "SNOQUALMIE": [
    "98065",
    "WA"
  ],
  "SNOQUALMIE PASS": [
    "98068",
    "WA"
  ],
  "VASHON": [
    "98070",
    "WA"
  ],
  "WOODINVILLE": [
    "98077",
    "WA"
  ],
  "SAMMAMISH": [
    "98075",
    "WA"
  ],
  "SEATTLE": [
    "98199",
    "WA"
  ],
  "BAINBRIDGE ISLAND": [
    "98110",
    "WA"
  ],
  "ANACORTES": [
    "98221",
    "WA"
  ],
  "BLAKELY ISLAND": [
    "98222",
    "WA"
  ],
  "CONCRETE": [
    "98237",
    "WA"
  ],
  "COUPEVILLE": [
    "98239",
    "WA"
  ],
  "DARRINGTON": [
    "98241",
    "WA"
  ],
  "DEER HARBOR": [
    "98243",
    "WA"
  ],
  "EASTSOUND": [
    "98245",
    "WA"
  ],
  "FRIDAY HARBOR": [
    "98250",
    "WA"
  ],
  "GOLD BAR": [
    "98251",
    "WA"
  ],
  "GREENBANK": [
    "98253",
    "WA"
  ],
  "INDEX": [
    "98256",
    "WA"
  ],
  "LA CONNER": [
    "98257",
    "WA"
  ],
  "LAKE STEVENS": [
    "98258",
    "WA"
  ],
  "NORTH LAKEWOOD": [
    "98259",
    "WA"
  ],
  "LOPEZ ISLAND": [
    "98261",
    "WA"
  ],
  "LUMMI ISLAND": [
    "98262",
    "WA"
  ],
  "LYNDEN": [
    "98264",
    "WA"
  ],
  "MAPLE FALLS": [
    "98266",
    "WA"
  ],
  "MARBLEMOUNT": [
    "98267",
    "WA"
  ],
  "MUKILTEO": [
    "98275",
    "WA"
  ],
  "NOOKSACK": [
    "98276",
    "WA"
  ],
  "OLGA": [
    "98279",
    "WA"
  ],
  "ORCAS": [
    "98280",
    "WA"
  ],
  "POINT ROBERTS": [
    "98281",
    "WA"
  ],
  "CAMANO ISLAND": [
    "98282",
    "WA"
  ],
  "SEDRO WOOLLEY": [
    "98284",
    "WA"
  ],
  "SHAW ISLAND": [
    "98286",
    "WA"
  ],
  "SILVANA": [
    "98287",
    "WA"
  ],
  "SKYKOMISH": [
    "98288",
    "WA"
  ],
  "SNOHOMISH": [
    "98296",
    "WA"
  ],
  "STARTUP": [
    "98293",
    "WA"
  ],
  "SULTAN": [
    "98294",
    "WA"
  ],
  "SUMAS": [
    "98295",
    "WA"
  ],
  "ANDERSON ISLAND": [
    "98303",
    "WA"
  ],
  "BREMERTON": [
    "98337",
    "WA"
  ],
  "BRINNON": [
    "98320",
    "WA"
  ],
  "CARBONADO": [
    "98323",
    "WA"
  ],
  "CARLSBORG": [
    "98324",
    "WA"
  ],
  "CHIMACUM": [
    "98325",
    "WA"
  ],
  "CLALLAM BAY": [
    "98326",
    "WA"
  ],
  "EATONVILLE": [
    "98328",
    "WA"
  ],
  "GIG HARBOR": [
    "98335",
    "WA"
  ],
  "ELBE": [
    "98330",
    "WA"
  ],
  "FORKS": [
    "98331",
    "WA"
  ],
  "FOX ISLAND": [
    "98333",
    "WA"
  ],
  "GLENOMA": [
    "98336",
    "WA"
  ],
  "PORT HADLOCK": [
    "98339",
    "WA"
  ],
  "HANSVILLE": [
    "98340",
    "WA"
  ],
  "KAPOWSIN": [
    "98344",
    "WA"
  ],
  "LAKEBAY": [
    "98349",
    "WA"
  ],
  "LA PUSH": [
    "98350",
    "WA"
  ],
  "LONGBRANCH": [
    "98351",
    "WA"
  ],
  "NEAH BAY": [
    "98357",
    "WA"
  ],
  "NORDLAND": [
    "98358",
    "WA"
  ],
  "OLALLA": [
    "98359",
    "WA"
  ],
  "ORTING": [
    "98360",
    "WA"
  ],
  "PORT ANGELES": [
    "98363",
    "WA"
  ],
  "PORT GAMBLE": [
    "98364",
    "WA"
  ],
  "PORT LUDLOW": [
    "98365",
    "WA"
  ],
  "PORT ORCHARD": [
    "98367",
    "WA"
  ],
  "PORT TOWNSEND": [
    "98368",
    "WA"
  ],
  "POULSBO": [
    "98370",
    "WA"
  ],
  "PUYALLUP": [
    "98375",
    "WA"
  ],
  "QUILCENE": [
    "98376",
    "WA"
  ],
  "RANDLE": [
    "98377",
    "WA"
  ],
  "SEABECK": [
    "98380",
    "WA"
  ],
  "SEKIU": [
    "98381",
    "WA"
  ],
  "SEQUIM": [
    "98382",
    "WA"
  ],
  "SOUTH COLBY": [
    "98384",
    "WA"
  ],
  "SOUTH PRAIRIE": [
    "98385",
    "WA"
  ],
  "SOUTHWORTH": [
    "98386",
    "WA"
  ],
  "SPANAWAY": [
    "98387",
    "WA"
  ],
  "STEILACOOM": [
    "98388",
    "WA"
  ],
  "BONNEY LAKE": [
    "98391",
    "WA"
  ],
  "SUQUAMISH": [
    "98392",
    "WA"
  ],
  "TRACYTON": [
    "98393",
    "WA"
  ],
  "WAUNA": [
    "98395",
    "WA"
  ],
  "WILKESON": [
    "98396",
    "WA"
  ],
  "LONGMIRE": [
    "98397",
    "WA"
  ],
  "PARADISE INN": [
    "98398",
    "WA"
  ],
  "TACOMA": [
    "98493",
    "WA"
  ],
  "CAMP MURRAY": [
    "98430",
    "WA"
  ],
  "MCCHORD AFB": [
    "98438",
    "WA"
  ],
  "UNIVERSITY PLACE": [
    "98467",
    "WA"
  ],
  "LACEY": [
    "98509",
    "WA"
  ],
  "TUMWATER": [
    "98511",
    "WA"
  ],
  "ADNA": [
    "98522",
    "WA"
  ],
  "ALLYN": [
    "98524",
    "WA"
  ],
  "AMANDA PARK": [
    "98526",
    "WA"
  ],
  "BAY CENTER": [
    "98527",
    "WA"
  ],
  "BELFAIR": [
    "98528",
    "WA"
  ],
  "BUCODA": [
    "98530",
    "WA"
  ],
  "CHEHALIS": [
    "98532",
    "WA"
  ],
  "CINEBAR": [
    "98533",
    "WA"
  ],
  "COPALIS BEACH": [
    "98535",
    "WA"
  ],
  "COPALIS CROSSING": [
    "98536",
    "WA"
  ],
  "COSMOPOLIS": [
    "98537",
    "WA"
  ],
  "DOTY": [
    "98539",
    "WA"
  ],
  "EAST OLYMPIA": [
    "98540",
    "WA"
  ],
  "GRAPEVIEW": [
    "98546",
    "WA"
  ],
  "GRAYLAND": [
    "98547",
    "WA"
  ],
  "HOODSPORT": [
    "98548",
    "WA"
  ],
  "HOQUIAM": [
    "98550",
    "WA"
  ],
  "HUMPTULIPS": [
    "98552",
    "WA"
  ],
  "LEBAM": [
    "98554",
    "WA"
  ],
  "LILLIWAUP": [
    "98555",
    "WA"
  ],
  "MCCLEARY": [
    "98557",
    "WA"
  ],
  "MCKENNA": [
    "98558",
    "WA"
  ],
  "MOCLIPS": [
    "98562",
    "WA"
  ],
  "MONTESANO": [
    "98563",
    "WA"
  ],
  "MOSSYROCK": [
    "98564",
    "WA"
  ],
  "NAPAVINE": [
    "98565",
    "WA"
  ],
  "NEILTON": [
    "98566",
    "WA"
  ],
  "OCEAN SHORES": [
    "98569",
    "WA"
  ],
  "PACIFIC BEACH": [
    "98571",
    "WA"
  ],
  "PE ELL": [
    "98572",
    "WA"
  ],
  "QUINAULT": [
    "98575",
    "WA"
  ],
  "SALKUM": [
    "98582",
    "WA"
  ],
  "SATSOP": [
    "98583",
    "WA"
  ],
  "TAHOLAH": [
    "98587",
    "WA"
  ],
  "TAHUYA": [
    "98588",
    "WA"
  ],
  "TENINO": [
    "98589",
    "WA"
  ],
  "TOKELAND": [
    "98590",
    "WA"
  ],
  "VADER": [
    "98593",
    "WA"
  ],
  "WINLOCK": [
    "98596",
    "WA"
  ],
  "YELM": [
    "98597",
    "WA"
  ],
  "ARIEL": [
    "98603",
    "WA"
  ],
  "BINGEN": [
    "98605",
    "WA"
  ],
  "BRUSH PRAIRIE": [
    "98606",
    "WA"
  ],
  "CAMAS": [
    "98607",
    "WA"
  ],
  "CATHLAMET": [
    "98612",
    "WA"
  ],
  "COUGAR": [
    "98616",
    "WA"
  ],
  "DALLESPORT": [
    "98617",
    "WA"
  ],
  "GOLDENDALE": [
    "98620",
    "WA"
  ],
  "GRAYS RIVER": [
    "98621",
    "WA"
  ],
  "HEISSON": [
    "98622",
    "WA"
  ],
  "HUSUM": [
    "98623",
    "WA"
  ],
  "ILWACO": [
    "98624",
    "WA"
  ],
  "KALAMA": [
    "98625",
    "WA"
  ],
  "KLICKITAT": [
    "98628",
    "WA"
  ],
  "NAHCOTTA": [
    "98637",
    "WA"
  ],
  "NASELLE": [
    "98638",
    "WA"
  ],
  "NORTH BONNEVILLE": [
    "98639",
    "WA"
  ],
  "OYSTERVILLE": [
    "98641",
    "WA"
  ],
  "ROSBURG": [
    "98643",
    "WA"
  ],
  "SEAVIEW": [
    "98644",
    "WA"
  ],
  "SILVERLAKE": [
    "98645",
    "WA"
  ],
  "SKAMOKAWA": [
    "98647",
    "WA"
  ],
  "TOUTLE": [
    "98649",
    "WA"
  ],
  "VANCOUVER": [
    "98687",
    "WA"
  ],
  "WAHKIACUS": [
    "98670",
    "WA"
  ],
  "WASHOUGAL": [
    "98671",
    "WA"
  ],
  "WHITE SALMON": [
    "98672",
    "WA"
  ],
  "WISHRAM": [
    "98673",
    "WA"
  ],
  "YACOLT": [
    "98675",
    "WA"
  ],
  "WENATCHEE": [
    "98807",
    "WA"
  ],
  "EAST WENATCHEE": [
    "98802",
    "WA"
  ],
  "ARDENVOIR": [
    "98811",
    "WA"
  ],
  "CASHMERE": [
    "98815",
    "WA"
  ],
  "CHELAN": [
    "98816",
    "WA"
  ],
  "CHELAN FALLS": [
    "98817",
    "WA"
  ],
  "CONCONULLY": [
    "98819",
    "WA"
  ],
  "ENTIAT": [
    "98822",
    "WA"
  ],
  "MALOTT": [
    "98829",
    "WA"
  ],
  "MAZAMA": [
    "98833",
    "WA"
  ],
  "METHOW": [
    "98834",
    "WA"
  ],
  "MONITOR": [
    "98836",
    "WA"
  ],
  "MOSES LAKE": [
    "98837",
    "WA"
  ],
  "OKANOGAN": [
    "98840",
    "WA"
  ],
  "OMAK": [
    "98841",
    "WA"
  ],
  "ORONDO": [
    "98843",
    "WA"
  ],
  "PATEROS": [
    "98846",
    "WA"
  ],
  "PESHASTIN": [
    "98847",
    "WA"
  ],
  "SOAP LAKE": [
    "98851",
    "WA"
  ],
  "STEHEKIN": [
    "98852",
    "WA"
  ],
  "TONASKET": [
    "98855",
    "WA"
  ],
  "TWISP": [
    "98856",
    "WA"
  ],
  "WARDEN": [
    "98857",
    "WA"
  ],
  "WILSON CREEK": [
    "98860",
    "WA"
  ],
  "YAKIMA": [
    "98909",
    "WA"
  ],
  "CLE ELUM": [
    "98922",
    "WA"
  ],
  "COWICHE": [
    "98923",
    "WA"
  ],
  "ELLENSBURG": [
    "98926",
    "WA"
  ],
  "KITTITAS": [
    "98934",
    "WA"
  ],
  "MABTON": [
    "98935",
    "WA"
  ],
  "MOXEE": [
    "98936",
    "WA"
  ],
  "NACHES": [
    "98937",
    "WA"
  ],
  "RONALD": [
    "98940",
    "WA"
  ],
  "SELAH": [
    "98942",
    "WA"
  ],
  "SOUTH CLE ELUM": [
    "98943",
    "WA"
  ],
  "TIETON": [
    "98947",
    "WA"
  ],
  "TOPPENISH": [
    "98948",
    "WA"
  ],
  "VANTAGE": [
    "98950",
    "WA"
  ],
  "WAPATO": [
    "98951",
    "WA"
  ],
  "WHITE SWAN": [
    "98952",
    "WA"
  ],
  "ZILLAH": [
    "98953",
    "WA"
  ],
  "AIRWAY HEIGHTS": [
    "99001",
    "WA"
  ],
  "EDWALL": [
    "99008",
    "WA"
  ],
  "FAIRCHILD AIR FORCE BASE": [
    "99011",
    "WA"
  ],
  "FOUR LAKES": [
    "99014",
    "WA"
  ],
  "LATAH": [
    "99018",
    "WA"
  ],
  "LIBERTY LAKE": [
    "99019",
    "WA"
  ],
  "MEDICAL LAKE": [
    "99022",
    "WA"
  ],
  "MICA": [
    "99023",
    "WA"
  ],
  "NEWMAN LAKE": [
    "99025",
    "WA"
  ],
  "NINE MILE FALLS": [
    "99026",
    "WA"
  ],
  "OTIS ORCHARDS": [
    "99027",
    "WA"
  ],
  "REARDAN": [
    "99029",
    "WA"
  ],
  "SPANGLE": [
    "99031",
    "WA"
  ],
  "TEKOA": [
    "99033",
    "WA"
  ],
  "TUMTUM": [
    "99034",
    "WA"
  ],
  "VALLEYFORD": [
    "99036",
    "WA"
  ],
  "VERADALE": [
    "99037",
    "WA"
  ],
  "WELLPINIT": [
    "99040",
    "WA"
  ],
  "ADDY": [
    "99101",
    "WA"
  ],
  "ALMIRA": [
    "99103",
    "WA"
  ],
  "CHEWELAH": [
    "99109",
    "WA"
  ],
  "COLVILLE": [
    "99114",
    "WA"
  ],
  "COULEE CITY": [
    "99115",
    "WA"
  ],
  "COULEE DAM": [
    "99116",
    "WA"
  ],
  "CUSICK": [
    "99119",
    "WA"
  ],
  "ELECTRIC CITY": [
    "99123",
    "WA"
  ],
  "ELMER CITY": [
    "99124",
    "WA"
  ],
  "GRAND COULEE": [
    "99133",
    "WA"
  ],
  "HARTLINE": [
    "99135",
    "WA"
  ],
  "HUNTERS": [
    "99137",
    "WA"
  ],
  "INCHELIUM": [
    "99138",
    "WA"
  ],
  "KETTLE FALLS": [
    "99141",
    "WA"
  ],
  "LACROSSE": [
    "99143",
    "WA"
  ],
  "LAMONA": [
    "99144",
    "WA"
  ],
  "LOON LAKE": [
    "99148",
    "WA"
  ],
  "MALO": [
    "99150",
    "WA"
  ],
  "METALINE": [
    "99152",
    "WA"
  ],
  "METALINE FALLS": [
    "99153",
    "WA"
  ],
  "MOHLER": [
    "99154",
    "WA"
  ],
  "NESPELEM": [
    "99155",
    "WA"
  ],
  "OAKESDALE": [
    "99158",
    "WA"
  ],
  "PALOUSE": [
    "99161",
    "WA"
  ],
  "RITZVILLE": [
    "99169",
    "WA"
  ],
  "STEPTOE": [
    "99174",
    "WA"
  ],
  "USK": [
    "99180",
    "WA"
  ],
  "PASCO": [
    "99302",
    "WA"
  ],
  "BICKLETON": [
    "99322",
    "WA"
  ],
  "COLLEGE PLACE": [
    "99324",
    "WA"
  ],
  "CONNELL": [
    "99326",
    "WA"
  ],
  "ELTOPIA": [
    "99330",
    "WA"
  ],
  "KAHLOTUS": [
    "99335",
    "WA"
  ],
  "KENNEWICK": [
    "99338",
    "WA"
  ],
  "LIND": [
    "99341",
    "WA"
  ],
  "OTHELLO": [
    "99344",
    "WA"
  ],
  "MATTAWA": [
    "99349",
    "WA"
  ],
  "PROSSER": [
    "99350",
    "WA"
  ],
  "WEST RICHLAND": [
    "99353",
    "WA"
  ],
  "ROYAL CITY": [
    "99357",
    "WA"
  ],
  "TOUCHET": [
    "99360",
    "WA"
  ],
  "WAITSBURG": [
    "99361",
    "WA"
  ],
  "WALLA WALLA": [
    "99362",
    "WA"
  ],
  "WALLULA": [
    "99363",
    "WA"
  ],
  "WASHTUCNA": [
    "99371",
    "WA"
  ],
  "ANATONE": [
    "99401",
    "WA"
  ],
  "ASOTIN": [
    "99402",
    "WA"
  ],
  "ANCHORAGE": [
    "99695",
    "AK"
  ],
  "JBER": [
    "99506",
    "AK"
  ],
  "INDIAN": [
    "99540",
    "AK"
  ],
  "KONGIGANAK": [
    "99545",
    "AK"
  ],
  "ADAK": [
    "99546",
    "AK"
  ],
  "ATKA": [
    "99547",
    "AK"
  ],
  "PORT HEIDEN": [
    "99549",
    "AK"
  ],
  "PORT LIONS": [
    "99550",
    "AK"
  ],
  "AKIACHAK": [
    "99551",
    "AK"
  ],
  "AKIAK": [
    "99552",
    "AK"
  ],
  "AKUTAN": [
    "99553",
    "AK"
  ],
  "ALAKANUK": [
    "99554",
    "AK"
  ],
  "ALEKNAGIK": [
    "99555",
    "AK"
  ],
  "ANCHOR POINT": [
    "99556",
    "AK"
  ],
  "ANIAK": [
    "99557",
    "AK"
  ],
  "ANVIK": [
    "99558",
    "AK"
  ],
  "CHEFORNAK": [
    "99561",
    "AK"
  ],
  "CHEVAK": [
    "99563",
    "AK"
  ],
  "CHIGNIK": [
    "99564",
    "AK"
  ],
  "CHIGNIK LAGOON": [
    "99565",
    "AK"
  ],
  "CHITINA": [
    "99566",
    "AK"
  ],
  "CHUGIAK": [
    "99567",
    "AK"
  ],
  "CLAM GULCH": [
    "99568",
    "AK"
  ],
  "CLARKS POINT": [
    "99569",
    "AK"
  ],
  "COLD BAY": [
    "99571",
    "AK"
  ],
  "COOPER LANDING": [
    "99572",
    "AK"
  ],
  "COPPER CENTER": [
    "99573",
    "AK"
  ],
  "CROOKED CREEK": [
    "99575",
    "AK"
  ],
  "DILLINGHAM": [
    "99576",
    "AK"
  ],
  "EEK": [
    "99578",
    "AK"
  ],
  "EGEGIK": [
    "99579",
    "AK"
  ],
  "EKWOK": [
    "99580",
    "AK"
  ],
  "EMMONAK": [
    "99581",
    "AK"
  ],
  "FALSE PASS": [
    "99583",
    "AK"
  ],
  "GAKONA": [
    "99586",
    "AK"
  ],
  "GIRDWOOD": [
    "99587",
    "AK"
  ],
  "GLENNALLEN": [
    "99588",
    "AK"
  ],
  "GOODNEWS BAY": [
    "99589",
    "AK"
  ],
  "SAINT GEORGE ISLAND": [
    "99591",
    "AK"
  ],
  "HOOPER BAY": [
    "99604",
    "AK"
  ],
  "ILIAMNA": [
    "99606",
    "AK"
  ],
  "KALSKAG": [
    "99607",
    "AK"
  ],
  "KARLUK": [
    "99608",
    "AK"
  ],
  "KASIGLUK": [
    "99609",
    "AK"
  ],
  "KASILOF": [
    "99610",
    "AK"
  ],
  "KENAI": [
    "99611",
    "AK"
  ],
  "KING COVE": [
    "99612",
    "AK"
  ],
  "KING SALMON": [
    "99613",
    "AK"
  ],
  "KIPNUK": [
    "99614",
    "AK"
  ],
  "KODIAK": [
    "99697",
    "AK"
  ],
  "KOTLIK": [
    "99620",
    "AK"
  ],
  "KWETHLUK": [
    "99621",
    "AK"
  ],
  "KWIGILLINGOK": [
    "99622",
    "AK"
  ],
  "WASILLA": [
    "99687",
    "AK"
  ],
  "LARSEN BAY": [
    "99624",
    "AK"
  ],
  "LEVELOCK": [
    "99625",
    "AK"
  ],
  "LOWER KALSKAG": [
    "99626",
    "AK"
  ],
  "MANOKOTAK": [
    "99628",
    "AK"
  ],
  "MEKORYUK": [
    "99630",
    "AK"
  ],
  "MOOSE PASS": [
    "99631",
    "AK"
  ],
  "MOUNTAIN VILLAGE": [
    "99632",
    "AK"
  ],
  "NAKNEK": [
    "99633",
    "AK"
  ],
  "NAPAKIAK": [
    "99634",
    "AK"
  ],
  "NIKISKI": [
    "99635",
    "AK"
  ],
  "NEW STUYAHOK": [
    "99636",
    "AK"
  ],
  "TOKSOOK BAY": [
    "99637",
    "AK"
  ],
  "NIKOLSKI": [
    "99638",
    "AK"
  ],
  "NINILCHIK": [
    "99639",
    "AK"
  ],
  "NONDALTON": [
    "99640",
    "AK"
  ],
  "NUNAPITCHUK": [
    "99641",
    "AK"
  ],
  "OLD HARBOR": [
    "99643",
    "AK"
  ],
  "OUZINKIE": [
    "99644",
    "AK"
  ],
  "PEDRO BAY": [
    "99647",
    "AK"
  ],
  "PILOT STATION": [
    "99650",
    "AK"
  ],
  "PLATINUM": [
    "99651",
    "AK"
  ],
  "PORT ALSWORTH": [
    "99653",
    "AK"
  ],
  "QUINHAGAK": [
    "99655",
    "AK"
  ],
  "RED DEVIL": [
    "99656",
    "AK"
  ],
  "RUSSIAN MISSION": [
    "99657",
    "AK"
  ],
  "SAINT PAUL ISLAND": [
    "99660",
    "AK"
  ],
  "SAND POINT": [
    "99661",
    "AK"
  ],
  "SCAMMON BAY": [
    "99662",
    "AK"
  ],
  "SELDOVIA": [
    "99663",
    "AK"
  ],
  "SHAGELUK": [
    "99665",
    "AK"
  ],
  "NUNAM IQUA": [
    "99666",
    "AK"
  ],
  "SKWENTNA": [
    "99667",
    "AK"
  ],
  "SLEETMUTE": [
    "99668",
    "AK"
  ],
  "SOLDOTNA": [
    "99669",
    "AK"
  ],
  "STEBBINS": [
    "99671",
    "AK"
  ],
  "TAKOTNA": [
    "99675",
    "AK"
  ],
  "TALKEETNA": [
    "99676",
    "AK"
  ],
  "TATITLEK": [
    "99677",
    "AK"
  ],
  "TOGIAK": [
    "99678",
    "AK"
  ],
  "TULUKSAK": [
    "99679",
    "AK"
  ],
  "TUNTUTULIAK": [
    "99680",
    "AK"
  ],
  "TUNUNAK": [
    "99681",
    "AK"
  ],
  "TYONEK": [
    "99682",
    "AK"
  ],
  "TRAPPER CREEK": [
    "99683",
    "AK"
  ],
  "UNALAKLEET": [
    "99684",
    "AK"
  ],
  "UNALASKA": [
    "99685",
    "AK"
  ],
  "YAKUTAT": [
    "99689",
    "AK"
  ],
  "NIGHTMUTE": [
    "99690",
    "AK"
  ],
  "NIKOLAI": [
    "99691",
    "AK"
  ],
  "DUTCH HARBOR": [
    "99692",
    "AK"
  ],
  "EIELSON AFB": [
    "99702",
    "AK"
  ],
  "FORT WAINWRIGHT": [
    "99703",
    "AK"
  ],
  "CLEAR": [
    "99704",
    "AK"
  ],
  "NORTH POLE": [
    "99705",
    "AK"
  ],
  "SALCHA": [
    "99714",
    "AK"
  ],
  "ALLAKAKET": [
    "99720",
    "AK"
  ],
  "ANAKTUVUK PASS": [
    "99721",
    "AK"
  ],
  "ARCTIC VILLAGE": [
    "99722",
    "AK"
  ],
  "BARROW": [
    "99723",
    "AK"
  ],
  "ESTER": [
    "99725",
    "AK"
  ],
  "BETTLES FIELD": [
    "99726",
    "AK"
  ],
  "CANTWELL": [
    "99729",
    "AK"
  ],
  "FORT GREELY": [
    "99731",
    "AK"
  ],
  "CHICKEN": [
    "99732",
    "AK"
  ],
  "PRUDHOE BAY": [
    "99734",
    "AK"
  ],
  "DELTA JUNCTION": [
    "99737",
    "AK"
  ],
  "ELIM": [
    "99739",
    "AK"
  ],
  "FORT YUKON": [
    "99740",
    "AK"
  ],
  "GAMBELL": [
    "99742",
    "AK"
  ],
  "HUSLIA": [
    "99746",
    "AK"
  ],
  "KAKTOVIK": [
    "99747",
    "AK"
  ],
  "KALTAG": [
    "99748",
    "AK"
  ],
  "KIANA": [
    "99749",
    "AK"
  ],
  "KIVALINA": [
    "99750",
    "AK"
  ],
  "KOBUK": [
    "99751",
    "AK"
  ],
  "KOTZEBUE": [
    "99752",
    "AK"
  ],
  "KOYUK": [
    "99753",
    "AK"
  ],
  "KOYUKUK": [
    "99754",
    "AK"
  ],
  "DENALI NATIONAL PARK": [
    "99755",
    "AK"
  ],
  "MANLEY HOT SPRINGS": [
    "99756",
    "AK"
  ],
  "POINT LAY": [
    "99759",
    "AK"
  ],
  "NENANA": [
    "99760",
    "AK"
  ],
  "NOATAK": [
    "99761",
    "AK"
  ],
  "NOORVIK": [
    "99763",
    "AK"
  ],
  "NORTHWAY": [
    "99764",
    "AK"
  ],
  "NULATO": [
    "99765",
    "AK"
  ],
  "POINT HOPE": [
    "99766",
    "AK"
  ],
  "SAVOONGA": [
    "99769",
    "AK"
  ],
  "SELAWIK": [
    "99770",
    "AK"
  ],
  "SHAKTOOLIK": [
    "99771",
    "AK"
  ],
  "SHISHMAREF": [
    "99772",
    "AK"
  ],
  "SHUNGNAK": [
    "99773",
    "AK"
  ],
  "TANACROSS": [
    "99776",
    "AK"
  ],
  "TANANA": [
    "99777",
    "AK"
  ],
  "TELLER": [
    "99778",
    "AK"
  ],
  "TOK": [
    "99780",
    "AK"
  ],
  "VENETIE": [
    "99781",
    "AK"
  ],
  "WHITE MOUNTAIN": [
    "99784",
    "AK"
  ],
  "BREVIG MISSION": [
    "99785",
    "AK"
  ],
  "CHALKYITSIK": [
    "99788",
    "AK"
  ],
  "NUIQSUT": [
    "99789",
    "AK"
  ],
  "ATQASUK": [
    "99791",
    "AK"
  ],
  "ANGOON": [
    "99820",
    "AK"
  ],
  "AUKE BAY": [
    "99821",
    "AK"
  ],
  "ELFIN COVE": [
    "99825",
    "AK"
  ],
  "GUSTAVUS": [
    "99826",
    "AK"
  ],
  "HOONAH": [
    "99829",
    "AK"
  ],
  "KAKE": [
    "99830",
    "AK"
  ],
  "PORT ALEXANDER": [
    "99836",
    "AK"
  ],
  "SKAGWAY": [
    "99840",
    "AK"
  ],
  "TENAKEE SPRINGS": [
    "99841",
    "AK"
  ],
  "KETCHIKAN": [
    "99950",
    "AK"
  ],
  "COFFMAN COVE": [
    "99918",
    "AK"
  ],
  "THORNE BAY": [
    "99919",
    "AK"
  ],
  "HYDABURG": [
    "99922",
    "AK"
  ],
  "HYDER": [
    "99923",
    "AK"
  ],
  "KLAWOCK": [
    "99925",
    "AK"
  ],
  "METLAKATLA": [
    "99926",
    "AK"
  ],
  "POINT BAKER": [
    "99927",
    "AK"
  ],
  "WARD COVE": [
    "99928",
    "AK"
  ],
  "WRANGELL": [
    "99929",
    "AK"
  ],
  "UNCLASSIFIED": [
    "99999",
    "UNCLASSIFIED"
  ]
};
module.exports = cities;
//Just curious
var cityWordDist = {};
var cityWordPct = {};

var count = 0;
var longestWordCount = 0;
var longestWordedCity = '';
for (var key in cities) {
  var cityArr = key.trim().split(' ');
  var cityWordLength = cityArr.length;
  if (cityWordLength.toString() in cityWordDist) {
    cityWordDist[cityWordLength] = cityWordDist[cityWordLength] + 1;
  } else {
    cityWordDist[cityWordLength] = 1;
  }

  if (cityArr.length > longestWordCount) {
    longestWordCount = cityArr.length;
    longestWordedCity = key;
  }
  //console.log(cityArr);
  count++;
}

for (var key2 in cityWordDist) {
  cityWordPct[key2] = Math.round((cityWordDist[key] / 18065) * 1000) / 1000;
}
//this is the distribution
/*
{
    "1": 12566,
    "2": 5182,
    "3": 285,
    "4": 29,
    "5": 3
} */

/*  Percentage wise
{
    "1": 0.696,
    "2": 0.287,
    "3": 0.016,
    "4": 0.002,
    "5": 0
}

*/

//console.log(count);
