#!/usr/bin/env python3
"""Fetch Google Scholar metrics and write assets/data/scholar-stats.json."""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

SCHOLAR_ID = "z6mdC6kAAAAJ"
OUTPUT_PATH = Path("assets/data/scholar-stats.json")


def fetch_scholar_stats() -> dict:
    from scholarly import scholarly

    author = scholarly.search_author_id(SCHOLAR_ID)
    author = scholarly.fill(
        author,
        sections=["basics", "indices", "counts", "publications"],
    )

    publications = author.get("publications") or []

    return {
        "source": "google_scholar",
        "scholarId": SCHOLAR_ID,
        "updatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "articles": len(publications),
        "citations": int(author.get("citedby") or 0),
        "hIndex": int(author.get("hindex") or 0),
        "i10Index": int(author.get("i10index") or 0),
    }


def main() -> int:
    try:
        stats = fetch_scholar_stats()
    except Exception as error:
        print(f"Failed to fetch Google Scholar stats: {error}", file=sys.stderr)
        return 1

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(stats, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(stats, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
