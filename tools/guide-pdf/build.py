# -*- coding: utf-8 -*-
"""
Genera le guide PDF di Gustoscopio in ./out/
Uso:   node export_data.mjs && python3 build.py [guida-proteine ...]
(le dipendenze Python sono solo: reportlab)
"""
import importlib
import os
import sys

from design import Data, build
from common import CATALOG

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out')
MODULES = {
    'guida-proteine': 'guide_proteine',
    'guida-piatto-bilanciato': 'guide_piatto',
    'guida-spesa-etichette': 'guide_spesa',
    'guida-fabbisogno': 'guide_fabbisogno',
    'guida-colazione-spuntini': 'guide_colazione',
    'guida-settimana': 'guide_settimana',
    'guida-idratazione': 'guide_idratazione',
}


def main(keys):
    os.makedirs(OUT, exist_ok=True)
    D = Data()
    for key in keys:
        if not os.path.exists(os.path.join(HERE, MODULES[key] + '.py')):
            print(f'- {key}: modulo non ancora presente, salto')
            continue
        mod = importlib.import_module(MODULES[key])
        meta = CATALOG[key]
        path = os.path.join(OUT, f'{key}.pdf')
        build(mod.build_story(D), path, meta['title'], meta['short'], f"Gustoscopio — {meta['title']}")
        print(f'✓ {key}.pdf ({os.path.getsize(path) // 1024} KB)')


if __name__ == '__main__':
    main(sys.argv[1:] or list(MODULES))
