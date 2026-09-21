# -*- coding: utf-8 -*-
"""Guida 7 — Idratazione (stime dello strumento, liquidi, segnali, sport e caldo)."""
from design import *
from common import *
from guide_proteine import ch, qa

KEY = 'guida-idratazione'


class Boxes(Flowable):
    """Piccoli quadratini vuoti da spuntare (il carattere ☐ non è nei font della guida)."""

    def __init__(self, n=2, size=3.6 * mm, gap=2.2 * mm):
        super().__init__()
        self.n, self.size, self.gap = n, size, gap

    def wrap(self, aw, ah):
        self.width = self.n * self.size + (self.n - 1) * self.gap
        self.height = self.size
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.setStrokeColor(MUTED)
        c.setLineWidth(0.8)
        for i in range(self.n):
            c.roundRect(i * (self.size + self.gap), 0, self.size, self.size, 0.6 * mm, stroke=1, fill=0)

LEVEL_SHORT = {'sedentario': 'Sedentario', 'leggero': 'Leggero', 'moderato': 'Moderato',
               'intenso': 'Intenso', 'atleta': 'Atleta'}


def rng(w):
    return f"{fmt(w['lowL'])} - {fmt(w['highL'])} L"


def build_story(D):
    S = []
    wt = D.water_table
    weights = wt['weights']
    levels = [l['id'] for l in D.activity_levels]

    S += cover(KEY)
    S += intro_page(None, [
        'I numeri delle tabelle sono quelli dello strumento <b>Fabbisogno idrico</b> di Gustoscopio: stime, non prescrizioni.',
        'Il capitolo 4 spiega come capire se stai bevendo abbastanza senza contare ogni bicchiere.',
        'Se hai una condizione a cuore o reni, o una restrizione di liquidi indicata dal medico, valgono le sue indicazioni.',
    ])

    # ------------------------------------------------------------ 01
    S += ch('01', 'Perché l\'acqua conta')
    S += [
        P('L\'acqua è il componente più abbondante del corpo e partecipa a quasi tutto: regola la temperatura, trasporta i '
          'nutrienti, permette la digestione e l\'eliminazione delle scorie.', 'lead'),
        P('Quanta ne perdi, ogni giorno', 'h2'),
    ]
    S += bullets([
        '<b>Urine e feci:</b> la via principale di eliminazione.',
        '<b>Sudore:</b> varia moltissimo con caldo, sforzo e abbigliamento.',
        '<b>Respiro:</b> ne perdi anche respirando, di più quando fa freddo e secco o durante l\'attività.',
    ])
    S += [
        Callout('quick', [P('<b>Il bilancio si chiude con ciò che entra:</b> bevande e, in parte, alimenti. Non serve “bere '
                            'tantissimo”: serve <b>bere abbastanza, con regolarità</b>.', 'callout')]),
        P('Quando la sete non basta', 'h2'),
        P('In persone sane, la sete è un buon segnale. Ma in alcune situazioni arriva in ritardo o è meno percepita: '
          'durante lo sforzo, in caldo intenso, con l\'età avanzata. In quei casi conviene bere a intervalli, non solo quando '
          'la bocca è asciutta.'),
    ]

    # ------------------------------------------------------------ 02
    S += ch('02', 'Quanta ne serve')
    S += [
        P('Non esiste un numero unico: dipende da peso, attività, clima. Ecco i due modi di ragionare.', 'lead'),
        NumberRow([('2,0 L', 'donne adulte: assunzione adeguata di acqua totale (EFSA)'),
                   ('2,5 L', 'uomini adulti: assunzione adeguata di acqua totale (EFSA)'),
                   ('30-35', 'ml per kg di peso: la stima usata dallo strumento del sito')]),
        Spacer(1, 2 * mm),
        P('Il riferimento europeo (EFSA) riguarda l\'acqua <b>totale</b>: bevande più quella che arriva dagli alimenti, che in '
          'media è una parte importante (circa un quinto). Lo strumento di Gustoscopio parte invece dal peso e aggiunge una '
          'maggiorazione per attività e clima. Sono impostazioni diverse: usale come ordine di grandezza, non come numeri da rincorrere.'),
        P('La stima dello strumento, per peso e attività', 'h2'),
    ]
    hdr = ['Attività'] + [f'{w} kg' for w in weights]
    S.append(data_table(hdr, [[LEVEL_SHORT[lv]] + [rng(x) for x in wt['mild'][lv]] for lv in levels],
                        [34 * mm] + [34 * mm] * 4, num_cols=(1, 2, 3, 4)))
    S += [
        Spacer(1, 3 * mm),
        P('Con clima caldo, la maggiorazione sale di mezzo litro:', 'body'),
        data_table(hdr, [[LEVEL_SHORT[lv]] + [rng(x) for x in wt['hot'][lv]] for lv in levels],
                   [34 * mm] + [34 * mm] * 4, num_cols=(1, 2, 3, 4)),
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>Sono stime generiche.</b> Non tengono conto di condizioni cliniche, farmaci, gravidanza e allattamento, '
                           'né di sudorazione molto intensa: in questi casi le indicazioni vanno definite con chi ti segue.', 'callout')]),
    ]

    # ------------------------------------------------------------ 03
    S += ch('03', 'Cosa conta come liquido')
    S += [P('L\'acqua è la scelta di base, ma non è l\'unica fonte.', 'lead')]
    S += bullets([
        '<b>Acqua, naturale o frizzante.</b> Nessuna caloria, la base di tutto.',
        '<b>Tè, caffè, tisane.</b> In quantità abituali contribuiscono anch\'essi ai liquidi della giornata.',
        '<b>Latte e bevande vegetali.</b> Liquidi con nutrienti (e calorie).',
        '<b>Zuppe e brodi</b>, e naturalmente <b>frutta e verdura</b>, in gran parte fatte di acqua.',
    ])
    rows = []
    for fid in ['latte-intero', 'latte-scremato', 'kefir', 'bevanda-soia', 'succo-arancia']:
        f = D.food(fid)
        c = D.calc(fid, 200)
        rows.append([esc(f['name']), str(c['kcal']), fmt(c['protein']), fmt(c['carbs'])])
    S += [
        P('Le bevande con calorie, nel database', 'h2'),
        data_table(['Bevanda (200 g, circa un bicchiere)', 'kcal', 'Proteine (g)', 'Carboidrati (g)'], rows,
                   [76 * mm, 22 * mm, 34 * mm, 38 * mm], num_cols=(1, 2, 3)),
        Spacer(1, 2 * mm),
        P('Per le bevande si considera 1 ml pari a circa 1 g. L\'acqua non apporta energia: sostituire una bevanda zuccherata con acqua '
          'è uno dei cambi più semplici per ridurre le calorie liquide.', 'small'),
    ]
    items = []
    for fid in ['cetrioli', 'zucchine', 'pomodoro', 'anguria', 'arancia']:
        f = D.food(fid)
        items.append((f['name'], f['kcal'], BLUE, f"{f['kcal']} kcal"))
    S += [
        KeepTogether([
            P('Alimenti “ricchi d\'acqua”', 'h2'),
            P('Poche calorie per 100 g, perché in gran parte fatti di acqua. Dal database:'),
            Spacer(1, 2 * mm),
            HBar(items, label_w=40 * mm, max_val=100),
        ]),
    ]

    # ------------------------------------------------------------ 04
    S += ch('04', 'Come capire se bevi abbastanza')
    S += [
        P('Contare i bicchieri non è necessario per tutti. Ci sono segnali più semplici.', 'lead'),
        data_table(['Segnale', 'Cosa può indicare'], [
            ['Sete', 'Un buon segnale di base: se c\'è, bevi. Ma non aspettarla sempre, soprattutto con caldo o sforzo.'],
            ['Colore delle urine', 'Un giallo chiaro (paglierino) è, di solito, compatibile con una buona idratazione; molto scure possono indicare che serve più acqua.'],
            ['Bocca e labbra asciutte', 'Un altro indizio di poca acqua, insieme a stanchezza e mal di testa.'],
            ['Frequenza delle urine', 'Se sono molto rade e scarse durante la giornata, può servire bere di più.'],
        ], [50 * mm, CONTENT_W - 50 * mm]),
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>Attenzione ai farmaci e agli integratori:</b> alcuni possono cambiare il colore delle urine (per esempio '
                           'le vitamine del gruppo B). Se ti sembra strano, non è per forza un segnale di poca acqua.', 'callout')]),
        P('Abitudini che aiutano', 'h2'),
    ]
    S += bullets([
        '<b>Un bicchiere al risveglio</b> e uno ai pasti: agganciare l\'acqua a routine che già fai.',
        '<b>La bottiglia sempre visibile</b> in ufficio o in borsa, non in un cassetto.',
        '<b>Un gusto in più</b> (limone, menta, frutta) se l\'acqua semplice ti annoia.',
        '<b>Bere a sorsi, distribuiti nella giornata,</b> più che una grande quantità tutta insieme.',
    ])

    # ------------------------------------------------------------ 05
    hot_a = wt['hot']['intenso'][2]
    S += ch('05', 'Sport, caldo e casi particolari')
    S += [
        P('Con lo sforzo e il caldo il sudore aumenta, e con lui il bisogno di liquidi.', 'lead'),
        P('Prima, durante, dopo', 'h2'),
    ]
    S += bullets([
        '<b>Prima:</b> parti idratato, senza sforzarti di bere troppo all\'ultimo.',
        '<b>Durante:</b> a piccoli sorsi regolari, adatti alla durata e al caldo.',
        '<b>Dopo:</b> riprendi i liquidi nelle ore successive e recupera con un pasto.',
    ])
    S += [
        Spacer(1, 2 * mm),
        P(f"Un esempio dallo strumento: una persona di 75 kg con attività intensa e clima caldo ha una stima di "
          f"<b>{rng(hot_a)}</b> al giorno."),
        Callout('note', [P('<b>Sforzi lunghi e caldo intenso.</b> Quando si suda molto per ore, oltre all\'acqua possono servire i sali minerali. '
                           'Bere molto più di quanto si suda non è utile, e in casi estremi può essere un rischio: se fai attività di '
                           'resistenza, parlane con chi ti segue.', 'callout')]),
        P('Quando ci vuole attenzione in più', 'h2'),
    ]
    S += bullets([
        '<b>Anziani:</b> la percezione della sete può ridursi: conviene proporre l\'acqua durante la giornata.',
        '<b>Bambini:</b> hanno esigenze e segnali diversi da un adulto.',
        '<b>Gravidanza e allattamento:</b> il fabbisogno cambia.',
        '<b>Malattie a cuore o reni:</b> possono richiedere di limitare i liquidi. Vale sempre il parere del medico.',
    ])

    # ------------------------------------------------------------ 06
    S += ch('06', 'Sei domande frequenti')
    S += [
        qa('DIPENDE', 'Servono davvero otto bicchieri al giorno?',
           'È un\'approssimazione facile da ricordare, non una regola scientifica. Il fabbisogno cambia da persona a persona e '
           'una parte arriva dagli alimenti: usa la stima del capitolo 2 e i segnali del capitolo 4.'),
        qa('MITO', 'Il caffè disidrata?',
           'In quantità abituali, no: contribuisce anche lui ai liquidi della giornata. Se ne bevi molto, contano anche sonno e ansia.'),
        qa('MITO', 'Bere durante i pasti fa male alla digestione?',
           'Non ci sono prove che bere durante i pasti danneggi la digestione in una persona sana. Se ti dà fastidio, bevi lontano dai pasti.'),
        qa('DIPENDE', 'Acqua naturale o frizzante?',
           'Sono entrambe acqua. La frizzante può dare gonfiore ad alcune persone; scegli quella che ti fa bere di più e che tolleri meglio.'),
        qa('DIPENDE', 'L\'acqua fa dimagrire?',
           'Non brucia i grassi. Può aiutare se sostituisce bevande zuccherate o se ti fa sentire più sazio prima di un pasto, ma non è una strategia da sola.'),
        qa('DIPENDE', 'Ho una malattia (cuore, reni): devo bere di più?',
           'Non basarti su una guida generale: alcune condizioni richiedono di limitare i liquidi, altre di aumentarli. Chiedi al tuo medico.'),
    ]

    # ------------------------------------------------------------ 07
    S += ch('07', 'La tua scheda', dark=False)
    S += [
        P('Da stampare: un promemoria per una settimana, per prendere la mano senza contare tutto.', 'lead'),
        FillLine('La mia stima (litri al giorno, dallo strumento):', .85),
        FillLine('Il mio bicchiere/bottiglia è da (ml):', .7),
        FillLine('Quanti ne servono, più o meno, per arrivarci:', .8),
        Spacer(1, 3 * mm),
        P('Il mio promemoria settimanale', 'h2'),
    ]
    days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
    t = Table([[Paragraph(esc(h).upper(), STYLES['th']) for h in ['', 'Mattina', 'Metà giornata', 'Pomeriggio', 'Sera']]] +
              [[Paragraph(d, STYLES['cellb']), Boxes(), Boxes(), Boxes(), Boxes()] for d in days],
              colWidths=[20 * mm, 38 * mm, 38 * mm, 38 * mm, 36 * mm], rowHeights=[7.5 * mm] + [9.5 * mm] * 7)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NIGHT), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('LINEBELOW', (0, 1), (-1, -1), 0.5, MUTED), ('LEFTPADDING', (0, 0), (-1, -1), 5),
                           ]))
    S += [t, Spacer(1, 4 * mm), P('Prima di andare a dormire', 'h2')]
    S += [
        CheckItem('Le mie urine, oggi, erano di un colore chiaro?'),
        CheckItem('Ho bevuto anche quando non avevo sete, se faceva caldo o mi sono allenato?'),
        CheckItem('Ho scelto acqua al posto di una bevanda zuccherata almeno una volta?'),
    ]

    S += closing(KEY, [
        ('Calcola la tua stima', 'Apri <b>Fabbisogno idrico</b> in Strumenti: inserisci peso, attività e clima e confronta con le tabelle di questa guida.'),
        ('Agganciala a una routine', 'Scegli tre momenti fissi (al risveglio, ai pasti, dopo l\'allenamento) e comincia da lì.'),
        ('Guarda i segnali', 'Per una settimana osserva colore delle urine e sete, con il promemoria del capitolo 7. Poi decidi se serve cambiare.'),
    ])
    return S
