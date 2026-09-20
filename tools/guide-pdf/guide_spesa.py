# -*- coding: utf-8 -*-
"""Guida 3 — La spesa intelligente (etichette, claim, dispensa)."""
from design import *
from common import *
from guide_proteine import ch, qa

KEY = 'guida-spesa-etichette'


def p_energy_share(f):
    """Quota di energia da proteine (4 kcal/g), come nella regola dei claim UE."""
    return f['protein'] * 4 / f['kcal'] * 100 if f['kcal'] else 0


def possible_claims(f):
    """Quali claim (Reg. CE 1924/2006) le soglie consentirebbero, per un prodotto solido di questo profilo."""
    out = []
    pe = p_energy_share(f)
    if pe >= 20:
        out.append('ricco di proteine')
    elif pe >= 12:
        out.append('fonte di proteine')
    if f['fiber'] >= 6:
        out.append('ricco di fibre')
    elif f['fiber'] >= 3:
        out.append('fonte di fibre')
    if f['fat'] <= 0.5:
        out.append('senza grassi')
    elif f['fat'] <= 3:
        out.append('a basso contenuto di grassi')
    if f['kcal'] <= 40:
        out.append('a basso contenuto energetico')
    return out or ['nessuno tra questi']


def build_story(D):
    S = []

    # ------------------------------------------------------------ cover + indice
    S += cover(KEY)
    S += intro_page(None, [
        'Leggila prima di una spesa importante, o a casa: il supermercato non è il posto migliore per imparare.',
        'Soglie dei claim: <b>Reg. UE 1924/2006</b>; regole sull\'etichetta: <b>Reg. UE 1169/2011</b>.',
        'Gli esempi usano alimenti generici del database, <b>mai marche</b>. La <b>scheda del capitolo 7</b> si stampa e si porta con sé.',
    ])

    # ------------------------------------------------------------ 01
    S += ch('01', 'Anatomia di un\'etichetta')
    S += [
        P('Una confezione parla in tre luoghi diversi: il fronte (marketing), la lista degli ingredienti e la tabella '
          'nutrizionale. Solo gli ultimi due sono regolati nei dettagli. Si leggono in quest\'ordine.', 'lead'),
        Callout('quick', [P('<b>1. Ingredienti. 2. Tabella nutrizionale. 3. Claim sul fronte.</b> Partire dal fronte '
                            'significa partire da ciò che il produttore vuole farti notare; partire dal retro significa '
                            'partire da ciò che il prodotto contiene.', 'callout')]),
        P('La tabella nutrizionale', 'h2'),
        P('In Europa la dichiarazione nutrizionale è obbligatoria e riporta, <b>per 100 g o per 100 ml</b>: energia '
          '(in kJ e in kcal), grassi, di cui acidi grassi saturi, carboidrati, di cui zuccheri, proteine e sale. '
          'Le <b>fibre</b> sono facoltative, così come altri nutrienti; molti produttori le riportano comunque. '
          'Può comparire anche una colonna “per porzione”.'),
    ]
    f = D.food('muesli')
    kj = round(f['kcal'] * 4.184)
    S += [
        P('Un esempio, da un alimento del database', 'h3'),
        data_table(['Valori medi per 100 g', 'Muesli (database Gustoscopio)'], [
            ['Energia', f"{kj} kJ / {f['kcal']} kcal"],
            ['Grassi', f"{fmt(f['fat'])} g"],
            ['Carboidrati', f"{fmt(f['carbs'])} g"],
            ['Fibre (facoltative)', f"{fmt(f['fiber'])} g"],
            ['Proteine', f"{fmt(f['protein'])} g"],
        ], [80 * mm, 90 * mm], num_cols=(1,)),
        Spacer(1, 2 * mm),
        P('Il database di Gustoscopio non riporta saturi, zuccheri e sale: su un prodotto reale li troverai in etichetta '
          'e sono tra le righe più utili da confrontare. Il sale, in particolare, è calcolato dal sodio: '
          '<b>sale = sodio × 2,5</b>.', 'small'),
        Spacer(1, 3 * mm),
        Callout('tip', [P('<b>kJ e kcal.</b> Sono la stessa cosa in due unità: 1 kcal = 4,184 kJ. Nella vita di tutti i giorni '
                          'ti basta la colonna in kcal.', 'callout')]),
    ]

    # ------------------------------------------------------------ 02
    S += ch('02', 'Per 100 g o per porzione?')
    S += [
        P('I valori “per 100 g” servono a <b>confrontare</b> due prodotti. I valori “per porzione” servono a '
          '<b>decidere</b> quanto ne mangi. Sono due domande diverse.', 'lead'),
    ]
    pr = D.portion_ref
    rows = []
    for fid, g, note in [('biscotti', 30, 'porzione di riferimento'), ('mandorle', 30, 'porzione di riferimento'),
                         ('cornflakes-mais', 30, 'porzione tipica dei cereali da colazione'),
                         ('pasta', 80, 'a crudo'), ('yogurt', 125, 'un vasetto'), ('olio', 10, 'un cucchiaio')]:
        fd = D.food(fid)
        c = D.calc(fid, g)
        rows.append([esc(fd['name']), f"{fd['kcal']}", f'{g} g', note, str(c['kcal'])])
    S.append(data_table(['Alimento', 'kcal / 100 g', 'Porzione', 'Riferimento', 'kcal / porzione'], rows,
                        [46 * mm, 24 * mm, 20 * mm, 52 * mm, 28 * mm], num_cols=(1, 4)))
    S += [
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>La porzione dell\'etichetta non è la tua.</b> È scelta dal produttore e può essere più piccola '
                           'di ciò che mangi davvero. Se mangi 60 g di cereali e la porzione dichiarata è 30 g, i valori '
                           'che leggi vanno raddoppiati. Il modo più semplice: ragiona sempre sui 100 g e poi '
                           'proporziona alla quantità reale.', 'callout')]),
        P('Confrontare due prodotti in cinque passi', 'h2'),
    ]
    S += bullets([
        '<b>1.</b> Metti i due prodotti sulla stessa base: <b>per 100 g</b>.',
        '<b>2.</b> Guarda la <b>porzione realistica</b> per te, non quella indicata.',
        '<b>3.</b> Leggi gli <b>ingredienti</b>: cosa c\'è, e in che ordine.',
        '<b>4.</b> Verifica i <b>claim</b> con la tabella (capitolo 3): sono veri per legge, ma dicono una cosa sola.',
        '<b>5.</b> Scegli in base a <b>ciò che ti serve</b>: fibre, proteine, meno zuccheri, un prezzo, un gusto. '
        'Nessun prodotto vince su tutto.',
    ])
    cf, mu, av = D.food('cornflakes-mais'), D.food('muesli'), D.food('avena')
    S += [
        P('Un confronto reale', 'h2'),
        P('Tre cereali da colazione generici del database, per 100 g. Il muesli ha più fibre e più grassi dei cornflakes, '
          'l\'avena più fibre e più proteine di entrambi. Nessuno dei tre è “migliore”: dipende da che cosa cerchi.'),
        data_table(['Per 100 g', 'kcal', 'Proteine (g)', 'Carboidrati (g)', 'Grassi (g)', 'Fibre (g)'],
                   [[esc(x['name']), str(x['kcal']), fmt(x['protein']), fmt(x['carbs']), fmt(x['fat']), fmt(x['fiber'])]
                    for x in (cf, mu, av)],
                   [46 * mm, 18 * mm, 27 * mm, 31 * mm, 24 * mm, 24 * mm], num_cols=(1, 2, 3, 4, 5)),
    ]

    # ------------------------------------------------------------ 03
    S += ch('03', 'Le parole sul fronte')
    S += [
        P('“Ricco di fibre”, “senza zuccheri”, “light”: non sono parole libere. In Europa possono comparire solo se il '
          'prodotto rispetta soglie precise. Conoscerle è come avere la chiave dell\'etichetta.', 'lead'),
        data_table(['Claim', 'Quando è permesso (Reg. UE 1924/2006)'], [
            ['Fonte di proteine', 'almeno il 12% dell\'energia proviene da proteine'],
            ['Ricco di proteine', 'almeno il 20% dell\'energia proviene da proteine'],
            ['Fonte di fibre', 'almeno 3 g per 100 g (o 1,5 g per 100 kcal)'],
            ['Ricco di fibre', 'almeno 6 g per 100 g (o 3 g per 100 kcal)'],
            ['A basso contenuto di grassi', 'al massimo 3 g per 100 g (1,5 g per 100 ml per i liquidi)'],
            ['Senza grassi', 'al massimo 0,5 g per 100 g o 100 ml'],
            ['A basso contenuto di zuccheri', 'al massimo 5 g per 100 g (2,5 g per 100 ml per i liquidi)'],
            ['Senza zuccheri', 'al massimo 0,5 g per 100 g o 100 ml'],
            ['Senza zuccheri aggiunti', 'nessun zucchero (mono o disaccaride) aggiunto, né ingredienti usati per dolcificare'],
            ['A basso contenuto di sodio', 'al massimo 0,12 g di sodio per 100 g o 100 ml'],
            ['A basso contenuto energetico', 'al massimo 40 kcal per 100 g (20 kcal per 100 ml per i liquidi)'],
            ['Ridotto valore energetico / light', 'almeno il 30% in meno rispetto a un prodotto simile, con indicazione di ciò che è ridotto'],
        ], [58 * mm, CONTENT_W - 58 * mm], font_scale=0.95),
        Spacer(1, 3 * mm),
        Callout('quick', [P('<b>Un claim dice una cosa sola.</b> “Senza grassi” non dice nulla sugli zuccheri; “ricco di '
                            'proteine” non dice nulla sulle calorie. E un claim sul fronte non sostituisce la lettura '
                            'della tabella.', 'callout')]),
    ]
    S += [
        P('Alcune sfumature che spiegano molto', 'h2'),
    ]
    S += bullets([
        '<b>“Senza zuccheri aggiunti” non significa “senza zuccheri”.</b> Un prodotto di frutta o latte contiene zuccheri '
        'naturalmente presenti; in quel caso la legge richiede l\'indicazione “contiene naturalmente zuccheri”.',
        '<b>“Light” è un confronto</b>: vale rispetto a un prodotto simile. Un prodotto light non è per forza a basso '
        'contenuto calorico.',
        '<b>“Proteico” è misurabile</b> (almeno il 20% dell\'energia), ma dice quanta parte dell\'energia è proteica, non '
        'quanto quel prodotto sia adatto a te.',
        '<b>Termini come “fit”, “wellness”, “naturale”</b> non fanno parte delle soglie nutrizionali dell\'elenco sopra '
        '(“naturale” ha regole sue, ma non indica un profilo nutrizionale): non sono una garanzia di nulla.',
    ])

    # tabella verifica dal database
    S += [
        P('Applica le soglie: cosa potrebbero dire questi alimenti', 'h2'),
        P('Esercizio con alimenti del database. Nella realtà i claim riguardano prodotti confezionati e li sceglie il '
          'produttore, ma applicare le soglie mostra cosa significano davvero.'),
    ]
    rows = []
    for fid in ['pollo', 'merluzzo', 'yogurt-greco-0', 'pasta', 'pane', 'avena', 'lenticchie', 'mandorle', 'zucchine']:
        fd = D.food(fid)
        rows.append([esc(fd['name']), f"{p_energy_share(fd):.0f}%", fmt(fd['fiber']), fmt(fd['fat']), fd['kcal'],
                     ', '.join(possible_claims(fd))])
    S.append(data_table(['Alimento (per 100 g)', 'Energia da proteine', 'Fibre (g)', 'Grassi (g)', 'kcal', 'Claim consentiti dalle soglie'],
                        rows, [36 * mm, 21 * mm, 15 * mm, 17 * mm, 12 * mm, 69 * mm], num_cols=(1, 2, 3, 4)))
    S += [
        Spacer(1, 2 * mm),
        P('Qualche sorpresa: la pasta di semola supera la soglia “fonte di proteine” (circa il 15% dell\'energia), '
          'le lenticchie sono “ricche di fibre” e “senza grassi”, e perfino le zucchine superano la soglia “ricco di proteine” '
          '(pochissime calorie, quindi una quota alta di energia da proteine). Le soglie descrivono proporzioni, non qualità.', 'small'),
    ]

    # ------------------------------------------------------------ 04
    S += ch('04', 'Ingredienti, allergeni, date')
    S += [
        P('Se la tabella nutrizionale dice <i>quanto</i>, la lista degli ingredienti dice <i>cosa</i>. È la parte che '
          'racconta più del prodotto.', 'lead'),
        P('Come si legge la lista', 'h2'),
    ]
    S += bullets([
        '<b>In ordine decrescente di peso.</b> Il primo ingrediente è quello presente in maggior quantità. Una barretta '
        'che inizia con “sciroppo di glucosio” contiene soprattutto quello.',
        '<b>Lista corta, di solito, significa meno passaggi industriali</b>, ma non è una regola: un buon prodotto '
        'può avere più ingredienti, un prodotto povero può averne pochi.',
        '<b>Più nomi per lo stesso ingrediente.</b> Gli zuccheri possono comparire come saccarosio, destrosio, '
        'sciroppo di glucosio, sciroppo d\'agave, miele: se ne trovi tre diversi, sommali mentalmente.',
        '<b>Le “E” non sono un allarme.</b> Indicano additivi autorizzati e valutati (E300 è, per esempio, vitamina C). '
        'Non serve evitarle a priori: serve capire a cosa servono.',
    ])
    S += [
        Callout('note', [P('<b>Allergeni.</b> In UE 14 gruppi di allergeni vanno sempre evidenziati nella lista (per esempio '
                           'in grassetto): cereali con glutine, crostacei, uova, pesce, arachidi, soia, latte, frutta a '
                           'guscio, sedano, senape, semi di sesamo, anidride solforosa e solfiti, lupini, molluschi. '
                           'Vale anche per le tracce indicate come “può contenere”. Se hai un\'allergia, l\'etichetta si '
                           'legge <b>ogni volta</b>, anche per prodotti già acquistati: le ricette cambiano.', 'callout')]),
        P('Le date: due frasi, due significati', 'h2'),
    ]
    S += bullets([
        '<b>“Da consumarsi entro”</b>: è una scadenza. Dopo quella data il prodotto (di solito molto deperibile) non va consumato.',
        '<b>“Da consumarsi preferibilmente entro”</b>: è il termine minimo di conservazione. Dopo quella data il prodotto '
        'può perdere qualità (sapore, consistenza) ma spesso è ancora sicuro, se conservato correttamente.',
    ])
    S += [
        Callout('tip', [P('<b>Meno sprechi, stessa attenzione.</b> Distinguere le due date evita di buttare prodotti perfetti '
                          '(pasta, biscotti, conserve) senza rinunciare alla prudenza con quelli davvero deperibili '
                          '(carne, pesce, latticini freschi).', 'callout')]),
    ]

    # ------------------------------------------------------------ 05
    S += ch('05', 'La dispensa e la lista della spesa')
    S += [
        P('Una spesa senza lista è una spesa guidata dall\'assortimento. Una lista costruita sul piatto bilanciato è, '
          'quasi sempre, una spesa più semplice.', 'lead'),
        P('Quantità di partenza per una settimana', 'h2'),
        P('Si ricavano moltiplicando le <b>porzioni di riferimento</b> di Gustoscopio per il numero di volte in cui le '
          'mangi. L\'esempio riguarda un adulto onnivoro che pranza e cena a casa: è un punto di partenza, non una '
          'prescrizione.'),
    ]
    plan = [('Verdura', 14, 'ogni pranzo e cena'), ('Frutta', 14, 'una al giorno, due volte'),
            ('Cereali & derivati', 10, 'a crudo, pasta/riso/altri cereali'),
            ('Legumi', 4, 'cotti'), ('Pesce', 3, ''), ('Carne', 2, ''), ('Uova', 3, 'circa 3 uova'),
            ('Latte & derivati', 7, 'uno yogurt o un bicchiere al giorno'),
            ('Frutta secca', 4, 'una manciata'), ('Condimenti', 14, 'olio, 1 cucchiaio a pasto')]
    rows = []
    for cat, n, note in plan:
        g = pr[cat]['grams']
        rows.append([cat, f'{g} g', str(n), f'{g * n:,}'.replace(',', '.') + ' g', note])
    S.append(data_table(['Categoria', 'Porzione', 'Volte', 'Quantità', 'Nota'], rows,
                        [38 * mm, 20 * mm, 16 * mm, 24 * mm, 72 * mm], num_cols=(1, 2, 3)))
    S += [
        Spacer(1, 3 * mm),
        P('<b>Adatta, non copiare:</b> se sei vegetale, legumi e soia sostituiscono pesce, carne e uova; se mangi fuori, riduci le volte; se cucini per più persone, moltiplica.', 'small'),
        P('Scatolame e surgelati', 'h2'),
        P('Tonno al naturale e sott\'olio: valori del database per 100 g di prodotto sgocciolato.'),
    ]
    t1, t2 = D.food('tonno'), D.food('tonno-olio')
    S += [
        data_table(['Per 100 g', 'kcal', 'Proteine (g)', 'Grassi (g)'],
                   [[esc(t1['name']), str(t1['kcal']), fmt(t1['protein']), fmt(t1['fat'])],
                    [esc(t2['name']), str(t2['kcal']), fmt(t2['protein']), fmt(t2['fat'])]],
                   [78 * mm, 30 * mm, 32 * mm, 30 * mm], num_cols=(1, 2, 3)),
        P('Proteine simili; cambiano i grassi, e con loro le kcal. Non è un giudizio: vale la pena solo saperlo.', 'small'),
    ]
    S += bullets([
        '<b>Legumi in scatola:</b> valori del database per legumi cotti e sgocciolati. Leggi gli ingredienti (sale, additivi) e, se vuoi, sciacquali.',
        '<b>Verdure e pesce surgelati:</b> scorta pratica e spesso scelta valida. Controlla che l\'ingrediente sia solo quello (niente salse o panature, se non le vuoi).',
    ])

    # ------------------------------------------------------------ 06
    yg5, yg0 = D.food('yogurt'), D.food('yogurt-greco-0')
    red_kcal = (1 - yg0['kcal'] / yg5['kcal']) * 100
    red_fat = (1 - yg0['fat'] / yg5['fat']) * 100
    bis = D.food('biscotti')
    S += ch('06', 'Sei domande frequenti')
    S += [
        qa('DIPENDE', 'Il biologico è più nutriente?',
           'Il biologico descrive un metodo di produzione, non un profilo nutrizionale: la tabella di un prodotto bio va '
           'letta come quella di qualsiasi altro. Se lo scegli per altri motivi (ambiente, preferenze), è una scelta '
           'legittima; semplicemente non è un claim sui nutrienti.'),
        qa('MITO', '“Senza glutine” significa più sano?',
           'Il senza glutine è indispensabile per chi ha celiachia o altre condizioni diagnosticate. Per tutti gli altri '
           'non è di per sé un vantaggio nutrizionale: i prodotti sostitutivi possono avere un profilo diverso (più '
           'grassi, meno fibre) e vanno letti come gli altri.'),
        qa('VERITÀ', 'Se c\'è scritto “proteico”, ha davvero molte proteine?',
           f"Sì, per legge: almeno il 20% dell'energia deve provenire da proteine. Per confronto, lo yogurt greco 0% del "
           f"database ne ha circa il {p_energy_share(yg0):.0f}%, i biscotti secchi il {p_energy_share(bis):.0f}%. Ma la "
           f"quota non dice la quantità: guarda i grammi per porzione e valuta se ti servono (la guida “Proteine” ti "
           f"aiuta a calcolarlo)."),
        qa('DIPENDE', 'Come si legge il sale?',
           'Le etichette riportano già il <b>sale</b> (sodio × 2,5). L\'OMS indica meno di 5 g di sale al giorno per gli '
           'adulti: guarda i valori per 100 g e per porzione, soprattutto di pane, salumi, formaggi, conserve e piatti '
           'pronti, dove se ne concentra di più.'),
        qa('DIPENDE', 'Il prodotto “light” è meglio?',
           f"Solo se il taglio che fa è quello che cerchi. Esempio: lo yogurt greco 0% del database ha "
           f"{red_kcal:.0f}% di kcal in meno e {red_fat:.0f}% di grassi in meno rispetto a quello al 5%, ma resta uno yogurt: "
           f"cambia il gusto, cambia la sazietà. Non è “meglio”, è diverso."),
        qa('DIPENDE', 'Marca del supermercato o marca nota?',
           'Non si può dire in astratto. Le ricette possono essere simili o molto diverse: confronta ingredienti e tabella '
           'per 100 g, non il logo. Spesso la differenza è solo il prezzo, a volte è anche la composizione.'),
    ]

    # ------------------------------------------------------------ 07
    S += ch('07', 'La tua scheda', dark=False)
    S += [
        P('Da stampare o da compilare a schermo. Usala al supermercato per confrontare due prodotti, o a casa per '
          'preparare la lista.', 'lead'),
        P('Confronto tra due prodotti', 'h2'),
    ]
    labels = ['Nome del prodotto', 'Primi tre ingredienti', 'kcal per 100 g', 'Proteine (g)', 'Fibre (g)',
              'Zuccheri (g)', 'Sale (g)', 'La mia porzione reale (g)']
    t = Table([[Paragraph(esc(h).upper(), STYLES['th']) for h in ['', 'Prodotto A', 'Prodotto B']]] +
              [[Paragraph(lab, STYLES['cellb']), '', ''] for lab in labels],
              colWidths=[60 * mm, 55 * mm, 55 * mm], rowHeights=[7.5 * mm] + [9.4 * mm] * len(labels))
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NIGHT), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('LINEBELOW', (0, 1), (-1, -1), 0.5, MUTED), ('LEFTPADDING', (0, 0), (-1, -1), 5),
                           ('LINEBEFORE', (1, 1), (-1, -1), 0.4, LINE)]))
    S += [t, Spacer(1, 3 * mm), FillLine('Scelgo il prodotto:', .55), FillLine('Perché (ciò che mi serve):', .9),
          Spacer(1, 1 * mm), P('Prima di uscire dal supermercato', 'h2')]
    S += [
        CheckItem('Ho una lista costruita sul piatto: verdure, cereali, proteine, frutta, condimenti.'),
        CheckItem('Ho letto ingredienti e tabella prima del fronte.'),
        CheckItem('Ho confrontato i prodotti per 100 g, non per porzione.'),
        CheckItem('Ho controllato la data giusta (“entro” o “preferibilmente entro”).'),
        CheckItem('Se ho un\'allergia, ho riletto gli allergeni anche sui prodotti che compro sempre.'),
    ]

    # ------------------------------------------------------------ chiusura
    S += closing(KEY, [
        ('Prova con un prodotto', 'Prendi qualcosa che hai già in casa e applica i cinque passi del capitolo 2: '
                                  'ingredienti, tabella per 100 g, porzione reale, claim, decisione.'),
        ('Confronta con Gustoscopio', 'Nella sezione <b>Confronta</b> puoi mettere a confronto due alimenti su un '
                                      'parametro alla volta, senza cercare un “vincitore” assoluto.'),
        ('Continua a esplorare', 'In <b>Alimenti</b> trovi i valori di ogni cibo citato, con lo slider per la quantità: '
                                 'utile per tradurre le porzioni in grammi e in kcal.'),
    ])
    return S
