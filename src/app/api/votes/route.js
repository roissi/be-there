// src/app/api/votes/route.js
import { supabase } from '@/lib/supabaseClient';

const DEFAULT_YEAR = 2025;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get('year');
    const year = Number(yearParam ?? DEFAULT_YEAR);

    if (!Number.isFinite(year)) {
      return new Response(JSON.stringify({ error: 'Invalid year' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .eq('year', year);

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      'Erreur lors de la récupération des votes :',
      err?.message ?? err
    );
    return new Response(
      JSON.stringify({ error: err?.message ?? 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { index, type } = body;
    const year = Number(body?.year ?? DEFAULT_YEAR);

    if (
      index === undefined ||
      !Number.isInteger(index) ||
      (type !== 'up' && type !== 'down') ||
      !Number.isFinite(year)
    ) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data: existingVote, error: selectError } = await supabase
      .from('votes')
      .select('*')
      .eq('year', year)
      .eq('movie_id', index)
      .maybeSingle();

    if (selectError) {
      return new Response(JSON.stringify({ error: selectError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!existingVote) {
      const { error: insertError } = await supabase.from('votes').insert({
        year,
        movie_id: index,
        upvotes: type === 'up' ? 1 : 0,
        downvotes: type === 'down' ? 1 : 0,
      });

      if (insertError) {
        return new Response(JSON.stringify({ error: insertError.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedVote =
      type === 'up'
        ? { upvotes: (existingVote.upvotes ?? 0) + 1 }
        : { downvotes: (existingVote.downvotes ?? 0) + 1 };

    const { error: updateError } = await supabase
      .from('votes')
      .update(updatedVote)
      .eq('year', year)
      .eq('movie_id', index);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(
      'Erreur lors de la mise à jour des votes :',
      err?.message ?? err
    );
    return new Response(
      JSON.stringify({ error: err?.message ?? 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
